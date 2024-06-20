import React, { createContext, useState, ReactNode } from "react";

interface DataContextType {
    totalSelectedItem: any[];
    setTotalSelectedItems: React.Dispatch<React.SetStateAction<any[]>>;
}

export const DataContext = createContext<DataContextType>({
    totalSelectedItem: [],
    setTotalSelectedItems: () => {},
});

interface DataProviderProps {
    children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
    const [totalSelectedItem, setTotalSelectedItems] = useState<any[]>([]);

    return <DataContext.Provider value={{ totalSelectedItem, setTotalSelectedItems }}>{children}</DataContext.Provider>;
};
