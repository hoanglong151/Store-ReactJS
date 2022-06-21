import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TablesProduct from '~/components/Tables/TableProduct/TableProduct';
import clsx from 'clsx';
import styles from './Products.module.scss';
import PaginationOutlined from '~/components/Pagination';
import SearchByCate from '~/components/SearchByCate';
import productApi from '~/api/productsApi';

function Products() {
    const [searchProducts, setSearchProducts] = useState([]);
    const [totalPage, setTotalPage] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const result = await productApi.getAll(currentPage);
                setTotalPage(result.totalPage);
                setProducts(result.products);
                setSearchProducts(result.products);
            } catch (err) {
                console.log('Err: ', err);
            }
        };
        getProducts();
    }, [currentPage]);

    const handlePagination = (page) => {
        setCurrentPage(page);
    };

    const handleSearchProduct = (data) => {
        setSearchProducts(data);
    };

    return (
        <div className={clsx(styles.wrapper)}>
            <Link to="/Admin/AddProduct" className={clsx(styles.createBtn)}>
                Tạo Sản Phẩm
            </Link>
            <SearchByCate type="product" onSearch={handleSearchProduct} />
            <PaginationOutlined onClick={handlePagination} count={totalPage} />
            <TablesProduct
                titles={['Hình Ảnh', 'Tên Sản Phẩm', 'Danh Mục', 'Ngày Tạo', 'Actions']}
                products={searchProducts}
            />
        </div>
    );
}

export default Products;
