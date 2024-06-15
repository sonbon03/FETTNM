import React from "react";
import "../src/assets/css/vendor.min.css";
import "../src/assets/css/layout.css";
import "../src/assets/css/media-screen.css";

import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./layouts";
import HomePageUser from "./pages/HomePageUser";
import ProductPage from "./pages/ProductPage";
import FormManagementProduct from "./pages/FormManagementProduct";
import DetailProduct from "./pages/DetailProduct";
import ManagementProduct from "./pages/ManagementProduct";
import Payment from "./pages/Payment";
import ThankPage from "./pages/ThankPage";
import HistoryPay from "./pages/HistoryPay";
import DetailHistory from "./pages/DetailHistory";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route
                    path="/"
                    element={<Layout />}
                >
                    <Route
                        path="/"
                        element={<HomePageUser />}
                    />
                    <Route
                        path="/admin"
                        element={<HomePageUser />}
                    />
                    <Route
                        path="/admin/product-list"
                        element={<ProductPage />}
                    />
                    <Route
                        path="/product-list"
                        element={<ProductPage />}
                    />
                    <Route
                        path="/admin/form-management-product/:id"
                        element={<FormManagementProduct />}
                    />
                    <Route
                        path="/admin/form-management-product"
                        element={<FormManagementProduct />}
                    />
                    <Route
                        path="/admin/management-product"
                        element={<ManagementProduct />}
                    />
                    <Route
                        path="/admin/detail-product/:id"
                        element={<DetailProduct />}
                    />
                    <Route
                        path="/detail-product/:id"
                        element={<DetailProduct />}
                    />
                    <Route
                        path="/payment"
                        element={<Payment />}
                    />
                    <Route
                        path="/thankpage"
                        element={<ThankPage />}
                    />
                    <Route
                        path="/history-pay"
                        element={<HistoryPay />}
                    />
                    <Route
                        path="/detail-history-pay"
                        element={<DetailHistory />}
                    />
                    <Route
                        path="/admin/product-list-type/:id"
                        element={<ProductPage />}
                    />
                    <Route
                        path="/product-list-type/:id"
                        element={<ProductPage />}
                    />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
