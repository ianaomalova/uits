import {ChangeDetectorRef, Component, OnInit, TemplateRef} from '@angular/core';
import {CalendarEvent, CalendarView} from "angular-calendar";
import {FormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {endOfDay, startOfDay} from "date-fns";
import {GenerateUid} from "@app/shared/utils/GenerateUid";
import {combineLatest} from "rxjs";

interface CalendarUserEventMeta {
  description?: string
}


const colors: any = {
  red: {
    primary: '#ef2733',
    secondary: '#fde9eb',
  },
  blue: {
    primary: '#3d5ef8',
    secondary: '#eef1fe',
  },
  yellow: {
    primary: '#ff8911',
    secondary: '#fff4ea',
  },
};

const colorsSelection: any[] = [
  {
    color: colors.red
  },
  {
    color: colors.blue
  },
  {
    color: colors.yellow
  }
]

@Component({
  selector: 'profile-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Day;
  modalRef: BsModalRef;
  modalMode: 'add' | 'edit' = 'add'
  formGroup: UntypedFormGroup;
  events: CalendarEvent<CalendarUserEventMeta>[] = []

  colorsSelection: string[] = []


  constructor(
    private modalService: BsModalService,
    private cdr: ChangeDetectorRef,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    for (const key in colors) {
      if (Object.prototype.hasOwnProperty.call(colors, key)) {
        this.colorsSelection.push(key)
      }
    }
    this.formGroup = this.formBuilder.group({
      id: [GenerateUid(10)],
      title: ['', Validators.required],
      start: [startOfDay(new Date()), Validators.required],
      end: [endOfDay(new Date()), Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      color: [this.colorsSelection[0], Validators.required],
      description: [''],
    });
  }


  setView(view: CalendarView) {
    this.view = view;
  }

  protected readonly CalendarView = CalendarView;

  openAddEventModal(template: TemplateRef<any>) {
    this.modalMode = 'add'
    this.modalRef = this.modalService.show(template);
    this.onModalClose()
  }

  openEditEventModal(template: TemplateRef<any>, id: string | number) {
    this.modalMode = 'edit'
    this.modalRef = this.modalService.show(template);
    let data = this.events.filter(elm => elm.id === id)[0]
    let color : string
    for (const key in colors) {
      if (Object.prototype.hasOwnProperty.call(colors, key)) {
        const element = colors[key];
        if(element.primary === data.color.primary) {
          color = key
        }
      }
    }
    this.formGroup.setValue({
      id: data.id,
      title: data.title,
      start: data.start,
      end: data.end,
      color: color,
      description: data.meta.description
    })
    this.onModalClose()
  }

  getColorDetail(val: string) {
    return colors[val]
  }


  addEvent(): void {
    let data = this.formGroup.value
    const dataAddon = this.eventAddOn(data.color)
    data = {...data, ...dataAddon}
    this.events = [
      ...this.events,
      data
    ];
    this.modalRef.hide()
    this.resetForm()
  }

  editEvent() {
    let data = this.formGroup.value
    const dataAddon = this.eventAddOn(data.color)
    data = {...data, ...dataAddon}
    this.events = this.events.map(event => {
      if (event.id === data.id) {
        event = data
      }
      return event
    })
    this.modalRef.hide()
    this.resetForm()
  }

  deleteEvent(id: string | number) {
    this.events = this.events.filter((event) => event.id !== id);
  }

  resetForm() {
    this.modalMode = 'add'
    this.formGroup.reset();
    this.formGroup.setValue({
      id: GenerateUid(10),
      title: '',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: this.colorsSelection[0],
      description: ''
    })
  }

  eventAddOn(color: string) {
    return {
      color: this.getColorDetail(color),
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
    }
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
}
