import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
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
import useLogin from '../../hooks/useLogin'
import simpleaxios from 'axios';
import {  ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {storage} from '../../firebase/config'
import Avatar from '@mui/material/Avatar';



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function Addmeals({addMeals, closeAddMeals}) {


const [namemeal, setNameMeal] = useState('')
const [prepare, setPrepare] = useState('')
const [time, setTime] = useState('')

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
const [login] = useLogin()
const [name_ingredients, setName_ingredients] = useState()
const [quantity, setQuantity] = useState()
const [unit, setUnit] = useState()
const [ingredients, setIngredients] = useState([])

// Storage dla zdjęcia 
const [image, setImage] = useState(null)
const [url, setUrl] = useState(null)


const addPhoto = () => {
    const imageRef = ref(storage, 'image')
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
}

const deleteIngredients = (id) => {
  const newArr = [...ingredients]
  const allMeal = newArr.filter(el => el.name_ingredients !== id)
  setIngredients(allMeal)
}

// Dodawanie Przepisu do Backendu 
const addRecipes = async (e) => {
    e.preventDefault()
       try {
            await axios.post('/recipes.json', {
              namemeal: namemeal, 
              prepare: prepare,
              time: time,
              name_ingredients: ingredients.map(el => el.name_ingredients),
              quantity: ingredients.map(el => el.quantity),
              unit: ingredients.map(el => el.unit),
              image: url, 
            })
            closeAddMeals()
       }

       catch (ex) {
            console.log(ex.response)
       }
    
}


  return (
    <div>
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
                <TextField
                id="standard-multiline-flexible"
                label="Nazwa posiłku"
                value={namemeal}
                onChange={e => setNameMeal(e.target.value)}
                multiline
                maxRows={4}
                variant="standard"
                />

                <TextField
                id="outlined-multiline-static"
                label="Sposób przyrządzenia"
                value={prepare}
                onChange={e=> setPrepare(e.target.value)}
                multiline
                rows={4}
                />
                <div>
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

              <FormControl sx={{ m: 1 }} variant="standard">
                      <InputLabel id="demo-customized-select-label">Jednostka</InputLabel>
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

                <Fab
                color="primary"
                onClick={addingredients}
                >
                <AddIcon       
                />
                </Fab>
                </div>

                <Paper 
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
                </Box>

                <div>
                  Dodaj zdjęcie
                  <IconButton color="primary" aria-label="upload picture" component="label">
                    <input hidden accept="image/*" type="file" 
                    onChange={e => setImage(e.target.files[0])}/>
                    <PhotoCamera 
                    onChange={e => setImage(e.target.files[0])}
                    />
                  </IconButton>
                  <div>Kliknij na kamerę i dodaj zdjęcie</div>
                  <Button 
                  onClick={addPhoto}
                  variant="contained">Dodaj</Button>
                   <Avatar alt={namemeal} src={url} />
                </div>
                


          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
          onClick={closeAddMeals}
          >Anuluj</Button>
          <Button 
          onClick={addRecipes}
          >Dodaj</Button>
          
        </DialogActions>
      </Dialog>

    </div>
  )
}
