import { User } from "../../model/user.model";

export interface UserState {
    users: User[];
    selectedUserId: string | null;
    loading: boolean;
    error: string | null;
  }
  
  export const initialUserState: UserState = {
    users: [],
    selectedUserId: null,
    loading: false,
    error: null
  };