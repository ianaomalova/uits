import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {EmployeeService} from "@app/views/uits/public/about/employee/employee.service";
import {IEmployee} from "@app/shared/types/models/employee";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {ModalDirection} from "@app/shared/types/modal-direction";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {ErrorMessage} from "ng-bootstrap-form-validation";
import {TeacherRank} from "@app/views/uits/public/about/employee/teachers/teachers.models";
import {Router} from "@angular/router";
import {PagesConfig} from "@app/configs/pages.config";

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent implements OnInit {
  teacherModel = {
    first_name: '',
    last_name: '',
    patronymic: '',
    degree: '',
    rank: '',
    position: '',
    bio: ''
  }
  createTeacherForm: UntypedFormGroup
  modalRef: BsModalRef;
  chosenTeacher: IEmployee;
  @ViewChild('createTeacherModal') createTeacherModal;
  @ViewChild('deleteTeacherModal') deleteTeacherModal;

  customLastNameMessages: ErrorMessage[] = [
    {
      error: 'required',
      format: (label, error) => `Поле ${label} обязательно для заполнения`
    }
  ];

  customFirstNameMessages: ErrorMessage[] = [
    {
      error: 'required',
      format: (label, error) => `Поле ${label} обязательно для заполнения`
    }
  ];
  customPositionMessages: ErrorMessage[] = [
    {
      error: 'required',
      format: (label, error) => `Поле ${label} обязательно для заполнения`
    }
  ];

  constructor(private employeeService: EmployeeService,
              private modalService: BsModalService,
              private formBuilder: UntypedFormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getAllTeachers();
    this._createForm();
  }

  getAllTeachers() {
    this.employeeService.getAllTeachers().subscribe();
  }

  get teacher$() {
    return this.employeeService.teacher$;
  }

  teacher(id: number) {
    return this.teacher$.getValue().find(p => p.id === id);
  }

  onCreateTeacher() {
    this.openModal(this.createTeacherModal);
  }

  onEditPost(id: any) {
    console.log('On Edit Emit', id);
  }

  onDeleteTeacher(id: number) {
    this.chosenTeacher = this.teacher(id);
    this.openModal(this.deleteTeacherModal);
  }

  deleteTeacherConfirm() {
    this.employeeService.deleteTeacher(this.chosenTeacher.id).subscribe(data => {
      console.log(data);
      this.getAllTeachers();
      this.modalRef.hide();
    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, Object.assign({}, {class: `${ModalDirection.Up}`}));
  }

  private _createForm() {
    this.createTeacherForm = this.formBuilder.group({
      last_name: ['', [Validators.required]],
      first_name: ['', [Validators.required]],
      patronymic: [''],
      position: ['', Validators.required],
      degree: [''],
      rank: [''],
      bio: ['']
    });
  }

  onSubmit() {
    if (this.createTeacherForm.valid) {
      const formData = this.createTeacherForm.value;
      this.employeeService.createTeacher(formData).subscribe(res => {
        this.getAllTeachers();
      });
    }
    this.createTeacherForm.reset();
    this.modalRef.hide();
  }

  onReset() {
    this.createTeacherForm.reset();
  }

  closeForm() {
    this.onReset();
    this.modalRef.hide();
  }

  basePositions: TeacherRank[] = [
    TeacherRank.Assistant, TeacherRank.Teacher, TeacherRank.HighTeacher, TeacherRank.Reader, TeacherRank.Proffesor
  ];

  moveToEmployee(id: number) {
    this.router.navigate([PagesConfig.about.employee.teachers, id]);
  }
}
