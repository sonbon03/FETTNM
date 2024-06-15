import { userPersistConfig, userReducer } from "../slices/user.slice";
import { authPersistConfig, authReducer } from "../slices/auth.slice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { actionReducer } from "../slices/action.slice";
import { useDispatch } from "react-redux";
import { persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";
import { adminProduct } from "../queries/admin/admin.product";
import { userCart } from "../queries/user/user.cart";
import { userComment } from "../queries/user/user.comment";
import { userOrder } from "../queries/user/user.order";

const rootPersistConfig = {
    key: "root",
    storage,
    whitelist: [""],
};

const rootReducer = combineReducers({
    user: persistReducer(userPersistConfig, userReducer),
    auth: persistReducer(authPersistConfig, authReducer),
    action: actionReducer,
    //admin
    [adminProduct.reducerPath]: adminProduct.reducer,
    // user
    [userCart.reducerPath]: userCart.reducer,
    [userComment.reducerPath]: userComment.reducer,
    [userOrder.reducerPath]: userOrder.reducer,
});

const middlewares = [
    //admin
    adminProduct.middleware,
    // user
    userCart.middleware,
    userComment.middleware,
    userOrder.middleware,
];
const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: true,
            immutableCheck: false,
            serializableCheck: false,
        }).concat(middlewares),
});

export const wrapperPersistStore = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
