import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import responseHandler from "../handlers/response.handler.js";

const signup = async (req, res)=>{
    try {
        const {username, password, displayName} = req.body;

        const checkUser = await userModel.findOne({username})
        if(checkUser) return responseHandler.badRequest(res,"This UserName  Already used")

        const user = new UserModel();
        user.displayName = displayName;
        user.username = username;
        user.setPassword(password)

        await user.save();

        const token = jwt.sign(
            {data:user.id},
            process.env.JWT_SECRET,
            {expiresIn: "24h"}
        )

        responseHandler.created(res,{
            token,
            ...user._doc,
            id:user.id
        })

    }catch (e){
        responseHandler.error(res)
    }
}

const signin = async (req, res)=>{
    try {
        const {username, password} = req.body;

        const user = await UserModel.findOne({username}).select("username password salt id displayName")

        if(!user) return responseHandler.badRequest(res,"User Not Exist")

        if(!user.validPassword(password)) return responseHandler.badRequest(res,"Wrong Password!")
        const token = jwt.sign(
            {data:user.id},
            process.env.JWT_SECRET,
            {expiresIn: "24h"}
        )

        user.password = undefined;
        user.salt= undefined;

        responseHandler.created(res,{
            token,
            ...user._doc,
            id:user.id
        })

    }catch (e){
        responseHandler.error(res)
    }
}

const updatePassword = async (req, res)=>{
    try {
        const {password, newPassword} = req.body;

        const user = await UserModel.findById(req.user.id);

        if(!user) return responseHandler.unAuthorize(res)

        if(!user.validPassword(password)) {
            return responseHandler.badRequest(res,"Wrong Password!")
        }

        user.setPassword(newPassword);

       responseHandler.ok(res, user)

    }catch (e){
        responseHandler.error(res)
    }
}

const getInfo = async (req, res)=>{
    try {
       const user = await UserModel.findById(req.user.id);
       if(!user) return responseHandler.notFound(res)

    }catch (e){
        responseHandler.error(res)
    }
}


export  default {
    signup,
    signin,
    updatePassword,
    getInfo
}