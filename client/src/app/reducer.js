import { combineReducers } from 'redux';
import reducerCategory from './reducerCategory';
import reducerProduct from './reducerProduct';
import reducerFirm from './reducerFirm';

const reducer = combineReducers({
    product: reducerProduct,
    category: reducerCategory,
    firm: reducerFirm,
});

export default reducer;
