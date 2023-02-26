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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function Addmeals({addMeals, closeAddMeals}) {

// Dodawanie Przepisu do Backendu

const [name_ingredients, setName_ingredients] = useState()
const [quantity, setQuantity] = useState()
const [ingredients, setIngredients] = useState()

const addingredients = () => {
    let test = []
    console.log(name_ingredients)
    test.push(name_ingredients)



    console.log(`${test} - `)
    
}

const addRecipes = async (e) => {
    e.preventDefault()

    try {

    }

    catch {

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
                multiline
                maxRows={4}
                variant="standard"
                />

                <TextField
                id="outlined-multiline-static"
                label="Sposób przyrządzenia"
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
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                variant="standard"
                />
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
                {ingredients}
                </Paper>
               

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
