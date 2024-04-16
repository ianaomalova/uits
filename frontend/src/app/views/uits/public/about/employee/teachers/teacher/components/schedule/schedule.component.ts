import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {IEmployee} from "@app/shared/types/models/employee";
import {CalendarEvent} from "angular-calendar";
import {EmployeeService} from "@app/views/uits/public/about/employee/employee.service";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  @Input() teacher: IEmployee;

  selectedScheduleFile: File = null;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
  }

  getViewDate() {
    const now = new Date();

    return now;
  }

  getEvents(): CalendarEvent[] {
    return [];
  }

  onScheduleFileSelected($event: Event) {
    // @ts-ignore
    this.selectedScheduleFile = <File>$event.target.files[0];
    console.log(this.selectedScheduleFile)

    this.employeeService.importSchedule(this.teacher.id, this.selectedScheduleFile).subscribe(
      response => {
        console.log(response)
      }
    )

    // $event.target.clear()
  }
}
