import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Menu from "./Menu";


test('renders Zaloguj if user not exists', () => {
    render(<Router><Menu /></Router>)

    const link = screen.getByText(/zaloguj/i)
    expect (link).toBeInTheDocument()
})