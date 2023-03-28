import privateClient from "../client/private.client";
import publicClient from "../client/public.client";

type ListEndpointType = {
    mediaType:string,
    mediaCategory:string,
    page:string
}
type DetailEndpointType = {
    mediaType:string,
    mediaId:string,
}
type SearchEndpointType = {
    mediaType:string,
    query:string,
    page:string
}
interface  MediaEndPointsInterface{
    list:({mediaType,mediaCategory,page}:ListEndpointType)=>string;
    detail:({mediaType,mediaId}:DetailEndpointType)=>string;
    search:({mediaType,query,page}:SearchEndpointType)=>string
}

const mediaEndpoints:MediaEndPointsInterface={
    list:({mediaType,mediaCategory,page})=>`${mediaType}/${mediaCategory}?page=${page}`,
    detail:({mediaId,mediaType})=>`${mediaType}/detail/${mediaId}`,
    search:({mediaType, page,query})=>`${mediaType}/search?query=${query}&page=${page}`
}

export default {
    getList:async({mediaType,mediaCategory,page}:ListEndpointType)=>{
        try {
            const response = await publicClient.get(
                mediaEndpoints.list({mediaType,mediaCategory,page})
            )
            return {response}
        }catch (e) {
            return {e}
        }
    },
    getDetail:async({mediaType,mediaId}:DetailEndpointType)=>{
        try {
            const response = await privateClient.get(
                mediaEndpoints.detail({mediaType,mediaId})
            )
            return {response}
        }catch (e) {
            return {e}
        }
    },
    search:async({mediaType,query,page}:SearchEndpointType)=>{
        try {
            const response = await publicClient.get(
                mediaEndpoints.search({mediaType,page,query})
            )
            return {response}
        }catch (e) {
            return {e}
        }
    }

}