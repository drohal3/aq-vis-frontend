import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { signOut } from '../reducers/loggedUserReducer'

function LogOut() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(signOut())
  })

  return (
    <Navigate to='/' />
  )
}

export  default LogOut