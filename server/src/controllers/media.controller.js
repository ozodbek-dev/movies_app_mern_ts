import UserModel from "../models/user.model.js";
import tmdbApi from "../tmdb/tmdb.api.js";
import FavoriteModel from "../models/favorite.model.js";
import responseHandler from "../handlers/response.handler.js";
import ReviewModel from "../models/review.model.js";
import tokenMiddleware from "../middlewares/token.middleware.js";
import userModel from "../models/user.model.js";
import favoriteModel from "../models/favorite.model.js";
import reviewModel from "../models/review.model.js";

const getList = async (req, res)=>{
    try {
       const {page } = req.query;
       const {mediaType,mediaCategory} = req.params;
       const response = await tmdbApi.mediaList({mediaType,mediaCategory,page});
       return responseHandler.ok(req, response);
    }catch (e){
        responseHandler.error(res)
    }
}

const getGenres = async (req, res)=>{
    try {
       const {mediaType} = req.params;
       const response = await tmdbApi.mediaGenres({mediaType});
       return responseHandler.ok(req, response);
    }catch (e){
        responseHandler.error(res)
    }
}

const search = async (req, res)=>{
    try {
       const {mediaType} = req.params;
       const {query, page} = req.params;

       const response = await tmdbApi.mediaSearch({mediaType:mediaType==='people'?"person":mediaType, query,page});
       return responseHandler.ok(req, response);
    }catch (e){
        responseHandler.error(res)
    }
}
const getDetail = async (req, res)=>{
    try {
       const {mediaType, mediaId} = req.params;
       const params = {mediaType, mediaId}
        const media = await tmdbApi.mediaDetail(params);
       const credits = await tmdbApi.mediaCredits(params);
       media.credits = credits;
       const videos = await tmdbApi.mediaVideos(params)
        media .videos = videos
        const recommended = await tmdbApi.mediaRecommended(params);
       media.recommended = recommended.results;
       media.images = await tmdbApi.mediaImages(params)

        const tokenDecoded = tokenMiddleware.tokenDecode(req);
       if(tokenDecoded){
           const user = await  userModel.findById(tokenDecoded.data)
           if(user){
               const isFavorite = await favoriteModel.findOne({user:user.id, mediaId})
               media.isFavorite = isFavorite !==null
           }
       }
       media.reviews = reviewModel.find({mediaId}).populate("User").sort("-createdAt")

       responseHandler.ok(res,media)
    }catch (e){
        responseHandler.error(res)
    }
}



export  default {
getList,search,getGenres, getDetail
}