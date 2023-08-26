import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from'./login/login.component';
import { LoginV2Component } from './login-v2/login-v2.component';
import { LoginV3Component } from './login-v3/login-v3.component';
import { RegisterComponent } from './register/register.component';
import { RegisterV2Component } from './register-v2/register-v2.component';
import { RegisterV3Component } from './register-v3/register-v3.component';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent 
    },
    {
        path: 'login/v2',
        component: LoginV2Component 
    },
    {
        path: 'login/v3',
        component: LoginV3Component 
    },
    {
        path: 'register',
        component: RegisterComponent 
    },
    {
        path: 'register/v2',
        component: RegisterV2Component 
    },
    {
        path: 'register/v3',
        component: RegisterV3Component 
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthRoutingModule { }
