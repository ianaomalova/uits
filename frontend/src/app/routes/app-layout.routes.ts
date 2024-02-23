import { Routes } from '@angular/router';

export const APP_LAYOUT_ROUTES: Routes = [
    //Dashboard
    {
        path: '',
        loadChildren: () => import('@app/views/uits/uits.module').then(m => m.UitsModule),
    },
];
