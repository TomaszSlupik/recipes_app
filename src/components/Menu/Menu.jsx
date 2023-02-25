import { Button } from '@mui/material'
import React, { useState } from 'react'
import useLogin from '../../hooks/useLogin'
import Login from '../Login/Login'

export default function Menu() {

// Okno Logowania 
const [openWindowLogin, setOpenWindowLogin] = useState(false)

const openLogin = () => {
    setOpenWindowLogin(true)
}

const closeLogin = () => {
    setOpenWindowLogin(false)
}


//Hook do Logowania  
const [login, setLogin] = useLogin()


const logoutUser = (e) => {
    e.preventDefault()
    setLogin(true)
    setOpenWindowLogin(false)
}
const loginUser = (e) => {
    e.preventDefault()
    setLogin(false)
}


  return (
    <div>
        {
            login ? 
            (
                <div
                onClick={logoutUser}
                >Wyloguj</div>
            )
            :
            (
                <>
                <div
                onClick={openLogin}
                >Zaloguj</div>
                <Login
                openWindowLogin={openWindowLogin}
                closeLogin={closeLogin}
                loginUser={loginUser}
                />
                <Button>
                    Rejestracja
                </Button>
                </>
                
            )

        }
        
    </div>
  )
}
