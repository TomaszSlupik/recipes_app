import './Main.scss'
import React, { useState, useReducer } from 'react'
import LoginContext from '../../context/loginContext'
import Menu from '../Menu/Menu'


// Reducer do logowania 
const reducer = (state, action) => {
    switch (action.type) {
        case 'login' : 
            return {...state, user: action.user}
        case 'logout' : 
            return {...state, user: null}
        default:
            throw new Error ('Brak akcji' + action.type)
    }
}

const initialState = {
  user: JSON.parse(window.localStorage.getItem('token')) ??  null
}

export default function Main() {

// Czy użytkownik jest zalogowany 
const [state, dispatch] = useReducer(reducer, initialState)
// Główny kolor
const [colorTheme, setColorTheme] = useState('primary')

  return (
    <div>
        <LoginContext.Provider
        value={{user: state.user,
        login: (user) => dispatch ({type: 'login', user}),
        logout: () => dispatch({type: 'logout'})
        }}
        >     
        <Menu colorTheme={colorTheme}/>
        </LoginContext.Provider>
    </div>
  )
}
