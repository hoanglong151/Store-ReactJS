import { combineReducers } from 'redux';
import reducerCart from './reducerCart';
import reducerTypeProduct from './reducerTypeProduct';
import reducerCategory from './reducerCategory';
import reducerFirm from './reducerFirm';
import reducerDetailBill from './reducerDetailBill';

const reducer = combineReducers({
    cart: reducerCart,
    typeProduct: reducerTypeProduct,
    category: reducerCategory,
    firm: reducerFirm,
    detailBill: reducerDetailBill,
});

export default reducer;
