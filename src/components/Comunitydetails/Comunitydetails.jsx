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
import { styled, alpha } from '@mui/material/styles';
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
import Myiconmeals from '../../styles/myicon';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

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
      badge: {fontSize: '100%', color: 'black'}, 
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

    const Search = styled('div')(({ theme }) => ({
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: '#fff',
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
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
        [theme.breakpoints.up('md')]: {
          width: '20ch',
        },
      },
    }));
    
  
    const navigate = useNavigate()

    const goToUser = () => {
        navigate('/recipes_app/comunity')
    }

    // Informacje dla użytkownika 
    const [openUser, setOpenUser] = useState(false)
    const [nameMealShowInfo, setNameMealShowInfo] = useState()
    const [prepareMealShowInfo, setPrepareMealShowInfo] = useState()

    const handlerOpen = (e, name, prepare) => {
      e.preventDefault()
      setNameMealShowInfo(name)
      setPrepareMealShowInfo(prepare)
      setOpenUser(true)
    }

    const hadlerClose = () => {
      setOpenUser(false)
    }

// Filtrowanie po rodzaju posiłku 
const [openKind, setOpenKind] = useState(false)

const [appetizerColdLabel, setAppetizerColdLabel] = useState("Przystawka zimna")
const [appetizerCold, setAppetizerCold] = useState(false)
const [disabledAppetizerCold, setDisabledAppetizerCold] = useState(false)

const [appetizerHotLabel, setAppetizerHotLabel] = useState("Przystawka ciepła")
const [appetizerHot, setAppetizerHot] = useState(false)
const [disabledAppetizerHot, setDisabledAppetizerHot] = useState(false)

const [soupLabel, setSoupLabel] = useState("Zupa")
const [soup, setSoup] = useState(false)
const [disabledSoup, setDisabledSoup] = useState(false)

const [mainMeal, setMainMeal] = useState(false)
const [disabledMainMeal, setDisabledMainMeal] = useState(false)

const [desert, setDesert] = useState(false)
const [disabledDesert, setDisabledDesert] = useState(false)

const handlerOpenKind = () => {
      setOpenKind(true)
}

const handlerCloseKind = () => {
    setOpenKind(false)
} 

const mealClickUser = []

const clickTrue = true
const handlerAcceptFilter = () => {
  switch (clickTrue) {
    case (appetizerCold): 
      mealClickUser.push(`${appetizerCold}Przystawka zimna`)
    case (appetizerHot):
      mealClickUser.push(`${appetizerHot}Przystawka ciepła`)
    case (soup):
      mealClickUser.push(`${soup}Zupa`)
    default:
      console.log('Działaa')
  }

  function el (mealClickUser) {
    return mealClickUser.startsWith('true')
  }
  const allClickUser = mealClickUser.filter(el).map(el => el.substr(4))
  console.log(allClickUser)


  const idString = usercurrentID.toString()
  const userIdEqual = userCurrentData.filter(el => el.userId === idString)
  console.log(userIdEqual)


  const newArr = userIdEqual.filter(el => el.kind === allClickUser.toString())
  console.log(newArr)
  setOpenKind(false)
}

const handlerClickAppetizerCold = (e) => {
  setAppetizerCold(e.target.checked)
}

const handlerClickAppetizerHot = (e) => {
  setAppetizerHot(e.target.checked)
}

const handlerClickSoup = (e) => {
    setSoup(e.target.checked)
}

  return (
    <div className='comunitydetails'>
      <div className="comunitydetails__length">Liczba posiłków użytkownika: <span style={{fontWeight: 'bold'}}>{nameUserParams.nameuser} </span>
      <ThemeProvider theme={breakpoints}>
        <Myiconmeals>
        <Badge 
        badgeContent={lengthMeal} color="success">
        <DinnerDiningIcon
        style={style.badge}
        color="action" />
      </Badge>
        </Myiconmeals>
      </ThemeProvider>
      <Button
      style={{position: 'absolute', right: '2%'}}
      onClick={goToUser}
      variant='contained'>
            Powrót 
            <FastRewindIcon />
          </Button>
    </div>
    <div className="comunitydetails__choiceMeal">
      <Paper
      style={{width: '100%', height: '100%', backgroundColor: '#21415b'}}
      elevation={3}
      >
        <div className="comunitydetails__choiceMeal-search">
        <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
        </Search>
        </div>
        <div className="comunitydetails__choiceMeal-btn">
        <Button
        color='secondary'
        variant="contained"
        onClick={handlerOpenKind}
        >
            < FilterAltIcon />
        </Button>
        </div>
      </Paper>
    
       <Dialog
        open={openKind}
        TransitionComponent={Transition}
        keepMounted
        onClose={handlerCloseKind}
        aria-describedby="alert-dialog-slide-description"
        >
        <DialogTitle>Filtrowanie</DialogTitle>
        <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          <FormGroup>
      <FormControlLabel control={<Checkbox 
      disabled={disabledAppetizerCold}
      checked={appetizerCold}
      onChange={handlerClickAppetizerCold}
      />} label={appetizerColdLabel} />
      <FormControlLabel control={<Checkbox 
      disabled={disabledAppetizerHot}
      checked={appetizerHot}
      onChange={handlerClickAppetizerHot}
      />} label={appetizerHotLabel} />
      <FormControlLabel control={<Checkbox 
      checked={soup}
      onChange={handlerClickSoup}
      disabled={disabledSoup}
      />} label={soupLabel} />
      <FormControlLabel control={<Checkbox 
      disabled={disabledMainMeal}
       />} label="Danie główne" />
      <FormControlLabel control={<Checkbox 
      disabled={disabledDesert}
       />} label="Desery" />
    </FormGroup>
        </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button 
        variant='outlined'
        theme={themeColor}
        onClick={handlerCloseKind}>Anuluj</Button>
        <Button 
        theme={themeColor}
        variant='contained'
        onClick={handlerAcceptFilter}>Akcteptuję</Button>
        </DialogActions>
        </Dialog>
        
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
                  onClick={(e) => handlerOpen(e, el.namemeal, el.prepare)}
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
                <DialogTitle>{`Przepis ${nameMealShowInfo}`}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  {prepareMealShowInfo}
                </DialogContentText>
                </DialogContent>
                <DialogActions>
            
                <Button 
                theme={themeColor}
                variant='contained'
                onClick={hadlerClose}>Powrót</Button>
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
