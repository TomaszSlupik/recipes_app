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

// Edycja i dodanie sk??adnik??w 
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

// Edycja ca??ego przepisu
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

// Upload zdj??cia 
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
    
                <div className="addMeals__box-headerInfo">
                  W polu sk??adnik wpisz sam?? nazw?? sk??adnika, w polu ilo???? wybierz ilo???? posi??ku oraz wybierz jednostk?? i kliknij przycisk dodaj.
                </div>
                <div className="editmeals__boxingredients">
                <TextField
                id="standard-multiline-flexible"
                label="Sk??adnik"
                value={changeNameIngredients}
                onChange={e => setchangeNameIngredients(e.target.value)}
                multiline
                maxRows={4}
                variant="standard"
                />
                <TextField
                id="standard-number"
                step="0.1"
                label="Ilo???? sk??adnik??w"
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
                        <MenuItem value="??y??ka">??y??ka</MenuItem>
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
                      Twoje sk??adniki:
                      </div>
                  {
                    changeAllIngredients.length === 0 ?
                    <div className='editmeals__infoErr'>Aktualnie brak edytowanych nowych sk??adnik??w</div>
                    :
                    (
                        <Table 
                        
                        size="small" aria-label="a dense table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Sk??adnik</TableCell>
                            <TableCell align="right">Ilo????</TableCell>
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
               
          <Divider />
          <ListItem>
            <ListItemText
              primary="Spos??b przyrz??dzenia "
              secondary={
                <TextField
                sty={{width: '100%'}}
                id="outlined-multiline-static"
                label="Nowy spos??b"
                // value={changePrepare}
                // onChange={e=> setChangePrepare(e.target.value)}
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
            Domy??lnie ustawione jest stare zdj??cie. Aby wczyta?? nowe zdj??ci?? musisz klikn???? na kamer?? i wybra?? zdj??ci?? przepisu. Nast??pnie kliknij dodaj zdj??cie. Je??eli zdj??cie pojawi si?? w miniaturce oznacza to, ??e zdj??cie zosta??o wczytane poprawnie
          </div>
          <div className='editmeals__textCamera'>Kliknij na kamer?? i dodaj zdj??cie</div>
          <div className="editmeals__boxCamera">
              Dodaj zdj??cie
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
                      id="demo-customized-select-label">Rodzaj posi??ku</InputLabel>
                      <Select
                        labelId="demo-customized-select-label"
                        id="demo-customized-select"
                        value={changeKind}
                        onChange={e => setChangeKind(e.target.value)}
                      >
                        <MenuItem value="Przystawka zimna">Przystawka zimna</MenuItem>
                        <MenuItem value="Przystawka ciep??a">Przystawka ciep??a</MenuItem>
                        <MenuItem value="Zupa">Zupa</MenuItem>
                        <MenuItem value="Danie g????wne">Danie g????wne</MenuItem>
                        <MenuItem value="Desery">Desery</MenuItem>
                      </Select>
                </FormControl>
          </div>
          <Divider />
            <div className="editmeals__level">
            <FormControl 
                  style={{width: '60%'}}
                  sx={{ m: 2 }} variant="standard">
                <InputLabel 
                      id="demo-customized-select-label">Stopie?? trudno??ci</InputLabel>
                      <Select
                        labelId="demo-customized-select-label"
                        id="demo-customized-select"
                        value={changeLevel}
                        onChange={e => setChangeLevel(e.target.value)}
                      >
                        <MenuItem value="??atwy">??atwy</MenuItem>
                        <MenuItem value="??redni">??redni</MenuItem>
                        <MenuItem value="trudny">trudny</MenuItem>
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
