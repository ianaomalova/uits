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

const routes: Routes = [
  {
    path:'home', component: HomePageComponent, data:{
      title: 'Home', hidePageHeader: true
    }
  },
  {
    path:'news', component: NewsComponent
  },
  {
    path:'teachers', component: TeachersComponent
  },
  {
    path: 'uvp', component: UVPComponent
  },
  {
    path:'fieldOfStudy', component: FieldsOfStudyComponent
  },
  {
    path:'departmentDocuments', component: DepartmentComponent
  },
  {
    path: 'university', component: UniversityComponent
  },
  {
    path: 'contacts', component: ContactsComponent
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UitsRoutingModule {
}
