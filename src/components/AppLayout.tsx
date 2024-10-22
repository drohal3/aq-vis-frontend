import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SsidChartIcon from '@mui/icons-material/SsidChart';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import logo from '../../public/ideal-aq-logo-white.png'
import {useNavigate} from "react-router-dom";
import {ReactNode} from "react";
import Typography from "@mui/material/Typography";
import {Notifications} from "./notifications/Notifications.tsx";

// TODO: refactor to "parent component"

const drawerWidth = 240;

const styles = {
    logo: {
        maxWidth: '125px',
        margin: '5px'
    }
}

const drawerLinks = [
    {title: "Measurements", icon: (<SsidChartIcon/>), link: "/"},
    {title: "Devices", icon: (<SettingsInputComponentIcon/>), link: "/devices"},
    {title: "Organisation", icon: (<PeopleAltIcon/>), link: "/organisation"},
]

/* eslint-disable-next-line */
function ResponsiveDrawer(props: any) {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);
    const navigate = useNavigate();
    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    const drawer = (
        <div>
            <Toolbar/>
            <Divider/>
            <List>
                {drawerLinks.map((link) => (
                    <ListItem key={link.title} disablePadding onClick={() => navigate(link.link)}>
                        <ListItemButton>
                            <ListItemIcon>
                                {link.icon}
                            </ListItemIcon>
                            <ListItemText primary={link.title}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider/>
            <List>
                <ListItem key="logout" disablePadding onClick={() => navigate('/logout')}>
                    <ListItemButton>
                        <ListItemIcon>
                            <LogoutIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Logout"/>
                    </ListItemButton>
                </ListItem>
            </List>

        </div>
    );

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar
                position="fixed"
                sx={{
                    width: {sm: `calc(100% - ${drawerWidth}px)`},
                    ml: {sm: `${drawerWidth}px`},
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{mr: 2, display: {sm: 'none'}}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <img alt="IdealAQ logo" src={logo} width="70%" style={styles.logo}/>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{width: {sm: drawerWidth}, flexShrink: {sm: 0}}}
                aria-label="folders"
            >
                {/* TODO: The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    // container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: {xs: 'block', sm: 'none'},
                        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: {xs: 'none', sm: 'block'},
                        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{flexGrow: 1, p: 3, width: {sm: `calc(100% - ${drawerWidth}px)`}, md: `calc(100%)`}}
            >
                <Toolbar/>
                <Box
                    position="fixed"
                    sx={{
                        width: {sm: `calc(95% - ${drawerWidth}px)`}, md: `calc(100%)`,
                    }}
                >
                    <Notifications />
                </Box>
                {props.children}
            </Box>
        </Box>
    );
}

ResponsiveDrawer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * Remove this when copying and pasting into your project.
     */
    window: PropTypes.func,
};

function AppLayout({children, title}: { children: ReactNode, title?: string }) {
    const pageTitle = title && (
        <>
            <Typography variant="h4" gutterBottom>
                {title}
            </Typography>
            <Divider/>
        </>
    )

    return (
        <ResponsiveDrawer>
            <Box sx={{m: 1}}>
                {pageTitle}
                {children}
            </Box>
        </ResponsiveDrawer>
    )
}

export default AppLayout;
