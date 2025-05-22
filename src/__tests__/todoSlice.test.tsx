import todoReducer, {
  addTodo,
  deleteTodo,
  markTodoAsDone,
  deleteUserTodos,
  Todo,
} from '@/redux/slices/todoSlice'

describe('todoSlice', () => {
  const user = 'John'
  const todo: Todo = {
    id: '1',
    title: 'Learn testing',
    dueDate: '2025-05-22',
    status: 'OPEN',
  }

  it('should add a todo', () => {
    const state = todoReducer(undefined, addTodo({ user, todo }))
    expect(state[user]).toHaveLength(1)
    expect(state[user][0]).toEqual(todo)
  })

  it('should mark todo as done', () => {
    const initialState = { [user]: [todo] }
    const state = todoReducer(
      initialState,
      markTodoAsDone({ user, todoId: '1' })
    )
    expect(state[user][0].status).toBe('DONE')
  })

  it('should delete a todo', () => {
    const initialState = { [user]: [todo] }
    const state = todoReducer(initialState, deleteTodo({ user, todoId: '1' }))
    expect(state[user]).toHaveLength(0)
  })

  it('should delete all todos for a user', () => {
    const initialState = { [user]: [todo] }
    const state = todoReducer(initialState, deleteUserTodos(user))
    expect(state[user]).toBeUndefined()
  })
})
