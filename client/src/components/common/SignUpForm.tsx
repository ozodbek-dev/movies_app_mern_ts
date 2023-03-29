import React from 'react';
import {authTypes, SwitchAuthStateType} from "./AuthModal";
type Props = {
    switchAuthState:SwitchAuthStateType,
    state:authTypes
}
const SignUpForm = ({switchAuthState,state}:Props) => {
    return (
        <div>
            SignInForm
        </div>
    );
};

export default SignUpForm;
