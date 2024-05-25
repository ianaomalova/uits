import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScientificActivitiesRoutingModule } from './scientific-activities-routing.module';
import { PostgraduatePracticesComponent } from '@app/views/uits/public/scientific-activities/postgraduate/old/postgraduate-practices/postgraduate-practices.component';
import { PostgraduateSpecialtiesComponent } from '@app/views/uits/public/scientific-activities/postgraduate/old/postgraduate-specialties/postgraduate-specialties.component';
import { PostgraduateDissertationsComponent } from '@app/views/uits/public/scientific-activities/postgraduate/old/postgraduate-dissertations/postgraduate-dissertations.component';
import { PublicationsComponent } from '@app/views/uits/public/scientific-activities/deprecated/publications/publications.component';
import { ScientificWorkComponent } from '@app/views/uits/public/scientific-activities/deprecated/scientific-work/scientific-work.component';
import { ConferencesComponent } from '@app/views/uits/public/scientific-activities/deprecated/conferences/conferences.component';
import {LayoutModule} from "@app/layout/layout.module";
import { PostgraduateInfoComponent } from './postgraduate/postgraduate-info/postgraduate-info.component';


@NgModule({
  declarations: [
    PostgraduatePracticesComponent,
    PostgraduateSpecialtiesComponent,
    PostgraduateDissertationsComponent,
    PublicationsComponent,
    ScientificWorkComponent,
    ConferencesComponent,
    PostgraduateInfoComponent
  ],
  imports: [
    CommonModule,
    ScientificActivitiesRoutingModule,
    LayoutModule
  ]
})
export class ScientificActivitiesModule { }
