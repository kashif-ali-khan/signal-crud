import { Component, input, linkedSignal, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Contact } from '../../models/contact';
@Component({
  selector: 'app-contact-form',
  imports: [RouterLink, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <h2>{{ title() }} contact</h2>
<form class="form" (ngSubmit)="onSave()">
  <div class="fields">
    <mat-form-field>
      <mat-label>Name</mat-label>
      <input matInput name="name" [(ngModel)]="name" />
    </mat-form-field>
    <mat-form-field>
      <mat-label>Email</mat-label>
      <input matInput name="email" [(ngModel)]="email" />
    </mat-form-field>
    <mat-form-field>
      <mat-label>Phone</mat-label>
      <input matInput name="phone" [(ngModel)]="phone" />
    </mat-form-field>
  </div>
  <div class="actions">
    <button type="submit" mat-flat-button>
      {{ isEdit() ? "Update" : "Save" }}
    </button>
    <button type="button" mat-raised-button [routerLink]="['/']">cancel</button>
  </div>
</form>
  `,
  styles: `
  :host{
    display: block;
    padding: 1rem;
}
.fields{
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(2, 1fr);
    
}
.actions{
    
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr 1fr 1fr 1fr;
}

/*
.actions{
    display: flex;
    justify-content: start;
    gap: 1rem;
 }
*/
`
})
export class ContactFormComponent {
  title = input<string>('add');
  isEdit = input<boolean>(false);
  contact = input<Contact>();
  save = output<Contact>();
  name = linkedSignal<string>(() => this.contact()?.name || '');
  email = linkedSignal<string>(() => this.contact()?.email || '');
  phone = linkedSignal<string>(() => this.contact()?.phone || '');

  onSave() {
    this.save.emit({
      id: this.contact()?.id || '',
      name: this.name(),
      email: this.email(),
      phone: this.phone()
    });
  }
}
