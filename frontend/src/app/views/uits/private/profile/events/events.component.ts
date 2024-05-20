import {ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {CalendarEvent, CalendarView} from "angular-calendar";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {eachDayOfInterval, endOfDay, format, parseISO, startOfDay} from "date-fns";
import {BehaviorSubject, combineLatest, debounceTime, Observable} from "rxjs";
import {EventsService} from "@app/views/uits/private/profile/events/events.service";
import {Profile} from "@app/shared/types/models/auth";
import {AuthService} from "@app/shared/services/auth.service";
import {CalendarUserEventMeta, EditEventFormGroup, IEvent} from "@app/views/uits/private/profile/events/events.model";
import {startTimeBeforeEndTimeValidator} from "@app/views/uits/private/profile/events/events.validators";
import {ru} from "date-fns/locale";
import {BsLocaleService} from "ngx-bootstrap/datepicker";
import {AlertService} from "@app/shared/services/alert.service";
import {TelegramService} from "@app/shared/services/telegram.service";
import {
  DEFAULT_EVENT_COLOR,
  getDefaultDateStartEnd,
  getDefaultEndTime,
  getDefaultStartTime
} from "@app/views/uits/private/profile/events/events.config";


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

  // create/edit form
  formGroup: FormGroup<EditEventFormGroup>;
  // for calendar view
  events$: BehaviorSubject<CalendarEvent<CalendarUserEventMeta>[]> = new BehaviorSubject([]);
  // for list view
  groupedEvents: BehaviorSubject<{ day: string, events: CalendarEvent[] }[]> = new BehaviorSubject([]);
  // users-teachers. only teachers can be assigned to event
  usersCanBeAssigned: BehaviorSubject<Profile[]> = new BehaviorSubject([]);

  // create/edit modal
  modalRef: BsModalRef;
  // confirm notify assigned users of event
  modalNotifyConfirmRef: BsModalRef;
  // mode. creating or editing
  modalMode: 'add' | 'edit' = 'add'
  @ViewChild("eventModal") eventModal: TemplateRef<any>;
  @ViewChild("notificationConfirm") notificationConfirm: TemplateRef<any>;
  // event id chosen for notification modal
  confirmNotificationEventId = null;


  getEvents(): Observable<CalendarEvent<CalendarUserEventMeta>[]> {
    return this.events$;
  }

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
    this.initEditForm();

    // check if assigned users form state is correct
    this.formGroup.get('assignedUsers').valueChanges.pipe(debounceTime(300))
      .subscribe(_ => this.checkAssignedUsersStateForm())

    // retrieve users-teachers
    this.authService.listUsers({'is_teacher': true}).subscribe(users => {
      this.usersCanBeAssigned.next(users);
      this.checkStateForm();
      this.refreshEvents()
    })

    //
    this.formGroup.get('assignedUsersSelectAll').valueChanges.pipe(
      debounceTime(300)
    ).subscribe(arr => {
      console.log('changed checkbox', arr);
      const users = this.usersCanBeAssigned.getValue();
      if (users.length === 0) return;
      const assignedUsersControl = this.formGroup.get('assignedUsers')
      // @ts-ignore TODO: this is not right
      if (arr.length) {
        assignedUsersControl.setValue(users.map(u => u.pk));
      } else if (assignedUsersControl.value.length === users.length) {
        assignedUsersControl.setValue([]);
      }
    })
  }

  initEditForm() {
    this.formGroup = this.formBuilder.group({
      id: [null],
      title: ['', Validators.required],
      dateStartEnd: [getDefaultDateStartEnd(), Validators.required],
      startTime: [getDefaultStartTime(),],
      endTime: [getDefaultEndTime(),],
      allDay: [false],
      color: [DEFAULT_EVENT_COLOR, Validators.required],
      assignedUsers: [[], Validators.required],
      assignedUsersSelectAll: [false],
      description: [''],
    }, {validators: [startTimeBeforeEndTimeValidator]});
  }

  checkStateForm() {
    this.checkAssignedUsersStateForm();

    const allDay = this.formGroup.get('allDay');
    this.onSwitchAllDayControl({checked: allDay.value})
  }

  checkAssignedUsersStateForm() {
    const profile = this.authService.profile$.getValue();
    const assigned = this.formGroup.get('assignedUsers')
    if (this.isTeacherProfile(profile)) {
      if (!(assigned.value.length === 1 && assigned.value[0] === profile.pk)) {
        assigned.setValue([profile.pk]);
      }
      if (!assigned.disabled) {
        assigned.disable()
      }
    } else {
      if (!assigned.enabled) {
        assigned.enable()
      }
    }
  }

  onSwitchAllDayControl({checked}: { checked: boolean }) {
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
      assignedUsers: (this.isTeacherProfile(profile)) ? [profile.pk] : rawData.assignedUsers,
      color: rawData.color,
      user: -1
    }

    return data
  }


  resetForm() {
    this.modalMode = 'add'
    this.formGroup.setValue({
      id: null,
      title: '',
      dateStartEnd: getDefaultDateStartEnd(),
      startTime: getDefaultStartTime(),
      endTime: getDefaultEndTime(),
      color: DEFAULT_EVENT_COLOR,
      description: '',
      assignedUsers: [],
      assignedUsersSelectAll: false,
      allDay: false
    })

    this.checkStateForm();
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

        return {
          id: ev.id,
          start: new Date(ev.startedAt),
          end: new Date(ev.endedAt),
          title: ev.name,
          allDay: ev.allDay,
          color: {
            primary: ev.color,
            secondary: '#e4eef5'
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
      assignedUsers: data.meta.assigned.map(u => u.pk),
      assignedUsersSelectAll: false
    })
    this.onModalClose()
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

  getEventDates(): { day: string, events: CalendarEvent[] }[] {
    const events = this.events$.getValue();
    return this.eventService.groupEventsByDate(events, this.locale);
  }

  eventClicked($event: { event: CalendarEvent<CalendarUserEventMeta> | { id: number }, sourceEvent: any }) {
    this.openEditEventModal(this.eventModal, $event.event.id)
  }

  convertAssignedUsers(assignedUsers: CalendarUserEventMeta['assigned']) {
    return assignedUsers.map(user => (user.lastName) ? user.lastName + " " + user.firstName : user.username).join(', ')
  }

  openNotificationModalConfirm(id: number) {
    this.confirmNotificationEventId = id;
    this.modalNotifyConfirmRef = this.modalService.show(this.notificationConfirm, {id: 2, class: 'second '});
  }

  confirmNotifification() {
    this.telegramService.userEventNotify(this.confirmNotificationEventId).subscribe(ok => {
      this.alertService.add("Уведомление отправлено", 'success');
      this.modalNotifyConfirmRef.hide();
    }, err => {
      this.alertService.add("Ошибка... Что то пошло не так", 'danger');
      this.modalNotifyConfirmRef.hide();
    })
  }

  declineNotifification() {
    this.confirmNotificationEventId = null;
    this.modalNotifyConfirmRef.hide();
  }


  filterUsersIfTeacher(users: Profile[]) {
    const profile = this.authService.profile$.getValue()
    if (this.isTeacherProfile(profile)) {
      return users.filter(u => u.pk === profile.pk)
    } else {
      return users
    }
  }

  isTeacher() {
    const profile = this.authService.profile$.getValue()
    return this.isTeacherProfile(profile)
  }

  isTeacherProfile(profile: Profile) {
    return profile.isTeacher && !profile.isSuperuser;
  }
}
