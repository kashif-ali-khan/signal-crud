// services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { User } from '../model/user.model';
import { Todo } from '../store/todo/store';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/';

  constructor(private http: HttpClient) {}

  /*getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + 'users');
  }*/

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl + 'todos');
  }

  /*
  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl + 'users', user);
  }
  */
}