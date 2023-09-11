import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { LoginFormComponent } from './login/components/login-form/login-form.component';
import {LogoModule} from "@app/shared/components/logo/logo.module";
import {NgBootstrapFormValidationModule} from "ng-bootstrap-form-validation";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "@app/shared/shared.module";


@NgModule({
  declarations: [
    LoginComponent,
    LoginFormComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    LogoModule,
    SharedModule,
  ]
})
export class AuthModule { }
