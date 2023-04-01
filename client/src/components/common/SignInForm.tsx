import React, {useState} from 'react';
import {authTypes, SwitchAuthStateType} from "./AuthModal";
import {LoadingButton} from "@mui/lab";
import {Alert, Box, Button, Stack, TextField} from '@mui/material';
import * as Yup from 'yup'
import {toast} from 'react-toastify';
import userApi from "../../api/modules/user.api";
import {setAuthModalOpen} from "../../redux/features/user/auth.modal.slice";
import {setUser} from "../../redux/features/user/user.slice";
import {useAppDispatch} from "../../hooks/reduxHooks";
import { useFormik} from "formik";
// 38 39 min


type Props = {
    switchAuthState:SwitchAuthStateType,
    state:authTypes
}
const SignInForm = ({switchAuthState, state}:Props) => {
    const dispatch = useAppDispatch();
    const [isLoginRequest, setIsLoginRequest] = useState(false);
    const [errorMessage, setErrorMessage] = useState<any>();

    type FormValues = {
        password:string,
        username:string
    }

    const    initialValues:FormValues = {
            password:"",
            username:""
        }

    const signinForm = useFormik({
        initialValues,
        validationSchema:Yup.object({
                username:Yup.string()
                    .required("username is required"),
            }),
        onSubmit:async values=> {
      
            setErrorMessage(undefined);
            setIsLoginRequest(true);


            const data = await userApi.signin(values);
            setIsLoginRequest(false);
            console.log(data)
            if(data?.response){
                signinForm.resetForm();
                dispatch(setUser(data.response));
                dispatch(setAuthModalOpen(false))
                toast("Sign in Success")
            }
            if(data?.errMsg) setErrorMessage(data.errMsg)
        }

    })

    return (
        <Box
            component="form" onSubmit={signinForm.handleSubmit}
        >
            <Stack spacing={3}>
                <TextField
                    type="text"
                    placeholder="username"
                    name="username"
                    value={signinForm.values.username}
                    onChange={signinForm.handleChange}
                    color="success"
                    error={signinForm.touched.username && signinForm.errors.username !== undefined}
                    helperText={signinForm.touched.username && signinForm.errors.username}
                />

                <TextField
                    type="password"
                    placeholder="password"
                    name="password"
                    value={signinForm.values.password}
                    onChange={signinForm.handleChange}
                    color="success"
                    error={signinForm.touched.password && signinForm.errors.password !== undefined}
                    helperText={signinForm.touched.password && signinForm.errors.password}
                />
            </Stack>
            <LoadingButton
                type="submit"
                fullWidth
                size="large"
                variant="contained"
                sx={{marginTop:4}}
                loading={isLoginRequest}
            >
                sign in
            </LoadingButton>
            <Button
                fullWidth
                sx={{marginTop:1}}
                onClick={()=>switchAuthState(state)}
            >
                sign up
            </Button>

            {
                errorMessage && (
                    <Box  sx={{marginTop:2}}>
                        <Alert severity="error" variant={"outlined"}>
                            {errorMessage}
                        </Alert>
                    </Box>
                )
            }
        </Box>
    );
};

export default SignInForm;
