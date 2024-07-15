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
import UpdateDevice from "./pages/devices/UpdateDevice";
import { useAppDispatch } from "./hooks/hooks";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

const ProtectedRoute = ({auth, redirectPath = '/login'}: {auth:AuthData, redirectPath?: string}) => {
    console.log(auth)
    return !auth?.token ? (<Navigate to={redirectPath} replace />) : <Outlet />;
}

const UserWithOrganisationRoute = ({auth}: {auth:AuthData}) => {
    return !auth?.currentUser?.organisation
        ? (
            <>
                <Typography>Your profile is not assigned to any organisation! Contact <Link sx={{color: "blue"}} href="mailto:dominik.rohal@helsinki.fi?subject=[AQvis%20login]%20No%20organisation">admin</Link> to resolve this issue!</Typography>
                <br/>
                <Link href="/logout">Logout</Link>
            </>
        ) : <Outlet />
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
                            <Route element={<UserWithOrganisationRoute auth={auth2} />}>
                                <Route index path="/" element={<Measurements />} />
                                <Route path="/devices" element={<Devices />} />
                                <Route path="/devices/new" element={<NewDevice/>} />
                                <Route path="/devices/:id/update" element={<UpdateDevice/>} />
                                <Route path="/organisation" element={<Organisation />} />
                            </Route>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </>
    ) : <p>Loading...</p>;
}

export default App;
