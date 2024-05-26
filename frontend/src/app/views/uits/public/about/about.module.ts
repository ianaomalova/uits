import {NgModule} from '@angular/core';
import {CommonModule, formatDate, NgOptimizedImage} from '@angular/common';

import {AboutRoutingModule} from './about-routing.module';
import {PostActionsComponent} from './news/post-actions/post-actions.component';
import {NewsComponent} from '@app/views/uits/public/about/news/news.component';
import {FieldsOfStudyComponent} from '@app/views/uits/public/about/fields-of-study/fields-of-study.component';
import {TeachersComponent} from '@app/views/uits/public/about/employee/teachers/teachers.component';
import {UVPComponent} from '@app/views/uits/public/about/employee/uvp/uvp.component';
import {DepartmentComponent} from '@app/views/uits/public/about/documents/department/department.component';
import {UniversityComponent} from '@app/views/uits/public/about/documents/university/university.component';
import {ContactsComponent} from '@app/views/uits/public/about/contacts/contacts.component';
import {QuillConfigModule, QuillEditorComponent, QuillViewComponent} from 'ngx-quill';
import {ModalModule} from 'ngx-bootstrap/modal';
import {modules} from '@app/configs/quill.config';
import {SharedModule} from '@app/shared/shared.module';
import {NgBootstrapFormValidationModule} from 'ng-bootstrap-form-validation';
import {CrudActionModule} from "@app/shared/components/crud-action/crud-action.module";
import {PostComponent} from './news/post/post.component';
import {DateFnsModule} from "ngx-date-fns";
import {PostContentComponent} from './news/post/components/post-content/post-content.component';
import {PostInfoComponent} from './news/post/components/post-info/post-info.component';
import {AnnouncementsComponent} from './announcements/announcements.component';
import {AnnouncementPostComponent} from './announcements/announcement-post/announcement-post.component';
import {NgSelectModule} from "@ng-select/ng-select";
import {TeacherComponent} from './employee/teachers/teacher/teacher.component';
import {
  CalendarDateFormatter,
  CalendarModule,
  CalendarNativeDateFormatter,
  DateAdapter,
  DateFormatterParams
} from "angular-calendar";
import {adapterFactory} from "angular-calendar/date-adapters/date-fns";
import {ScheduleComponent} from './employee/teachers/teacher/components/schedule/schedule.component';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import {AngularMarkdownEditorModule} from "angular-markdown-editor";
import {MarkdownModule} from "ngx-markdown";
import {LayoutModule} from "@app/layout/layout.module";
import {CreateButtonComponent} from "@app/shared/components/create-button/create-button.component";
import {PaginationModule} from "ngx-bootstrap/pagination";

registerLocaleData(localeRu);


class CustomDateFormatter extends CalendarNativeDateFormatter {

  public dayViewHour({date, locale}: DateFormatterParams): string {
    // change this to return a different date format
    // return new Intl.DateTimeFormat(locale).format(date);
    return formatDate(date, 'HH:mm', locale);
  }

  public weekViewHour({ date, locale }: DateFormatterParams): string {
    return this.dayViewHour({ date, locale });
  }

}

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
    PostComponent,
    PostContentComponent,
    PostInfoComponent,
    AnnouncementsComponent,
    AnnouncementPostComponent,
    TeacherComponent,
    ScheduleComponent,
  ],
  exports: [
    PostActionsComponent,
    NewsComponent,
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
        NgBootstrapFormValidationModule,
        CrudActionModule,
        DateFnsModule,
        NgSelectModule,
        NgOptimizedImage,
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory
        }),
        AngularMarkdownEditorModule.forRoot({iconlibrary: 'fa'}),
        MarkdownModule.forRoot(),
        LayoutModule,
        CreateButtonComponent,
        PaginationModule,
    ],
  providers: [
    {provide: CalendarDateFormatter, useClass: CustomDateFormatter}
  ]
})
export class AboutModule {
}
