import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [

  // deprecated
  // { path: 'postgraduate/dissertations', component: PostgraduateDissertationsComponent},
  // { path: 'postgraduate/specialties', component: PostgraduateSpecialtiesComponent},
  // { path: 'postgraduate/practices', component: PostgraduatePracticesComponent},
  // { path: 'conferences', component: ConferencesComponent},
  // { path: 'publications', component: PublicationsComponent},
  // { path: 'scientific-work', component: ScientificWorkComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScientificActivitiesRoutingModule { }
