import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'https://week-2mock-2.herokuapp.com/food-items';

const initialState = {
    cartItems: [],
    amount: 5,
    total: 0,
    isLoading: true,
};

export const getItems = createAsyncThunk('cart/getItems', async (name, thunkAPI) => {
    try {
        // console.log(name);
        // console.log(thunkAPI);
        // console.log(thunkAPI.getState());
        // thunkAPI.dispatch(openModal());
        const resp = await axios(url);
        return resp.data;
    } catch (error) {
        return thunkAPI.rejectWithValue('something went wrong');
    }
});

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {
            // state.cartItems = [];
            return { ...initialState, cartItems: [], amount: 0 };
        },
        removeItem: (state, action) => {
            // console.log(action);
            const itemId = action.payload;
            state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
        },
        toggle: (state, { payload }) => {
            const cartItem = state.cartItems.find((item) => item.id === payload.id);
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
    extraReducers: {
        [getItems.pending]: (state) => {
            state.isLoading = true;
        },
        [getItems.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.cartItems = action.payload;
        },
        [getItems.rejected]: (state, action) => {
            console.log(action);
            state.isLoading = false;
        },
    },
});

export const { clearCart, removeItem, toggle, calculateTotals } = cartSlice.actions;
export default cartSlice.reducer;
