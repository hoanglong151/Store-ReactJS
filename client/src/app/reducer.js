import { combineReducers } from 'redux';
import reducerCart from './reducerCart';

const reducer = combineReducers({
    cart: reducerCart,
});

export default reducer;
