import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorporateComponent } from './private/profile/corp/corp.component';
import { HomeComponent } from '@app/views/uits/public/home/home.component';
import { CustomPageComponent } from '@app/views/uits/public/custom-page/custom-page.component';
import { PersonalComponent } from './private/profile/personal/personal.component'; // Импорт компонента Personal

const routes: Routes = [

  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'about', loadChildren: () => import('@app/views/uits/public/about/about.module').then(m => m.AboutModule),
  },
  {
    path: 'educational-activities',
    loadChildren: () => import('@app/views/uits/public/educational-activities/educational-activities.module')
      .then(m => m.EducationalActivitiesModule),
  },
  {
    path: 'scientific-activities',
    loadChildren: () => import('@app/views/uits/public/scientific-activities/scientific-activities.module')
      .then(m => m.ScientificActivitiesModule)
  },
  {
    path: '',
    component: CorporateComponent, 
    children: [
      {
        path: 'page/:slug',
        component: CustomPageComponent
      },
      {
        path: 'personal', // Изменяем 'profile' на 'personal'
        component: PersonalComponent, // Подключаем PersonalComponent напрямую
      }
    ]
  },
  {
    path: '**', redirectTo: '' 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UitsRoutingModule {}
