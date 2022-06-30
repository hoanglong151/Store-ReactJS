import { combineReducers } from 'redux';
import reducerCart from './reducerCart';
import reducerTypeProduct from './reducerTypeProduct';
import reducerCategory from './reducerCategory';
import reducerFirm from './reducerFirm';
import reducerBill from './reducerBill';

const reducer = combineReducers({
    cart: reducerCart,
    typeProduct: reducerTypeProduct,
    category: reducerCategory,
    firm: reducerFirm,
    bill: reducerBill,
});

export default reducer;
