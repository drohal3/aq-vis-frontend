import loginService from "../services/login"
import {setUser} from "../reducers/loggedUserReducer";
import {useAuthData} from "../hooks/useAuthHook";
// import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Navigate } from "react-router-dom";
import logo from '../../public/ideal-aq-logo.png'
import {Divider} from "@mui/material";
import {useAppDispatch} from "../hooks/hooks.ts";


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        IdealAQ
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


export default function LogIn() {
  const dispatch = useAppDispatch();
  const auth = useAuthData()

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const credentials = {
      username: data.get('email'), password: data.get('password')
    }
    const token_data = await loginService.login(credentials)
    const token = token_data.access_token
    const currentUser = await loginService.currentUser(token)
    if (data.get('remember') === 'remember') {
      console.log("remember me")
      window.localStorage.setItem("IdealAQConsoleUserToken", token);
    }

    dispatch(setUser({...currentUser, token: token}))

  }

  return auth.token ? (<Navigate to="/" />) : (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img alt="IdealAQ logo" src={logo} width="70%"/>
        <Divider sx={{width: '100%', margin: 2,}}/>
        {/*<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>*/}
        {/*  <LockOutlinedIcon />*/}
        {/*</Avatar>*/}
        <Typography component="h1" variant="h5">
          Log In
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
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
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox name="remember" value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}