import { Component, inject, signal } from '@angular/core';
import { TodoSignalStore } from '../../store/todo/store';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule, MatSelectionListChange } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-signal-store-todo',
  imports: [
    CommonModule,
    MatButtonModule,
    FormsModule,
    MatCheckboxModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
  ],
  template: `
  <div class="container">
  <mat-card >
       
        <mat-card-content>
    <form (ngSubmit)="addTodo()" class="form-container">
      <mat-form-field>
        <mat-label>Todo title</mat-label>
        <input
          placeholder="Enter Todo"
          type="text"
          matInput
          [(ngModel)]="title"
          name="title"
        />
      </mat-form-field>
      <button mat-flat-button type="submit">Add Todo</button>
    </form>
    <mat-divider></mat-divider>
    <h2 style="text-align:center;">Todo  List</h2>
    <mat-divider></mat-divider>

    <mat-selection-list #shoes (selectionChange)="onSelectionChange($event)">
      @for (todo of todoStore.todos(); track todo.id) {
      <mat-list-option [value]="todo.id" [selected]="todo.completed" [ngClass]="{ completed: todo.completed }">
        <span matListItemTitle>{{ todo.title }}</span>
        <!--<button matListItemMeta mat-icon-button color="warn" 
                  (click)="deleteItem(todo.id, $event)" 
                  class="delete-button">
            <mat-icon>delete</mat-icon>
          </button>-->
      </mat-list-option>
      }
    </mat-selection-list>
    <div *ngIf="todoStore.todos().length === 0" class="empty-state">
            No items available. Add a new item above.
          </div>
        </mat-card-content>
        <mat-card-actions>
         <button mat-button color="primary" [disabled]="hasSelection() === totalCount()" (click)="selectAll()">
            Select All
          </button>
    
          <button mat-button  [disabled]="hasSelection() === 0" 
                  (click)="deleteSelected()">
            Delete Selected
          </button>
        </mat-card-actions>
      </mat-card>


  </div>
  `,
  styles: `
   .container {
      max-width: 800px;
      margin: 20px auto;
    }
    
    .form-container {
      display: flex;
      gap: 16px;
      margin-bottom: 16px;
      align-items: center;
     // justify-content: center;
    }
    
    .item-input {
      flex: 1;
    }
    
    .list-item-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
    
    .delete-button {
      margin-left: 8px;
    }
    
    .empty-state {
      text-align: center;
      color: rgba(0, 0, 0, 0.54);
      padding: 16px;
    }
    
    mat-divider {
      margin: 16px 0;
    }
    
    mat-card-actions {
      display: flex;
      justify-content: flex-end;
    }
  .completed{
    text-decoration: line-through;
  }`,
})
export class SignalStoreTodoComponent {
  todoStore = inject(TodoSignalStore);
  title = signal('');

  addTodo() {
    this.todoStore.addTodo(this.title());
    this.title.set('');
  }

  toggleCompleted(id: string) {
    this.todoStore.toggleCompleted(id);
  }

  onSelectionChange(event: MatSelectionListChange) {
    this.todoStore.toggleCompleted(event.options[0].value);
  }

  deleteItem(id: string, event: Event) {
    event.stopPropagation();
   // this.todoStore.deleteTodo(i);
  }

  selectAll() {
    this.todoStore.selectAll();
  }

  hasSelection() {
    return this.todoStore.completedCount();
  }

  totalCount() {
    return this.todoStore.totalCount();
  }

  deleteSelected() {
    this.todoStore.deleteSelected();
  }
}
