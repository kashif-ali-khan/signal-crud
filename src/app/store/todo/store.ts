import {
  signalStore,
  withState,
  withMethods,
  patchState,
  withComputed,
  withHooks,
} from '@ngrx/signals';
import { computed, inject } from '@angular/core';

import { TodoService } from '../../services/todo.service';
import { lastValueFrom, delay } from 'rxjs';

export type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

type TodoState = {
  todos: Todo[];
  loading: boolean;
};



export const initialState: TodoState = {
  todos: [],
  loading: false,
};

export const TodoSignalStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ todos }) => ({
    completedCount: computed(
      () => todos().filter((todo) => todo.completed).length
    ),
    totalCount: computed(() => todos().length),
  })),

  /*withHooks((store)=>({
    onInit(state){
      console.log('onInit kashif', state.todos());
      //store.loadTodos();
    },
    onDestroy(){
      console.log('onDestroy');
    }
 })),
 */
  withMethods((store, service = inject(TodoService)) => ({
    async loadTodos(): Promise<void> {
      patchState(store, (state) => {
        return {
          loading: true,
        };
      });
      const todos = await lastValueFrom(service.getTodos().pipe(delay(2000)))
      patchState(store, (state) => {
        return {
          todos: todos?.slice(0, 20),
          loading: false,
        };
      });
    },
    addTodo(title: string) {
      patchState(store, (state) => {
        return {
          todos: [
            ...state.todos,
            { id: Date.now().toString(), title, completed: false },
          ],
        };
      });
    },
    toggleCompleted(id: string) {
      patchState(store, (state) => {
        return {
          todos: state.todos.map((todo) => {
            if (todo.id.toString() === id.toString()) {
              return { ...todo, completed: !todo.completed };
            }
            return todo;
          }),
        };
      });
    },
    deleteSelected() {
      patchState(store, (state) => {
        return {
          todos: state.todos.filter((todo) => !todo.completed),
        };
      });
    },
    selectAll(){
        patchState(store, (state) => {
            return {
                todos: state.todos.map((todo) => ({...todo, completed: true}))
            }
        })
    }
  })),

  withHooks({
    onInit(store) {
      store.loadTodos();
    },
    onDestroy() {
      console.log('onDestroy');
    },
  })
);
