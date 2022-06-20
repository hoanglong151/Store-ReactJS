import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '~/app/reducerProduct';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import TablesProduct from '~/components/Tables/TableProduct/TableProduct';
import clsx from 'clsx';
import styles from './Products.module.scss';
import PaginationOutlined from '~/components/Pagination';
import { usePagination } from '~/hooks';
import SearchByCate from '~/components/SearchByCate';

function Products() {
    const { products } = useSelector((state) => state.product);
    const [searchProducts, setSearchProducts] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [countPage, productsByPage, setProductByPage] = usePagination(searchProducts);

    useEffect(() => {
        dispatch(getProducts());
    }, []);

    useEffect(() => {
        setSearchProducts(products);
    }, [products]);

    // console.log(searchProducts);

    const handlePagination = (page) => {
        let productStart;
        if (page === 1) {
            productStart = searchProducts.slice(0, 10);
        } else {
            productStart = searchProducts.slice(10 * page - 10, 10 * page);
        }
        setProductByPage(productStart);
    };

    const handleSearchProduct = (data) => {
        setSearchProducts(data);
    };

    return (
        <div className={clsx(styles.wrapper)}>
            <Link to="/Admin/AddProduct" className={clsx(styles.createBtn)}>
                Tạo Sản Phẩm
            </Link>
            <SearchByCate type={products} onSearch={handleSearchProduct} />
            <PaginationOutlined onClick={handlePagination} count={countPage} />
            <TablesProduct
                titles={['Hình Ảnh', 'Tên Sản Phẩm', 'Danh Mục', 'Ngày Tạo', 'Actions']}
                products={productsByPage}
            />
        </div>
    );
}

export default Products;
