import { Routes } from '@angular/router';

export const APP_LAYOUT_ROUTES: Routes = [
    //Dashboard
    {
        path: 'dashboard',
        loadChildren: () => import('../views/dashboard/dashboard.module').then(m => m.DashboardModule),
    },
];