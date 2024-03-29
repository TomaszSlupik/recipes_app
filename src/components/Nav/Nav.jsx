import { Button } from '@mui/material';
import React, { useState } from 'react';
import Addmeals from '../Addmeals/Addmeals';
import Showmeals from '../Showmeals/Showmeals';
import './Nav.scss'
import { useNavigate } from 'react-router-dom';

export default function Nav() {

// Okno dodaj przepis
const [addMeals, setAddMeals] = useState(false)

const openAddMeals = () => {
    setAddMeals(true)
}
const closeAddMeals = () => {
    setAddMeals(false)
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
            </div>
          </div>
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
