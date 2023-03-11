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
import { async } from '@firebase/util';
import { click } from '@testing-library/user-event/dist/click';
import useLogin from '../../hooks/useLogin';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function Editmeals({id, clickMeal, editOpen, handleCloseEdit, clickImage}) {

const [changeNameMeal, setChangeNameMeal] = useState()
const [changePrepare, setChangePrepare] = useState()
const [changeTime, setChangeTime] = useState()
const [changeUrl, setChangeUrl] = useState(clickImage)
const [changeKind, setChangeKind] = useState()
const [changeLevel, setChangeLevel] = useState()
const [changeData, setChangeData] = React.useState(moment());
const [user] = useLogin()
// Zmiana daty
const handleChange = (newValue) => {
  setChangeData(newValue)
}


// Edycja całego przepisu
const editThisMeal = async () => {
    try { 
      await axios.put(`/recipes/${id}.json` , {
      namemeal: changeNameMeal, 
      name_ingredients: 'haha',
      quantity: 'hahaha',
      unit: 'wow',
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
            <Button autoFocus color="inherit" onClick={editThisMeal}>
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
          <Divider />
              
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
          <Divider />
          <ListItem>
            <ListItemText primary={`Czas [min]`} 
            secondary={
            <TextField 
            onChange={(e) => setChangeTime(e.target.value)}
            id="standard-basic" label="Nowy czas" variant="standard" />
            }/>
          </ListItem>
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
                        <MenuItem value="appetizerCold">Przystawka zimna</MenuItem>
                        <MenuItem value="appetizerHot">Przystawka ciepła</MenuItem>
                        <MenuItem value="soup">Zupa</MenuItem>
                        <MenuItem value="mainMeal">Danie główne</MenuItem>
                        <MenuItem value="mainMeal">Desery</MenuItem>
                      </Select>
                </FormControl>
          </div>
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
                        <MenuItem value="easy">łatwy</MenuItem>
                        <MenuItem value="medium">średni</MenuItem>
                        <MenuItem value="hard">trudny</MenuItem>
                      </Select>
                </FormControl>
            </div>
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
