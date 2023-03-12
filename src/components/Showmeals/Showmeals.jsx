import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { ThemeProvider } from '@emotion/react';
import breakpoints from '../../theme/breakpoints'
import axios from '../../firebase/axios'
import Myrecipecard from '../../styles/myrecipecard';
import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import CardActions from '@mui/material/CardActions';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import Button from '@mui/material/Button';
import { Link} from 'react-router-dom';
import Details from '../Details/Details';
import themeColor from '../../theme/themecolor';
import './Showmeals.scss'
import SettingsIcon from '@mui/icons-material/Settings';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Editmeals from '../Editmeals/Editmeals';
import Searchbar from '../Searchbar/Searchbar';
import Pagination from '../Pagination/Pagination';
import useLogin from '../../hooks/useLogin'


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function Showmeals(props) {

    const [idUser] = useLogin()
    // Pobieranie danych z Backendu 
    const [allrecipes, setAllrecipes] = useState([])

   
    const readData  = async () => {
        try {
            const res = await axios.get('/recipes.json')

            const newRecipes = []

            for (const key in res.data) {
                newRecipes.push({...res.data[key], id: key})
            }
            // Pobranie tylko przepisów danego użytkownika 
            setAllrecipes(newRecipes.filter(el => el.userId === idUser.localId))
        }

        catch (ex) {
            console.log(ex.response)
        }
    } 

    useEffect(() => {
        readData()
    }, [])


    //   Style:

    const ImageSrc = styled('span')({
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
        width: '100%',
        height: '100%', 
      });
      
      const ImageBackdrop = styled('span')(({ theme }) => ({
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create('opacity'),
      }));

      const style = {
        footer: {
            position: 'absolute', width: '100%', height: '20%', bottom: '0%', backgroundColor: '#fff', zIndex: 1
        }, 
        btnfooter: {
            position: 'absolute', bottom: '10%', right: '3%', zIndex: 3
        },
        settings: {cursor: 'pointer', color: '#fff'}, 
        bin: {color: 'red'}, 
        menu:{width: '100px'}
      }

    //   Setting - do usuwania i edycji 
    const [settingMenu, setSettingMenu] = useState(null)
    const [clickMeal, setClickMeal] = useState()
    const [clickImage, setClickImage] = useState()
    const [id, setId] = useState()

    const handleMenu = (e, id, namemeal, image) => {
        setSettingMenu(e.currentTarget)
        setId(id)
        setClickMeal(namemeal)
        setClickImage(image)
        
    }

    const closeSettings = () => {
        setSettingMenu(null)
    }

    const showInfoForUser = () => {
       
        handleClickOpen()
        setSettingMenu(null)
    }

// Setting do otwierania
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };


// Panel edycji 
const [editOpen, setEditOpen] = useState(false)

const handleOpenEdit = () => {
    setEditOpen(true)
    setSettingMenu(null)
}

const handleCloseEdit =  () => {
    setEditOpen(false)
}


// Usuwanie przepisów z Bazy danych 
  const handleDelete =  async () => {
    try {
        await axios.delete(`/recipes/${id}.json`)
        setAllrecipes([...allrecipes].filter(el => el.id !== id))
    }
    catch (ex){
        console.log(ex.response)
    }
    setOpen(false);
    setSettingMenu(null)
  };

// Szukanie Przepisów 

const searchRecipe = (searchRecipeInput) => {
    const searchRecipe = allrecipes.filter((el => 
        el.namemeal.toLowerCase().includes(searchRecipeInput.toLowerCase())))
    setAllrecipes(searchRecipe)
}

// Powrót do wszystkich przepisów

const clikBackspace = (e) => {
    if (e.key === 'Backspace') {
        readData()
    }
} 

// Paginacja 

const [currentPage, setCurrentPage] = useState(1)
const [postPerPage, setPostPerPage] = useState(6)
const lastPostIndex = currentPage * postPerPage
const firstPostIndex = lastPostIndex - postPerPage
const currentPosts = allrecipes.slice(firstPostIndex, lastPostIndex)


  return (
    <div className='card'>
        <div className="card__boxNav">
                <div className="card__boxNav-search">
                <Searchbar searchRecipe={searchRecipe} clikBackspace={clikBackspace}/>
                </div>      
    </div>
        
         <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 1, md: 2 }} > 
        <ThemeProvider theme={breakpoints}>
            {
                currentPosts.map((el, index) => {
                    return (
                        <Grid item xs={12} sm={12} lg={4} key={index} style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '0em'}}>
                        <Myrecipecard>
                        <Card style={{ position: 'relative', width: '100%', height: '100%' }}>
                        <ImageSrc style={{ backgroundImage: `url(${el.image})` }} />
                        <ImageBackdrop className="MuiImageBackdrop-root" />
                        <div className="card__header">
                            {el.namemeal}
                        </div>
                        <div className="card__data">
                            Data dodania: {el.data.substr(0,16)}
                        </div>
                        <div className="card__settings">
                    

                        <Button
                             id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={(e) => handleMenu(e, el.id, el.namemeal, el.image)}
                            color="inherit"
                        >
                             <SettingsIcon
                         color=''
                         style={style.settings}
                         /> 
                            </Button>
                                        <ThemeProvider theme={themeColor}>
                                        <Menu
                                        key={index}
                                        id="menu-appbar"
                                        anchorEl={settingMenu}
                                        anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                        }}
                                        onClose={handleClickClose}
                                        open={Boolean(settingMenu)}
                                    >
                                        <MenuItem 
                                        style={style.menu}
                                        onClick={handleOpenEdit}
                                        >Edytuj</MenuItem>

                                        <Editmeals 
                                        id={id}
                                        clickMeal={clickMeal}
                                        editOpen={editOpen}
                                        handleCloseEdit={handleCloseEdit}
                                        clickImage={clickImage}
                                        />          
                                        <MenuItem 
                                        onClick={showInfoForUser}
                                        >Usuń</MenuItem>    

                                        <MenuItem 
                                        onClick={closeSettings}
                                        >Powrót</MenuItem>        
                                         <Dialog
                                            open={open}
                                            TransitionComponent={Transition}
                                            keepMounted
                                            onClose={handleClickClose}
                                            aria-describedby="alert-dialog-slide-description"
                                        >
                                            <DialogTitle>{"Czy napewno chcesz usunąć przepis z Bazy?"}</DialogTitle>
                                            <DialogContent>
                                            <DialogContentText id="alert-dialog-slide-description">
                                                Przepis <span className='card__settings-meal'>{clickMeal}</span> zostanie usunięty
                                            </DialogContentText>
                                            </DialogContent>
                                            <DialogActions>
                                            <Button 
                                            variant="outlined"
                                            onClick={handleClickClose}>Anuluj</Button>
                                            <Button 
                                            variant="contained"
                                            onClick={handleDelete}>Akcteptuję</Button>
                                            </DialogActions>
                                            </Dialog>
                                        </Menu>
                                    </ThemeProvider>
                            </div>
                        <CardActions style={style.footer}>
                                
                                
                                <ThemeProvider theme={themeColor}>
                                    <Link to={el.namemeal}>
                                    <Button
                                    variant="contained"
                                    style={style.btnfooter} 
                                    size="small">Zobacz
                                    <DinnerDiningIcon />
                                    </Button>
                                    </Link>
                                </ThemeProvider>

                        </CardActions>
                        </Card>
                        </Myrecipecard>
                        </Grid>
                    )
                })
            }
                <Pagination 
                totalPost={allrecipes.length}
                postPerPage={postPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                />
        </ThemeProvider>
        </Grid>
        </Box>
    </div>
  )
}
