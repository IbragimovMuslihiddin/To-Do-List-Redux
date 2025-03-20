import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface Todo {
    id: number;
    firstName: string;
    lastName: string;
    year: number;
    status: "active" | "inactive";
  }
  
  const todoSlice = createSlice({
    name: "todos",
    initialState: [] as Todo[],
    reducers: {
      addTodo: (state, action: PayloadAction<Todo>) => {
        state.push(action.payload);
      },
      removeTodo: (state, action: PayloadAction<number>) => {
        return state.filter((todo) => todo.id !== action.payload);
      },
      editTodo: (state, action: PayloadAction<Todo>) => {
        const index = state.findIndex((todo) => todo.id === action.payload.id);
        if (index !== -1) state[index] = action.payload;
      },
      toggleStatus: (state, action: PayloadAction<number>) => {
        const todo = state.find((t) => t.id === action.payload);
        if (todo) todo.status = todo.status === "active" ? "inactive" : "active";
      }
    }
  });
  
  export const { addTodo, removeTodo, editTodo, toggleStatus } = todoSlice.actions;
  export const store = configureStore({ reducer: { todos: todoSlice.reducer } });
  
  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;
  