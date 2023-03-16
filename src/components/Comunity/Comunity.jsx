import React, { useEffect, useState } from 'react'
import './Comunity.scss'
import PeopleIcon from '@mui/icons-material/People';
import axios from '../../firebase/axios'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { useNavigate} from 'react-router-dom';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import { ThemeProvider } from '@emotion/react';
import breakpoints from '../../theme/breakpoints'
import Myicon from '../../styles/myicon'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function Comunity() {


    const [users, setUsers] = useState([])
    const [allrecipes, setAllrecipes] = useState([])
    // // Odczyt wszystkich uczestników z Backendu 

    const readAllUser = async () => {
        try {
            const res = await axios.get('/users.json')

            const allUser = []

            for (const key in res.data) {
                allUser.push({...res.data[key], id: key})
            }
            setUsers(allUser)
        }
        catch (ex){
            console.log(ex.response)
        }
    }

    
    // Odczyt całej bazy 
    const readData  = async () => {
        try {
            const res = await axios.get('/recipes.json')

            const newRecipes = []

            for (const key in res.data) {
                newRecipes.push({...res.data[key], id: key})
            }
            
            setAllrecipes(newRecipes)
        }

        catch (ex) {
            console.log(ex.response)
        }
    } 

    useEffect(() => {
        readAllUser()
        readData()
    }, [])

    let navigate = useNavigate()
    // Przechwytywanie informacji o nazwie i ID 
    const [comunityUserId, setComunityUserID] = useState()
    const [comunityName, setComunityName] = useState("")
   
    
    const clickUserId = (id, name) => {
            setComunityUserID(id)
            setComunityName(name)
            navigate(`/recipes_app/comunity/${comunityName}`)
    }     
    
    const navigateTwo = useNavigate()

    const goToBack = () => {
      navigateTwo('/recipes_app')

    }


    
// Option 

const [openOption, setOpenOption] = useState(false)
const [sortAZ, setSortAZ] = useState(false)
const [sortZA, setSortZA] = useState(false)
const [disabledAZ, setDisabledAZ] = useState(false)
const [disabledZA, setDisabledZA] = useState(false)

// Blokowanie innych przycisków po kliknięciu 
const handlerClickSortAZ = (e) => {
  setSortAZ(e.target.checked)
  if (sortAZ === true) {
    setDisabledZA(false)
  }
  else {
    setDisabledZA(true)
  }
}

const handlerClickSortZA = (e) => {
  setSortZA(e.target.checked)
  if (sortZA === true) {
    setDisabledAZ(false)
  }
  else {
    setDisabledAZ(true)
  }
}


// Sortownaie 
const handlerSortUSerAZ = () => {
      users.sort((a,b) => a.nameUser < b.nameUser ? -1 : 1)
}

const handlerSortUSerZA = () => {
    users.sort((a, b) => a.nameUser < b.nameUser ? 1 : -1)
}

const handleCloseOption = () => {
  if (sortAZ === true) {
    handlerSortUSerAZ()
  }
  else if (sortZA === true) {
    handlerSortUSerZA()
  }
  setOpenOption(false)
}

const handleOpenOption = () => {
  setSortAZ(false)
  setSortZA(false)
  setDisabledAZ(false)
  setDisabledZA(false)
  setOpenOption(true)
}


  return (
    <div className='comunity'>
        <div className="comunity__headerBox">
        <div className="comunity__headerBox-header">
            Lista wszystkich użytkowników 
            <ThemeProvider theme={breakpoints}>
              <Myicon>
                <PeopleIcon style={{marginLeft: '0.4em', fontSize: '100%'}}/>
              </Myicon>
            </ThemeProvider>
            
        </div>
        <img src={process.env.PUBLIC_URL + window.innerWidth  < 576 ? '/recipes_app/img/computer.jpg' : '/recipes_app/img/computerBig.jpg'} alt="" className="comunity__headerBox-img" />
        </div>
        <div className="comunity__textBack">
          <div className="comunity__textBack-btn">
              <div className="comunity__textBack-btn--click">
              <Button
              variant='contained'
              onClick={goToBack}
              >
                Powrót 
                <FastRewindIcon />
              </Button>
              </div>
          </div>
        </div>
        <div className="comunity__info">
          Aby znaleźć się na liście użytkowników, przejdź do panelu profil i podaj swoją nazwę użytkownika.
        </div>
        <div className="comunity__users">
               <Table size="small" aria-label="a dense table">
                      <TableHead>
                        <TableRow>
                          <TableCell style={{fontWeight: '700'}}>Użytkownicy
                          <Button
                          style={{marginLeft: '0.5em'}}
                          variant="contained"
                          onClick={handleOpenOption}
                          >
                              < FilterAltIcon />
                          </Button>
                          <Dialog
                            open={openOption}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={handleCloseOption}
                            aria-describedby="alert-dialog-slide-description"
                          >
                            <DialogTitle>{"Opcje wyświetlania"}</DialogTitle>
                            <DialogContent>
                              <DialogContentText id="alert-dialog-slide-description">
                              <FormGroup>
                              <FormControlLabel control={
                              <Checkbox 
                              disabled={disabledAZ}
                              checked={sortAZ}
                              onChange={handlerClickSortAZ}   
                              />} 
                              label="Sortuj [A-Z]" />
                              <FormControlLabel control={
                              <Checkbox 
                              checked={sortZA}
                              disabled={disabledZA}
                              onChange={handlerClickSortZA}
                              />} label="Sortuj [Z-A]" />
                            </FormGroup>
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <Button 
                              variant='outlined'
                              onClick={handleCloseOption}>Anuluj</Button>
                              <Button
                              variant='contained'
                              onClick={handleCloseOption}>Akcteptuję</Button>
                            </DialogActions>
                          </Dialog>
                          
                          </TableCell>
                          <TableCell align="right"> Lista przepisów</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                      {users.map((el, index) => {
                  return (
                    
                          <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell component="th" scope="row">
                              {el.nameUser}
                            </TableCell>
                            <TableCell align="right" component="th" scope="row">
                              <Button
                              onClick={(e) => clickUserId(el.userId, el.nameUser)}
                              variant='outlined'
                              >
                                Zobacz
                              </Button>
                            </TableCell>
                          </TableRow>
                          )
                })}
                      </TableBody>
                    </Table> 
        </div>
    </div>
  )
}
