import { render, screen } from '@testing-library/react'
import Menu from '../../components/Menu/Menu'

test('renders zaloguj', () => {
    render(<Menu />)

    const link = screen.getByText(/zaloguj/i)
    expect (link).toBeInTheDocument()
})