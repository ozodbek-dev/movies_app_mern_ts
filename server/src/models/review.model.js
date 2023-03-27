import mongoose,{model,Schema} from "mongoose";
import modelOptions from "./model.options.js";

export default model("Review",
    new Schema({
        user:{
            type:Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        content:{
            type:String,
            required:true,
        },
        mediaType:{
            type:String,
            enum:['tv',"movie"],
            required:true,
        },
        mediaId:{
            type:String,
            required:true,
        },
        mediaPoster:{
            type:String,
            required:true,
        }

} ,modelOptions))