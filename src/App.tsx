import { Navigate, Outlet, BrowserRouter, Routes, Route } from "react-router-dom";
import Measurements from './pages/Measurements';
import LogIn from "./pages/LogIn";
import LogOut from "./pages/LogOut";
import {useEffect, useState} from "react";
import {AuthData, setUser, signOut} from "./reducers/loggedUserReducer";
import {useAuthData} from "./hooks/useAuthHook";
import loginService from './services/login'
import {ThemeProvider} from "@mui/material/styles";
import aqTheme from "./themes/aqTheme";
import Devices from "./pages/devices/Devices";
import Organisation from "./pages/Organisation";
import NewDevice from "./pages/devices/NewDevice";
import { useAppDispatch } from "./hooks/hooks";

const ProtectedRoute = ({auth, redirectPath = '/login'}: {auth:AuthData, redirectPath?: string}) => {
    console.log(auth)
    return !auth?.token ? (<Navigate to={redirectPath} replace />) : <Outlet />;
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
    const dispatch = useAppDispatch()
    const localToken = window.localStorage.getItem("IdealAQConsoleUserToken")

    const auth = useAuthData()

    useEffect(() => {
        const fetchData = async () => {
            console.log("fetch user data")
            try {
                if (localToken) {
                    const currentUser = await loginService.currentUser(localToken)
                    dispatch(setUser({currentUser, token: localToken}))
                    setDataReady(true)
                }
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const auth2 = useAuthData()

    return dataReady ? (
        <>
            <ThemeProvider theme={aqTheme}>
                <BrowserRouter>
                    <Routes>
                        <Route path="login" element={<LogIn/>} />
                        <Route path="logout" element={<LogOut />} />
                        <Route element={<ProtectedRoute auth={auth2} />}>
                            <Route index path="/" element={<Measurements />} />
                            <Route path="/devices" element={<Devices />} />
                            <Route path="/devices/new" element={<NewDevice/>} />
                            <Route path="/organisation" element={<Organisation />} />
                            <Route path="account" element={<TODO />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </>
    ) : <p>Loading...</p>;
}

export default App;
