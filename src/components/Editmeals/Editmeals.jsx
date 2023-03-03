import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import axios from '../../firebase/axios'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function Editmeals({id, clickMeal, editOpen, handleOpenEdit, handleCloseEdit, handleEdit}) {

const [editRecipe, setEditRecipe] = useState(null)
const [changeNameMeal, setChangeNameMeal] = useState()
const [newRecipe, setNewRecipe] = useState()

const editThisMeal = async (id) => {
    const res = await axios.get(`/recipes/${id}.json`)
    console.log(res.data)
    // setEditRecipe(res.data)
    const copyrrRecipe = [res.data]
    const newArrRecipe = {
        data: '', 
        image: 'image', 
        namemeal: changeNameMeal, 
        prepare: 'prepare', 
        time: 'time'
    }
    setNewRecipe (copyrrRecipe.map(el => el.id === id ? newArrRecipe : el))   

    console.log(newRecipe)
}

useEffect(() => {
    editThisMeal()
}, [])

  return (
    <div>
      <Dialog
        fullScreen
        open={editOpen}
        onClose={handleCloseEdit}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseEdit}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Edytuj
            </Typography>
            <Button autoFocus color="inherit" onClick={handleEdit}>
              Zapisz
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem>
            <ListItemText primary={clickMeal} 
            secondary={
            <TextField 
            onChange={(e) => setChangeNameMeal(e.target.value)}
            id="standard-basic" label="Nowy przepis" variant="standard" />
            }/>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="Default notification ringtone"
              secondary="Tethys"
            />
          </ListItem>
        </List>
      </Dialog>
    </div>
  )
}
