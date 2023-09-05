import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { LogoModule } from '@app/shared/components/logo/logo.module';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';

import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';

import { LoginComponent } from'./login/login.component';
import { LoginV2Component } from './login-v2/login-v2.component';
import { LoginV3Component } from './login-v3/login-v3.component';
import { RegisterComponent } from './register/register.component';
import { RegisterV2Component } from './register-v2/register-v2.component';
import { RegisterV3Component } from './register-v3/register-v3.component';

@NgModule({
    declarations: [ 
        LoginComponent,
        RegisterFormComponent,
        LoginFormComponent,
        LoginV2Component,
        LoginV3Component,
        RegisterComponent,
        RegisterV2Component,
        RegisterV3Component
    ],
    imports: [
        AuthRoutingModule,
        SharedModule,
        LogoModule,
        LogoModule,
        NgBootstrapFormValidationModule.forRoot(),
    ]
})
export class AuthModule { }
