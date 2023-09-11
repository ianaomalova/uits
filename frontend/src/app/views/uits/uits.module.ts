import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UitsRoutingModule} from '@app/views/uits/uits-routing.module';
import {
  DissertationsComponent
} from '@app/views/uits/public/scientific-activity/post-graduate/dissertations/dissertations.component';
import {HomeComponent} from '@app/views/uits/public/home/home.component';
import {NewsComponent} from '@app/views/uits/public/about/news/news.component';
import {TeachersComponent} from '@app/views/uits/public/about/employee/teachers/teachers.component';
import {UVPComponent} from '@app/views/uits/public/about/employee/uvp/uvp.component';
import {FieldsOfStudyComponent} from '@app/views/uits/public/about/fields-of-study/fields-of-study.component';
import {DepartmentComponent} from '@app/views/uits/public/about/documents/department/department.component';
import {UniversityComponent} from '@app/views/uits/public/about/documents/university/university.component';
import {ContactsComponent} from '@app/views/uits/public/about/contacts/contacts.component';
import {
  PracticesComponent
} from '@app/views/uits/public/scientific-activity/post-graduate/practices/practices.component';
import {
  SpecialitiesComponent
} from '@app/views/uits/public/scientific-activity/post-graduate/specialities/specialities.component';


@NgModule({
  declarations: [
    HomeComponent,
    NewsComponent,
    TeachersComponent,
    UVPComponent,
    FieldsOfStudyComponent,
    DepartmentComponent,
    UniversityComponent,
    ContactsComponent,
    PracticesComponent,
    SpecialitiesComponent,
    DissertationsComponent
  ],
  imports: [
    CommonModule,
    UitsRoutingModule
  ]
})
export class UitsModule {
}
