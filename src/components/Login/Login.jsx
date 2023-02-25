import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TextField } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function Login({openWindowLogin, closeLogin, loginUser}) {
  return (
    <div>
      <Dialog
        open={openWindowLogin}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeLogin}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Wpisz dane logowania"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            
          <TextField id="outlined-basic" label="E-mail" variant="outlined" />
              
          <TextField
          />
              
        
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
          onClick={closeLogin}
          >Anuluj</Button>
          <Button 
          onClick={loginUser}
          >Agree</Button>
          
        </DialogActions>
      </Dialog>
    </div>
  )
}
