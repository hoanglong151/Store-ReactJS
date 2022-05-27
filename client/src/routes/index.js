// Public Routers
import UserHome from '~/pages/Client/Home/Home';
import UserProductDetail from '~/pages/Client/ProductDetail/ProductDetail';
import UserProductsCategory from '~/pages/Client/ProductsCategory/ProductsCategory';

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

const publicRoutes = [
    { path: '/', component: UserHome },
    { path: 'product/detail/:id', component: UserProductDetail },
    { path: 'category/:cate', component: UserProductsCategory },
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
];

export { publicRoutes, privateRoutes };
