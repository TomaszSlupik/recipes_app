import { Button } from '@mui/material';
import React, { useState } from 'react';
import Addmeals from '../Addmeals/Addmeals';
import Showmeals from '../Showmeals/Showmeals';
import './Nav.scss'

export default function Nav() {

// Okno dodaj przepis
const [addMeals, setAddMeals] = useState(false)

const openAddMeals = () => {
    setAddMeals(true)
}
const closeAddMeals = () => {
    setAddMeals(false)
}



  return (
    <div className='nav'>
          <div className="nav__header">
          <Button
            variant="contained"
            onClick={openAddMeals}
            >
                Dodaj przepis
            </Button>
            <Button
            style={{marginLeft: '0.5em'}}
            variant="contained"
            >
                Opcje
            </Button>

          </div>
            <Addmeals
            addMeals={addMeals}
            openAddMeals={openAddMeals}
            closeAddMeals={closeAddMeals}
            />
            <Showmeals />
    </div>
  )
}
