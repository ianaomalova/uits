import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NewsComponent} from '@app/views/uits/public/about/news/news.component';
import {TeachersComponent} from '@app/views/uits/public/about/employee/teachers/teachers.component';
import {UVPComponent} from '@app/views/uits/public/about/employee/uvp/uvp.component';
import {FieldsOfStudyComponent} from '@app/views/uits/public/about/fields-of-study/fields-of-study.component';
import {DepartmentComponent} from '@app/views/uits/public/about/documents/department/department.component';
import {UniversityComponent} from '@app/views/uits/public/about/documents/university/university.component';
import {ContactsComponent} from '@app/views/uits/public/about/contacts/contacts.component';
import {PostComponent} from '@app/views/uits/public/about/news/post/post.component';
import {
  AnnouncementPostComponent
} from "@app/views/uits/public/about/announcements/announcement-post/announcement-post.component";
import {AnnouncementsComponent} from "@app/views/uits/public/about/announcements/announcements.component";
import {TeacherComponent} from "@app/views/uits/public/about/employee/teachers/teacher/teacher.component";

const routes: Routes = [
  {
    path: 'news', component: NewsComponent
  },
  {
    path: 'news/:id', component: PostComponent
  },
  {
    path: 'announcements', component: AnnouncementsComponent
  },
  {
    path: 'announcements/:id', component: AnnouncementPostComponent
  },
  {
    path: 'employee/teachers', component: TeachersComponent
  },
  {
    path: 'employee/teachers/:id', component: TeacherComponent
  },
  {
    path: 'employee/uvp', component: UVPComponent
  },
  {
    path: 'fields-of-study', component: FieldsOfStudyComponent
  },
  {
    path: 'documents/department', component: DepartmentComponent
  },
  {
    path: 'documents/university', component: UniversityComponent
  },
  {
    path: 'contacts', component: ContactsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule {
}
