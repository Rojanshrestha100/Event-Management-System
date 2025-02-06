import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import * as Pages from "../pages";
import { Layout } from "../components";
import PrivateRoute from "./PrivateRoute";

const AllRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/cms" element={<Layout />}>
                    <Route path="dashboard" element={<PrivateRoute element={<Pages.Cms.Dashboard.List />} />} />

                    <Route path="venues" element={<PrivateRoute element={<Pages.Cms.Venues.List />} />} />
                    <Route path="venues/create" element={<PrivateRoute element={<Pages.Cms.Venues.Create />} />} />
                    <Route path="venues/edit/:id" element={<PrivateRoute element={<Pages.Cms.Venues.Edit />} />} />
                    
                    <Route path="catreens" element={<PrivateRoute element={<Pages.Cms.Catreens.List />} />} />
                    <Route path="catreens/create" element={<PrivateRoute element={<Pages.Cms.Catreens.Create />} />} />
                    <Route path="catreens/edit/:id" element={<PrivateRoute element={<Pages.Cms.Catreens.Edit />} />} />
                    
                    <Route path="decorators" element={<PrivateRoute element={<Pages.Cms.Decorators.List />} />} />
                    <Route path="decorators/create" element={<PrivateRoute element={<Pages.Cms.Decorators.Create />} />} />
                    <Route path="decorators/edit/:id" element={<PrivateRoute element={<Pages.Cms.Decorators.Edit />} />} />

                    <Route path="photographers" element={<PrivateRoute element={<Pages.Cms.Photographers.List />} />} />
                    <Route path="photographers/create" element={<PrivateRoute element={<Pages.Cms.Photographers.Create />} />} />
                    <Route path="photographers/edit/:id" element={<PrivateRoute element={<Pages.Cms.Photographers.Edit />} />} />

                    <Route path="musics" element={<PrivateRoute element={<Pages.Cms.Musics.List />} />} />
                    <Route path="musics/create" element={<PrivateRoute element={<Pages.Cms.Musics.Create />} />} />
                    <Route path="musics/edit/:id" element={<PrivateRoute element={<Pages.Cms.Musics.Edit />} />} />

                    <Route path="menus" element={<PrivateRoute element={<Pages.Cms.Menus.List />} />} />
                    <Route path="menus/create" element={<PrivateRoute element={<Pages.Cms.Menus.Create />} />} />
                    <Route path="menus/edit/:id" element={<PrivateRoute element={<Pages.Cms.Menus.Edit />} />} />
                    
                    {/* Define the orders routes */}
                    <Route path="orders" element={<PrivateRoute element={<Pages.Cms.Orders.List />} />}></Route>
                     
                    

                    <Route path="customers" element={<PrivateRoute element={<Pages.Cms.Customer.List />} />} />

                    <Route path="login" element={<Pages.Cms.Login.List />} />
                </Route>

                {/* Redirect to the dashboard by default */}
                <Route path="/" element={<Navigate to="/cms/dashboard" />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AllRoutes;
