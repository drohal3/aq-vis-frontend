import { Navigate, Outlet, BrowserRouter, Routes, Route } from "react-router-dom";
import Measurements from './pages/Measurements';
import LogIn from "./pages/LogIn";
import LogOut from "./pages/LogOut";
import {useEffect, useState} from "react";
import {setUser, signOut} from "./reducers/loggedUserReducer";
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

const ProtectedRoute = ({redirectPath = '/login'}: {redirectPath?: string}) => {
    const [dataReady, setDataReady] = useState(false);
    const dispatch = useAppDispatch()
    const auth = useAuthData()

    useEffect(() => {
        let localToken = window.localStorage.getItem("IdealAQConsoleUserToken")
        const fetchData = async () => {
            console.log("fetch user data")
            try {
                localToken = window.localStorage.getItem("IdealAQConsoleUserToken")
                if (localToken) {
                    const currentUser = await loginService.currentUser(localToken)
                    console.log("set user", {currentUser, token: localToken})
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

    if (!dataReady) {
        return (
            <Typography>Loading...</Typography>
        )
    }

    return !auth?.token ? (<Navigate to={redirectPath} replace />) : <Outlet />;
}

const UserWithOrganisationRoute = () => {
    const auth = useAuthData()
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
    return (
        <>
            <ThemeProvider theme={aqTheme}>
                <BrowserRouter>
                    <Routes>
                        <Route path="login" element={<LogIn/>} />
                        <Route path="logout" element={<LogOut />} />
                        <Route element={<ProtectedRoute />}>
                            <Route element={<UserWithOrganisationRoute />}>
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
    )
}

export default App;
