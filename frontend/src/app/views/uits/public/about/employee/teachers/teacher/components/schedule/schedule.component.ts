import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {IEmployee} from "@app/shared/types/models/employee";
import {CalendarEvent} from "angular-calendar";
import {EmployeeService} from "@app/views/uits/public/about/employee/employee.service";
import {BehaviorSubject} from "rxjs";
import {Schedule} from "@app/shared/types/models/schedule";
import {AuthService} from "@app/shared/services/auth.service";
import {AlertService} from "@app/shared/services/alert.service";


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  @Input() teacher: IEmployee;

  selectedScheduleFile: File = null;

  schedule: BehaviorSubject<Schedule>;

  viewDate: Date;

  get profile() {
    return this.authService.profile$
  }

  constructor(private employeeService: EmployeeService, private authService: AuthService, private alertService: AlertService) {
    this.schedule = new BehaviorSubject<Schedule>(null);

    this.setViewDate();
  }

  ngOnInit(): void {
    this.refreshSchedule();
  }

  refreshSchedule() {
    this.employeeService.retrieveSchedule(this.teacher.id).subscribe(schedule => {
      console.log(schedule.days)
      this.schedule.next(schedule);
    })
  }

  setViewDate() {
    this.viewDate = new Date();
  }

  getEvents(): CalendarEvent[] {
    const schedule = this.schedule.getValue();
    if (!schedule) return [];

    const events = schedule.toCalendarEvents();
    console.log("CalendarEvents", events)
    return events;
  }

  onScheduleFileSelected($event: Event) {
    // @ts-ignore
    this.selectedScheduleFile = <File>$event.target.files[0];
    console.log(this.selectedScheduleFile)

    this.employeeService.importSchedule(this.teacher.id, this.selectedScheduleFile).subscribe(
      response => {
        console.log(response)
        this.alertService.add("Расписание успешно импортировано");
        this.refreshSchedule()
      }, error => {
        console.log(error)
        this.alertService.add("Ошибка. Возможно неверный формат файла.", 'danger')
      }
    )

    // $event.target.clear()
  }
}
