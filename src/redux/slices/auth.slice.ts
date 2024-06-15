import { RootState } from "../store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { history } from "../../utils/helper-router";
import { useSelector } from "react-redux";
import storage from "redux-persist/lib/storage";

interface AuthState {
    accessToken: string;
    type: string;
    user: User | null;
    referralCode: string;
}

const initialState: AuthState = {
    accessToken: "",
    type: "",
    user: null,
    referralCode: "",
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        login: (state, action: PayloadAction<{ accessToken: string; type: string }>) => {
            state.accessToken = action.payload.accessToken;
            state.type = action.payload.type;
        },
        refreshToken: (state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
            state.accessToken = action.payload.accessToken;
        },
        setUserProfile: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
        setReferralCode: (state, action: PayloadAction<string>) => {
            state.referralCode = action.payload;
        },
        logout: (state, action: PayloadAction) => {
            state.user = null;
            state.type = "";
            state.accessToken = "";
            history.navigate("/");
        },
    },
    extraReducers(builder) {},
});

const authPersistConfig = {
    key: "auth",
    storage,
};

const authReducer = authSlice.reducer;
export const authSelector = (state: RootState) => state.auth;
export const useUser = () => useSelector((state: RootState) => state.auth.user);

export const { login, refreshToken, logout, setUserProfile, setReferralCode } = authSlice.actions;
export { authReducer, authPersistConfig };
