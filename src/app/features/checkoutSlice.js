import { createSlice } from "@reduxjs/toolkit";

const checkoutSlice = createSlice({
    name: "checkout",
    initialState: {
        opened: false,
    }, 
    reducers: {
        toggleCheckout: (state) => {
            state.opened =!state.opened;
        },
    }
})

export const { toggleCheckout } = checkoutSlice.actions;

export default checkoutSlice.reducer;