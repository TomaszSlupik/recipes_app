import React from 'react'
import './Header.scss'

export default function Header() {
  return (
    <div className='header'>
        <div className="header__img">
        <div className="header__img-shadow"></div>
            <img className="header__img" src={process.env.PUBLIC_URL + window.innerWidth < 576 ?'/recipes_app/img/pancakes640.jpg' : '/recipes_app/img/pancakes1920.jpg'} alt="Header strony - posiłki" /> 
        </div>
    </div>
  )
}
