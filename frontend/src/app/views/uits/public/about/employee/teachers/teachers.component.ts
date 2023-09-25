import { Component, OnInit } from '@angular/core';
import {EmployeeService} from "@app/views/uits/public/about/employee/employee.service";

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {
   employees = []

  constructor(private employeeService: EmployeeService) {

  }

  ngOnInit(): void {
    this.employeeService.getAllEmployees().subscribe(data => {
      console.log(data);
    })
  }

}
