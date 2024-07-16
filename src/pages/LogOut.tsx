import { useNavigate } from "react-router-dom";
import { resetReduxStore } from '../reducers/rootReducer.ts'
import {useEffect} from "react";
import {useAppDispatch} from "../hooks/hooks.ts";
import Typography from "@mui/material/Typography";
import {signOut} from "../reducers/loggedUserReducer.ts";

function LogOut() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  window.localStorage.removeItem("IdealAQConsoleUserToken")
  useEffect(() => {
    dispatch(signOut()) // obsolete but still decided to keep it here
    dispatch(resetReduxStore())
    setTimeout(() => navigate("/login"), 1000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (<Typography>Redirecting...</Typography>)
}

export  default LogOut