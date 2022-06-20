import React from 'react';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import styles from './Products.module.scss';
import CardProduct from '~/components/Cards/CardProduct/CardProduct';
import { useSelector } from 'react-redux';
import SidebarCategory from '~/components/SidebarCategory';
import SidebarFirm from '~/components/SidebarFirm';
import ButtonShowMore from '~/components/ShowMore';
import { useState } from 'react';
import { useSortProductByTitle } from '~/hooks';

function Products() {
    const { state } = useLocation();
    const { products, select, productsDefault } = state;
    const [showProducts, setShowProducts] = useState(10);
    const [sortProducts, setSortProducts] = useState(products);
    const [active, setActive] = useState({
        High: false,
        Low: false,
        Hot: select === 'HOT',
        New: select === 'NEW',
    });
    const productHot = useSortProductByTitle(productsDefault, 'HOT');
    const productNew = useSortProductByTitle(productsDefault, 'NEW');
    const { category, firm } = useSelector((state) => state);

    const handleShowMoreProducts = (numberProduct) => {
        setShowProducts(showProducts + numberProduct);
    };

    const handleProductHot = () => {
        setSortProducts([...productHot]);
        setActive({ High: false, Low: false, New: false, Hot: true });
    };

    const handleProductNew = () => {
        setSortProducts([...productNew]);
        setActive({ High: false, Low: false, Hot: false, New: true });
    };

    const handleLowPrice = () => {
        const sortIncreasePrice = sortProducts.sort((pre, next) => {
            if (pre.Sale !== 0 && next.Sale !== 0) {
                return pre.Sale - next.Sale;
            } else if (pre.Sale !== 0 && next.Sale === 0) {
                return pre.Sale - next.Price;
            } else if (pre.Sale === 0 && next.Sale !== 0) {
                return pre.Price - next.Sale;
            } else {
                return pre.Price - next.Price;
            }
        });
        setSortProducts([...sortIncreasePrice]);
        setActive({ High: false, Low: true, New: false, Hot: false });
    };

    const handleHighPrice = () => {
        const sortDecreasePrice = sortProducts.sort((pre, next) => {
            if (pre.Sale !== 0 && next.Sale !== 0) {
                return next.Sale - pre.Sale;
            } else if (pre.Sale !== 0 && next.Sale === 0) {
                return next.Sale - pre.Price;
            } else if (pre.Sale === 0 && next.Sale !== 0) {
                return next.Price - pre.Sale;
            } else {
                return next.Price - pre.Price;
            }
        });
        setSortProducts([...sortDecreasePrice]);
        setActive({ Low: false, High: true, New: false, Hot: false });
    };

    return (
        <div className={clsx(styles.wrapper)}>
            <h1 className={clsx(styles.heading)}>Danh Sách Sản Phẩm</h1>
            <div>
                <h3 className={clsx(styles.title)}>Danh Mục</h3>
                {category.categories.map((cate) => (
                    <SidebarCategory key={cate._id} name={cate.Name} link={cate._id} select={select} />
                ))}
            </div>
            <div>
                <h3 className={clsx(styles.title)}>Hãng</h3>
                {firm.firms.map((firm) => (
                    <SidebarFirm key={firm._id} name={firm.Name} select={select} firmID={firm._id} />
                ))}
            </div>
            <div>
                <h3 className={clsx(styles.title)}>Tiêu chí</h3>
                <button
                    className={clsx(styles.btn, {
                        [styles.active]: active.High,
                    })}
                    onClick={handleHighPrice}
                >
                    Giá cao
                </button>
                <button
                    className={clsx(styles.btn, {
                        [styles.active]: active.Low,
                    })}
                    onClick={handleLowPrice}
                >
                    Giá thấp
                </button>
                <button
                    className={clsx(styles.btn, {
                        [styles.active]: active.Hot,
                    })}
                    onClick={handleProductHot}
                >
                    Nổi bật
                </button>
                <button
                    className={clsx(styles.btn, {
                        [styles.active]: active.New,
                    })}
                    onClick={handleProductNew}
                >
                    Mới nhất
                </button>
            </div>
            <div className={clsx(styles.products)}>
                {sortProducts
                    .map((product) => <CardProduct key={product._id} boxShadow product={product} />)
                    .slice(0, showProducts)}
            </div>
            {products.length >= showProducts && <ButtonShowMore showMore={10} onClick={handleShowMoreProducts} />}
        </div>
    );
}

export default Products;
