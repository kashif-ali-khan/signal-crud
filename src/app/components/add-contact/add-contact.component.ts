import {
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../../services/api.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Contact } from '../../models/contact';
import { ContactFormComponent } from '../contact-form/contact-form.component';
@Component({
  selector: 'app-add-contact',
  imports: [
    MatButtonModule,
    MatProgressSpinnerModule,
    ContactFormComponent
  ],
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.scss',
})
export class AddContactComponent implements OnInit {
 
  saving = signal<boolean>(false);
  apiService = inject(ApiService);
  router = inject(Router);
  title = signal<string>('Add Contact');
  constructor() {
  }
  ngOnInit() {
   /* if (this.id()) {
      this.saving.set(true);
      this.apiService.getContact(this.id()!).then((contact) => {
        this.name.set(contact.name);
        this.email.set(contact.email);
        this.phone.set(contact.phone);
        this.saving.set(false);
      });
    }*/
  }

  async onSave(contact: Contact) {
    console.log('save', contact);
    this.saving.set(true);
    await this.apiService.addContact(contact);
   /* (await this.isEditing())
      ? this.apiService.updateContact({ ...contact, id: this.id()! })
      : this.apiService.addContact(contact);*/
    this.saving.set(false);

    this.router.navigate(['/']);
  }
}
