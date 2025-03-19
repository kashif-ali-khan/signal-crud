import { Routes } from '@angular/router';
import { ContactsListComponent } from './components/contacts-list/contacts-list.component';
import { AddContactComponent } from './components/add-contact/add-contact.component';
import { EditContactComponent } from './components/edit-contact/edit-contact.component';
export const routes: Routes = [
    {
        path:'',
        component: ContactsListComponent
    },
    {
        path: 'add',
        component: AddContactComponent
    },
    {
        path: 'edit/:id',
        component: EditContactComponent
    }
];
