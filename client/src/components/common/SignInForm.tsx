import React from 'react';
import {authTypes, SwitchAuthStateType} from "./AuthModal";
import {LoadingButton} from "@mui/lab";
// 38 39 min


type Props = {
    switchAuthState:SwitchAuthStateType,
    state:authTypes
}
const SignInForm = ({switchAuthState, state}:Props) => {
    return (
        <div>
            SignInForm
        </div>
    );
};

export default SignInForm;
