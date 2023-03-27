import responseHandler from "../handlers/response.handler.js";
import FavoriteModel from "../models/favorite.model.js";
import favoriteModel from "../models/favorite.model.js";

const addFavorite = async(req, res)=>{
    try {
        const isFavorite = await FavoriteModel.findOne({
            user:req.user.id,
            mediaId:req.body.mediaId
        })
        if(isFavorite) return responseHandler.ok(res,isFavorite);
        const favorite = new FavoriteModel({
            ...req.body,
            user:req.user.id
        })
        responseHandler.created(res,favorite)
    }catch (e) {
        responseHandler.error(res);
    }
}
const removeFavorite = async(req, res)=>{
    try {
        const {favoriteId} = req.params;
        const favorite = await favoriteModel.findOne({
            user:req.user.id,
            _id:favoriteId
        })
        if(!favorite) return responseHandler.notFound(res);
        await favorite.remove();
        responseHandler.ok(res)
    }catch (e) {
        responseHandler.error(res);
    }
}
const getFavoritesOfUser = async(req, res)=>{
    try {
       const favorite = await FavoriteModel.find({user:req.user.id}).sort('-createdAt');
       responseHandler.ok(res,favorite)
    }catch (e) {
        responseHandler.error(res);
    }
}

export  default {
    addFavorite,
    removeFavorite,
    getFavoritesOfUser
}