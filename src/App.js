import { Navigate, Outlet, BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LogIn from "./pages/LogIn";
import LogOut from "./pages/LogOut";
import Home from "./pages/Home"
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {setUser, signOut} from "./reducers/loggedUserReducer";
import {useAuthData} from "./hooks/useAuthHooks";
import loginService from './services/login'
import {createTheme, ThemeProvider} from "@mui/material/styles";
import aqTheme from "./themes/aqTheme";

const ProtectedRoute = ({user, redirectPath = '/login'}) => {
  console.log(user)
  return !user?.token ? (<Navigate to={redirectPath} replace />) : <Outlet />;
}


function TODO() {
  return (
    <>
      <p>TODO:</p>
    </>
  )
}

function App() {
  const [dataReady, setDataReady] = useState(false);
  const dispatch = useDispatch()
  const localToken = window.localStorage.getItem("IdealAQConsoleUserToken")

  const auth = useAuthData()

  useEffect(() => {
    const fetchData = async () => {
      console.log("fetch user data")
      try {
        const currentUser = await loginService.currentUser(localToken)
        dispatch(setUser({...currentUser, token: localToken}))
        setDataReady(true)
      } catch (e) {
        dispatch(signOut())
        console.log("Signed Out")
        setDataReady(true)
      }
    }

    if (localToken && !auth?.token) {
      fetchData()
    } else {
      setDataReady(true)
    }
  }, [])

  const auth2 = useAuthData()

  return dataReady ? (
    <>
      <ThemeProvider theme={aqTheme}>
        <BrowserRouter>
          <Routes>
            <Route path="login" element={<LogIn/>} />
            <Route path="logout" element={<LogOut />} />
            <Route path="/" element={<Home/>} />
            <Route element={<ProtectedRoute user={auth2} />}>
              <Route index path="dashboard" element={<Dashboard />} />
              <Route path="account" element={<TODO />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  ) : <p>Loading...</p>;
}

export default App;
