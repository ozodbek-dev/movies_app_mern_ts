import React, {cloneElement, JSXElementConstructor, ReactElement, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {AppBar, Box, Button, IconButton, MenuItem, Stack, Toolbar, useScrollTrigger} from "@mui/material";
import {modes, setThemeMode} from "../../redux/features/theme.mode.slice";
import { DarkModeOutlined, Menu, WbSunnyOutlined} from "@mui/icons-material";
import Logo from "./Logo";
import menuConfigs from "../../api/configs/menu.configs";
import {Link} from "react-router-dom";
import UserMenu from "./UserMenu";
import {setAuthModalOpen} from "../../redux/features/user/auth.modal.slice";
import Sidebar from "./Sidebar";
type ChildrenType   = ReactElement<any, string | JSXElementConstructor<any>>
type ScrollAppBarTypes = {
    children:ChildrenType,
    window:any
}

const ScrollAppBar = ({children,window}:ScrollAppBarTypes)=>{
    const {themeMode} = useAppSelector(state=>state.themeMode);
    const trigger = useScrollTrigger({
        disableHysteresis:true,
        threshold:50,
        target:window ? window():undefined
    })
    return cloneElement(children,{
        sx:{
            color:trigger ? "text.primary":themeMode === modes.dark ? "primary.contrastText":"text.primary",
            backgroundColor:trigger ? "background.paper":themeMode === modes.dark ? "transparent":"background.paper"
        }
    })

}

const Topbar = () => {
    const dispatch = useAppDispatch();
    const {user} = useAppSelector(state=>state.user)
    const {appState} = useAppSelector(state=>state.appState)
    const {themeMode} = useAppSelector(state=>state.themeMode)
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const onSwitchTheme = ()=>{
        const theme = themeMode === modes.dark ? modes.light : modes.dark;
        dispatch(setThemeMode(theme))
    }
    const toggleSidebar = ()=>{
        setSidebarOpen(prev=>!prev)
    }
    return (
        <>
            <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar}/>
            <ScrollAppBar window={()=>{}}>
                <AppBar elevation={0} sx={{zIndex:999}}>
                    <Toolbar
                        sx={{alignItems:'center', justifyContent:"space-between"}}
                    >
                        <Stack direction="row" spacing={1} alignItems='center'>
                            <IconButton color="inherit" sx={{mr:2,display:{md:'none'}}} onClick={toggleSidebar}>
                                <Menu/>
                            </IconButton>
                            <Box sx={{display:{xs:"inline-block", md:"none"}}}>
                                <Logo/>
                            </Box>
                        </Stack>
                    {/*    main menu*/}
                        <Box flexGrow={1} alignItems={'center'} display={{xs:"none", md:"flex"}}>
                            <Box sx={{marginRight:"30px"}}>
                                <Logo/>
                            </Box>
                            {menuConfigs.main.map((item,index)=>(
                                <Button
                                key={index}
                                sx={{
                                    color:appState.includes(item.state) ? "primary.contrastText":"inherit",
                                    mr:2
                                }}
                                component={Link}
                                to={item.path}
                                variant={appState.includes(item.state) ? "contained":"text"}
                                >
                                    {item.display}
                                </Button>

                                ))}
                            <IconButton
                                sx={{color:'inherit'}}
                                onClick={onSwitchTheme}
                            >
                                {themeMode === modes.dark ? <DarkModeOutlined/>:<WbSunnyOutlined/>}
                            </IconButton>
                        </Box>
                    {/*    main menu*/}

                    {/*    User Menu*/}
                        <Stack spacing={3} direction={'row'} alignItems="center">
                            {!user && <Button variant={"contained"} onClick={()=>dispatch(setAuthModalOpen(true))}>Sign In</Button>}
                        </Stack>
                        {user && <UserMenu/>}
                    {/*    User Menu*/}
                    </Toolbar>
                </AppBar>
            </ScrollAppBar>
        </>
    );
};

export default Topbar;
