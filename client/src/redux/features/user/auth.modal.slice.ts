import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import exp from "constants";

export type AuthModalType = {
    authModalOpen:boolean
}

const initialState:AuthModalType = {
    authModalOpen:false
}
export const authModalSlice = createSlice({
    name:"authModal",
    initialState,
    reducers:{
        setAuthModalOpen:(state,{payload}:PayloadAction<boolean>)=>{
            state.authModalOpen=payload
        }
    }
})

export const {
    setAuthModalOpen
} = authModalSlice.actions

export default  authModalSlice.reducer;