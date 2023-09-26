import { Component, OnInit } from '@angular/core';
import {EmployeeService} from "@app/views/uits/public/about/employee/employee.service";
import {IEmployee} from "@app/shared/types/models/employee";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {
  showDetails: boolean = false;

  constructor(private employeeService: EmployeeService) {

  }

  ngOnInit(): void {
    this.getAllTeachers();
  }
  getAllTeachers() {
     this.employeeService.getAllTeachers().subscribe();
  }

  get teacher$ () {
    return this.employeeService.teacher$;
  }

  printInfo(employee: IEmployee) {
    console.log(employee);
  }
}
