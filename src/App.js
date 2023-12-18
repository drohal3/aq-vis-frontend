import { Navigate, Outlet, BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LogIn from "./pages/LogIn";
import Home from "./pages/Home"
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {setUser} from "./reducers/loggedUserReducer";
import {useAuthData} from "./hooks/useAuthHooks";

const ProtectedRoute = ({user, redirectPath = '/login'}) => {
  console.log(user)
  return !user?.token ? (<Navigate to={redirectPath} replace />) : <Outlet />;
}

function App() {
  const dispatch = useDispatch()
  const auth = useAuthData()

  if (!auth?.token) {
    const user = window.localStorage.getItem("IdealAQConsoleUser")
    if (user) {
      console.log(`set user: ${user}`)
      dispatch(setUser(JSON.parse(user)))
    }
  }

  const auth2 = useAuthData()

  // useEffect(() => {
  //   const user = window.localStorage.getItem("IdealAQConsoleUser")
  //   console.log(`set user: ${user}`)
  //   if (user) {
  //     dispatch(setUser(JSON.parse(user)))
  //   }
  // }, [])


  return (
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
  );
}

export default App;
