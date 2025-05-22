'use client'

import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Todo, addTodo } from '@/redux/slices/todoSlice'
import { v4 as uuidv4 } from 'uuid'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import { useState } from 'react'

type Props = {
  user: string
  isOpen: boolean
  onClose: () => void
}

const AddTodoModal = ({ user, isOpen, onClose }: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  if (!isOpen) return null

  const initialValues = {
    title: '',
    dueDate: null as Date | null,
  }

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    dueDate: Yup.date()
      .nullable()
      .required('Due date and time is required')
      .typeError('Invalid date'),
  })

  const handleSubmit = (values: typeof initialValues, { resetForm }: any) => {
    if (!values.dueDate) return

    const newTodo: Todo = {
      id: uuidv4(),
      title: values.title,
      dueDate: values.dueDate.toISOString(),
      status: 'OPEN',
    }

    dispatch(addTodo({ user, todo: newTodo }))
    resetForm()
    setSelectedDate(null)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#36393F] p-6 rounded-lg w-[90%] max-w-md">
        <h2 className="text-xl font-bold mb-4">New Todo</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form className="space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block mb-1 font-semibold text-white"
                >
                  Title
                </label>
                <Field
                  name="title"
                  placeholder="Todo title"
                  className="w-full px-3 py-4 rounded bg-[#40444B]"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="dueDate"
                  className="block mb-1 font-semibold text-white"
                >
                  Due Date
                </label>
                <DatePicker
                  selected={values.dueDate}
                  onChange={(date) => setFieldValue('dueDate', date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="MMMM d, yyyy h:mm aa"
                  placeholderText="Select due date and time"
                  className="w-full px-3 py-4 rounded bg-[#40444B]"
                />
                <ErrorMessage
                  name="dueDate"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="grid px-8 gap-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#5440D1] hover:bg-[#6955e7] text-white rounded transition-all"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 hover:bg-gray-300 hover:text-black rounded transition-all"
                >
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default AddTodoModal
