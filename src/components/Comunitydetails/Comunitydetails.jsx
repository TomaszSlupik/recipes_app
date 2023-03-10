import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from '../../firebase/axios'

export default function Comunitydetails({comunityUserId}) {

    const nameUserParams = useParams()
    
    const [userName, setUserName] = useState(nameUserParams)
    const [usercurrentID, setUserCurrentId] = useState([])
    const [userCurrentData, setUserCurrentData] = useState([])

    // Wyszukanie z bazy konkretnego użytkownika  - w którego Kliknięto 

    const readUserId = async() => {
      try {
          const res = await axios.get('/users.json')

          const currentuserID = []

          for (const key in res.data) {
            currentuserID.push({...res.data[key], id: key})
          }

          setUserCurrentId(currentuserID.filter(el => el.nameUser === userName.nameuser).map(el => el.userId))
          

      }
      catch (ex) {
          console.log(ex.response)
      }
  }
  
    // Cała baza posiłków
    const readDataRecipe = async() => {
        try {
            const res = await axios.get('/recipes.json')

            const newRecipeData = []

            for (const key in res.data) {
              newRecipeData.push({...res.data[key], id: key})
            }
            setUserCurrentData(newRecipeData)

        }
        catch (ex) {
            console.log(ex.response)
        }
    }

    useEffect(() => {
        readDataRecipe()
        readUserId()
    }, [])


    // Nazwa posiłku - danego użytkownika w bazie 
    const idString = usercurrentID.toString()
    const clickMeal = userCurrentData.filter(el => el.userId === idString).map(el => el.namemeal)
  
  return (
    <div>
      {clickMeal}
    </div>
  )
}
