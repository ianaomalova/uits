import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UitsRoutingModule} from '@app/views/uits/uits-routing.module';
import {HomeComponent} from '@app/views/uits/public/home/home.component';
import {AboutModule} from '@app/views/uits/public/about/about.module';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { LatestNewsComponent } from './public/home/components/latest-news/latest-news.component';
import {ModalModule} from "ngx-bootstrap/modal";
import {QuillEditorComponent} from "ngx-quill";
import {SharedModule} from "@app/shared/shared.module";
import { LatestAnnouncementsComponent } from './public/home/components/latest-announcements/latest-announcements.component';
import {LayoutModule} from "@app/layout/layout.module";


@NgModule({
  declarations: [
    HomeComponent,
    LatestNewsComponent,
    LatestAnnouncementsComponent,
  ],
  imports: [
    CommonModule,
    UitsRoutingModule,
    AboutModule,
    NgBootstrapFormValidationModule.forRoot(),
    ModalModule,
    QuillEditorComponent,
    SharedModule,
    LayoutModule
  ],
  exports: [

  ]
})
export class UitsModule {
}
