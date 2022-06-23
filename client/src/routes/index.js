// Public Routers
import UserHome from '~/pages/Client/Home';
import UserProductDetail from '~/pages/Client/ProductDetail';
import UserProductsCategory from '~/pages/Client/ProductsCategory';
import UserProductsCategoryFirm from '~/pages/Client/ProductsCategoryFirm';
import UserCartProduct from '~/pages/Client/CartProduct';
import UserPayment from '~/pages/Client/Payment';
import UserFindBill from '~/pages/Client/FindBill';
import UserProducts from '~/pages/Client/Products';

// Private Routers
import AdminProducts from '~/pages/Admin/Products';
import AdminAddProduct from '~/pages/Admin/Products/AddProduct';
import AdminEditProduct from '~/pages/Admin/Products/EditProduct';
import AdminDetailProduct from '~/pages/Admin/Products/DetailProduct';
import AdminDeleteProduct from '~/pages/Admin/Products/DeleteProduct';
import AdminCategories from '~/pages/Admin/Categories';
import AdminHome from '~/pages/Admin/Home/Home';
import AdminBills from '~/pages/Admin/Bills';
import AdminFirms from '~/pages/Admin/Firms';
import AdminAreas from '~/pages/Admin/Areas';
import AdminProvinces from '~/pages/Admin/Provinces';
import AdminDistricts from '~/pages/Admin/Districts';
import AdminSaleCodes from '~/pages/Admin/SaleCodes';
import AdminAddressStores from '~/pages/Admin/AddressStores';
import AdminBillStatus from '~/pages/Admin/BillStatus';
import AdminBillDetail from '~/pages/Admin/Bills/DetailBill';

// Layout
import NoSidebar from '~/Layouts/Client/NoSidebar';
import CartLayout from '~/Layouts/Client/CartLayout/CartLayout';

const publicRoutes = [
    { path: '/', component: UserHome },
    { path: 'product/detail', component: UserProductDetail, layout: NoSidebar },
    { path: 'products', component: UserProducts, layout: NoSidebar },
    { path: 'category', component: UserProductsCategory, layout: NoSidebar },
    { path: 'firm', component: UserProductsCategoryFirm, layout: NoSidebar },
    { path: 'cart', component: UserCartProduct, layout: CartLayout },
    { path: 'bill', component: UserPayment, layout: CartLayout },
    { path: 'findBill', component: UserFindBill, layout: CartLayout },
];

const privateRoutes = [
    { path: 'Admin/', component: AdminHome },
    { path: 'Admin/Products', component: AdminProducts },
    { path: 'Admin/AddProduct', component: AdminAddProduct },
    { path: 'Admin/EditProduct/:id', component: AdminEditProduct },
    { path: 'Admin/DetailProduct/:id', component: AdminDetailProduct },
    { path: 'Admin/DeleteProduct/:id', component: AdminDeleteProduct },
    { path: 'Admin/Categories', component: AdminCategories },
    { path: 'Admin/Bills', component: AdminBills },
    { path: 'Admin/Firms', component: AdminFirms },
    { path: 'Admin/Areas', component: AdminAreas },
    { path: 'Admin/Provinces', component: AdminProvinces },
    { path: 'Admin/Districts', component: AdminDistricts },
    { path: 'Admin/SaleCodes', component: AdminSaleCodes },
    { path: 'Admin/AddressStores', component: AdminAddressStores },
    { path: 'Admin/BillStatus', component: AdminBillStatus },
    { path: 'Admin/DetailBill/:customerID/:billID', component: AdminBillDetail },
];

export { publicRoutes, privateRoutes };
