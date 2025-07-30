import { createSlice } from "@reduxjs/toolkit";

const authModalSlice = createSlice({
    name: "authModal",
    initialState: {
        isOpen: false,
    },
    reducers: {
        toggleAuthModal: (state) => {
            state.isOpen =!state.isOpen;
        },
        
    }
})

export const { toggleAuthModal } = authModalSlice.actions;

export default authModalSlice.reducer;