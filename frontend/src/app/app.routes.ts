import { Routes } from '@angular/router';

export const routes: Routes = [ 
    { path: '', redirectTo: 'add', pathMatch: 'full' },
    {
        path: 'add',
        loadComponent: () => import('./event-crud/event-crud.component').then(m => m.EventCrudComponent)
    },
    {
        path: 'events',
        loadComponent: () => import('./event-list/event-list.component').then(m => m.EventListComponent)
    }
];
