import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./header";

const Layout: React.FunctionComponent = () => {
    return (
        <div className="container-fluid padding0">
            <Header />
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
