import React from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import uiConfigs from "../../api/configs/ui.configs";
import {modes, setThemeMode} from "../../redux/features/theme.mode.slice";
import {Drawer, List, ListItemButton, ListItemIcon, ListItemText, Stack, Toolbar, Typography} from "@mui/material";
import Logo from "./Logo";
import menuConfigs from "../../api/configs/menu.configs";
import {Link} from "react-router-dom";
import {DarkModeOutlined, WbSunnyOutlined} from "@mui/icons-material";

type Props = {
    open:boolean,
    toggleSidebar: (value:boolean)=>void
}
const Sidebar = ({open,toggleSidebar}:Props) => {
    const dispatch = useAppDispatch();
    const {user} = useAppSelector(state=>state.user);
    const {appState} = useAppSelector(state=>state.appState)
    const {themeMode} = useAppSelector(state=>state.themeMode)

    const sidebarWidth = uiConfigs.size.sidebarWidth;
    const onSwitchTheme = ()=>{
        const theme = themeMode === modes.dark ? modes.light : modes.dark;
        dispatch(setThemeMode(theme))
    }

    const drawer = (
        <>
            <Toolbar sx={{paddingY:"20px", color:"text.primary"}}>
                <Stack width={"100%"} direction="row" justifyContent='center'>
                    <Logo/>
                </Stack>
            </Toolbar>
            <List sx={{padding:"30px"}}>
                <Typography variant="h6" marginBottom="20px">Menu</Typography>
                {
                    menuConfigs.main.map((item,i)=>(
                        <ListItemButton
                            key={i}
                            sx={{
                                borderRadius:"10px",
                                marginY:1,
                                backgroundColor:appState.includes(item.state) ? "primary.main":"unset",
                                color:appState.includes(item.state) ? "primary.contrastText":"inherit",
                            }}
                            component={Link}
                            to={item.path}
                        >
                            <ListItemIcon >
                                <item.icon sx={{color:appState.includes(item.state) ? "primary.contrastText":"inherit"}}/>
                            </ListItemIcon>
                            <ListItemText
                                disableTypography
                                primary={
                                    <Typography textTransform="uppercase">{item.display}</Typography>
                                }
                            />
                        </ListItemButton>
                    ))
                }
            {
                user && (<>
                        <Typography variant="h6" marginBottom="20px">PERSONAL</Typography>
                        {
                            menuConfigs.user.map((item,i)=>(
                                <ListItemButton
                                    key={i}
                                    sx={{
                                        borderRadius:"10px",
                                        marginY:1,
                                        backgroundColor:appState.includes(item.state) ? "primary.main":"unset",
                                        color:appState.includes(item.state) ? "primary.contrastText":"inherit",
                                    }}
                                    component={Link}
                                    to={item.path}
                                >
                                    <ListItemIcon color={appState.includes(item.state) ? "primary.contrastText":"inherit"}>
                                        <item.icon sx={{color:appState.includes(item.state) ? "primary.contrastText":"inherit"}}/>
                                    </ListItemIcon>
                                    <ListItemText
                                        disableTypography
                                        primary={
                                            <Typography textTransform="uppercase">{item.display}</Typography>
                                        }
                                    />
                                </ListItemButton>
                            ))
                        }

                </>)
            }
                <Typography variant="h6" marginBottom="20px">THEME</Typography>
                <ListItemButton onClick={onSwitchTheme}>
                    <ListItemIcon>
                        {themeMode !== modes.dark ?
                            <DarkModeOutlined />:
                            <WbSunnyOutlined/>}
                    </ListItemIcon>
                    <ListItemText
                        disableTypography
                        primary={
                            <Typography textTransform="uppercase">
                                {themeMode !== modes.dark ? "Dark Mode" :"Light Mode"}
                            </Typography>
                        }
                    />
                </ListItemButton>
            </List>
        </>
    )


    return (
        <Drawer
            open={open}
            onClose={()=>toggleSidebar(false)}
            sx={{
                "& .MuiDrawer-Paper":{
                    boxSizing:"border-box",
                    width:sidebarWidth,
                    borderRight:"0px"
                }
            }}

        >
            {drawer}
        </Drawer>
    );
};

export default Sidebar;
