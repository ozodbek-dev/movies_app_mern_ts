import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {ListItemButton, ListItemIcon, ListItemText, Menu, Typography} from "@mui/material";
import menuConfigs from "../../api/configs/menu.configs";
import {Link} from "react-router-dom";

const UserMenu = () => {
    const dispatch = useAppDispatch();
    const {user}= useAppSelector(state=>state.user)

    const [anchorEl, setAnchorEl] = useState<null|HTMLElement>(null);
    const toggleMenu = (e:React.MouseEvent<HTMLSpanElement, MouseEvent>)=>setAnchorEl(e.currentTarget);
    return (
        <>
            {user && (

                <>
                    <Typography
                        variant="h6"
                        sx={{cursor:"pointer", userSelect:"none"}}
                        onClick={e=>toggleMenu(e)}
                    >
                        {user.displayName}
                    </Typography>
                    <Menu
                        open={Boolean(anchorEl)}
                          anchorEl={anchorEl}
                        onClose={()=>setAnchorEl(null)}
                        PaperProps={{sx:{padding:0}}}
                    >
                        {
                            menuConfigs.user.map((item,index)=>(
                                <ListItemButton
                                    component={Link}
                                    to={item.path}
                                    key={index}
                                    onClick={()=>setAnchorEl(null)}
                                >
                                    <ListItemIcon>
                                        {<item.icon/>}
                                    </ListItemIcon>
                                    <ListItemText disableTypography primary={
                                        <Typography textTransform="uppercase">{item.display}</Typography>
                                    }/>
                                </ListItemButton>
                            ))
                        }
                    </Menu>
                </>

            )}
        </>
    );
};

export default UserMenu;
