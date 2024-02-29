import { Navigate } from "react-router-dom";
import { signOut } from '../reducers/loggedUserReducer'
import {useEffect, useState} from "react";
import {useAppDispatch} from "@src/hooks/hooks";

function LogOut() {
  const dispatch = useAppDispatch();
  const [signedOut, setSignedOut] = useState(false)
  useEffect(() => {
    dispatch(signOut())
    setSignedOut(true)
  }, []);


  return signedOut ? (
    <Navigate to='/' />
    // <p>Logged Out</p>
  ) : (<p>Signing Out...</p>)
}

export  default LogOut