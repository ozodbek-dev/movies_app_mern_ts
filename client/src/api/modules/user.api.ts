import privateClient from '../client/private.client'

export enum UserEndPoints {
    signin = "user/signin",
    signup="user/signup",
    getInfo="user/info",
    getFavorites = "user/favorites",
    addFavorite="user/favorites"
}
type BodyType={
    username:string,
    password:string
}

// 2: 04 ga keldim https://www.youtube.com/watch?v=j-Sn1b4OlLA

// const one:UserEndPoints.signin = UserEndPoints.signin;
// console.log(one);

const userApi = {
    signin:async({username, password}:BodyType)=>{
        try {

        }catch (e){

        }
    },
    signup:async({})=>{
        try {

        }catch (e){

        }
    },
    getInfo:async({})=>{
        try {

        }catch (e){

        }
    },
    getFavorites:async({})=>{
        try {

        }catch (e){

        }
    },
    addFavorites:async({})=>{
        try {

        }catch (e){

        }
    },
}
