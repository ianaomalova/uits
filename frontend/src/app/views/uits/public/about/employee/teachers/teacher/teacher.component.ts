import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {IEmployee} from "@app/shared/types/models/employee";
import {BehaviorSubject} from "rxjs";
import {EmployeeService} from "@app/views/uits/public/about/employee/employee.service";
import {AVATAR_DEFAULT_URL} from "@app/configs/app.config";

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
  id: number;
  teacher$: BehaviorSubject<IEmployee>;

  constructor(private route: ActivatedRoute, private employeeService: EmployeeService) {
    this.teacher$ = new BehaviorSubject(null);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.employeeService.retrieveTeacher(this.id).subscribe(teacher => {
        this.teacher$.next(teacher);
      })
    })
  }

  protected readonly AVATAR_DEFAULT_URL = AVATAR_DEFAULT_URL;
}
