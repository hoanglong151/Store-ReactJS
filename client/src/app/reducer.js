import { combineReducers } from 'redux';
import reducerCategory from './reducerCategory';
import reducerProduct from './reducerProduct';
import reducerFirm from './reducerFirm';
import reducerCart from './reducerCart';

const reducer = combineReducers({
    product: reducerProduct,
    category: reducerCategory,
    firm: reducerFirm,
    cart: reducerCart,
});

export default reducer;
