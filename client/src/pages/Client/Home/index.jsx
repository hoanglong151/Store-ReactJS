import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SliderCard from '~/components/Sliders/SliderCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import CardProduct from '~/components/Cards/CardProduct/CardProduct';
import { useSortProductByTitle } from '~/hooks';
import SidebarCategory from '~/components/SidebarCategory';
import { productsApi, categoriesApi } from '~/api';
import classnames from 'classnames/bind';
import styles from './Home.module.scss';
import Loading from '~/components/Loading';

const cx = classnames.bind(styles);

function Home() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const productCheap = useSortProductByTitle(products, 'CHEAP');
    const productHot = useSortProductByTitle(products, 'HOT');
    const productNew = useSortProductByTitle(products, 'NEW');

    const getProducts = async () => {
        const result = await productsApi.getAll();
        setProducts(result.products);
    };

    const getCategories = async () => {
        const result = await categoriesApi.getAll();
        setCategories(result.categories);
    };

    useEffect(() => {
        const callApi = async () => {
            await getProducts();
            await getCategories();
            setLoading(false);
        };
        callApi();
    }, []);

    return (
        <div className={cx('wrapper')}>
            {loading ? (
                <Loading />
            ) : (
                <>
                    <div className={cx('new-products')}>
                        <div className={cx('header')}>
                            <h1 className={cx('title')}>Sản Phẩm Bán Chạy</h1>
                            <Link
                                to="/products"
                                state={{ products: productHot, select: 'HOT', productsDefault: products }}
                                className={cx('show-all')}
                            >
                                <span className={cx('text-show-all')}>Xem tất cả</span>
                                <FontAwesomeIcon icon={faAngleRight} className={cx('arrow-show-all')} />
                            </Link>
                        </div>
                        <div className={cx('sidebar-categories')}>
                            {categories.length !== 0 &&
                                categories.map((cate) => (
                                    <SidebarCategory key={cate._id} name={cate.Name} link={cate._id} select="HOT" />
                                ))}
                        </div>
                        <SliderCard slideShow={5} slideScroll={5} product={productHot} />
                    </div>
                    <div className={cx('sell-products')}>
                        <div className={cx('header')}>
                            <h1 className={cx('title')}>Sản Phẩm Mới</h1>
                            <Link
                                to="/products"
                                state={{ products: productNew, select: 'NEW', productsDefault: products }}
                                className={cx('show-all')}
                            >
                                <span className={cx('text-show-all')}>Xem tất cả</span>
                                <FontAwesomeIcon icon={faAngleRight} className={cx('arrow-show-all')} />
                            </Link>
                        </div>
                        <div className={cx('sidebar-categories')}>
                            {categories.length !== 0 &&
                                categories.map((cate) => (
                                    <SidebarCategory key={cate._id} name={cate.Name} link={cate._id} select="NEW" />
                                ))}
                        </div>
                        <SliderCard slideShow={5} slideScroll={5} product={productNew} />
                    </div>
                    <div className={cx('products')}>
                        <div className={cx('header')}>
                            <h1 className={cx('title', 'your-self')}>Sản Phẩm Dành Cho Bạn</h1>
                            <Link
                                to="/products"
                                state={{ products: productCheap, select: 'CHEAP', productsDefault: products }}
                                className={cx('show-all', 'your-self')}
                            >
                                <span className={cx('text-show-all')}>Xem tất cả</span>
                                <FontAwesomeIcon icon={faAngleRight} className={cx('arrow-show-all')} />
                            </Link>
                        </div>
                        <div className={cx('sidebar-categories')}>
                            {categories.length !== 0 &&
                                categories.map((cate) => (
                                    <SidebarCategory
                                        key={cate._id}
                                        name={cate.Name}
                                        link={cate._id}
                                        className="item-cate"
                                        select="CHEAP"
                                    />
                                ))}
                        </div>
                        <div className={cx('wrap-products')}>
                            {productCheap.length > 0 &&
                                productCheap
                                    .map((product, index) => <CardProduct key={index} boxShadow product={product} />)
                                    .slice(0, 20)}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Home;
