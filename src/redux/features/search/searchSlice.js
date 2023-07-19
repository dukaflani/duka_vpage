import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    searchTerm: ''
}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        addSearchTerm: ( state, action ) => {
            state.searchTerm = action.payload
        },
        deleteSearchTerm: ( state ) => {
            state.searchTerm = ''
        }
    }
})


export default searchSlice.reducer
export const { addSearchTerm, deleteSearchTerm } = searchSlice.actions
