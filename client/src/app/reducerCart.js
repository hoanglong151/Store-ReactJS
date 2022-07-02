import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';

export const getCarts = createAsyncThunk('cart', async () => {
    const products = localStorage.getItem('cart');
    return JSON.parse(products);
});

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartProducts: [],
        totalPrice: 0,
        totalPriceSale: 0,
        saleCode: {},
    },
    reducers: {
        addProductToCart: (state, action) => {
            let newState = {};

            const getIndexExistProduct = current(state.cartProducts).findIndex((item) => {
                return item.TypeProductID === action.payload.TypeProductID;
            });

            const updateExistProduct = current(state.cartProducts).find((item) => {
                return item.TypeProductID === action.payload.TypeProductID;
            });

            let product = {
                _id: action.payload._id,
                Name: action.payload.Name,
                Image: action.payload.Image,
                Price: action.payload.Price,
                Sale: action.payload.Sale,
                Description: action.payload.Description,
                Color: action.payload.Color,
                TypeProductID: action.payload.TypeProductID,
                NumberProduct: (updateExistProduct && updateExistProduct.NumberProduct + 1) || 1,
            };
            const currentPrice = product.Sale ? product.Sale : product.Price;

            newState = {
                ...state,
                cartProducts: [...state.cartProducts, product],
                totalPrice: state.totalPrice + currentPrice,
                totalPriceSale: state.totalPriceSale + currentPrice,
            };

            if (getIndexExistProduct !== -1) {
                newState.cartProducts.splice(getIndexExistProduct, 1);
            }

            localStorage.setItem('cart', JSON.stringify(newState));
            return newState;
        },
        increase: (state, action) => {
            const result = current(state.cartProducts).map((product) => {
                if (product.TypeProductID === action.payload.TypeProductID) {
                    product = action.payload;
                }
                return product;
            });
            const currentPrice = action.payload.Sale ? action.payload.Sale : action.payload.Price;
            const newState = {
                ...state,
                cartProducts: result,
                totalPrice: state.totalPrice + currentPrice,
                totalPriceSale: state.totalPriceSale + currentPrice,
            };
            localStorage.setItem('cart', JSON.stringify(newState));
            return newState;
        },
        decrease: (state, action) => {
            const result = current(state.cartProducts).map((product) => {
                if (product.TypeProductID === action.payload.TypeProductID) {
                    product = action.payload;
                }
                return product;
            });
            const currentPrice = action.payload.Sale ? action.payload.Sale : action.payload.Price;
            const newState = {
                ...state,
                cartProducts: result,
                totalPrice: state.totalPrice - currentPrice,
                totalPriceSale: state.totalPriceSale - currentPrice,
            };
            localStorage.setItem('cart', JSON.stringify(newState));
            return newState;
        },
        remove: (state, action) => {
            let newState;
            const result = current(state.cartProducts).filter((product) => {
                if (product.TypeProductID !== action.payload.TypeProductID) {
                    return product;
                } else if (
                    (product.Description !== action.payload.Description &&
                        product.Price !== action.payload.Price &&
                        product.Sale !== action.payload.Sale) ||
                    product.Color !== action.payload.Color
                ) {
                    return product;
                }
            });
            const currentPrice = action.payload.Sale ? action.payload.Sale : action.payload.Price;
            if (result.length !== 0) {
                newState = {
                    ...state,
                    cartProducts: result,
                    totalPrice: state.totalPrice - currentPrice * action.payload.NumberProduct,
                    totalPriceSale: state.totalPriceSale - currentPrice * action.payload.NumberProduct,
                };
            } else {
                newState = {
                    ...state,
                    cartProducts: result,
                    totalPrice: state.totalPrice - currentPrice * action.payload.NumberProduct,
                    totalPriceSale: 0,
                };
            }

            localStorage.setItem('cart', JSON.stringify(newState));
            return newState;
        },
        applySale: (state, action) => {
            if (state.totalPrice > action.payload.Sale) {
                const newState = {
                    ...state,
                    totalPriceSale: state.totalPrice - action.payload.Sale,
                    saleCode: action.payload,
                };
                localStorage.setItem('cart', JSON.stringify(newState));
                return newState;
            }
        },
        emptyCart: () => {
            const newState = {
                cartProducts: [],
                totalPrice: 0,
                totalPriceSale: 0,
                saleCode: {},
            };
            localStorage.setItem('cart', JSON.stringify(newState));
            return newState;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getCarts.fulfilled, (state, action) => {
            if (action.payload !== null) {
                state = action.payload;
                return {
                    ...state,
                    cartProducts: action.payload.cartProducts,
                    totalPrice: action.payload.totalPrice,
                };
            }
        });
    },
});

export const { addProductToCart, increase, decrease, remove, applySale, emptyCart } = cartSlice.actions;
export default cartSlice.reducer;
