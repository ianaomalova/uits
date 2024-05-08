import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EducationalActivitiesRoutingModule } from './educational-activities-routing.module';
import { BachelorEduPlansComponent } from './bachelor/bachelor-edu-plans/bachelor-edu-plans.component';
import { BachelorGraduateComponent } from './bachelor/bachelor-graduate/bachelor-graduate.component';
import { BachelorPracticesComponent } from './bachelor/bachelor-practices/bachelor-practices.component';
import { MasterEduPlansComponent } from './master/master-edu-plans/master-edu-plans.component';
import { MasterGraduateComponent } from './master/master-graduate/master-graduate.component';
import { MasterPracticesComponent } from './master/master-practices/master-practices.component';
import {LayoutModule} from "@app/layout/layout.module";


@NgModule({
  declarations: [
    BachelorEduPlansComponent,
    BachelorGraduateComponent,
    BachelorPracticesComponent,
    MasterEduPlansComponent,
    MasterGraduateComponent,
    MasterPracticesComponent
  ],
  imports: [
    CommonModule,
    EducationalActivitiesRoutingModule,
    LayoutModule
  ]
})
export class EducationalActivitiesModule { }
