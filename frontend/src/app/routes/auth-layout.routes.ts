import {Routes} from '@angular/router';

export const AUTH_LAYOUT_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () => import('../views/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: '',
    loadChildren: () => import('../views/errors/errors.module').then(m => m.ErrorsModule),
  },
  {
    path: 'auth', loadChildren: () => import('@app/views/uits/public/auth/auth.module').then(m => m.AuthModule)
  },
];
