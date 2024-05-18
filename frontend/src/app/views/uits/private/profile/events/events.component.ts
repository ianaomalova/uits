import {ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {CalendarEvent, CalendarView} from "angular-calendar";
import {FormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {eachDayOfInterval, endOfDay, format, parseISO, startOfDay} from "date-fns";
import {GenerateUid} from "@app/shared/utils/GenerateUid";
import {BehaviorSubject, combineLatest, map, Observable} from "rxjs";
import {EventsService} from "@app/views/uits/private/profile/events/events.service";
import {Profile} from "@app/shared/types/models/auth";
import {AuthService} from "@app/shared/services/auth.service";
import {IEvent} from "@app/views/uits/private/profile/events/events.model";
import {startTimeBeforeEndTimeValidator} from "@app/views/uits/private/profile/events/events.validators";
import {ru} from "date-fns/locale";
import {BsLocaleService} from "ngx-bootstrap/datepicker";
import {AlertService} from "@app/shared/services/alert.service";
import {TelegramService} from "@app/shared/services/telegram.service";

interface CalendarUserEventMeta {
  description?: string,
  assigned?: ({ pk: number, username: string, firstName: string, lastName: string } | Profile)[],
  owner?: number
}

@Component({
  selector: 'profile-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  locale = ru;


  viewDate: Date = new Date();
  today: Date = startOfDay(new Date());
  view: CalendarView = CalendarView.Day;
  modalRef: BsModalRef;
  modalConfirmRef: BsModalRef;
  modalMode: 'add' | 'edit' = 'add'
  formGroup: UntypedFormGroup;
  events$: BehaviorSubject<CalendarEvent<CalendarUserEventMeta>[]> = new BehaviorSubject([]);
  groupedEvents: BehaviorSubject<{ day: string, events: CalendarEvent[] }[]> = new BehaviorSubject([]);

  usersCanBeAssigned: BehaviorSubject<Profile[]> = new BehaviorSubject([]);


  @ViewChild("eventModal") eventModal: TemplateRef<any>;
  @ViewChild("notificationConfirm") notificationConfirm: TemplateRef<any>;

  confirmNotificationEventId = null;


  constructor(
    private modalService: BsModalService,
    private cdr: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private eventService: EventsService,
    private authService: AuthService,
    private localeService: BsLocaleService,
    private alertService: AlertService,
    private telegramService: TelegramService
  ) {
  }

  ngOnInit(): void {
    this.localeService.use('ru');
    this.formGroup = this.formBuilder.group({
      id: [null],
      title: ['', Validators.required],
      dateStartEnd: [[startOfDay(new Date()), endOfDay(new Date())], Validators.required],
      startTime: [startOfDay(new Date()),],
      endTime: [endOfDay(new Date()),],
      allDay: [false],
      color: ['#A33d7c', Validators.required],
      assignedUsers: [[], Validators.required],
      description: [''],
    }, {validators: [startTimeBeforeEndTimeValidator]});


    this.authService.listUsers({'is_teacher': true}).subscribe(users => {
      this.usersCanBeAssigned.next(users);
      this.checkStateForm();
      this.refreshEvents()
    })
  }

  checkStateForm() {
    const profile = this.authService.profile$.getValue();
    const assigned = this.formGroup.get('assignedUsers')
    const allDay = this.formGroup.get('allDay');
    if (profile.isTeacher && !profile.isSuperuser) {
      assigned.setValue([profile.pk]);
      assigned.disable()
    } else {
      assigned.enable()
    }

    this.onSwitchAllDay({checked: allDay.value})
  }

  onSwitchAllDay({checked}: { checked: boolean }) {
    console.log('switched', checked)
    const start = this.formGroup.get('startTime');
    const end = this.formGroup.get('endTime');

    if (checked) {
      start.disable();
      end.disable();
    } else {
      start.enable();
      end.enable();
    }
  }

  getDataFromForm(): IEvent {
    const rawData = this.formGroup.value
    const profile = this.authService.profile$.getValue();
    let start = new Date(rawData.dateStartEnd[0])
    let end = new Date(rawData.dateStartEnd[1])
    if (!rawData.allDay) {
      const startTime = rawData.startTime ?? startOfDay(start);
      const endTime = rawData.endTime ?? endOfDay(end);
      start.setHours(startTime.getHours(), startTime.getMinutes(), startTime.getSeconds());
      end.setHours(endTime.getHours(), endTime.getMinutes(), endTime.getSeconds());
    } else {
      start = startOfDay(start);
      end = startOfDay(end);
    }

    const data: IEvent = {
      id: rawData.id,
      name: rawData.title,
      description: rawData.description,
      startedAt: start.toISOString(),
      endedAt: end.toISOString(),
      allDay: rawData.allDay,
      assignedUsers: (profile.isTeacher && !profile.isSuperuser) ? [profile.pk] : rawData.assignedUsers,
      color: rawData.color,
      user: -1
    }

    return data
  }

  addEvent(): void {
    const data = this.getDataFromForm();
    console.log('DATA:', data)

    this.eventService.create(data).subscribe(ev => {
      console.log('response event', ev);
      this.refreshEvents();
      this.modalRef.hide();
      this.resetForm();
    })
  }

  editEvent() {
    const data = this.getDataFromForm();
    this.eventService.update(data.id, data).subscribe(ev => {
      console.log(ev)
      this.refreshEvents();

      this.modalRef.hide()
      this.resetForm()
    })
  }

  deleteEvent(id: number) {
    console.log(id)
    this.eventService.delete(id).subscribe(_ => {
      console.log(id, 'deleted')
      this.refreshEvents();
      this.modalRef.hide()
      this.resetForm()
    })
  }


  refreshEvents() {

    const teacherUsers = this.usersCanBeAssigned.getValue();

    this.eventService.read().subscribe((events: IEvent[]) => {
      this.events$.next(events.map(ev => {

        console.log(ev)
        return {
          id: ev.id,
          start: new Date(ev.startedAt),
          end: new Date(ev.endedAt),
          title: ev.name,
          allDay: ev.allDay,
          color: {
            primary: ev.color,
            secondary: '#f6f6f6'
          },
          meta: {
            description: ev.description,
            assigned: ev.assignedUsers.map(uId => {
              const founded = teacherUsers.filter(tU => tU.pk === uId)
              if (founded.length === 0) return {
                pk: uId,
                username: 'Пользователь ' + uId,
                firstName: '',
                lastName: ''
              }
              return founded[0]
            }),
            owner: ev.user
          }
        }
      }));

      const grouped = this.getEventDates();
      this.groupedEvents.next(grouped)
    })
  }


  setView(view: CalendarView) {
    this.view = view;
  }

  protected readonly CalendarView = CalendarView;

  openAddEventModal(template: TemplateRef<any>) {
    this.modalMode = 'add'
    this.modalRef = this.modalService.show(template, {id: 1});
    this.onModalClose()
  }

  openEditEventModal(template: TemplateRef<any>, id: string | number) {
    let data = this.events$.getValue().filter(elm => elm.id === id)[0]
    console.log("founded data", data)
    if (data.meta.owner !== this.authService.profile$.getValue().pk) {
      this.alertService.add("Вы не можете изменить это событие, т.к. его создатель не вы", 'warning');
      return
    }
    this.modalMode = 'edit'
    this.modalRef = this.modalService.show(template, {id: 1});
    this.formGroup.setValue({
      id: data.id,
      title: data.title,
      dateStartEnd: [data.start, data.end],
      startTime: data.start,
      endTime: data.end,
      color: data.color.primary,
      allDay: data.allDay,
      description: data.meta.description,
      assignedUsers: data.meta.assigned.map(u => u.pk)
    })
    this.onModalClose()
    this.checkStateForm();
  }

  getEvents(): Observable<CalendarEvent<any>[]> {

    return this.events$.pipe(map(
      events => {
        return events;
      }
    ))
  }

  getEventDates(): { day: string, events: CalendarEvent[] }[] {
    console.log('pizdec');
    const events = this.events$.getValue();

    const eventsByDay: { [key: string]: CalendarEvent[] } = {};

    events.forEach(event => {
      const days = eachDayOfInterval({
        start: event.start,
        end: event.end || event.start
      });

      days.forEach(day => {
        const dayKey = day.toISOString();
        if (!eventsByDay[dayKey]) {
          eventsByDay[dayKey] = [];
        }
        eventsByDay[dayKey].push(event);
      });
    });

    return Object.keys(eventsByDay).map(day => ({
      day,
      events: eventsByDay[day]
    })).sort((a, b) => {
      const dateA = parseISO(a.day);
      const dateB = parseISO(b.day);
      console.log(dateA, dateB)
      return dateA.getTime() - dateB.getTime();
    }).map(obj => ({day: format(parseISO(obj.day), "dd MMMM yyyy", {locale: this.locale}), events: obj.events}));
  }


  resetForm() {
    this.modalMode = 'add'
    this.formGroup.setValue({
      id: GenerateUid(10),
      title: '',
      dateStartEnd: [startOfDay(new Date()), endOfDay(new Date()),],
      startTime: '',
      endTime: '',
      color: '#000000',
      description: '',
      assignedUsers: [],
      allDay: false
    })

    this.checkStateForm();
  }


  onModalClose() {
    const _combine = combineLatest(
      this.modalRef.onHide,
      this.modalRef.onHidden
    ).subscribe(() => this.cdr.markForCheck());
    this.modalRef.onHide.subscribe((reason: string | any) => {
      this.resetForm()
    })
  }

  eventClicked($event: { event: CalendarEvent<any> | { id: number }, sourceEvent: any }) {
    console.log($event)
    this.openEditEventModal(this.eventModal, $event.event.id)
  }


  convertAssignedUsers(assignedUsers: CalendarUserEventMeta['assigned']) {
    return assignedUsers.map(user => (user.lastName) ? user.lastName + " " + user.firstName : user.username).join(', ')
  }

  openNotificationModalConfirm(id: number) {
    this.confirmNotificationEventId = id;
    this.modalConfirmRef = this.modalService.show(this.notificationConfirm, {id: 2, class: 'second '});
  }

  confirmNotifification() {
    this.telegramService.userEventNotify(this.confirmNotificationEventId).subscribe(ok => {
      console.log(ok)
      this.modalConfirmRef.hide();
    }, err => {
      this.alertService.add("Ошибка... Что то пошло не так", 'danger');
      this.modalConfirmRef.hide();
    })
  }

  declineNotifification() {
    this.confirmNotificationEventId = null;
    this.modalConfirmRef.hide();
  }


  filterUsersIfTeacher(users: Profile[]) {
    const profile = this.authService.profile$.getValue()
    const condition = profile.isTeacher && !profile.isSuperuser
    if (condition) {
      return users.filter(u => u.pk === profile.pk)
    } else {
      return users
    }
  }
}
