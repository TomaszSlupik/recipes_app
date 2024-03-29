import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import axios from '../../firebase/axios'
import {  ref, uploadBytes, getDownloadURL } from "firebase/storage";
import moment from 'moment/moment'
import {storage} from '../../firebase/config'
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Avatar from '@mui/material/Avatar';
import './Editmeals.scss'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Stack from '@mui/material/Stack';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import useLogin from '../../hooks/useLogin';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from '@mui/material/Alert';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function Editmeals({id, clickMeal, editOpen, handleCloseEdit, clickImage}) {

const [changeNameMeal, setChangeNameMeal] = useState("")
const [changePrepare, setChangePrepare] = useState("")
const [changeTime, setChangeTime] = useState("")
const [changeUrl, setChangeUrl] = useState(clickImage)
const [changeKind, setChangeKind] = useState("")
const [changeLevel, setChangeLevel] = useState("")
const [changeData, setChangeData] = React.useState(moment());
const [user] = useLogin()
// Zmiana daty
const handleChange = (newValue) => {
  setChangeData(newValue)
}

// Edycja i dodanie składników 
const [changeNameIngredients, setchangeNameIngredients] = useState()
const [changeQuantity, setChangeQuantity] = useState()
const [changeUnit, setChangeUnit] = useState()
const [changeAllIngredients, setchangeAllIngredients] = useState([])

const editIngredients = (e) => {
  e.preventDefault()
  const newIngredients = {
    changeNameIngredients: changeNameIngredients,
    changeQuantity: changeQuantity, 
    changeUnit: changeUnit
  }

  const allIngredients = [...changeAllIngredients, newIngredients]
  setchangeAllIngredients(allIngredients)

}


const deleteIngredients = (name) => {
      const newArr = [...changeAllIngredients]
      setchangeAllIngredients(newArr.filter (el => el.changeNameIngredients !== name))
      
}

// Walidacja 
const [errChangeNameMeal, setErrChangeNameMeal] = useState("")
const [errChangeAllIngredients, setErrChangeAllIngredients] = useState("")
const [errChangePrepare, setErrChangePrepare] = useState("")
const [errChangeTime, setErrChangeTime] = useState("")
const [errChangeKind, setErrChangeKind] = useState("")
const [errChangeLevel, setErrChangeLevel] = useState("")

const saveEditMeal = () => {
  if (changeNameMeal === "") {
    setErrChangeNameMeal("Podaj nową nazwę posiłku")
  }
  else if (changeAllIngredients.length === 0) {
    setErrChangeAllIngredients("Podaj składniki do edytowanego posiłku")
  }
  else if (changePrepare === "") {
    setErrChangePrepare("Podaj nowy przepis")
  }
  else if (changeTime === "") {
    setErrChangeTime("Podaj czas")
  }
  else if (changeKind === "") {
    setErrChangeKind('Wybierz rodzaj posiłku')
  }
  else if (changeLevel === "") {
    setErrChangeLevel("Wybierz stopień trudności")
  }
  else {
    editThisMeal()
  }
}

// Edycja całego przepisu
const editThisMeal = async () => {
    try { 
      await axios.put(`/recipes/${id}.json` , {
      namemeal: changeNameMeal, 
      name_ingredients: changeNameIngredients,
      quantity: changeQuantity,
      unit: changeUnit,
      prepare: changePrepare,
      time: changeTime,
      image: changeUrl, 
      kind: changeKind,
      level: changeLevel,
      data: changeData, 
      userId: user.localId
    })
    window.location.reload(true)
    }
    catch (ex) {
        console.log(ex.respone)
    }
    handleCloseEdit()
}

// Upload zdjęcia 
const [changeImage, setChangeImage] = useState(null)

const changeAddPhoto = () => {
  const now = moment()
  const nowFormat = now.format('YYYY-MM-DD-HH-MM-SS')

  const imageRef = ref(storage, `images${nowFormat}`)
    uploadBytes(imageRef, changeImage).then(() => {
      getDownloadURL(imageRef)
      .then((changeUrl) => {
        setChangeUrl (changeUrl)
      })
      .catch(err => {
        console.log(err.message, "Podaj URL")
      })
      setChangeImage(null)
    })
    .catch((err) => {
      console.log(err.message)
    })
}

  return (
    <div className='editmeals'>
      <Dialog
        fullScreen
        open={editOpen}
        onClose={handleCloseEdit}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseEdit}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Edytuj
            </Typography>
            <Button autoFocus color="inherit" onClick={saveEditMeal}>
              Zapisz
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem>
            <ListItemText primary={`Przepis "${clickMeal}"`} 
            secondary={
            <TextField 
            onChange={(e) => setChangeNameMeal(e.target.value)}
            id="standard-basic" label="Nowy przepis" variant="standard" />
            }/>
          </ListItem>
          {
            changeNameMeal === "" ?
            (
              <div className='editmeals__errNameMeal'>{errChangeNameMeal}</div>
            )
            :
            (
              <div></div>
            )
          }
          <Divider />
    
                <div className="addMeals__box-headerInfo">
                  W polu składnik wpisz samą nazwę składnika, w polu ilość wybierz ilość posiłku oraz wybierz jednostkę i kliknij przycisk dodaj.
                </div>
                <div className="editmeals__boxingredients">
                <TextField
                id="standard-multiline-flexible"
                label="Składnik"
                value={changeNameIngredients}
                onChange={e => setchangeNameIngredients(e.target.value)}
                multiline
                maxRows={4}
                variant="standard"
                />
                <TextField
                id="standard-number"
                step="0.1"
                label="Ilość składników"
                value={changeQuantity}
                onChange={e => setChangeQuantity(e.target.value)}
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                variant="standard"
                />
                </div>
                  <div className="editmeals__unitBtn">
                  <FormControl 
                  style={{width: '60%'}}
                  sx={{ m: 2 }} variant="standard">
                      <InputLabel 
                      id="demo-customized-select-label">Jednostka</InputLabel>
                      <Select
                      defaultValue=""
                        labelId="demo-customized-select-label"
                        id="demo-customized-select"
                        value={changeUnit}
                        onChange={e => setChangeUnit(e.target.value)}
                        // input={<BootstrapInput />}
                      >
                        <MenuItem value="szklanka">szklanka</MenuItem>
                        <MenuItem value="łyżka">łyżka</MenuItem>
                        <MenuItem value="szt.">szt.</MenuItem>
                        <MenuItem value="g">g</MenuItem>
                        <MenuItem value="kg">kg</MenuItem>
                        <MenuItem value="ml">ml</MenuItem>
                        <MenuItem value="l">l</MenuItem>
                      </Select>
                    </FormControl>

                <Button
                variant='outlined'
                onClick={editIngredients}
                >
                  Dodaj
                </Button>
                  </div>
                      <div className="editmeals__info">
                      Twoje składniki:
                      </div>
                  {
                    changeAllIngredients.length === 0 ?
                    <div className='editmeals__infoErr'>Aktualnie brak edytowanych nowych składników</div>
                    :
                    (
                        <Table 
                        
                        size="small" aria-label="a dense table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Składnik</TableCell>
                            <TableCell align="right">Ilość</TableCell>
                            <TableCell align="right">Jednostka</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                            {changeAllIngredients.map((el, index) => {
                          return (
                            <TableRow
                              key={index}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <TableCell component="th" scope="row">
                                {el.changeNameIngredients}
                              </TableCell>
                              <TableCell align="right">{el.changeQuantity}</TableCell>
                              <TableCell align="right">{el.changeUnit}</TableCell>
                              <TableCell align="right">
                                <DeleteIcon 
                                style={{cursor: 'pointer', color: 'red'}}
                                onClick={() => deleteIngredients(el.changeNameIngredients)}
                                />
                                </TableCell>
                            </TableRow>
                            )
                          })}
                        </TableBody>
                      </Table>  
                    )
                  }
                  {
                    changeAllIngredients.length === 0 ?
                    (
                      <div className='editmeals__info-errAll'>{errChangeAllIngredients}</div>
                    )
                    :
                    (
                      <div></div>
                    )
                  }
               
          <Divider />
          <ListItem>
            <ListItemText
              primary="Sposób przyrządzenia "
              secondary={
                <TextField
                sty={{width: '100%'}}
                id="outlined-multiline-static"
                label="Nowy sposób"
                value={changePrepare}
                onChange={e=> setChangePrepare(e.target.value)}
                multiline
                rows={4}
                />
              }
            />
          </ListItem>
            {
              changePrepare === "" ?
              (
                <div className='editmeals__errChangePrepare'>{errChangePrepare}</div>
              )
              :
              (
                <div></div>
              )
            }

          <Divider />
          <ListItem>
            <ListItemText primary={`Czas [min]`} 
            secondary={
            <TextField 
            value={changeTime}
            onChange={(e) => setChangeTime(e.target.value)}
            id="standard-basic" label="Nowy czas" variant="standard" />
            }/>
          </ListItem>
          {
            changeTime === "" ?
            (<div className='editmeals__errChangeTime'>{errChangeTime}</div>)
            :
            (<div></div>)
          }
          <Divider />
          <div className="editmeals__defaulttextcamera">
            Domyślnie ustawione jest stare zdjęcie. Aby wczytać nowe zdjęcię musisz kliknąć na kamerę i wybrać zdjęcię przepisu. Następnie kliknij dodaj zdjęcie. Jeżeli zdjęcie pojawi się w miniaturce oznacza to, że zdjęcie zostało wczytane poprawnie
          </div>
          <div className='editmeals__textCamera'>Kliknij na kamerę i dodaj zdjęcie</div>
          <div className="editmeals__boxCamera">
              Dodaj zdjęcie
              <IconButton color="primary" aria-label="upload picture" component="label">
              <input hidden accept="image/*" type="file"
                onChange={e => setChangeImage(e.target.files[0])}/>
                <PhotoCamera 
                onChange={e => setChangeImage(e.target.files[0])}
                />
              </IconButton>
              <Button 
              onClick={changeAddPhoto}
              variant="contained">Dodaj</Button>
          </div>
          <div className="editmeals__avatar">
              <Avatar alt={changeNameMeal} src={changeUrl} />
          </div>
          <Divider />
          <div className="editmeals__kind">
          <FormControl 
                  style={{width: '60%'}}
                  sx={{ m: 2 }} variant="standard">
                <InputLabel 
                      id="demo-customized-select-label">Rodzaj posiłku</InputLabel>
                      <Select
                        labelId="demo-customized-select-label"
                        id="demo-customized-select"
                        value={changeKind}
                        onChange={e => setChangeKind(e.target.value)}
                      >
                        <MenuItem value="Przystawka zimna">Przystawka zimna</MenuItem>
                        <MenuItem value="Przystawka ciepła">Przystawka ciepła</MenuItem>
                        <MenuItem value="Zupa">Zupa</MenuItem>
                        <MenuItem value="Danie główne">Danie główne</MenuItem>
                        <MenuItem value="Desery">Desery</MenuItem>
                      </Select>
                </FormControl>
          </div>
          {
            changeKind === "" ?
            (
              <div className='editmeals__errChangeKind'>{errChangeKind}</div>
            )
            :
            (
              <div></div>
            )
          }
          <Divider />
            <div className="editmeals__level">
            <FormControl 
                  style={{width: '60%'}}
                  sx={{ m: 2 }} variant="standard">
                <InputLabel 
                      id="demo-customized-select-label">Stopień trudności</InputLabel>
                      <Select
                        labelId="demo-customized-select-label"
                        id="demo-customized-select"
                        value={changeLevel}
                        onChange={e => setChangeLevel(e.target.value)}
                      >
                        <MenuItem value="łatwy">łatwy</MenuItem>
                        <MenuItem value="średni">średni</MenuItem>
                        <MenuItem value="trudny">trudny</MenuItem>
                      </Select>
                </FormControl>
            </div>
              {
                changeLevel === "" ?
                (
                  <div className='editmeals__errChangeLevel'>{errChangeLevel}</div>
                )
                :
                (
                  <div></div>
                )
              }
          <Divider />
          <div className="editmeals__calendar">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack spacing={3}>
            <DateTimePicker
              label="Data utworzenia przepisu"
              value={changeData}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />
            </Stack>
            </LocalizationProvider>
          </div>
        </List>
      </Dialog>
    </div>
  )
}
