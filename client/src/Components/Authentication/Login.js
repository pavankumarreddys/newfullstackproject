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
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://www.linkedin.com/in/sannala-pavan-kumar-reddy-748123154/">
        Pavan Info
      </Link>
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Login() {
  const [email,setEmail] = React.useState('')
  const [password,setPassword] = React.useState('')
  const [buttonActive,setButtonActive] = React.useState(true)
  const navigate = useNavigate()



  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Make a POST request to your API    
    const formData1 ={
        email,
        password
      }
      console.log("first",formData1)
      axios.post('http://localhost:5000/login', formData1)
        .then((response) => {
          console.log('login success:',response.data);
            if(response?.data === "Login Successful"){
                toast.success('Login Successfull', {
                    position: toast.POSITION.TOP_CENTER
                  });
                  localStorage.setItem("isLogin",true)
                setTimeout(()=>{
                    navigate("/")
                },2000)
            }else{
                toast.warning("User doesn't exist", {
                    position: toast.POSITION.TOP_CENTER
                  });
            }
            
          // Add logic to handle the response, e.g., show a success message.
        })
        .catch((error) => {
          console.error('Error login:', error.message);
          toast.error('Error Login ', {
              position: toast.POSITION.TOP_CENTER
            });
          // Handle errors, e.g., show an error message.
        });

        setEmail('')
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

  React.useEffect(()=>{
    const isLogin = localStorage.getItem("isLogin")
  return (
    isLogin === null ? navigate("/login") :navigate("/")
  )
  },[])

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
              Login
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                value={email}
                onChange={(e)=>{
                    if(e.target.value.charCodeAt(0) !== 32){
                        setEmail(e.target.value)
                    }
                    if(isValidEmail(e.target.value) && password.length>7){
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
                autoFocus
              />
              <TextField
                margin="normal"
                value={password}
                onChange={(e)=>{
                    if(e.target.value.charCodeAt(0) !== 32){
                        setPassword(e.target.value)
                    }
                    if(isValidEmail(email) && isStrongPassword(e.target.value)){
                        setButtonActive(false)
                    }else{
                        setButtonActive(true)
                    }
                }}
                required
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
                Login
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
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