import { ProfileComponent } from './profile.component';
import { AuthGuard } from "@app/shared/guards/auth.guard";
import { EventsComponent } from './events/events.component'; // импортируйте EventsComponent

export const routes = [
  {
    path: '', 
    component: ProfileComponent, 
    data: { hidePageHeader: true },
    canActivate: [AuthGuard]
  },
  {
    path: 'corp/',
    children: [
      {
        path: 'profile',
        component: ProfileComponent, // если нужно, добавьте или измените на другой компонент
        data: { hidePageHeader: true },

      },
      {
        path: 'events',
        component: EventsComponent, // для событий
      },

    ]
  }
];
