import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type TodoStatus = 'OPEN' | 'DONE' | 'OVERDUE'

export interface Todo {
  id: string
  title: string
  dueDate: string
  status: TodoStatus
}

interface TodoState {
  [userName: string]: Todo[] // Simpan berdasarkan nama user
}

const initialState: TodoState = {}

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<{ user: string; todo: Todo }>) => {
      if (!state[action.payload.user]) {
        state[action.payload.user] = []
      }
      state[action.payload.user].push(action.payload.todo)
    },
    deleteTodo: (
      state,
      action: PayloadAction<{ user: string; todoId: string }>
    ) => {
      state[action.payload.user] = state[action.payload.user].filter(
        (todo) => todo.id !== action.payload.todoId
      )
    },
    markTodoAsDone: (
      state,
      action: PayloadAction<{ user: string; todoId: string }>
    ) => {
      const todos = state[action.payload.user]
      const todo = todos.find((t) => t.id === action.payload.todoId)
      if (todo) {
        todo.status = 'DONE'
      }
    },
    markTodoAsOverdue: (
      state,
      action: PayloadAction<{ user: string; todoId: string }>
    ) => {
      const todos = state[action.payload.user]
      const todo = todos.find((t) => t.id === action.payload.todoId)
      if (todo) {
        todo.status = 'OVERDUE'
      }
    },
    deleteUserTodos: (state, action: PayloadAction<string>) => {
      const userId = action.payload
      delete state[userId]
    },
  },
})

export const {
  addTodo,
  deleteTodo,
  markTodoAsDone,
  markTodoAsOverdue,
  deleteUserTodos,
} = todoSlice.actions
export default todoSlice.reducer
