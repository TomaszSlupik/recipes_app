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
import mykey from '../../firebase/mykey'
import useLogin from '../../hooks/useLogin';
import Alert from '@mui/material/Alert';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function Register({openWindowRegister, closeRegister}) {

  // Hasło - ukrywanie 
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Pobieranie inputow do rejestracji
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

const emailInput = (e) => {
  e.preventDefault()
  setEmail(e.target.value)
}

const passwordInput = (e) => {
  e.preventDefault()
  setPassword(e.target.value)
}

// Rejestracja 
const [login, setLogin] = useLogin()
const [error, setErorr] = useState(null)

const submitRegister = async (e) => {
  e.preventDefault()
  try {
    const res = await mykey.post('/accounts:signUp', {
      email : email,
      password: password,
      returnSecureToken: true
      
  })
    setLogin(res.data)
    closeRegister()
  }
  catch (ex) {
      setErorr(ex.response.data.error.message)
  }
}


  return (
    <div>
            <Dialog
        open={openWindowRegister}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeRegister}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Wpisz dane rejestracji"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            
          <TextField id="outlined-basic" label="E-mail" 
          value={email}
          onChange={emailInput}
          variant="outlined" />
              
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            onChange={passwordInput}
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
            <Alert severity="error">{error}</Alert>
            :
            error === null ?  
            (<div></div>)
            :
            <div>Rejestracja przebiegła pomyślnie</div>
          }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
          onClick={closeRegister}
          >Anuluj</Button>
          <Button 
          onClick={submitRegister}
          >Akcteptuję</Button>
          
        </DialogActions>
      </Dialog>
    </div>
  )
}
