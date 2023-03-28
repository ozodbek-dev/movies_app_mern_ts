import publicClient from "../client/public.client";

type TypeMediaType = {
    mediaType:string
}
interface  GenreEndPointType {
    list:({mediaType}:TypeMediaType)=>string
}
const genreEndpoints:GenreEndPointType= {
    list:({mediaType})=>`${mediaType}/genres`
}

export default {
    getList:async({mediaType}:TypeMediaType)=>{
        try {
            const response = await publicClient.get(genreEndpoints.list({mediaType}))

        }catch (e) {
            return {e}
        }
    }
}