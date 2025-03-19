import { Component, inject, input, signal, resource } from '@angular/core';
import { Contact } from '../../models/contact';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-edit-contact',
  imports: [ContactFormComponent, MatSnackBarModule, MatProgressSpinnerModule],
  template: `
    
    @if(contactResource.isLoading()){
    <mat-progress-spinner mode="indeterminate" diameter="50"></mat-progress-spinner>
    }@else {
      <app-contact-form
      [title]="title()"
      [isEdit]="isEdit()"
      [contact]="contactResource.value()"
      (save)="onSave($event)"
    ></app-contact-form>
    }
  `,
  styles: ``,
})
export class EditContactComponent {
  id = input.required<string>();
  contact = input<Contact>();
  title = signal<string>('Edit Contact');
  isEdit = signal<boolean>(true);
  apiService = inject(ApiService);
  router = inject(Router);
  saving = signal<boolean>(false);
  snackBar = inject(MatSnackBar);
  contactResource = resource({
    request: this.id,
    loader: ({ request: id }) => this.apiService.getContact(id),
  });

  constructor() {}

  async onSave(contact: Contact) {
    this.saving.set(true);
    await this.apiService.updateContact(contact);
    this.saving.set(false);
    this.router.navigate(['/']);
    this.snackBar.open('Contact updated successfully', 'Close', {
      duration: 3000,
    });
  }
}
