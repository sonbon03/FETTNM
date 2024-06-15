import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { formatDataSession } from "../utils/common";

interface CartContextType {
    cartData: any[];
    setCartData: (data: any[]) => void;
}

interface CartProviderProps {
    children: ReactNode;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cartData, setCartData] = useState<any[]>([]);

    useEffect(() => {
        const data = formatDataSession(sessionStorage.getItem("cart"));
        setCartData(data);
    }, []);

    useEffect(() => {
        const handleStorageChange = () => {
            const data = formatDataSession(sessionStorage.getItem("cart"));
            setCartData(data);
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    return <CartContext.Provider value={{ cartData, setCartData }}>{children}</CartContext.Provider>;
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
