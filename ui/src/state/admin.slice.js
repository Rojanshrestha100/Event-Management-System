import { createSlice } from "@reduxjs/toolkit"

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        value: {}
    },
    reducers: {
        addAdmin: (state, action) => {
            state.value = action.payload
        },
        clearAdmin: state => {state.value = {}}
    }
})

export default adminSlice.reducer

export const {addAdmin, clearAdmin} = adminSlice.actions