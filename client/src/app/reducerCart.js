import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';

export const getCarts = createAsyncThunk('cart', async () => {
    const products = localStorage.getItem('cart');
    return JSON.parse(products);
});

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartProducts: [],
    },
    reducers: {
        addProductToCart: (state, action) => {
            const product = {
                _id: action.payload.product._id,
                Name: action.payload.product.Name,
                Image: action.payload.product.Image,
                Price: action.payload.typeSelect.price,
                Sale: action.payload.typeSelect.sale,
                Description: action.payload.typeSelect.description,
                NumberProduct: 1,
            };
            state.cartProducts.push(product);
            localStorage.setItem('cart', JSON.stringify(state.cartProducts));
        },
        increase: (state, action) => {
            const result = current(state.cartProducts).map((product) => {
                if (product._id === action.payload._id) {
                    product = action.payload;
                }
                return product;
            });
            state.cartProducts = result;
            localStorage.setItem('cart', JSON.stringify(state.cartProducts));
        },
        decrease: (state, action) => {
            const result = current(state.cartProducts).map((product) => {
                if (product._id === action.payload._id) {
                    product = action.payload;
                }
                return product;
            });
            state.cartProducts = result;
            localStorage.setItem('cart', JSON.stringify(state.cartProducts));
        },
        remove: (state, action) => {
            const result = current(state.cartProducts).filter((product) => {
                if (product._id !== action.payload._id) {
                    return product;
                }
            });
            state.cartProducts = result;
            localStorage.setItem('cart', JSON.stringify(state.cartProducts));
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getCarts.fulfilled, (state, action) => {
            if (action.payload !== null) {
                state.cartProducts = action.payload;
            }
        });
    },
});

export const { addProductToCart, increase, decrease, remove } = cartSlice.actions;
export default cartSlice.reducer;
