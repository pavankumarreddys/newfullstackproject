import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://www.linkedin.com/in/sannala-pavan-kumar-reddy-748123154/">
        Pavan Info 
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Signup() {
  const [name,setName]=React.useState('')
  const [email,setEmail] = React.useState('')
  const [password,setPassword] = React.useState('')
  const [buttonActive,setButtonActive] = React.useState(true)
  const navigate = useNavigate()
  
  const handleSubmit = (event) => {
    event.preventDefault();
    //const data = new FormData(event.currentTarget);
    // Make a POST request to your API    
    const formData1 ={
      name,
      email,
      password
    }

    axios.post('http://localhost:5000/signup', formData1)
      .then((response) => {
        console.log('New user data:', response.data);
        if(typeof(response?.data) === "object"){
            toast.success('Signup success', {
                position: toast.POSITION.TOP_CENTER
            });
            setTimeout(() => {
                navigate("/login")
            }, 1500);
        }
        
      })
      .catch((error) => {
        console.error('Error signup:', error.message);
        console.log("pavan",error?.response?.status)
        if(error?.response?.status === 400){
            toast.error('Email already exists', {
                position: toast.POSITION.TOP_CENTER
              });
        }else{
            toast.error('ERR_BAD_REQUEST', {
                position: toast.POSITION.TOP_CENTER
            });
        }
        // Handle errors, e.g., show an error message.
      });

      
      setEmail('')
      setName('')
      setPassword('')

  };

  function isValidEmail(email) {
    // Regular expression for a valid email format
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }

  function isStrongPassword(password) {
    // At least 8 characters, 1 number, and 1 special character
    const strongPasswordRegex = /^(?=.*[A-Za-z\d])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
  }

  return (
    <ThemeProvider theme={defaultTheme}>
        <ToastContainer/>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                value={name}
                onChange={(e)=>{
                    if(e.target.value.charCodeAt(0) !== 32){
                        setName(e.target.value)
                    }
                    if(isValidEmail(email) && e.target.value.length>3 && password.length>7){
                        setButtonActive(false)
                    }else{
                        setButtonActive(true)
                    }
                }}      
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
              />
              <TextField
                margin="normal"
                value={email}
                onChange={(e)=>{
                    if(e.target.value.charCodeAt(0) !== 32){
                        setEmail(e.target.value)
                    }
                    if(isValidEmail(e.target.value) && name.length>3 && password.length>7){
                            setButtonActive(false)
                    }else{
                        setButtonActive(true)
                    }
                }}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
              <TextField
                margin="normal"
                required
                value={password}
                onChange={(e)=>{
                    if(e.target.value.charCodeAt(0) !== 32){
                        setPassword(e.target.value)
                    }
                    if(isValidEmail(email) && name.length>3 && isStrongPassword(e.target.value)){
                        setButtonActive(false)
                    }else{
                        setButtonActive(true)
                    }
                }}
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={buttonActive}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/login" variant="body2">
                    {"Already have an account? Login"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}