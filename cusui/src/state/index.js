import { configureStore } from "@reduxjs/toolkit"
import customerReducer, { addCustomer, clearCustomer } from "./customer.slice"

const store = configureStore({
    reducer: {
        customer: customerReducer
    }
})

export default store

export {addCustomer, clearCustomer}