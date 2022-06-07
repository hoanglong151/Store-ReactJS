// Public Routers
import UserHome from '~/pages/Client/Home/Home';
import UserProductDetail from '~/pages/Client/ProductDetail/ProductDetail';
import UserProductsCategory from '~/pages/Client/ProductsCategory/ProductsCategory';
import UserProductsCategoryFirm from '~/pages/Client/ProductsCategoryFirm/ProductsCategoryFirm';
import UserCartProduct from '~/pages/Client/CartProduct/CartProduct';
import UserPayment from '~/pages/Client/Payment/Payment';

// Private Routers
import AdminProducts from '~/pages/Admin/Products/Products';
import AdminAddProduct from '~/pages/Admin/Products/AddProduct/AddProduct';
import AdminEditProduct from '~/pages/Admin/Products/EditProduct/EditProduct';
import AdminDetailProduct from '~/pages/Admin/Products/DetailProduct/DetailProduct';
import AdminDeleteProduct from '~/pages/Admin/Products/DeleteProduct/DeleteProduct';
import AdminCategories from '~/pages/Admin/Categories/Categories';
import AdminHome from '~/pages/Admin/Home/Home';
import AdminBills from '~/pages/Admin/Bills/Bills';
import AdminFirms from '~/pages/Admin/Firms/Firms';
import AdminAreas from '~/pages/Admin/Areas/Areas';
import AdminProvinces from '~/pages/Admin/Provinces/Provinces';
import AdminDistricts from '~/pages/Admin/Districts/Districts';
import AdminSaleCodes from '~/pages/Admin/SaleCodes/SaleCodes';
import AdminAddressStores from '~/pages/Admin/AddressStores/AddressStores';
import AdminBillStatus from '~/pages/Admin/BillStatus/BillStatus';

// Layout
import NoSidebar from '~/components/Layouts/Client/NoSidebar';
import CartLayout from '~/components/Layouts/Client/CartLayout/CartLayout';

const publicRoutes = [
    { path: '/', component: UserHome },
    { path: 'product/detail/:id', component: UserProductDetail, layout: NoSidebar },
    { path: 'category/:cateID', component: UserProductsCategory, layout: NoSidebar },
    { path: 'firm/:cateID/:firmID', component: UserProductsCategoryFirm, layout: NoSidebar },
    { path: 'cart', component: UserCartProduct, layout: CartLayout },
    { path: 'bill', component: UserPayment, layout: CartLayout },
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
];

export { publicRoutes, privateRoutes };
