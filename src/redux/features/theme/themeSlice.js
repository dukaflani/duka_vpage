import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isDarkMode: "dark"
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setDarkMode: ( state, action ) => {
            state.isDarkMode = action.payload
        },
        setLightMode: ( state, action ) => {
            state.isDarkMode = action.payload
        }
    }
})


export default themeSlice.reducer
export const { setDarkMode, setLightMode } = themeSlice.actions
