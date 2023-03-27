import responseHandler from "../handlers/response.handler.js";
import ReviewModel from "../models/review.model.js";

const create = async (req, res)=>{
    try {
        const {movieId} = req.params;
        const review = new ReviewModel({
            user:req.user.id,
            movieId,
            ...req.body
        })

        await review.save();

        responseHandler.created(res,{
            ...review._doc,
            id:review.id,
            user:req.user
        })


    }catch {
        responseHandler.error(res)
    }
}

const remove = async (req, res)=>{
    try {
        const reviewId = req.params;

        const review = await ReviewModel.findOne({
            user:req.user.id,
            _id:reviewId
        })
        if(!review) return responseHandler.notFound(res)

        await review.remove()
        responseHandler.ok(res)

    }catch {
        responseHandler.error(res)
    }
}

const getReviewsOfUser = async (req, res)=>{
    try {
        const reviews = await ReviewModel.find({user:req.user.id}).sort("-createdAt")
        responseHandler.ok(res,reviews)
    }catch {
        responseHandler.error(res)
    }
}

export default {
    remove,create,getReviewsOfUser
}