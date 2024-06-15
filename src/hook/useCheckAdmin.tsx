import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function useCheckAdmin() {
    const location = useLocation();
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    useEffect(() => {
        if (location.pathname.includes("/admin")) {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    }, [location]);

    return { isAdmin };
}
