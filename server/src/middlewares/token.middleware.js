import jwt from 'jsonwebtoken'
import responseHandler from "../handlers/response.handler.js";
import UserModel from "../models/user.model.js";
const tokenDecode = (req)=>{
    try {
        const bearerHeader = req.headers['authorization']
        if(bearerHeader){
            const token = bearerHeader.split(" ")[1]
            return jwt.verify(token,process.env.JWT_SECRET)
        }
        return false
    }catch (e) {
        return false;
    }
}
const auth = async (req, res, next)=> {
    const tokenDecoded = tokenDecode(req);
    if(!tokenDecoded) return responseHandler.unAuthorize(res);

    const user = await UserModel.findById(tokenDecoded.data)
    if(!user) return responseHandler.unAuthorize(res);

    req.user = user;

    next(0);
}

export default {auth ,tokenDecode}