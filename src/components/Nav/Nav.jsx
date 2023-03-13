import { Button } from '@mui/material';
import React, { useState } from 'react';
import Addmeals from '../Addmeals/Addmeals';
import Showmeals from '../Showmeals/Showmeals';
import './Nav.scss'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useNavigate } from 'react-router-dom';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function Nav() {

// Okno dodaj przepis
const [addMeals, setAddMeals] = useState(false)

const openAddMeals = () => {
    setAddMeals(true)
}
const closeAddMeals = () => {
    setAddMeals(false)
}


// Option 
const [openOption, setOpenOption] = useState(false)

const handleCloseOption = () => {
  setOpenOption(false)
}

const handleOpenOption = () => {
  setOpenOption(true)
}

// Przejście do społeczności 

const navigate = useNavigate()

const goToComunity = () => {
    navigate('/recipes_app/comunity')
}

  return (
    <div className='nav'>
          <div className="nav__header">
            <div className="nav__header-box">
                <Button
                style={{width: '150px'}}
                variant="contained"
                onClick={openAddMeals}
                >
                    Dodaj przepis
                </Button>
                <Button
                onClick={goToComunity}
                style={{width: '150px', marginLeft: '0.5em'}}
                variant="contained"
                >
                    Społeczność
                </Button>

                <Button
                style={{marginLeft: '0.5em'}}
                variant="contained"
                onClick={handleOpenOption}
                >
                    < FilterAltIcon />
                </Button>
            </div>
          </div>

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
              <FormControlLabel control={<Checkbox />} 
              label="Sortuj [A-Z]" />
              <FormControlLabel control={<Checkbox />} label="Disabled" />
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


            <Addmeals
            addMeals={addMeals}
            openAddMeals={openAddMeals}
            closeAddMeals={closeAddMeals}
            />
            <Showmeals
            />
    </div>
  )
}
