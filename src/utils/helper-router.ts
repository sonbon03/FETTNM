import { Location, NavigateFunction } from "react-router-dom";

// custom history object to allow navigation outside react components
export const history: {
    navigate: NavigateFunction;
    location: Location;
} = {
    navigate: null as any,
    location: null as any,
};
