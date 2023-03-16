import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../../firebase/axios'
import Badge from '@mui/material/Badge';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import './Comunitydetails.scss'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { ThemeProvider } from '@emotion/react';
import breakpoints from '../../theme/breakpoints';
import Myrecipecard from '../../styles/myrecipecard';
import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import Button from '@mui/material/Button';
import themeColor from '../../theme/themecolor';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import useLogin from '../../hooks/useLogin';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Comunitydetails() {

    const nameUserParams = useParams()
    const [userName, setUserName] = useState(nameUserParams)
    const [usercurrentID, setUserCurrentId] = useState([])
    const [userCurrentData, setUserCurrentData] = useState([])

    const data = useLogin()
    // Wyszukanie z bazy konkretnego użytkownika  - w którego Kliknięto 

    const readUserId = async() => {
      try {
          const res = await axios.get('/users.json')

          const currentuserID = []

          for (const key in res.data) {
            currentuserID.push({...res.data[key], id: key})
          }
          // filter(el => el.nameUser === userName.nameuser).map(el => el.userId)
          setUserCurrentId(currentuserID.filter(el => el.nameUser === userName.nameuser).map(el => el.userId))
          

      }
      catch (ex) {
          console.log(ex.response)
      }
  }
  
    // Cała baza posiłków
    const readDataRecipe = async() => {
        try {
            const res = await axios.get('/recipes.json')

            const newRecipeData = []

            for (const key in res.data) {
              newRecipeData.push({...res.data[key], id: key})
            }
            setUserCurrentData(newRecipeData)

        }
        catch (ex) {
            console.log(ex.response)
        }
    }

    useEffect(() => {
        readDataRecipe()
        readUserId()
    }, [])


    
    const idString = usercurrentID.toString()
    const userIdEqual = userCurrentData.filter(el => el.userId === idString)


    // Liczba
    const lengthMeal = userIdEqual.length
    // Nazwa posiłku - danego użytkownika w bazie 
    const clickMeal = userIdEqual.map(el => el.namemeal)
    // Obrazek - danego użytkownika w bazie
    const clickImage = userIdEqual.map(el => el.image)

    // style 
    const style = {
      badge: {fontSize: '2rem', color: 'black'}, 
      btn: {position: 'absolute', bottom: '2%', right: '4%'}
    }

    const ImageSrc = styled('span')({
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundSize: 'cover',
      backgroundPosition: 'center 40%',
      width: '100%',
      height: '100%', 
    });
    
    const ImageBackdrop = styled('span')(({ theme }) => ({
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: theme.palette.common.black,
      opacity: 0.4,
      transition: theme.transitions.create('opacity'),
    }));
  
    const navigate = useNavigate()

    const goToUser = () => {
        navigate('/recipes_app/comunity')
    }

    // Informacje dla użytkownika 
    const [openUser, setOpenUser] = useState(false)

    const handlerOpen = () => {
      setOpenUser(true)
    }

    const hadlerClose = () => {
      setOpenUser(false)
    }


  return (
    <div className='comunitydetails'>
      <div className="comunitydetails__length">Liczba posiłków użytkownika: <span style={{fontWeight: 'bold'}}>{nameUserParams.nameuser} </span>
      <Badge 
      badgeContent={lengthMeal} color="success">
        <DinnerDiningIcon
        style={style.badge}
        color="action" />
      </Badge>
      <Button
      style={{position: 'absolute', right: '2%'}}
      onClick={goToUser}
      variant='contained'>
            Powrót 
            <FastRewindIcon />
          </Button>
    </div>

      <div className="comunitydetails__box">
      
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 1, md: 2 }} > 
        <ThemeProvider theme={breakpoints}>
            {
              userIdEqual.map ((el, index) => {
                return (
                  <>
                  <Grid item xs={12} sm={12} md={4} key={index} style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '0em'}}>
                  <Myrecipecard>
                  <Card style={{ position: 'relative', width: '100%', height: '100%' }}>
                  <ImageSrc style={{ backgroundImage: `url(${el.image})` }} />
                <ImageBackdrop className="MuiImageBackdrop-root" />
                    
                  <Button 
                  theme={themeColor}
                  variant='contained'
                  style={style.btn}
                  onClick={handlerOpen}
                  >
                    Zobacz
                  </Button>
                </Card>
                </Myrecipecard>
                </Grid>

                <Dialog
                open={openUser}
                TransitionComponent={Transition}
                keepMounted
                onClose={hadlerClose}
                aria-describedby="alert-dialog-slide-description"
                >
                <DialogTitle>{"Testowanie"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button 
                variant='outlined'
                theme={themeColor}
                onClick={hadlerClose}>Anuluj</Button>
                <Button 
                theme={themeColor}
                variant='contained'
                onClick={hadlerClose}>Kontakt</Button>
                </DialogActions>
                </Dialog>
                </>
                )
              })
            }
        </ThemeProvider>
        </Grid>
        </Box>
          
        
      </div>
    </div>
  )
}
