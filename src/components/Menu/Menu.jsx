import { Button } from '@mui/material'
import React, { useState } from 'react'
import useLogin from '../../hooks/useLogin'
import Header from '../Header/Header'
import Login from '../Login/Login'
import Register from '../Register/Register'
import Paneluser from '../Paneluser/Paneluser'
import themeColor from '../../theme/themecolor'
import { ThemeProvider } from '@emotion/react';
import './Menu.scss'

export default function Menu({colorTheme}) {

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
    <div className='menu'>
        
        {
            login ? 
            (
                <>
                 <Button
                onClick={logoutUser}
                >Wyloguj</Button>
                <Paneluser />
                </>
            )
            :
            (
                <>
                <ThemeProvider theme={themeColor}>
                    <Header />
                    <div className='menu__login'>
                    <Button
                    variant="contained"
                    color={colorTheme}
                    onClick={openLogin}
                    >Zaloguj</Button>
                    <Login
                    openWindowLogin={openWindowLogin}
                    closeLogin={closeLogin}
                    loginUser={loginUser}
                    />
                    <Button
                    variant="contained"
                    color={colorTheme}
                    onClick={openRegister}
                    >
                        Rejestracja
                    </Button>
                    </div>
                    
                    <Register
                    openWindowRegister={openWindowRegister}
                    closeRegister={closeRegister}
                    loginUser={loginUser}
                    />
                </ThemeProvider>
                </>
                
            )

        }
        
    </div>
  )
}
