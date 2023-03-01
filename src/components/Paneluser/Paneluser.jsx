import React, { useState } from 'react'
import useLogin from '../../hooks/useLogin'
import Nav from '../Nav/Nav';
import Avatar from '@mui/material/Avatar';
import { ThemeProvider } from '@emotion/react';
import themeColor from '../../theme/themecolor'
import { Paper } from '@mui/material';
import './Paneluser.scss'

export default function Paneluser({colorTheme}) {

    const [user] = useLogin()
    const [email] = useState(user.email)

    const style ={
      avatar: {backgroundColor: '#21415b'}
    }

  return (
    <>
     <ThemeProvider theme={themeColor}>
    <div className='paneluser'>
      <Paper
      elevation={2}
      >
        <div className="paneluser__icon">
            <Avatar
            style={style.avatar}
            >{email[0].toUpperCase()}</Avatar>
               <div className="paneluser__icon-email">{email}</div> 
        </div>
      </Paper>
    </div>
    <Nav />
    </ThemeProvider>
    </>
    
  )
}
