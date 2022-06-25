import { combineReducers } from 'redux';
import reducerCart from './reducerCart';
import reducerProduct from './reducerProduct';
import reducerTypeProduct from './reducerTypeProduct';
import reducerCategory from './reducerCategory';
import reducerFirm from './reducerFirm';

const reducer = combineReducers({
    cart: reducerCart,
    product: reducerProduct,
    typeProduct: reducerTypeProduct,
    category: reducerCategory,
    firm: reducerFirm,
});

export default reducer;
