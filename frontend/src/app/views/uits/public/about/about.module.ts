import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AboutRoutingModule} from './about-routing.module';
import {PostActionsComponent} from './news/post-actions/post-actions.component';
import {CrudActionComponent} from "@app/views/uits/public/about/crud-action/crud-action.component";
import {NewsComponent} from '@app/views/uits/public/about/news/news.component';
import {FieldsOfStudyComponent} from '@app/views/uits/public/about/fields-of-study/fields-of-study.component';
import {TeachersComponent} from '@app/views/uits/public/about/employee/teachers/teachers.component';
import {UVPComponent} from '@app/views/uits/public/about/employee/uvp/uvp.component';
import {DepartmentComponent} from '@app/views/uits/public/about/documents/department/department.component';
import {UniversityComponent} from '@app/views/uits/public/about/documents/university/university.component';
import {ContactsComponent} from '@app/views/uits/public/about/contacts/contacts.component';
import {QuillConfigModule, QuillEditorComponent, QuillViewComponent} from 'ngx-quill';
import {ModalModule} from "ngx-bootstrap/modal";
import {modules} from "@app/configs/quill.config";
import {SharedModule} from "@app/shared/shared.module";
import {NgBootstrapFormValidationModule} from "ng-bootstrap-form-validation";


@NgModule({
    declarations: [
        ContactsComponent,
        DepartmentComponent,
        UniversityComponent,
        PostActionsComponent,
        NewsComponent,
        FieldsOfStudyComponent,
        TeachersComponent,
        UVPComponent,
        CrudActionComponent,
    ],
    exports: [
        PostActionsComponent,
        CrudActionComponent
    ],
  imports: [
    CommonModule,
    AboutRoutingModule,
    QuillViewComponent,
    ModalModule,
    QuillEditorComponent,
    QuillConfigModule.forRoot({
      modules
    }),
    SharedModule,
    NgBootstrapFormValidationModule
  ]
})
export class AboutModule {
}
