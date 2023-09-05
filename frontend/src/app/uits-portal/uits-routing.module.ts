import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from '@app/uits-portal/moduls/public/views/home-page/home-page.component';
import {NewsComponent} from '@app/uits-portal/moduls/public/views/AboutPage/news/news.component';
import {TeachersComponent} from '@app/uits-portal/moduls/public/views/AboutPage/Employee/teachers/teachers.component';
import {UVPComponent} from '@app/uits-portal/moduls/public/views/AboutPage/Employee/uvp/uvp.component';
import {FieldsOfStudyComponent} from '@app/uits-portal/moduls/public/views/AboutPage/fields-of-study/fields-of-study.component';
import {DepartmentComponent} from '@app/uits-portal/moduls/public/views/AboutPage/Documents/department/department.component';
import {UniversityComponent} from '@app/uits-portal/moduls/public/views/AboutPage/Documents/university/university.component';
import {ContactsComponent} from '@app/uits-portal/moduls/public/views/AboutPage/contacts/contacts.component';
import {PracticesComponent} from '@app/uits-portal/moduls/public/views/scientific-activity/post-graduate/practices/practices.component';

const routes: Routes = [
  {
    path:'main', component: HomePageComponent
  },
  {
    path:'about/news', component: NewsComponent
  },
  {
    path:'about/employee/teachers', component: TeachersComponent
  },
  {
    path: 'about/employee/uvp', component: UVPComponent
  },
  {
    path:'about/fieldsOfStudy', component: FieldsOfStudyComponent
  },
  {
    path:'about/documents/departmentDocuments', component: DepartmentComponent
  },
  {
    path: 'about/documents/university', component: UniversityComponent
  },
  {
    path: 'about/contacts', component: ContactsComponent
  },
  {
    path:'scientificActivity/postGraduate/practices', component: PracticesComponent
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UitsRoutingModule {
}
