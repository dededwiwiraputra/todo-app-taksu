'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { setUserName } from '@/redux/slices/userSlice'
import { AppDispatch } from '@/redux/store'

export default function LoginPage() {
  const [name, setName] = useState('')
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()

  const handleNext = () => {
    if (!name.trim()) return
    dispatch(setUserName(name.trim()))
    router.push('/todo')
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
      <div className="flex flex-col space-y-4 w-full max-w-xs">
        <label htmlFor="name" className="text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-gray-800 px-4 py-2 rounded outline-none"
          placeholder="Enter your name"
        />
        <button
          onClick={handleNext}
          className="bg-green-500 hover:bg-green-600 text-white py-2 rounded font-semibold transition"
        >
          Next →
        </button>
      </div>
    </main>
  )
}
