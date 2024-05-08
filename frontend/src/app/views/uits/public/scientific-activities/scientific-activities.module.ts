import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScientificActivitiesRoutingModule } from './scientific-activities-routing.module';
import { PostgraduatePracticesComponent } from './postgraduate/postgraduate-practices/postgraduate-practices.component';
import { PostgraduateSpecialtiesComponent } from './postgraduate/postgraduate-specialties/postgraduate-specialties.component';
import { PostgraduateDissertationsComponent } from './postgraduate/postgraduate-dissertations/postgraduate-dissertations.component';
import { PublicationsComponent } from './publications/publications.component';
import { ScientificWorkComponent } from './scientific-work/scientific-work.component';
import { ConferencesComponent } from './conferences/conferences.component';
import {LayoutModule} from "@app/layout/layout.module";


@NgModule({
  declarations: [
    PostgraduatePracticesComponent,
    PostgraduateSpecialtiesComponent,
    PostgraduateDissertationsComponent,
    PublicationsComponent,
    ScientificWorkComponent,
    ConferencesComponent
  ],
  imports: [
    CommonModule,
    ScientificActivitiesRoutingModule,
    LayoutModule
  ]
})
export class ScientificActivitiesModule { }
