import { render, screen, fireEvent } from '@testing-library/react'
import LoginPage from '@/app/page'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'
import { useRouter } from 'next/navigation'

// Mock router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

describe('LoginPage', () => {
  it('should dispatch user name and redirect to /todo on login', () => {
    const push = jest.fn()
    ;(useRouter as jest.Mock).mockReturnValue({ push })

    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    )

    // Isi input
    const input = screen.getByPlaceholderText('Enter your name')
    fireEvent.change(input, { target: { value: 'John' } })

    // Klik tombol
    const button = screen.getByRole('button', { name: /next/i })
    fireEvent.click(button)

    // Cek router push ke /todo
    expect(push).toHaveBeenCalledWith('/todo')
  })
})
