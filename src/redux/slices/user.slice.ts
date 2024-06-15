import { RootState } from "../store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import storage from "redux-persist/lib/storage";

interface UserStage {
    user: User | null;
}

const initialState: UserStage = {
    user: null,
};

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setUserProfile: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state = initialState;
        },
    },
    extraReducers(builder) {},
});

const userPersistConfig = {
    key: "user",
    storage,
};

const userReducer = userSlice.reducer;
export { userReducer, userPersistConfig };
