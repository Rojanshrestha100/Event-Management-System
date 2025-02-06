import { configureStore } from "@reduxjs/toolkit"
import adminReducer, { addAdmin, clearAdmin } from "./admin.slice"

const store = configureStore({
    reducer: {
        admin: adminReducer
    }
})

export default store

export {addAdmin, clearAdmin}