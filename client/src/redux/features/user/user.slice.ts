import { createSlice, PayloadAction} from '@reduxjs/toolkit';

export enum MediaEnumType {
  tv="tv",
  movie="movie"
}
export interface  UserType {
  token:string,
  username:string,
  displayName:string,
}
export interface  FavoriteType{
  user:string|UserType,
  mediaType:MediaEnumType | string,
  mediaId:string,
  mediaPoster:string,
  mediaRate:number
}
type  InitialStateType = {
  user:null | UserType,
  listFavorites: Array<FavoriteType>|[]
}

const initialState:  InitialStateType= {
  user: {
    username:"ozodbek",
    displayName:"Bakhtiyorov",
    token:"token"
  },
  listFavorites:[]
};
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state,{payload}:PayloadAction<UserType|null>) => {
      if(payload === null){
        localStorage.removeItem("actkn");
      }
      else{
       if(payload.token) localStorage.setItem("actkn",payload.token)
      }
      state.user = payload;
    },
    setListFavorites:(state,{payload}:PayloadAction<Array<FavoriteType>|[]>)=>{
      state.listFavorites = payload
    },
    removeFavorite:(state,{payload}:PayloadAction<{mediaId:string|undefined}>)=>{
      const {mediaId} = payload;
      state.listFavorites = [...state.listFavorites.filter((e:FavoriteType)=>e.mediaId!== mediaId)]
    },
    addFavorite:(state,{payload}:PayloadAction<FavoriteType>)=>{
      state.listFavorites = [payload,...state.listFavorites]
    }
  },
});

export const { setUser, removeFavorite,setListFavorites,addFavorite } = userSlice.actions;

export default userSlice.reducer;
