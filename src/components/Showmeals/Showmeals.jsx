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
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function Showmeals() {

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
        height: '100%'
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
            position: 'absolute', width: '100%', height: '20%', bottom: '0%', backgroundColor: '#fff'
        }, 
        btnfooter: {
            position: 'absolute', bottom: '10%', right: '3%', zIndex: 3
        },
        settings: {cursor: 'pointer', color: '#fff'}
      }

    //   Setting
    const [settingMenu, setSettingMenu] = useState(null)

    const handleMenu = (e) => {
        setSettingMenu(e.currentTarget)
    }

    const showInfoForUser = () => {
        handleClickOpen()
        setSettingMenu(null)
    }

    const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    
  };

  const handleClose = () => {
    setOpen(false);
    setSettingMenu(null)
  };

  return (
    <div className='card'>
         <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 1, md: 2 }} > 
        <ThemeProvider theme={breakpoints}>
            {
                allrecipes.map((el, index) => {
                    return (
                        <Grid item xs={12} sm={12} md={6} key={index} style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '0em'}}>
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
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                             <SettingsIcon
                         color=''
                         style={style.settings}
                         /> 
                            </IconButton>
                        <Menu
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
                        open={Boolean(settingMenu)}
                        // onClose={handleClose}
                    >
                        <MenuItem 
                        onClick={showInfoForUser}
                        >Usuń</MenuItem>
                        <MenuItem 
                        onClick={handleClose}
                        >My account</MenuItem>
                         <Dialog
                            open={open}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={handleClose}
                            aria-describedby="alert-dialog-slide-description"
                        >
                            <DialogTitle>{"Czy napewno chcesz usunąć przepis z Bazy?"}</DialogTitle>
                            <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                                ..........
                            </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                            <Button 
                            variant="outlined"
                            onClick={handleClose}>Anuluj</Button>
                            <Button 
                            variant='containded'
                            onClick={handleClose}>Akcteptuję</Button>
                            </DialogActions>
                        </Dialog>

                    </Menu>
                        </div>
                        <CardActions style={style.footer}>
                                <Details allrecipes={allrecipes}/>
                                
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
                
        </ThemeProvider>
        </Grid>
        </Box>
    </div>
  )
}
