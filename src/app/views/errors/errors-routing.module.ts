import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Error1Component } from './error-1/error-1.component';
import { Error2Component } from './error-2/error-2.component';

const routes: Routes = [
    {
        path: 'error-1',
        component: Error1Component 
    },
    {
        path: 'error-2',
        component: Error2Component 
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ErrorsRoutingModule { }
