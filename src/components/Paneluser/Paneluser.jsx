import React, { useState } from 'react'
import useLogin from '../../hooks/useLogin'
import Nav from '../Nav/Nav';
import Avatar from '@mui/material/Avatar';
import { ThemeProvider } from '@emotion/react';
import themeColor from '../../theme/themecolor'
import { Paper } from '@mui/material';
import './Paneluser.scss'
import { Button } from '@mui/material'
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';


export default function Paneluser({colorTheme, logoutUser}) {

    const [user] = useLogin()
    const [email] = useState(user.email)

  // style
    const style ={
      avatar: {backgroundColor: '#21415b'},
      paper: {minHeight: '70px', position: 'relative'}
    }

    const Search = styled('div')(({ theme }) => ({
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    }));
    
    const SearchIconWrapper = styled('div')(({ theme }) => ({
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }));
    
    const StyledInputBase = styled(InputBase)(({ theme }) => ({
      color: 'inherit',
      '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('xs')]: {
          width: '6ch'
        },
        [theme.breakpoints.up('sm')]: {
          width: '6ch',
          '&:focus': {
            width: '20ch',
          },
        },
      },
    }));
    

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
               <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Szukaj"
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
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
