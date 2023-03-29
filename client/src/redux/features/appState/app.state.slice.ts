import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import exp from "constants";


const initialState = {
    appState:"home"
}
export const appStateSlice = createSlice({
    name:"appState",
    initialState,
    reducers:{
        setAppState:(state,{payload}:PayloadAction<string>)=>{
            state.appState= payload || ""
        }
    }
})

export const {
    setAppState
} = appStateSlice.actions

export default  appStateSlice.reducer;