import loginService, {LoginError, TokenError} from "../services/login"
import {setUser} from "../reducers/loggedUserReducer";
import {useAuthData} from "../hooks/useAuthHook";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Navigate } from "react-router-dom";
import logo from '../../public/ideal-aq-logo.png'
import {Alert, Divider} from "@mui/material";
import {useAppDispatch} from "../hooks/hooks.ts";
import { FormEvent } from "react";
import {Notifications} from "../components/notifications/Notifications.tsx";
import {addNotification} from "../utils/notifications.ts"


/* eslint-disable-next-line */
function Copyright(props:any) {
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const username = data.get('email')
    const password = data.get('password')

    if (!username || !password) {
      addNotification(dispatch, "Invalid credentials!", "error", 3)
      return
    }

    const credentials = {
      username: username.toString(), password: password.toString()
    }

    try {
      const token_data = await loginService.login(credentials)
      const token = token_data.access_token
      const currentUser = await loginService.currentUser(token)
      if (data.get('remember') === 'remember') { // for now, always remember
        window.localStorage.setItem("IdealAQConsoleUserToken", token);
      }

      dispatch(setUser({currentUser, token: token}))
    } catch (error) {
      let message = "unknown error"
      if (error instanceof LoginError) {
        message = `Error with login: ${error.message}`
      }
      if (error instanceof TokenError) {
        message = `Could not retrieve user with the token!`
        setTimeout(()=>window.location.reload(),1000)
      }

      addNotification(dispatch, message, "error", 5)
    }
  }

  return auth.token ? (<Navigate to="/" />) : (
      <>
        <Box sx={{m:2}}>
          <Notifications />
        </Box>
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
              <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
              >
                Log In
              </Button>
              <Alert severity="info">
                Contact <Link sx={{color: "black"}} href="mailto:dominik.rohal@helsinki.fi?subject=[AQvis%20login]%20Issue">admin</Link> if facing a problem with login.
              </Alert>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </>
  );
}
