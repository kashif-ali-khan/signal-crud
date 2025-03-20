// store/user/user.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as UserActions from './user.actions';
import { UserService } from '../../services/user.service';
@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.loadUsers),
    mergeMap(() => this.userService.getUsers().pipe(
      map(users => UserActions.loadUsersSuccess({ users })),
      catchError(error => of(UserActions.loadUsersFailure({ error: error.message })))
    ))
  ));

  addUser$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.addUser),
    mergeMap(({ user }) => this.userService.addUser(user).pipe(
      map(() => UserActions.addUserSuccess({ user })),
      catchError(error => of(UserActions.addUserFailure({ error: error.message })))
    ))
  ));

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}
}