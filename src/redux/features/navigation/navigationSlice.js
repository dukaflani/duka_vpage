import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    pageChanged: null,
    referredView: false,
    referralURL: null,
    isRegularView: false,
}


const navigationSlice = createSlice({
    name: 'navigation',
    initialState,
    reducers: {
        pageHasChanged: (state, action) => {
            state.pageChanged = action.payload
        },
        pageIsReferred: (state, action) => {
            state.referredView = action.payload
        },
        updateRefferalURL: (state, action) => {
            state.referralURL = action.payload
        },
        removeRefferalURL: (state) => {
            state.referralURL = null
        },
        setRegularPageView: (state) => {
            state.isRegularView = true
        }
    }
})

export default navigationSlice.reducer
export const { pageHasChanged, pageIsReferred, updateRefferalURL, removeRefferalURL, setRegularPageView } = navigationSlice.actions
