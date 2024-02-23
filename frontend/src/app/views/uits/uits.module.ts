import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UitsRoutingModule} from '@app/views/uits/uits-routing.module';
import {
  DissertationsComponent
} from '@app/views/uits/public/scientific-activity/post-graduate/dissertations/dissertations.component';
import {HomeComponent} from '@app/views/uits/public/home/home.component';
import {
  PracticesComponent
} from '@app/views/uits/public/scientific-activity/post-graduate/practices/practices.component';
import {
  SpecialitiesComponent
} from '@app/views/uits/public/scientific-activity/post-graduate/specialities/specialities.component';
import {AboutModule} from '@app/views/uits/public/about/about.module';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { LatestNewsComponent } from './public/home/components/latest-news/latest-news.component';
import {ModalModule} from "ngx-bootstrap/modal";
import {QuillEditorComponent} from "ngx-quill";
import {SharedModule} from "@app/shared/shared.module";


@NgModule({
  declarations: [
    HomeComponent,
    PracticesComponent,
    SpecialitiesComponent,
    DissertationsComponent,
    LatestNewsComponent,
  ],
    imports: [
        CommonModule,
        UitsRoutingModule,
        AboutModule,
        NgBootstrapFormValidationModule.forRoot(),
        ModalModule,
        QuillEditorComponent,
        SharedModule
    ],
  exports: [

  ]
})
export class UitsModule {
}
