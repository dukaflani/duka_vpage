import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    token: '',
    userInfo: null,
    profileInfo: null,
    deleteRefreshToken: false,
    country: '',
    ip_address: '',
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateToken: (state, action) => {
            state.token = `JWT ${action.payload}`
        },
        updateGeoLocation: (state, action) => {
            state.country = action.payload.country
            state.ip_address = action.payload.ip_address
        },
        updateUserInfo: (state, action) => {
            state.userInfo = action.payload
        },
        updateProfileInfo: (state, action) => {
            state.profileInfo = action.payload
        },
        logOut: (state) => {
            state.token = ''
            state.userInfo = null
            state.profileInfo = null
            state.deleteRefreshToken = true
        }
    }
})

export default authSlice.reducer
export const { updateToken, updateUserInfo, logOut, updateProfileInfo, updateGeoLocation } = authSlice.actions
