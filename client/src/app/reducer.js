import { combineReducers } from 'redux';
import reducerCategory from './reducerCategory';
import reducerProduct from './reducerProduct';
import reducerFirm from './reducerFirm';
import reducerCart from './reducerCart';
import reducerArea from './reducerArea';
import reducerProvince from './reducerProvince';
import reducerDistrict from './reducerDistrict';
import reducerSaleCode from './reducerSaleCode';
import reducerAddressStore from './reducerAddressStore';

const reducer = combineReducers({
    product: reducerProduct,
    category: reducerCategory,
    firm: reducerFirm,
    cart: reducerCart,
    area: reducerArea,
    province: reducerProvince,
    district: reducerDistrict,
    saleCode: reducerSaleCode,
    addressStore: reducerAddressStore,
});

export default reducer;
