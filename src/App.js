import { Navigate, Outlet, BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LogIn from "./pages/LogIn";
import Home from "./pages/Home"
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {setUser, signOut} from "./reducers/loggedUserReducer";
import {useAuthData} from "./hooks/useAuthHooks";
import loginService from './services/login'

const ProtectedRoute = ({user, redirectPath = '/login'}) => {
  console.log(user)
  return !user?.token ? (<Navigate to={redirectPath} replace />) : <Outlet />;
}

function App() {
  const [dataReady, setDataReady] = useState(false);
  const dispatch = useDispatch()
  const localToken = window.localStorage.getItem("IdealAQConsoleUserToken")

  const auth = useAuthData()

  useEffect(() => {
    console.log("use effect")
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
  // TODO: load user data from backend


  const auth2 = useAuthData()

  // useEffect(() => {
  //   const user = window.localStorage.getItem("IdealAQConsoleUser")
  //   console.log(`set user: ${user}`)
  //   if (user) {
  //     dispatch(setUser(JSON.parse(user)))
  //   }
  // }, [])


  return dataReady ? (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<LogIn/>} />
          <Route path="/" element={<Home/>} />
          <Route element={<ProtectedRoute user={auth2} />}>
            <Route index path="dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  ) : <p>Loading...</p>;
}

export default App;
