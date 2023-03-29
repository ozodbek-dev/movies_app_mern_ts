import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {setAuthModalOpen} from "../../redux/features/user/auth.modal.slice";
import {Box, Modal} from "@mui/material";
import Logo from "./Logo";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

export enum authTypes{
    signin="signin",
    signup="signup"
}
export type SwitchAuthStateType = (state:authTypes)=>void
const AuthModal = () => {
    const {authModalOpen}  = useAppSelector(state=>state.authModal)
    console.log(authModalOpen)
    const dispatch = useAppDispatch();

    const [action, setAction] = useState<authTypes>(authTypes.signin);
    useEffect(()=>{
        if(authModalOpen) setAction(authTypes.signin)
    },[authModalOpen])

    const handleClose = ()=>dispatch(setAuthModalOpen(false))
    const switchAuthState:SwitchAuthStateType = (state)=> {
        setAction(state)
    };


    return (
        <Modal open={authModalOpen} onClose={handleClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%", left: "50%",
                    transform: "translate(-50%,-50%)" ,
                    width: "100%",
                    maxWidth: "600px",
                    padding:4,
                    outline:'none'
                }}
            >
                <Box sx={{padding: 4, boxShadow: 24, backgroundColor:"background.paper"}}>
                    <Box sx={{textAlign:"center", marginBottom:"2rem"}}>
                        <Logo/>
                    </Box>
                    {action === authTypes.signin && <SignInForm switchAuthState={switchAuthState} state={authTypes.signup}/>}
                    {action === authTypes.signup && <SignUpForm switchAuthState={switchAuthState} state={authTypes.signin}/>}
                </Box>

            </Box>
        </Modal>
    );
};

export default AuthModal;
