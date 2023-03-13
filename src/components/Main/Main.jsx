import './Main.scss'
import React, { useState, useReducer } from 'react'
import LoginContext from '../../context/loginContext'
import Menu from '../Menu/Menu'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../Login/Login';
import Details from '../Details/Details';
import useTitlewebside from '../../hooks/useTitlewebside';
import Comunity from '../Comunity/Comunity';
import Comunitydetails from '../Comunitydetails/Comunitydetails';




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

// Zmiana tytułu strony 
useTitlewebside('Przepisy')

  return (
    <div>
        <LoginContext.Provider
        value={{user: state.user,
        login: (user) => dispatch ({type: 'login', user}),
        logout: () => dispatch({type: 'logout'})
        }}
        >     
        <Router>
          <Routes>
            <Route exact path='/recipes_app' element={<Menu colorTheme={colorTheme}/>} />
            <Route exact path='/recipes_app' element={<Login/>} />
            <Route exact path='/recipes_app/:name' element={<Details />} />
            <Route exact path='/recipes_app/comunity' element={<Comunity />} />
            <Route exact path='/recipes_app/comunity/:nameuser' element={<Comunitydetails />} />
          </Routes>
        </Router>
        </LoginContext.Provider>
    </div>
  )
}
