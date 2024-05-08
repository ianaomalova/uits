import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  BachelorEduPlansComponent
} from "@app/views/uits/public/educational-activities/bachelor/bachelor-edu-plans/bachelor-edu-plans.component";
import {
  BachelorGraduateComponent
} from "@app/views/uits/public/educational-activities/bachelor/bachelor-graduate/bachelor-graduate.component";
import {
  BachelorPracticesComponent
} from "@app/views/uits/public/educational-activities/bachelor/bachelor-practices/bachelor-practices.component";
import {
  MasterEduPlansComponent
} from "@app/views/uits/public/educational-activities/master/master-edu-plans/master-edu-plans.component";
import {
  MasterGraduateComponent
} from "@app/views/uits/public/educational-activities/master/master-graduate/master-graduate.component";
import {
  MasterPracticesComponent
} from "@app/views/uits/public/educational-activities/master/master-practices/master-practices.component";

const routes: Routes = [
  { path: 'bachelor/edu-plans', component: BachelorEduPlansComponent},
  { path: 'bachelor/graduate', component: BachelorGraduateComponent},
  { path: 'bachelor/practices', component: BachelorPracticesComponent},
  { path: 'master/edu-plans', component: MasterEduPlansComponent},
  { path: 'master/graduate', component: MasterGraduateComponent},
  { path: 'master/practices', component: MasterPracticesComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EducationalActivitiesRoutingModule { }
