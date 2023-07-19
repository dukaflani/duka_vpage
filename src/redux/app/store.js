import { configureStore } from "@reduxjs/toolkit";
import searchReducer from '../features/search/searchSlice'
import authReducer from '../features/auth/authSlice'
import themeReducer from '../features/theme/themeSlice'
import navigationReducer from '../features/navigation/navigationSlice'

const store = configureStore({
    reducer: {
        search: searchReducer,
        auth: authReducer, 
        theme: themeReducer,
        navigation: navigationReducer,
    }
})


export default store
