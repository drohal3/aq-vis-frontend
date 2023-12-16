import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LogIn from "./pages/LogIn";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {setUser} from "./reducers/loggedUserReducer";


function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const user = window.localStorage.getItem("IdealAQConsoleUser")

    if (user) {
      dispatch(setUser(JSON.parse(user)))
    }
  })


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="dashboard" element={<Dashboard/>} />
          <Route path="login" element={<LogIn/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
