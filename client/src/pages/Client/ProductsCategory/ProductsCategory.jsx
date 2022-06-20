import clsx from 'clsx';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import CardProduct from '~/components/Cards/CardProduct/CardProduct';
import SidebarFirm from '~/components/SidebarFirm';
import { useSortProductByTitle } from '~/hooks';
import styles from './ProductsCategory.module.scss';
import ButtonShowMore from '~/components/ShowMore';

function ProductsCategory() {
    const { state } = useLocation();
    const { cateID, select } = state;
    const [products, setProducts] = useState([]);
    const [getFirms, setGetFirms] = useState([]);
    const [selectName, setSelectName] = useState('');
    const [active, setActive] = useState({
        High: false,
        Low: false,
        Select: select,
    });
    const [showProducts, setShowProducts] = useState(10);
    const { product, category, firm } = useSelector((state) => state);
    const productSortByTitle = useSortProductByTitle(products, select);
    const [sortProducts, setSortProducts] = useState([]);

    useEffect(() => {
        setSortProducts(productSortByTitle);
    }, [productSortByTitle]);

    useEffect(() => {
        switch (select) {
            case 'HOT':
                setSelectName('Nổi bật');
                break;
            case 'NEW':
                setSelectName('Mới nhất');
                break;
            default:
                setSelectName(null);
                break;
        }
    }, [select]);

    useEffect(() => {
        const getCategory = category.categories.find((selector) => selector._id === cateID);
        const getFirmsID = getCategory.Products.reduce((pre, next) => {
            return pre.indexOf(next.Firm_ID) === -1 ? [...pre, next.Firm_ID] : pre;
        }, []);
        const getFirms = firm.firms.filter((firm, index) => {
            return getFirmsID.includes(firm._id);
        });
        setGetFirms(getFirms);
        setProducts(getCategory.Products);
    }, [cateID]);

    const handleShowMoreProducts = (numberProduct) => {
        setShowProducts(showProducts + numberProduct);
    };

    const handleProductSelect = () => {
        setSortProducts(productSortByTitle);
        setActive({ High: false, Low: false, Select: true });
    };
    const handleLowPrice = () => {
        const lowPrice = [...productSortByTitle].sort((pre, next) => {
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
        setSortProducts(lowPrice);
        setActive({ High: false, Low: true, Select: false });
    };

    const handleHighPrice = () => {
        const highPrice = [...productSortByTitle].sort((pre, next) => {
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
        setSortProducts(highPrice);
        setActive({ Low: false, High: true, Select: false });
    };
    return (
        <div className={clsx(styles.wrapper)}>
            <h1 className={clsx(styles.heading)}>Danh Sách Sản Phẩm</h1>
            <h3 className={clsx(styles.title)}>Hãng</h3>
            {getFirms.map((firm) => (
                <SidebarFirm key={firm._id} name={firm.Name} firmID={firm._id} cateID={cateID} select={select} />
            ))}
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
                {selectName && (
                    <button
                        className={clsx(styles.btn, {
                            [styles.active]: active.Select,
                        })}
                        onClick={handleProductSelect}
                    >
                        {selectName}
                    </button>
                )}
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

export default ProductsCategory;
