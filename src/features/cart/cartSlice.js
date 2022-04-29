import { createSlice } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";

const initialState = {
    cartItems: cartItems,
    amount: 5,
    total: 0,
    isLoading: true,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        clearCart: (state) => {
            // state.cartItems = [];
            return { ...initialState, cartItems: [], amount: 0 };
        },
        removeItem: (state, action) => {
            // console.log(action);
            const itemId = action.payload;
            state.cartItems = state.cartItems.filter(
                (item) => item.id !== itemId
            );
        },
        toggle: (state, { payload }) => {
            const cartItem = state.cartItems.find(
                (item) => item.id === payload.id
            );
            payload.increase ? (cartItem.amount += 1) : (cartItem.amount -= 1);
        },
        calculateTotals: (state) => {
            let amount = 0;
            let total = 0;
            state.cartItems.forEach((item) => {
                amount += item.amount;
                total += item.amount * item.price;
            });
            state.amount = amount;
            state.total = total;
        },
    },
});
// console.log("cartSlice: ", cartSlice);

export const { clearCart, removeItem, toggle, calculateTotals } =
    cartSlice.actions;
export default cartSlice.reducer;
