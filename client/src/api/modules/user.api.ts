import privateClient from '../client/private.client'
import publicClient from "../client/public.client";

export enum UserEndPoints {
    signin = "user/signin",
    signup="user/signup",
    getInfo="user/info",
    getFavorites = "user/favorites",
    addFavorite="user/favorites"
}
type SigninBodyType={
    username:string,
    password:string
}
type SignUpBodyType={
    username:string,
    password:string,
    confirmPassword:string,
    displayName:string
}
type PasswordUpdateType={
    newPassword:string,
    password:string,
    confirmNewPassword:string,
}



const userApi = {
    signin:async({username, password}:SigninBodyType)=>{
        try {
            const response = await publicClient.post(UserEndPoints.signin,{username,password})
            return {response}
        }catch (e){
            if(e instanceof  Error) return {errMsg:e.message}
            console.log(e)
        }
    },
    signup:async({username, password, confirmPassword,displayName}:SignUpBodyType)=>{
        try {
            const response = await publicClient
                .post(UserEndPoints.signup,
                    {username, password, confirmPassword,displayName});
            return {response}

        }catch (e){
            if(e instanceof  Error) return {e}
            console.log(e)
        }
    },
    passwordUpdate:async({password, confirmNewPassword,newPassword}:PasswordUpdateType)=>{
        try {
            const response = await privateClient.put(
                UserEndPoints.signup,
                {password, confirmNewPassword,newPassword}
            )
            return {response};
        }catch (e){
            if(e instanceof  Error) return {errMsg:e.message}
            console.log(e)
        }
    },
    getInfo:async()=>{
        try {
            const response = await privateClient.get(
                UserEndPoints.getInfo
            )
            return {response};
        }catch (e){
            if(e instanceof  Error) return {errMsg:e.message}
            console.log(e)
        }
    },


    getFavorites:async({})=>{
        try {

        }catch (e){
            if(e instanceof  Error) return {errMsg:e.message}
            console.log(e)
        }
    },
    addFavorites:async({})=>{
        try {

        }catch (e){
            if(e instanceof  Error) return {errMsg:e.message}
            console.log(e)
        }
    },
}
export default userApi