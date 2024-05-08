import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  PostgraduateDissertationsComponent
} from "@app/views/uits/public/scientific-activities/postgraduate/postgraduate-dissertations/postgraduate-dissertations.component";
import {
  PostgraduateSpecialtiesComponent
} from "@app/views/uits/public/scientific-activities/postgraduate/postgraduate-specialties/postgraduate-specialties.component";
import {
  PostgraduatePracticesComponent
} from "@app/views/uits/public/scientific-activities/postgraduate/postgraduate-practices/postgraduate-practices.component";
import {ConferencesComponent} from "@app/views/uits/public/scientific-activities/conferences/conferences.component";
import {PublicationsComponent} from "@app/views/uits/public/scientific-activities/publications/publications.component";
import {
  ScientificWorkComponent
} from "@app/views/uits/public/scientific-activities/scientific-work/scientific-work.component";

const routes: Routes = [
  { path: 'postgraduate/dissertations', component: PostgraduateDissertationsComponent},
  { path: 'postgraduate/specialties', component: PostgraduateSpecialtiesComponent},
  { path: 'postgraduate/practices', component: PostgraduatePracticesComponent},
  { path: 'conferences', component: ConferencesComponent},
  { path: 'publications', component: PublicationsComponent},
  { path: 'scientific-work', component: ScientificWorkComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScientificActivitiesRoutingModule { }
