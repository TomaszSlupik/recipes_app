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
import Paper from '@mui/material/Paper';

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

const style = {
    btn: {width: '135px'},
    paper: {minWidth: '200px', minHeight: '200px', marginBottom: '1em', padding: '0.3em 0.4em'}
}


  return (
    <div className='menu'>
        
        {
            login ? 
            ( 
                <>
                 <ThemeProvider theme={themeColor}>
                    <Button
                    onClick={logoutUser}
                    >Wyloguj</Button>
                    <Paneluser colorTheme={colorTheme}/>
                </ThemeProvider>
                </>
            )
            :
            (
                <>
                <ThemeProvider theme={themeColor}>
                    <Header />
                    <div className='menu__login'>
                        <div className="menu__login-text">
                                <Paper 
                            style={style.paper}
                            elevation={3}>
                                Aplikacja została stworzona dla miłośników gotowania.
                                Jeżeli chcesz przeglądać przepisy oraz dodawać swoje, musisz zarejestrować się.
                                Mając konto, możesz zalogować się. 
                            </Paper>
                        </div>
                    <div className="menu__login-btn">
                            <Button
                            style={style.btn}
                            variant="contained"
                            color={colorTheme}
                            onClick={openLogin}
                            >Zaloguj</Button>        
                            <Login
                            openWindowLogin={openWindowLogin}
                            closeLogin={closeLogin}
                            loginUser={loginUser}
                            />
                            <div className="menu__login-btn--register">
                            <Button
                            style={style.btn}
                            variant="contained"
                            color={colorTheme}
                            onClick={openRegister}
                            >
                                Rejestracja
                            </Button>
                    </div>
                    </div> 
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
