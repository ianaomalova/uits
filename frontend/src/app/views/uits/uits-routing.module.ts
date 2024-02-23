import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from '@app/views/uits/public/home/home.component';
import {
  PracticesComponent
} from '@app/views/uits/public/scientific-activity/post-graduate/practices/practices.component';
import {AuthGuard} from '@app/shared/guards/auth.guard';


const routes: Routes = [
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'about', loadChildren: () => import('@app/views/uits/public/about/about.module').then(m => m.AboutModule),
  },
  {
    path: 'scientific-activities/post-graduate/practices', component: PracticesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UitsRoutingModule {
}
