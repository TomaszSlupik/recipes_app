import React, { useState, useEffect } from 'react'
import useLogin from '../../hooks/useLogin'
import Nav from '../Nav/Nav';
import Avatar from '@mui/material/Avatar';
import { ThemeProvider } from '@emotion/react';
import themeColor from '../../theme/themecolor'
import { Paper } from '@mui/material';
import './Paneluser.scss'
import { Button } from '@mui/material'
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import axios from '../../firebase/axios'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Paneluser({logoutUser}) {

    const [user] = useLogin()
    const [email] = useState(user.email)


  // Profil usera 
  const [openPanelUser, setOpenPanelUser] = useState(false);


  const handleClickOpenPanel = () => {
    setOpenPanelUser(true);

  
  };

  const handleClickClosePanel = () => {
    setOpenPanelUser(false);
  };

   // Dodatkowe 
   const [nameUser, setNameUser] = useState("")
   const [errUser, setErrUser] = useState("")
  
   const [detailUser, setDetailUser] = useState([])
   const [idUser] = useLogin()
 
   const userShow = detailUser.map(el => el.nameUser).toString()
   // Zapis szczegułów do Bazy i walidacja nowego Usera
   const saveDataUser = () => {
    if (nameUser === "") {
      setErrUser("To pole nie może być puste!")
    }
    else {
      saveDataUserToDatabase()
    }
   }

   const saveDataUserToDatabase = async () => {
     try {
         await axios.post ('/users.json', {
           userId: user.localId, 
           nameUser: nameUser
         })
     }
     catch (ex) {
       console.log(ex.response)
     }
     handleClickClosePanel()
     window.location.reload(true)
   }

 
   // Edycja istniejącego Usera do Bazy i walidacja 
   const [newNameUser, setNewNameUSer] = useState("")
   const [errNameUser, setErrNameUser] = useState("")

   console.log(newNameUser)

   const saveEditUser = () => {
    if (newNameUser === "") {
      setErrNameUser("To pole nie może być puste!")
    }
    else {
      saveEditUserToDatabase()
    }
   }
 
   const saveEditUserToDatabase = async () => {
     const idpersonalusername = detailUser.map(el => el.id).toString()
     try {
         await axios.put(`/users/${idpersonalusername}.json`, {
           userId: user.localId, 
           nameUser: newNameUser
 
         }) 
     }
     catch (ex) {
         console.log(ex.response)
     }
     handleClickClosePanel()
     window.location.reload(true)
   }
 
 
   // Odczyt Bazy 
   const readDataUser = async () => {
     try {
       const res = await axios.get('/users.json')
 
       const allUsers = []
 
       for (const key in res.data) {
         allUsers.push({...res.data[key], id: key})
       }
       // Pobranie tylko tego użytkownika
       setDetailUser(allUsers.filter(el => el.userId === idUser.localId))
   }
 
   catch (ex) {
       console.log(ex.response)
   }
   }
 


   useEffect(() => {
      readDataUser()
   }, [])
 



  // style
    const style ={
      avatar: {backgroundColor: '#21415b'},
      paper: {minHeight: '70px', position: 'relative'}, 
      profile: {marginRight: '0.5em'}
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
               style={style.profile}
               variant='outlined'
               onClick={handleClickOpenPanel}
                >
                  Profil
                </Button> 
                    <Button
              variant="outlined"
              onClick={logoutUser}
              >Wyloguj</Button>
               </div>
            
        </div>
      </Paper>
    </div>

    <Nav />
    <Dialog
        fullScreen
        open={openPanelUser}
        onClose={handleClickClosePanel}
        TransitionComponent={Transition}
      >

        
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClickClosePanel}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Twój profil
            </Typography>
            {
              userShow === '' ?
              <Button autoFocus color="inherit" 
              onClick={saveDataUser}>
              Zapisz
            </Button>
            :
            <Button autoFocus color="inherit" 
            onClick={saveEditUser}>
            Zapisz
          </Button>

            }
            
          </Toolbar>
        </AppBar>
        <List>
          {
            userShow === '' ?
            <div className="paneluserShow">
              <div className="paneluserShow__mycard">
            <div className="paneluserShow__mycard-header">
              Profil i ustawienia
            </div>
            <div className="paneluserShow__mycard-info">
              Wprowadzona nazwa będzie indentyfikować Twój profil. Zawsze będziesz mógł edytować swoją nazwę Profilu. 
            </div>
            <div className="paneluserShow__mycard-name">
            Wprowadź nazwę użytkownika 
            {
                    nameUser === "" 
                    ?
                    (
                      <div 
                      className="paneluserShow__mycard-name--err"
                      >{errUser}</div>
                    )
                    :
                    (
                      <div></div>
                    )
                  }

            <TextField 
            id="outlined-basic" 
            onChange={(e) => setNameUser(e.target.value)} 
            label="Nazwa" variant="outlined" />
            </div>
              </div>
            </div>
           
            :
            <div className="paneluserShow">
                <div className="paneluserShow__mycard">
                  <div className="paneluserShow__mycard-header">
                    Profil i ustawienia
                  </div>
                  <div className="paneluserShow__mycard-user">
                    Twoja nazwa użytkownika: <div style={{fontWeight: 500, color: '#21415b'}}>{userShow}</div>
                  </div>
                  <Divider />
                  <div className="paneluserShow__mycard-edit">
                    Edytuj profil
                  </div>
                  <div className="paneluserShow__mycard-info">
                     Wpisując w pole nazwę użytkownika i zatwierdzając przyciskiem zapisz zmienisz swoją nazwę do profilu. 
                  </div>
                  <div className="paneluserShow__mycard-name">
                  Wprowadź nową nazwę użytkownika
                  {
                    newNameUser === "" 
                    ?
                    (
                      <div 
                      className="paneluserShow__mycard-name--err"
                      >{errNameUser}</div>
                    )
                    :
                    (
                      <div></div>
                    )
                  }
                  
                  <TextField 
                  onChange={(e) => setNewNameUSer(e.target.value)}
                  id="outlined-basic" 
                  label="Nowa nazwa" variant="outlined" />
                  </div>
                </div>
            </div>

          }
         
        </List>
    </Dialog>
    </ThemeProvider>
    </>
    
  )
}
