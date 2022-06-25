import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CardProduct from '~/components/Cards/CardProduct/CardProduct';
import SidebarFirm from '~/components/SidebarFirm';
import { useSortProductByTitle } from '~/hooks';
import ButtonShowMore from '~/components/ShowMore';

import classnames from 'classnames/bind';
import styles from './ProductsCategory.module.scss';
import { useSelector } from 'react-redux';

const cx = classnames.bind(styles);

function ProductsCategory() {
    const { state } = useLocation();
    const { cateID, select } = state;
    const data = useSelector((state) => state);
    const { firm, category, typeProduct } = data;
    const { categories } = category;
    const { firms } = firm;
    const { typeProducts } = typeProduct;

    const [products, setProducts] = useState([]);
    const [getFirmByProduct, setGetFirmByProduct] = useState([]);
    const [selectName, setSelectName] = useState('');
    const [active, setActive] = useState({
        High: false,
        Low: false,
        Select: select,
    });
    const [showProducts, setShowProducts] = useState(10);
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
        const getProducts = typeProducts.filter((product) => {
            return product.Product.Category_ID.includes(cateID) && product.Amount !== 0;
        });
        const getFirmsID = getProducts.reduce((pre, next) => {
            return pre.indexOf(next.Product.Firm_ID) === -1 ? [...pre, next.Product.Firm_ID] : pre;
        }, []);
        const filterFirms = firms.filter((firm) => {
            return getFirmsID.includes(firm._id);
        });
        setGetFirmByProduct(filterFirms);
        setProducts(getProducts);
    }, [cateID, categories, firms]);

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
        <div className={cx('wrapper')}>
            <h1 className={cx('heading')}>Danh Sách Sản Phẩm</h1>
            <h3 className={cx('title')}>Hãng</h3>
            {getFirmByProduct.map((firm) => (
                <SidebarFirm key={firm._id} name={firm.Name} firmID={firm._id} cateID={cateID} select={select} />
            ))}
            <div>
                <h3 className={cx('title')}>Tiêu chí</h3>
                <button
                    className={cx('btn', {
                        ['active']: active.High,
                    })}
                    onClick={handleHighPrice}
                >
                    Giá cao
                </button>
                <button
                    className={cx('btn', {
                        ['active']: active.Low,
                    })}
                    onClick={handleLowPrice}
                >
                    Giá thấp
                </button>
                {selectName && (
                    <button
                        className={cx('btn', {
                            active: active.Select,
                        })}
                        onClick={handleProductSelect}
                    >
                        {selectName}
                    </button>
                )}
            </div>

            <div className={cx('products')}>
                {sortProducts
                    .map((product) => <CardProduct key={product._id} boxShadow product={product} />)
                    .slice(0, showProducts)}
            </div>
            {products.length >= showProducts && <ButtonShowMore showMore={10} onClick={handleShowMoreProducts} />}
        </div>
    );
}

export default ProductsCategory;
