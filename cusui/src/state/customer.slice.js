import { createSlice } from "@reduxjs/toolkit"

const customerSlice = createSlice({
    name: 'customer',
    initialState: {
        value: {}
    },
    reducers: {
        addCustomer: (state, action) => {
            state.value = action.payload
        },
        clearCustomer: state => {state.value = {}}
    }
})

export default customerSlice.reducer

export const {addCustomer, clearCustomer} = customerSlice.actions