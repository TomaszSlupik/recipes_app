import React, { useState } from 'react'
import useLogin from '../../hooks/useLogin'
import Nav from '../Nav/Nav';


export default function Paneluser() {

    const [user] = useLogin()
    const [email] = useState(user.email)


  return (
    <>
    <div>
        {email}
    </div>
    <Nav />
    </>
    
  )
}
