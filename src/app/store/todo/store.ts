import {
  signalStore,
  withState,
  withMethods,
  patchState,
  withComputed,
  withHooks,
} from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { UserService } from '../../services/user.service';

export type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

type TodoState = {
  todos: Todo[];
};

const todos = [
  {
    id: '1',
    title: 'Buy groceries',
    completed: false,
  },
  {
    id: '2',
    title: 'Buy Fruits',
    completed: false,
  },
  {
    id: '3',
    title: 'Buy vegetables',
    completed: false,
  },
];

export const initialState: TodoState = {
  todos: todos,
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
  withMethods((store, service = inject(UserService)) => ({
    async loadTodos(): Promise<void> {
      const todos = await service.getTodos().toPromise();
      patchState(store, (state) => {
        return {
          todos: todos?.slice(0, 20),
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
