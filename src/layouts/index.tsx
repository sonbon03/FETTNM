import React, { useState } from "react";
import Header from "./header";
import { Outlet } from "react-router-dom";
import { DataContext } from "../Context";
interface SelectedItems {
    id: string;
    title: string;
    price: number;
    quanility: number;
}
const Layout: React.FunctionComponent = () => {
    const [totalSelectedItems, setTotalSelectedItems] = useState<SelectedItems[]>([]);
    return (
        <div className="container-fluid padding0">
            <Header setTotalSelectedItems={(data: any) => setTotalSelectedItems(data)} />
            <main>
                <DataContext.Provider value={{ totalSelectedItems, setTotalSelectedItems }}>
                    <Outlet />
                </DataContext.Provider>
            </main>
        </div>
    );
};

export default Layout;
