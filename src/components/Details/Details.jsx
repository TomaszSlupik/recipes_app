import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../../firebase/axios'
import './Details.scss'
import { styled } from '@mui/material/styles';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import SpeedIcon from '@mui/icons-material/Speed';
import TimerIcon from '@mui/icons-material/Timer';
import Button from '@mui/material/Button';
import FastRewindIcon from '@mui/icons-material/FastRewind';


export default function Details() {


      // Pobieranie danych z Backendu 
      const [allrecipes, setAllrecipes] = useState([])
      const readData  = async () => {
          try {
              const res = await axios.get('/recipes.json')
  
              const newRecipes = []

              for (const key in res.data) {
                  newRecipes.push({...res.data[key], id: key})
              }
              setAllrecipes(newRecipes)
          }
  
          catch (ex) {
              console.log(ex.response)
          }
      } 
  
      useEffect(() => {
          readData()
      }, [])

          // Wyznaczenie szczegółów konkretnego przepisu
    const  nameIdMeals = useParams()
    const oneRecipe = allrecipes.filter(el => el.namemeal === nameIdMeals.name)

   
    // --nazwa posiłku
    const namemeal = oneRecipe.map((el => el.namemeal))
    const namemealtoString = namemeal.toString()

    // --przygotowanie posiłku
    const prepare = oneRecipe.map((el => el.prepare))
    const preparetoString = prepare.toString()
    
    // --obrazek posiłku 
    const imgMeal = oneRecipe.map((el => el.image))
    const imgMealtoString = imgMeal.toString()

    // --składnik
    const name_ingredients = oneRecipe.map((el => el.name_ingredients))


    const flatIngredients = name_ingredients.flat(1)

     // --ilość
    const quantity = oneRecipe.map((el => el.quantity))


    const flatquantity = quantity.flat(1)

    // jednostka
     const unit = oneRecipe.map((el => el.unit))
     const unittoString = unit.toString()

     const flatunit = unit.flat(1)

    // -czas przygotownia
    const time = oneRecipe.map((el => el.time))
    const timeToString = time.toString()


    // -stopień
    const level = oneRecipe.map((el => el.level))
    const levelToString = level.toString()

    // -rodzaj
    const kind = oneRecipe.map((el => el.kind))
    const kindToString = kind.toString()
    

    // data
     const data = oneRecipe.map((el => el.data))



    // style
    const ImageSrc = styled('span')({
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: '100%'
      });

      let navigate = useNavigate()
     
    const goToBack = () => {
        navigate('/recipes_app')
    }

  return (
    <>
    <div className="header">
        <div className="header__btn">
            <Button
            variant='contained'
            onClick={goToBack}
            >
            Powrót
            <FastRewindIcon />
            </Button>
        </div>
        <div className="header__box">
        {namemealtoString}
        </div>
    </div>
    <div className='details'>
   <div className="details__box">
       <div className="details__box-img">
           <ImageSrc className="details__box-img" style={{ backgroundImage: `url(${imgMealtoString})` }} />
       </div>
       <div className="details__box-prepare">
       <div className="ingredients">
        <div className="ingredients__header">
            Składniki:
        </div>
        <div className="ingredients__box">
        <div className='ingredients__box-list'>
            {
                flatIngredients.map((el) => {
                    return (
                        <>
                        <div className='ingredients__box-list--details'>
                            <FiberManualRecordIcon style={{fontSize: '0.7rem', color: '#21415b'}}/> {el} -
                        </div>
                        </>
                   
                )
                })
                }
            </div>
            <div className="ingredients__box-list">
                {
                    flatquantity.map((el) => {
                        return (
                            <>
                            <div className='ingredients__box-list--details'>
                            {el}
                            </div>
                            </>
                    
                    )
                    })
                    }
            </div>
                <div className="ingredients__box-list">
                {
                flatunit.map((el) => {
                    return (
                        <>
                        <div className='ingredients__box-list--details'>
                        {el}
                        </div>
                        </>
                   
                )
                })
                }
                </div>
        </div>    
   </div>
       </div>
   </div>

<div className='details__prepareRecipe'>
    {preparetoString}
</div>


<div className="ingredients__box-recipe">
    <div className="ingredients__box-list">
        <div className="ingredients__box-list--icon">
            <div className="ingredients__box-list--icon---header">
            {kindToString}  
            </div>
            <RestaurantIcon style={{fontSize: '2rem', color: '#21415b'}}/>
            <div className="ingredients__box-list--icon---footer">
                Rodzaj posiłku
            </div>
        </div>
         
    </div>
    <div className="ingredients__box-list--icon">
        <div className="ingredients__box-list--icon---header">
        {levelToString}
        </div>
        <SpeedIcon style={{fontSize: '2rem', color: '#21415b'}}/>
        <div className="ingredients__box-list--icon---footer">
                Stopień trudności
        </div>
    </div>
    <div className="ingredients__box-list--icon">
        <div className="ingredients__box-list--icon---header">
        {timeToString} min
        </div> 
        <TimerIcon style={{fontSize: '2rem', color: '#21415b'}}/>
        <div className="ingredients__box-list--icon---footer">
                Czas przygotowania
        </div>
    </div>

</div>

</div>
    </>
    
  )
}
