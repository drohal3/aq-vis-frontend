import {useEffect, useState} from "react";
import loginService from "../services/login"
import { useDispatch } from "react-redux";
import {setUser} from "../reducers/loggedUserReducer";
import {useAuthData} from "../hooks/useAuthHooks";

function LogIn(){
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()

  const auth = useAuthData()

  const handleLogInClick = async () => {
    const credentials = {
      username: email, password
    }
    console.log(credentials)
    const token_data = await loginService.login(credentials)
    const token = token_data.access_token
    const currentUser = await loginService.currentUser(token)

    window.localStorage.setItem(
      "IdealAQConsoleUser",
      JSON.stringify({currentUser, token: token})
    );

    dispatch(setUser({currentUser, token: token}))

  }

  return auth.token ? <><p>Logged In</p></> : (
    <>
      <h2>Login</h2>
      <form>
        <label htmlFor="email">Email:</label>
        <input type="text" id="email" name="email" value={email} onChange={(event) => setEmail(event.target.value)} required/>
        <br/>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} required/>
        <br/>
        <button type="button" onClick={handleLogInClick}>Login</button>
      </form>
    </>
  )
}

export default LogIn