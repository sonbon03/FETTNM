import { GROUP_TAB } from "../../consts";
import { RootState } from "../store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ActionState {
    activeTab: string;
}

const initialState: ActionState = {
    activeTab: GROUP_TAB.GENERAL,
};

const actionSlice = createSlice({
    name: "action",
    initialState: initialState,
    reducers: {
        updateActiveTab: (state, action: PayloadAction<string>) => {
            state.activeTab = action.payload;
        },
    },
    extraReducers(builder) {},
});

const actionReducer = actionSlice.reducer;
export const actionSelector = (state: RootState) => state.action;
export const { updateActiveTab } = actionSlice.actions;
export { actionReducer };
