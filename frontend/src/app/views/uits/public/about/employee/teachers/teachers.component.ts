import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {EmployeeService} from "@app/views/uits/public/about/employee/employee.service";
import {IEmployee} from "@app/shared/types/models/employee";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {ModalDirection} from "@app/shared/types/modal-direction";
import {string} from "@amcharts/amcharts4/core";
import {FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {ErrorMessage} from "ng-bootstrap-form-validation";

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
  @ViewChild('createTeacherModal') createTeacherModal;

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
              private formBuilder: UntypedFormBuilder) {
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

  printInfo(employee: IEmployee) {
    console.log(employee);
  }

  onCreateTeacher() {
    this.openModal(this.createTeacherModal);
  }

  onEditPost(id: any) {
    console.log('On Edit Emit', id);
  }

  onDeletePost(id: any) {
    console.log('On Delete Emit', id);
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
}
