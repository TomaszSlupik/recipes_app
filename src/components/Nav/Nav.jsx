import { Button } from '@mui/material';
import React, { useState } from 'react';
import Addmeals from '../Addmeals/Addmeals';

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
    <div>
            <Button
            onClick={openAddMeals}
            >
                Dodaj przepis
            </Button>

            <Addmeals
            addMeals={addMeals}
            openAddMeals={openAddMeals}
            closeAddMeals={closeAddMeals}
            />
    </div>
  )
}
