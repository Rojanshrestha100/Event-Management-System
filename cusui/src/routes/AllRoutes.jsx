import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import * as Pages from "../pages"
import { Layout } from "../components"
import PrivateRoute from "./PrivateRoute"

const AllRoutes = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/cms" element={<Layout />}>
                <Route path="dashboard" element={<PrivateRoute element={<Pages.Cms.Dashboard.List />} />} />
                <Route path="payment/Epay" element={<PrivateRoute element={<Pages.Cms.Payment.Epay />} />} />

                {/* <Route path="catreens" element={<PrivateRoute element={<Pages.Cms.Catreens.List />} />} /> */}
                
                {/* <Route path="orders" element={<PrivateRoute element={<Pages.Cms.Orders.List />} />} />  */}

                <Route path="login" element={<Pages.Cms.Login.List />} />
            </Route>

            <Route path="/success" element={<Pages.Cms.Payment.Success />} />
            <Route path="/failure" element={<Pages.Cms.Payment.Failure />} />
            <Route path="/register" element={<Pages.Register.List />} />

            <Route path="/" element={<Navigate to="/cms/dashboard" />} />
        </Routes>
    </BrowserRouter>
}

export default AllRoutes