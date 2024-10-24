import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {IEmployee} from "@app/shared/types/models/employee";
import {BehaviorSubject} from "rxjs";
import {EmployeeService} from "@app/views/uits/public/about/employee/employee.service";
import {AVATAR_DEFAULT_URL} from "@app/configs/app.config";
import {TeacherDegree, TeacherRank} from "@app/views/uits/public/about/employee/teachers/teachers.models";

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
  id: number;
  teacher$: BehaviorSubject<IEmployee>;
  
  get avatar() {
    const teacher = this.teacher$.getValue();
    return (!teacher.avatar) ? AVATAR_DEFAULT_URL : teacher.avatar;
  }
  
  get fullName() {
    const teacher = this.teacher$.getValue();
    return `${teacher.last_name} ${teacher.first_name} ${teacher.patronymic}`
  }
  
  get shortName() {
    const teacher = this.teacher$.getValue();
    
    return `${teacher.last_name} ${teacher.first_name[0]}. ${teacher.patronymic ? teacher.patronymic[0] + '.' : ''}`
  }
  
  get position() {
    return this.teacher$.getValue().position;
  }
  
  get degree() {
    return TeacherDegree[this.teacher$.getValue().degree]
  }
  
  get rank() {
    return TeacherRank[this.teacher$.getValue().rank]
  }
  
  get professional_experience() {
    return this.teacher$.getValue().professional_experience;
  }
  
  get experience() {
    return this.teacher$.getValue().experience;
  }
  
  get education() {
    return this.teacher$.getValue().education.split("\n");
  }
  
  get qualification() {
    return this.teacher$.getValue().qualification;
  }
  
  get bio(){
    return this.teacher$.getValue().bio;
  }
  
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
