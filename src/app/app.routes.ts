import { Routes } from '@angular/router';



export const routes: Routes = [
    {
        path:'',
        loadComponent: () => import('./components/contacts-list/contacts-list.component').then(m => m.ContactsListComponent)
    },
    {
        path: 'add',
        loadComponent: () => import('./components/add-contact/add-contact.component').then(m => m.AddContactComponent)
    },
    {
        path: 'edit/:id',
        loadComponent: () => import('./components/edit-contact/edit-contact.component').then(m => m.EditContactComponent)
    },
    {
        path: 'signal-store',
        loadComponent: () => import('./components/signal-store-todo/signal-store-todo.component').then(m => m.SignalStoreTodoComponent)
    }
];
