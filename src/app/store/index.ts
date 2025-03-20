// store/index.ts
import { ActionReducerMap } from '@ngrx/store';
import { userReducer } from './user/user.reducer';
import { UserEffects } from './user/user.effects';
import { UserState } from './user/user.state';

export interface AppState {
  users: UserState;
}

export const reducers: ActionReducerMap<AppState> = {
  users: userReducer
};

export const effects = [UserEffects];