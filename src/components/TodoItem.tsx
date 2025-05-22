'use client'

import { Todo } from '@/redux/slices/todoSlice'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import { deleteTodo, markTodoAsDone } from '@/redux/slices/todoSlice'
import { useState } from 'react'
import ConfirmModal from './ConfirmModal'

type TodoItemProps = {
  todo: Todo
  user: string
}

const TodoItem = ({ todo, user }: TodoItemProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const now = new Date()
  const dueDate = new Date(todo.dueDate)
  const isOverdue = dueDate < now && todo.status !== 'DONE'
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isDoneOpen, setIsDoneOpen] = useState(false)

  const handleDelete = () => {
    dispatch(deleteTodo({ user, todoId: todo.id }))
    setIsDeleteOpen(false)
  }

  const handleDone = () => {
    dispatch(markTodoAsDone({ user, todoId: todo.id }))
    setIsDoneOpen(false)
  }

  return (
    <li
      className={`p-4 rounded bg-gray-800 ${
        todo.status === 'DONE' ? 'line-through opacity-60' : ''
      }`}
    >
      <div className="flex justify-between">
        <div className="mt-1 flex gap-2 text-xs">
          {todo.status === 'DONE' ? (
            <span className="text-green-400 font-medium">✅ Done</span>
          ) : (
            <span className="text-yellow-400 font-medium">🟢 Open</span>
          )}
          {isOverdue && (
            <span className="text-red-500 font-medium">⏰ Overdue</span>
          )}
        </div>
        <button
          onClick={() => setIsDeleteOpen(true)}
          className="p-1 rounded hover:bg-red-700"
          aria-label="Delete todo"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-red-500"
            fill="currentColor"
            viewBox="0 0 24 24"
            stroke="none"
          >
            <path d="M3 6h18v2H3V6zm2 3h14l-1.5 12.5a1 1 0 01-1 .5H7a1 1 0 01-1-.5L4 9zm5 2v7h2v-7H9zm4 0v7h2v-7h-2z" />
          </svg>
        </button>
        <ConfirmModal
          isOpen={isDeleteOpen}
          title="Delete Todo"
          message="Are you sure you want to delete this todo?"
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={handleDelete}
          onCancel={() => setIsDeleteOpen(false)}
        />
      </div>

      <div className="mb-2">
        <h2 className="text-lg truncate">{todo.title}</h2>
      </div>

      <div className="flex justify-between">
        <div>
          <p className="text-sm text-gray-400">Due date:</p>
          <p className="text-sm text-gray-400">{dueDate.toLocaleString()}</p>
        </div>
        <div>
          {todo.status !== 'DONE' && (
            <button
              onClick={() => setIsDoneOpen(true)}
              className=" bg-[#5440D1] hover:bg-[#6955e7] px-6 py-1 rounded"
            >
              Done
            </button>
          )}
          <ConfirmModal
            isOpen={isDoneOpen}
            title="Finish Todo"
            message="Are you sure you want to finish this todo?"
            confirmText="Finish"
            cancelText="Cancel"
            onConfirm={handleDone}
            onCancel={() => setIsDoneOpen(false)}
          />
        </div>
      </div>
    </li>
  )
}

export default TodoItem
