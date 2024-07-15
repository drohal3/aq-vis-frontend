import { Navigate } from "react-router-dom";
import { resetReduxStore } from '../reducers/rootReducer.ts'
import {useEffect, useState} from "react";
import {useAppDispatch} from "../hooks/hooks.ts";
import Typography from "@mui/material/Typography";
import {signOut} from "../reducers/loggedUserReducer.ts";

function LogOut() {
  const dispatch = useAppDispatch();
  const [signedOut, setSignedOut] = useState(false)
  window.localStorage.removeItem("IdealAQConsoleUserToken")
  useEffect(() => {
    dispatch(signOut()) // obsolete but still decided to keep it here
    dispatch(resetReduxStore())
    setSignedOut(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return signedOut ? (
    <Navigate to='/' />
    // <p>Logged Out</p>
  ) : (<Typography>Signing Out...</Typography>)
}

export  default LogOut