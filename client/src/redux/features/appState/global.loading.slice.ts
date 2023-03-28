import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import exp from "constants";

export type AuthModalType = {
    globalLoading:boolean
}

const initialState:AuthModalType = {
    globalLoading:false
}
export const globalLoadingSlice = createSlice({
    name:"authModal",
    initialState,
    reducers:{
        setGlobalLoading:(state,{payload}:PayloadAction<boolean>)=>{
            state.globalLoading=payload
        }
    }
})

export const {
    setGlobalLoading
} = globalLoadingSlice.actions

export default  globalLoadingSlice.reducer;