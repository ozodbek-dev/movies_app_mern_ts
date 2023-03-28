import {FavoriteType} from "../redux/features/user/user.slice";

type FavoriteUtilsCheckArgType = {
    listFavorites:Array<FavoriteType>,
    mediaId:string
}

const favoriteUtils = {
    check:({listFavorites,mediaId}:FavoriteUtilsCheckArgType):boolean=>listFavorites && listFavorites.find((e:FavoriteType)=>e.mediaId === mediaId) !== undefined
}

export default favoriteUtils;