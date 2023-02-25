import './Main.scss'
import React, { useReducer } from 'react'
import LoginContext from '../../context/loginContext'
import Menu from '../Menu/Menu'


// Reducer do logowania 
const reducer = (state, action) => {
    switch (action.type) {
        case 'login' : 
            return {...state, isLogin: true}
        case 'logout' : 
            return {...state, isLogin: false}
        default:
            throw new Error ('Brak akcji' + action.type)
    }
}

const initialState = {
  isLogin: false
}

export default function Main() {

// Czy użytkownik jest zalogowany 
const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <div>
        <LoginContext.Provider
        value={{isLogin: state.isLogin,
        login: () => dispatch ({type: 'login'}),
        logout: () => dispatch({type: 'logout'})
        }}
        >
        
        <Menu />

        </LoginContext.Provider>
    </div>
  )
}
