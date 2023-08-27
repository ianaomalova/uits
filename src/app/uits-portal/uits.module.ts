import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './moduls/public/views/home-page/home-page.component';
import {UitsRoutingModule} from '@app/uits-portal/uits-routing.module';
import { NewsComponent } from '@app/uits-portal/moduls/public/views/AboutPage/news/news.component';
import { TeachersComponent } from '@app/uits-portal/moduls/public/views/AboutPage/Employee/teachers/teachers.component';
import { UVPComponent } from '@app/uits-portal/moduls/public/views/AboutPage/Employee/uvp/uvp.component';
import { FieldsOfStudyComponent } from '@app/uits-portal/moduls/public/views/AboutPage/fields-of-study/fields-of-study.component';
import { DepartmentComponent } from '@app/uits-portal/moduls/public/views/AboutPage/Documents/department/department.component';
import { UniversityComponent } from '@app/uits-portal/moduls/public/views/AboutPage/Documents/university/university.component';
import { ContactsComponent } from './moduls/public/views/AboutPage/contacts/contacts.component';
import { PracticesComponent } from '@app/uits-portal/moduls/public/views/scientific-activity/post-graduate/practices/practices.component';
import { SpecialitiesComponent } from '@app/uits-portal/moduls/public/views/scientific-activity/post-graduate/specialities/specialities.component';
import { DissertationsComponent } from '@app/uits-portal/moduls/public/views/scientific-activity/post-graduate/dissertations/dissertations.component';


@NgModule({
  declarations: [
    HomePageComponent,
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
export class UitsModule { }
