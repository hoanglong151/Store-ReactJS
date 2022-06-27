import { combineReducers } from 'redux';
import reducerCart from './reducerCart';
import reducerTypeProduct from './reducerTypeProduct';
import reducerCategory from './reducerCategory';
import reducerFirm from './reducerFirm';

const reducer = combineReducers({
    cart: reducerCart,
    typeProduct: reducerTypeProduct,
    category: reducerCategory,
    firm: reducerFirm,
});

export default reducer;
