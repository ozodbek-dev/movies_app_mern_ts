import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import exp from "constants";

export enum modes {
    dark="dark",
    light='light'
}

const initialState = {
    themeMode:modes.dark
}
export const themeModeSlice = createSlice({
    name:"theme",
    initialState,
    reducers:{
        setThemeMode:(state,{payload}:PayloadAction<modes>)=>{
            state.themeMode=payload
        }
    }
})

export const {
    setThemeMode
} = themeModeSlice.actions

export default  themeModeSlice.reducer;