import { Button } from '@mui/material'
import React, { useState } from 'react'
import useLogin from '../../hooks/useLogin'
import Header from '../Header/Header'
import Login from '../Login/Login'
import Register from '../Register/Register'
import Paneluser from '../Paneluser/Paneluser'

export default function Menu() {

// Okno Logowania 
const [openWindowLogin, setOpenWindowLogin] = useState(false)

const openLogin = () => {
    setOpenWindowLogin(true)
}

const closeLogin = () => {
    setOpenWindowLogin(false)
}

// Okno Rejestracji 
const [openWindowRegister, setOpenWindowRegister] = useState(false)

const openRegister = () => {
    setOpenWindowRegister(true)
}

const closeRegister = () => {
    setOpenWindowRegister(false)
}

//Hook do Logowania  
const [login, setLogin] = useLogin()


const logoutUser = (e) => {
    e.preventDefault()
    setLogin(false)
    setOpenWindowLogin(false)
    setOpenWindowRegister(false)
}
const loginUser = (e) => {
    e.preventDefault()
    setLogin(true)
}



  return (
    <div>
        {
            login ? 
            (
                <>
                 <div
                onClick={logoutUser}
                >Wyloguj</div>
                <Paneluser />
                </>
            )
            :
            (
                <>
                <Header />
                <Button
                onClick={openLogin}
                >Zaloguj</Button>
                <Login
                openWindowLogin={openWindowLogin}
                closeLogin={closeLogin}
                loginUser={loginUser}
                />
                <Button
                onClick={openRegister}
                >
                    Rejestracja
                </Button>
                <Register
                openWindowRegister={openWindowRegister}
                closeRegister={closeRegister}
                loginUser={loginUser}
                />
                </>
                
            )

        }
        
    </div>
  )
}
