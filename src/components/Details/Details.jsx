import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from '../../firebase/axios'
import './Details.scss'
import { styled } from '@mui/material/styles';
import moment from 'moment/moment'

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
    const name_ingredientstoString = name_ingredients.toString()

     // --ilość
    const quantity = oneRecipe.map((el => el.quantity))
    const quantitytoString = quantity.toString()

    // jednostka
     const unit = oneRecipe.map((el => el.unit))
     const unittoString = unit.toString()

    // -czas przygotownia
    const time = oneRecipe.map((el => el.time))
    const timeToString = time.toString()

    // data
     const data = oneRecipe.map((el => el.data))
     const dataToString = data.toString()


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

  return (
    <div className='details'>
        <div className="details__header">
            {namemealtoString}
        </div>
        <div className="details__img">
            <ImageSrc className="details__img" style={{ backgroundImage: `url(${imgMealtoString})` }} />
        </div>
        
        {preparetoString}
        <div className="details__ingredients">
                <ul>
                    <li>
                        {name_ingredientstoString} {quantitytoString} {unittoString}
                    </li>
                </ul>
        </div>
        <div className="details__time">
            {timeToString}
        </div>
        <div className="details__data">
            {dataToString}
        </div>
    </div>
  )
}
