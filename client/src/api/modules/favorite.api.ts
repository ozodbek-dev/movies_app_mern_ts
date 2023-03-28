import privateClient from "../client/private.client";

type RemoveArgType = {
favoriteId:string
}
type AddFavoriteBodyType = {
    mediaId:string,
    mediaType:string,
    mediaTitle:string,
    mediaPoster:string,
    mediaRate:string
}
enum FavoriteEndpoints{
    list='user/favorites',
    add="user/favorites"
}
const removeFavorite = ({favoriteId}:RemoveArgType)=>`user/favorites/${favoriteId}`;

const favoriteApi = {
    getList:async()=>{
        try {
            const response = await privateClient.get(FavoriteEndpoints.list);
            return {response}
        }catch (e) {
            return{e}
        }
    },
    add:async({mediaId,mediaType,mediaTitle,mediaPoster,mediaRate}:AddFavoriteBodyType)=>{
        try {
            const response = await privateClient.post(FavoriteEndpoints.add,{
                mediaId,mediaType,mediaTitle,mediaPoster,mediaRate
            });
            return {response}
        }catch (e) {
            return{e}
        }
    },
    remove:async({favoriteId}:RemoveArgType)=>{
        try {
            const response = await privateClient.delete(removeFavorite({favoriteId}));
            return {response}
        }catch (e) {
            return{e}
        }
    },
}