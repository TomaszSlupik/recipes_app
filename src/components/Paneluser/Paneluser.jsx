import React, { useState } from 'react'
import useLogin from '../../hooks/useLogin'
import Nav from '../Nav/Nav';
import Avatar from '@mui/material/Avatar';
import { ThemeProvider } from '@emotion/react';
import themeColor from '../../theme/themecolor'
import { Paper } from '@mui/material';
import './Paneluser.scss'
import { Button } from '@mui/material'




export default function Paneluser({colorTheme, logoutUser}) {

    const [user] = useLogin()
    const [email] = useState(user.email)

  // style
    const style ={
      avatar: {backgroundColor: '#21415b'},
      paper: {minHeight: '70px', position: 'relative'}
    }

  return (
    <>
     <ThemeProvider theme={themeColor}>
    <div className='paneluser'>
      <Paper
      style={style.paper}
      elevation={2}
      >
        <div className="paneluser__icon">
            <Avatar
            style={style.avatar}
            >{email[0].toUpperCase()}</Avatar>
               <div className="paneluser__icon-email">{email}</div> 
               <div className="paneluser__icon-btn">
                    
                    <Button
              variant="outlined"
              onClick={logoutUser}
              >Wyloguj</Button>
               </div>
            
        </div>
      </Paper>
    </div>
    <Nav />
    </ThemeProvider>
    </>
    
  )
}
