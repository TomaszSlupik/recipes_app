import React from 'react'
import './Header.scss'

export default function Header() {
  return (
    <div className='header'>
        <div className="header__img">
            <img className="header__img" src={process.env.PUBLIC_URL + window.innerWidth < 576 ?'/img/pancakes640.jpg' : '/img/pancakes1920.jpg'} alt="Header strony - posiłki" />
        </div>
    </div>
  )
}
