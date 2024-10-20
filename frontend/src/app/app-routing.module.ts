import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorpComponent } from './components/corp/corp.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PublicationsComponent } from './components/publications/publications.component';
import { AchievementsComponent } from './components/achievements/achievements.component';
import { ModularJournalsComponent } from './components/modular-journals/modular-journals.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { StatisticsComponent } from './components/statistics/statistics.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent }, // Главная страница сайта
  {
    path: 'corp',
    component: CorpComponent,
    children: [
      { path: 'profile', component: ProfileComponent }, // Профиль
      { path: 'publications', component: PublicationsComponent }, // Публикации
      { path: 'achievements', component: AchievementsComponent }, // Достижения
      { path: 'modular_journals', component: ModularJournalsComponent }, // Модульные журналы
      { path: 'calendar', component: CalendarComponent }, // Календарь событий
      { path: 'statistics', component: StatisticsComponent } // Статистика
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
