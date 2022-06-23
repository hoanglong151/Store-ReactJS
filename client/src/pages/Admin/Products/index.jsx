import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TablesProduct from '~/components/Tables/TableProduct';
import PaginationOutlined from '~/components/Pagination';
import SearchByCate from '~/components/SearchByCate';
import productApi from '~/api/productsApi';
import classnames from 'classnames/bind';
import styles from './Products.module.scss';

const cx = classnames.bind(styles);

function Products() {
    const [totalPage, setTotalPage] = useState({
        pageAll: 1,
        pageSearch: 1,
    });
    const [products, setProducts] = useState({
        productAll: [],
        productSearch: [],
    });
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const result = await productApi.getAll(currentPage);
                setTotalPage({ ...totalPage, pageAll: result.totalPage, pageSearch: result.totalPage });
                setProducts({ ...products, productAll: result.products, productSearch: result.products });
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
        if (Object.keys(data).length !== 0) {
            setProducts({ ...products, productSearch: data.data });
            setTotalPage({ ...totalPage, pageSearch: data.totalPage });
        } else {
            setProducts({ ...products, productSearch: products.productAll });
            setTotalPage({ ...totalPage, pageSearch: totalPage.pageAll });
        }
    };

    return (
        <div className={cx('wrapper')}>
            <Link to="/Admin/AddProduct" className={cx('create-btn')}>
                Tạo Sản Phẩm
            </Link>
            <SearchByCate type="product" onSearch={handleSearchProduct} />
            <PaginationOutlined onClick={handlePagination} count={totalPage.pageSearch} />
            <TablesProduct
                titles={['Hình Ảnh', 'Tên Sản Phẩm', 'Danh Mục', 'Ngày Tạo', 'Actions']}
                products={products.productSearch}
            />
        </div>
    );
}

export default Products;
