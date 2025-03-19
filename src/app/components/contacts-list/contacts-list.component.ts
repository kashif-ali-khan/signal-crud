import { Component, computed, inject, resource, signal } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-contacts-list',
  imports: [MatProgressSpinnerModule, MatListModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './contacts-list.component.html',
  styleUrl: './contacts-list.component.scss'
})
export class ContactsListComponent {

  service = inject(ApiService);


  contactsResource = resource({
    loader: () => this.service.getContacts(),
  })

  deleting = signal(false);
  loading = computed(()=> this.deleting() || this.contactsResource.isLoading())

  async deleteContact(id: string) {
    this.deleting.set(true);
    await this.service.deleteContact(id);
    this.contactsResource.reload();
    this.deleting.set(false);
  }



}
