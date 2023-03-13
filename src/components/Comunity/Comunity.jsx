import React, { useEffect, useState } from 'react'
import './Comunity.scss'
import PeopleIcon from '@mui/icons-material/People';
import axios from '../../firebase/axios'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { useNavigate} from 'react-router-dom';
import Comunitydetails from '../Comunitydetails/Comunitydetails';
import FastRewindIcon from '@mui/icons-material/FastRewind';

export default function Comunity() {


    const [users, setUsers] = useState([])
    const [allrecipes, setAllrecipes] = useState([])
    // // Odczyt wszystkich uczestników z Backendu 

    const readAllUser = async () => {
        try {
            const res = await axios.get('/users.json')

            const allUser = []

            for (const key in res.data) {
                allUser.push({...res.data[key], id: key})
            }
            setUsers(allUser)
        }
        catch (ex){
            console.log(ex.response)
        }
    }

    
    // Odczyt całej bazy 
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
        readAllUser()
        readData()
    }, [])

    let navigate = useNavigate()
    // Przechwytywanie informacji o nazwie i ID 
    const [comunityUserId, setComunityUserID] = useState()
    const [comunityName, setComunityName] = useState("")
    console.log(comunityName)
    
    const clickUserId = (id, name) => {
            setComunityUserID(id)
            setComunityName(name)
            navigate(`/recipes_app/comunity/${comunityName}`)
    }     
    
    const navigateTwo = useNavigate()

    const goToBack = () => {
      navigateTwo('/recipes_app')

    }
    

  return (
    <div className='comunity'>
        <div className="comunity__header">
            Lista wszystkich użytkowników <PeopleIcon style={{marginLeft: '0.4em', fontSize: '3rem'}}/>
        </div>
        <div className="comunity__textBack">
          <div className="comunity__textBack-btn">
              <div className="comunity__textBack-btn--click">
              <Button
              variant='contained'
              onClick={goToBack}
              >
                Powrót 
                <FastRewindIcon />
              </Button>
              </div>
          </div>
        </div>
        <div className="comunity__info">
          Aby znaleźć się na liście użytkowników, przejdź do panelu profil i podaj swoją nazwę użytkownika.
        </div>
        <div className="comunity__users">
               <Table size="small" aria-label="a dense table">
                      <TableHead>
                        <TableRow>
                          <TableCell style={{fontWeight: '700'}}>Użytkownicy</TableCell>
                          <TableCell align="right"> Lista przepisów</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                      {users.map((el, index) => {
                  return (
                    
                          <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell component="th" scope="row">
                              {el.nameUser}
                            </TableCell>
                            <TableCell align="right" component="th" scope="row">
                              <Button
                              onClick={(e) => clickUserId(el.userId, el.nameUser)}
                              variant='outlined'
                              >
                                Zobacz
                              </Button>
                            </TableCell>
                          </TableRow>
                          )
                })}
                      </TableBody>
                    </Table> 
        </div>
    </div>
  )
}
