import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";

const Layout: React.FunctionComponent = () => {
    return (
        <div className="container-fluid padding0">
            <Header />
            <main id="main">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
