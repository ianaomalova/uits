import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

interface LoginForm {
  username: string
  password: string
}

@Component({
  selector: 'uits-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  formGroup: FormGroup;
  showResult = false;
  showPassword = false;

  @Output() onSubmit: EventEmitter<LoginForm> = new EventEmitter<LoginForm>();

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      username: ['', [
        Validators.required
      ]],
      password: ['', [
        Validators.required
      ]]
    });
  }

  login() {
    console.log(this.formGroup);
    if (this.formGroup.valid){
      console.log(this.formGroup.valid)
      this.onSubmit.emit(this.formGroup.value);
    }
  }

  onShowPasswordClick() {
    this.showPassword = !this.showPassword;
  }

  onReset() {
    this.formGroup.reset();
  }
}
