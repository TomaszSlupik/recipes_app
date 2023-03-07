import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import TimerIcon from '@mui/icons-material/Timer';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import axios from '../../firebase/axios'
import {  ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {storage} from '../../firebase/config'
import Avatar from '@mui/material/Avatar';
import moment from 'moment/moment'
import './Addmeals.scss'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import { Card } from '@mui/material';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function Addmeals({addMeals, closeAddMeals}) {


const [namemeal, setNameMeal] = useState('')
const [prepare, setPrepare] = useState('')
const [time, setTime] = useState('')
const [dateAdd, setDataAdd] = React.useState(moment());

const handleChange = (newValue) => {
  setDataAdd(newValue);
};


const Input = styled(MuiInput)`
  width: 52px;
`;


const handleSliderChange = (event, newTime) => {
  setTime(newTime);
};

const handleInputChange = (event) => {
  setTime(event.target.value === '' ? '' : Number(event.target.value));
};

const handleBlur = () => {
  if (time < 0) {
    setTime(0);
  } else if (time > 300) {
    setTime(300);
  }
};

// Dodawanie składników do Karty 

const [name_ingredients, setName_ingredients] = useState()
const [quantity, setQuantity] = useState()
const [unit, setUnit] = useState()
const [ingredients, setIngredients] = useState([])
const [level, setLevel] = useState()

// Storage dla zdjęcia 
const [image, setImage] = useState(null)
const [url, setUrl] = useState('')

// // Dodanie zdjęcia do Storage
const addPhoto = () => {

  const now = moment()
  const nowFormat = now.format('YYYY-MM-DD-HH-MM-SS')

  
    const imageRef = ref(storage, `images${nowFormat}`)
    uploadBytes(imageRef, image).then(() => {
      getDownloadURL(imageRef)
      .then((url) => {
        setUrl (url)
      })
      .catch(err => {
        console.log(err.message, "Podaj URL")
      })
      setImage(null)
    })
    .catch((err) => {
      console.log(err.message)
    })
    
}
 

// Dodanie Nazwy, ilości i jednostki do karty "Przepis"
const addingredients = (e) => {
    e.preventDefault()
    const newIngredients = {
      name_ingredients: name_ingredients,
      quantity: quantity, 
      unit: unit
    }

    const allIngredients = [...ingredients, newIngredients]
    setIngredients(allIngredients)

    const erringredientsAlert = document.querySelector('.erringredientsAlert')
    erringredientsAlert.style.display = 'none'

}

const deleteIngredients = (id) => {
  const newArr = [...ingredients]
  const allMeal = newArr.filter(el => el.name_ingredients !== id)
  setIngredients(allMeal)
}

// Dodawanie Przepisu do Backendu 
// + walidacja na formularz
const [errNameMeal, setErrNameMeal] = useState('')
const [erringredients, setErrIngredients]  = useState('')
const [errPrepare, setErrPrepare] = useState('')
const [errTime, setErrTime] = useState('')
const [errLevel, setErrLevel] = useState('')
const [errUrl, setErrUrl] = useState('')


const navigate = useNavigate()

const addRecipes = async (e) => {
    e.preventDefault()
    if (namemeal === '') {
      setErrNameMeal('Proszę podać posiłek')
  }
  else if (erringredients === '') {
    setErrIngredients('Proszę wybrać składnik')
  }
  else if (errPrepare === '') {
    setErrPrepare('Proszę podać przepis')
  }
  else if (time === 0 || time === ''){
    setErrTime('Proszę podać czas')
  }
  else if (errLevel === '') {
    setErrLevel('Proszę wybrać stopień trudności')
  }
  else if (url === null) {
    setErrUrl('Proszę wczytać zdjęcie')
  }
  else {

          try {
            await axios.post('/recipes.json', {
              namemeal: namemeal, 
              prepare: prepare,
              time: time,
              name_ingredients: ingredients.map(el => el.name_ingredients),
              quantity: ingredients.map(el => el.quantity),
              unit: ingredients.map(el => el.unit),
              image: url, 
              level: level,
              data: dateAdd
            })
            setNameMeal('')
            setPrepare('')
            setTime('')
            setName_ingredients('')
            setQuantity('')
            setUnit('')
            setLevel('')
            setImage(null)
            setUrl('')
            closeAddMeals()
            navigate('/')
      }

      catch (ex) {
            console.log(ex.response)
      }
  }
    
}

// onchange
const handlerNameMeal = (e) => {
  e.preventDefault()
  setNameMeal(e.target.value)
  const errNameMealAlert = document.querySelector('.errNameMealAlert') 
  errNameMealAlert.style.display = 'none'
}

const handlerPrepare = (e) => {
  e.preventDefault()
  setPrepare(e.target.value)
  const errPrepareAlert = document.querySelector('.errPrepareAlert')
  errPrepareAlert.style.display = 'none'
}

const handlerLevel = (e) => {
    e.preventDefault()
    setLevel (e.target.value)
}


const style = {
  paper: {position: 'relative', display: 'flex', flexDirection: 'column', width: '100%'}
}


  return (
    <div className='addMeals'>
        <Dialog
        open={addMeals}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeAddMeals}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Dodaj przepis"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Przepis zostanie dodany do Bazy
              <div className="addMeals__namemeal">
                <TextField
                  id="standard-multiline-flexible"
                  label="Wpisz nazwę posiłku"
                  value={namemeal}
                  onChange={handlerNameMeal}
                  multiline
                  maxRows={4}
                  variant="standard"
                  />
                  {
                  errNameMeal === ''
                  ?
                  (
                    <div></div>
                  )
                  :
                  (<Alert 
                  className='errNameMealAlert'
                  severity="error">{errNameMeal}
                  </Alert>)
                  }
              </div>
                <div className='addMeals__box'>
                <Paper 
                style={style.paper}
                elevation={3}>
                <div className="addMeals__box-headerInfo">
                  W polu składnik wpisz samą nazwę składnika, w polu ilość wybierz ilość posiłku oraz wybierz jednostkę i kliknij przycisk dodaj.
                </div>
                <div className="addMeals__box-field">
                <TextField
                id="standard-multiline-flexible"
                label="Składnik"
                value={name_ingredients}
                onChange={e => setName_ingredients(e.target.value)}
                multiline
                maxRows={4}
                variant="standard"
                />

                <TextField
                id="standard-number"
                label="Ilość składników"
                value={quantity}
                onChange={e => setQuantity(e.target.value)}
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                variant="standard"
                />
                </div>
                  <div className="addMeals__box-add">
                  <FormControl 
                  style={{width: '60%'}}
                  sx={{ m: 2 }} variant="standard">
                      <InputLabel 
                      id="demo-customized-select-label">Jednostka</InputLabel>
                      <Select
                        labelId="demo-customized-select-label"
                        id="demo-customized-select"
                        value={unit}
                        onChange={e => setUnit(e.target.value)}
                        // input={<BootstrapInput />}
                      >
      
                        <MenuItem value="szt.">szt.</MenuItem>
                        <MenuItem value="g">g</MenuItem>
                        <MenuItem value="ml">ml</MenuItem>
                      </Select>
                    </FormControl>

                <Button
                variant='outlined'
                onClick={addingredients}
                >
                  Dodaj
                </Button>
                  </div>
                  </Paper>
                </div>
                <div>
                {
                  erringredients === '' ?
                  (<div></div>)
                  :
                  (<Alert 
                  className='erringredientsAlert'
                  severity="error">{erringredients}
                  </Alert>)
                }
                </div>
                <Paper 
                style={{minHeight: '150px', marginBottom: '0.4em'}}
                elevation={3}>
                Twoje składniki:
               
                    
                    <Table size="small" aria-label="a dense table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Składnik</TableCell>
                          <TableCell align="right">Ilość</TableCell>
                          <TableCell align="right">Jednostka</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                      {ingredients.map((el, index) => {
                  return (
                    
                          <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell component="th" scope="row">
                              {el.name_ingredients}
                            </TableCell>
                            <TableCell align="right">{el.quantity}</TableCell>
                            <TableCell align="right">{el.unit}</TableCell>
                            <TableCell align="right">
                              <DeleteIcon 
                              style={{cursor: 'pointer', color: 'red'}}
                              onClick={() => deleteIngredients(el.name_ingredients)}
                              />
                              </TableCell>
                          </TableRow>
                          )
                })}
                      </TableBody>
                    </Table> 
                </Paper>

                <div className="addMeals__prepare">
                  <TextField
                    sty={{width: '100%'}}
                    id="outlined-multiline-static"
                    label="Sposób przyrządzenia"
                    value={prepare}
                    onChange={handlerPrepare}
                    multiline
                    rows={4}
                    />
               </div>
              {
                errPrepare === '' 
                ?
                (
                  <div></div>
                )
                :
                (<Alert 
                className='errPrepareAlert'
                severity="error">{errPrepare}
                </Alert>)

              }
                <Box sx={{ width: 250 }}>
                  <Typography id="input-slider" gutterBottom>
                    Czas [min]
                  </Typography>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <TimerIcon />
                    </Grid>
                    <Grid item xs>
                      <Slider
                        value={typeof time === 'number' ? time : 0}
                        onChange={handleSliderChange}
                        aria-labelledby="input-slider"
                      />
                    </Grid>
                    <Grid item>
                      <Input
                        value={time}
                        size="small"
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        inputProps={{
                          step: 5,
                          min: 0,
                          max: 300,
                          type: 'number',
                          'aria-labelledby': 'input-slider',
                        }}
                      />
                    </Grid>
                  </Grid>
                  {
                  errTime === ''
                  ?
                  (
                    <div></div>
                  )
                  :
                  (<Alert 
                  severity="error">{errTime}
                  </Alert>)
                }

                </Box>

                <div className='addMeals__addPhoto'>
                  <Card>        
                <div className='addMeals__addPhoto-header'>Aby wczytać zdjęcię musisz kliknąć na kamerę i wybrać zdjęcię przepisu. Następnie kliknij dodaj zdjęcie</div>
                  {image !== null ? 
                    <div className='addMeals__addPhoto-info'>Zdjęcie zostało poprawnie wczytane, kliknij przycisk Dodaj</div>
                  : <div className='addMeals__addPhoto-add'>Dodaj zdjęcie</div>}
                  <IconButton color="primary" aria-label="upload picture" component="label">
                    <input hidden accept="image/*" type="file" 
                    onChange={e => setImage(e.target.files[0])}/>
                    <PhotoCamera 
                    onChange={e => setImage(e.target.files[0])}
                    />
                  </IconButton>
                  
                  <Button 
                  onClick={addPhoto}
                  variant="contained">Dodaj</Button>
                  <div className="addMeals__addPhoto-footer">
                   <Avatar style={{marginBottom: '0.5em', marginRight: '0.3em'}} alt={namemeal} src={url} />
                   {
                    url.startsWith('https://') && image !== null ?
                    <div>Jest Ok!</div>
                    :
                    <div>Wczytaj zdjęcie</div>
                  }
                  </div>
                 
                   {
                  errUrl === ''
                  ?
                  (
                    <div></div>
                  )
                  :
                  (<Alert 
                  severity="error">{errUrl}
                  </Alert>)
                }
                </Card>
                </div>
                <div className="addMeals__level">
                <FormControl 
                  style={{width: '60%'}}
                  sx={{ m: 2 }} variant="standard">
                <InputLabel 
                      id="demo-customized-select-label">Stopień trudności</InputLabel>
                      <Select
                        labelId="demo-customized-select-label"
                        id="demo-customized-select"
                        value={level}
                        onChange={handlerLevel}
                      >
                        <MenuItem value="easy">łatwy</MenuItem>
                        <MenuItem value="medium">średni</MenuItem>
                        <MenuItem value="hard">trudny</MenuItem>
                      </Select>
                </FormControl>
                {
                  errLevel === ''
                  ?
                  (
                    <div></div>
                  )
                  :
                  (<Alert 
                  severity="error">{errLevel}
                  </Alert>)
                }
                </div>
                <div className="addMeals__calendar">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Stack spacing={3}>
                    <DateTimePicker
                      label="Data utworzenia przepisu"
                      value={dateAdd}
                      onChange={handleChange}
                      renderInput={(params) => <TextField {...params} />}
                    />
                    </Stack>
                    </LocalizationProvider>
                </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
          variant="outlined"
          onClick={closeAddMeals}
          >Anuluj</Button>
          <Button 
          variant="contained"
          onClick={addRecipes}
          >Dodaj</Button>
        </DialogActions>
      </Dialog>

    </div>
  )
}
