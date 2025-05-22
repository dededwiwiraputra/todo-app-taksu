'use client'

import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '@/redux/store'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { deleteUserTodos } from '@/redux/slices/todoSlice'
import { resetUser } from '@/redux/slices/userSlice'
import AddTodoModal from '@/components/AddTodoModal'
import TodoItem from '@/components/TodoItem'
import ConfirmModal from '@/components/ConfirmModal'

const TodoPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  const user = useSelector((state: RootState) => state.user.name)
  const todos = useSelector((state: RootState) => state.todo[user] || [])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
  const [isDeleteAccountOpen, setIsDeleteAccountOpen] = useState(false)

  useEffect(() => {
    if (!user) router.push('/')
  }, [user, router])

  const handleLogout = () => {
    dispatch(resetUser())
    router.push('/')
    setIsLogoutModalOpen(false)
  }

  const handleDeleteAccount = () => {
    dispatch(deleteUserTodos(user))
    dispatch(resetUser())
    router.push('/')
    setIsDeleteAccountOpen(false)
  }

  return (
    <main className="flex min-h-screen justify-center bg-gray-900 text-white px-4 py-6">
      <div className="flex flex-col w-full max-w-md">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-4">Hello, {user} 👋</h1>
          <div className="flex gap-4">
            <button
              onClick={() => setIsLogoutModalOpen(true)}
              className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded font-semibold"
            >
              Logout
            </button>
            <ConfirmModal
              isOpen={isLogoutModalOpen}
              title="Confirm Logout"
              message="Are you sure you want to logout?"
              confirmText="Logout"
              cancelText="Cancel"
              onConfirm={handleLogout}
              onCancel={() => setIsLogoutModalOpen(false)}
            />
            <button
              onClick={() => setIsDeleteAccountOpen(true)}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-semibold"
            >
              Delete Account
            </button>
            <ConfirmModal
              isOpen={isDeleteAccountOpen}
              title="Confirm Delete Account"
              message="Are you sure you want to delete this account?"
              confirmText="Delete"
              cancelText="Cancel"
              onConfirm={handleDeleteAccount}
              onCancel={() => setIsDeleteAccountOpen(false)}
            />
          </div>
        </div>

        {/* Todo List */}
        <ul className="space-y-4 pb-24">
          {todos
            .slice()
            .sort((a, b) => {
              // 1. Yang DONE selalu di bawah
              if (a.status === 'DONE' && b.status !== 'DONE') return 1
              if (a.status !== 'DONE' && b.status === 'DONE') return -1

              // 2. Jika keduanya DONE atau keduanya bukan DONE, urutkan berdasarkan dueDate
              return (
                new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
              )
            })
            .map((todo) => (
              <TodoItem key={todo.id} todo={todo} user={user} />
            ))}
        </ul>

        {/* Add Modal */}
        <AddTodoModal
          user={user}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />

        {/* Floating Action Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-6 right-6 sm:bottom-10 sm:right-10 bg-green-600 hover:bg-green-700 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-xl transition-all duration-200"
        >
          <span className="text-4xl leading-none">+</span>
        </button>
      </div>
    </main>
  )
}

export default TodoPage
