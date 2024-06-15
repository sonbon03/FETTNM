import React, { createContext, useState } from "react";

interface SelectedItems {
    id: string;
    title: string;
    price: number;
    quanility: number;
}

interface DataContextType {
    totalSelectedItems: SelectedItems[];
    setTotalSelectedItems: React.Dispatch<React.SetStateAction<SelectedItems[]>>;
}

export const DataContext = createContext<DataContextType>({
    totalSelectedItems: [],
    setTotalSelectedItems: () => {},
});
