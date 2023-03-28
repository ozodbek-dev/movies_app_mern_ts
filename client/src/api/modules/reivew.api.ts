import privateClient from "../client/private.client";

type removeType={
    reviewId:string
}
type addType = {
    mediaId:string,
    mediaType:string,
    mediaTitle:string,
    mediaPoster:string,
    content:string
}
enum ReviewEndpoints{
    list="reviews",
    add="reviews",
}
const removeReview=({reviewId}:removeType):string=>`reviews/${reviewId}`;

const reviewApi = {
    add:async({
        mediaId,
        mediaType,
        mediaTitle,
        mediaPoster,
        content
    }:addType)=>{
        try {
            const response = await privateClient.post(
                ReviewEndpoints.add,
                {
                    mediaId,
                    mediaType,
                    mediaTitle,
                    mediaPoster,
                    content
                }
            )
            return {response}
        }
        catch (e)
        {
            return {e}
        }
    },

    remove:async({
                  reviewId
              }:removeType)=>{
        try {
            const response = await privateClient.delete(
                removeReview({reviewId})
            )
            return {response}
        }
        catch (e)
        {
            return {e}
        }
    },
    getList:async()=>{
        try {
            const response = await privateClient.post(ReviewEndpoints.list)
            return {response}
        }
        catch (e)
        {
            return {e}
        }
    }
}
export default reviewApi;