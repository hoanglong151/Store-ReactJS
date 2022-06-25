import React from 'react';
import { Link } from 'react-router-dom';
import SliderCard from '~/components/Sliders/SliderCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import CardProduct from '~/components/Cards/CardProduct/CardProduct';
import { useSortProductByTitle } from '~/hooks';
import SidebarCategory from '~/components/SidebarCategory';
import classnames from 'classnames/bind';
import styles from './Home.module.scss';
import { useSelector } from 'react-redux';

const cx = classnames.bind(styles);

function Home() {
    const state = useSelector((state) => state);
    const { category, typeProduct } = state;
    const { categories } = category;
    const { typeProducts } = typeProduct;
    const productCheap = useSortProductByTitle(typeProducts, 'CHEAP');
    const productHot = useSortProductByTitle(typeProducts, 'HOT');
    const productNew = useSortProductByTitle(typeProducts, 'NEW');

    return (
        <div className={cx('wrapper')}>
            <div className={cx('new-products')}>
                <div className={cx('header')}>
                    <h1 className={cx('title')}>Sản Phẩm Bán Chạy</h1>
                    <Link to="/products" state={{ products: productHot, select: 'HOT' }} className={cx('show-all')}>
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
                <SliderCard slideShow={5} slideScroll={5} product={productHot.slice(0, 15)} />
            </div>
            <div className={cx('sell-products')}>
                <div className={cx('header')}>
                    <h1 className={cx('title')}>Sản Phẩm Mới</h1>
                    <Link to="/products" state={{ products: productNew, select: 'NEW' }} className={cx('show-all')}>
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
                <SliderCard slideShow={5} slideScroll={5} product={productNew.slice(0, 15)} />
            </div>
            <div className={cx('products')}>
                <div className={cx('header')}>
                    <h1 className={cx('title', 'your-self')}>Sản Phẩm Dành Cho Bạn</h1>
                    <Link
                        to="/products"
                        state={{ products: productCheap, select: 'CHEAP' }}
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
        </div>
    );
}

export default Home;
