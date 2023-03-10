import React, { useEffect, useState } from 'react'
import './Comunity.scss'
import PeopleIcon from '@mui/icons-material/People';
import axios from '../../firebase/axios'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import { Link} from 'react-router-dom';
import Comunitydetails from '../Comunitydetails/Comunitydetails';


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

    // Przechwytywanie informacji o nazwie i ID 
    const [comunityUserId, setComunityUserID] = useState()
    const [comunityName, setComunityName] = useState()


    const clickUserId = (id, name) => {
            setComunityUserID(id)
            setComunityName(name)
            console.log(comunityName)
            
          
    }     
    
  

  return (
    <div className='comunity'>
        <div className="comunity__header">
            Lista wszystkich użytkowników <PeopleIcon style={{marginLeft: '0.4em', fontSize: '3rem'}}/>
        </div>
        <div className="comunity__users">
               <Table size="small" aria-label="a dense table">
                      <TableHead>
                        <TableRow>
                          <TableCell style={{fontWeight: '700'}}>Użytkownicy</TableCell>
                          <TableCell > Lista przepisów</TableCell>
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
                            <TableCell component="th" scope="row">
                              <Link to={el.nameUser}>
                              <Button
                              onClick={() => clickUserId(el.userId, el.nameUser)}
                              variant='outlined'
                              >
                                Zobacz
                              </Button>
                              </Link>
                            </TableCell>
                          </TableRow>
                          )
                })}
                      </TableBody>
                    </Table> 

        </div>
        <Comunitydetails
        comunityUserId={comunityUserId}
        />
    </div>
  )
}
