import publicClient from "../client/public.client";
type PersonType = {
personId:string
}
export interface PersonEndPointsType  {
    detail:({personId}:PersonType)=>string;
    medias:({personId}:PersonType)=>string;
}
const personEndpoints:PersonEndPointsType={
    detail:({personId})=>`person/${personId}`,
    medias:({personId})=>`person/${personId}/medias`,
}



const personApi = {
    detail:async({personId}:PersonType)=>{
        try {
            const response =  await publicClient.get(personEndpoints.detail({personId}))
            return {response}
        }catch (e){
            return {e}
        }
    },
    medias:async ({personId}:PersonType)=>{
        try {
            const response =  await publicClient.get(personEndpoints.medias({personId}))
            return {response}
        }catch (e){
            return {e}
        }
    },
}

export default personApi