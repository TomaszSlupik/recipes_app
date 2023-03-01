import React, {useState} from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import mykey from '../../firebase/mykey';
import useLogin from '../../hooks/useLogin';
import Alert from '@mui/material/Alert';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function Login({openWindowLogin, closeLogin}) {

// Hasło - ukrywanie 
const [showPassword, setShowPassword] = useState(false);
const handleClickShowPassword = () => setShowPassword((show) => !show);
const handleMouseDownPassword = (event) => {
  event.preventDefault();
};

// Pobieranie inputów do logowania
const [email, setEmail] = useState()
const [password, setPassword] = useState()

const emailInputLogin = (e) => {
  e.preventDefault()
  setEmail(e.target.value)

}

const passwordInputLogin = (e) => {
  e.preventDefault()
  setPassword(e.target.value)

}

// Error przy logowaniu
const [error, setError] = useState()

// Logika do logowania 
const [login, setLogin] = useLogin()

const loginAccept = async (e) => {
    e.preventDefault()
    try {
      const res = await mykey.post('/accounts:signInWithPassword', 
      {
        email: email, 
        password: password, 
        returnSecureToken: true
      })
      setLogin(res.data)
      closeLogin()
    }
    catch (ex) {
      setError(ex.response.data.error.message)
    }
} 

const style = {
  error: {marginTop: '0.5em'}
}

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
            
          <TextField 
          onChange={emailInputLogin}
          id="outlined-basic" label="E-mail" variant="outlined" />
              
          <InputLabel htmlFor="outlined-adornment-password">Password do aplikacji</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            onChange={passwordInputLogin}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
              {
            error ? 
            <Alert 
            style={style.error}
            severity="error">{error}</Alert>
            :
            error === null ?  
            (<div></div>)
            :
            <div></div>
          }
        
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
          onClick={closeLogin}
          >Anuluj</Button>
          <Button 
          onClick={loginAccept}
          >Zaloguj</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
