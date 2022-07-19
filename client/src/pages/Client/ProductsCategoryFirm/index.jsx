import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CardProduct from '~/components/Cards/CardProduct/CardProduct';
import { useSortProductByTitle } from '~/hooks';
import ButtonShowMore from '~/components/ShowMore';

import classnames from 'classnames/bind';
import styles from './ProductsCategoryFirm.module.scss';
import { useSelector } from 'react-redux';

const cx = classnames.bind(styles);

function ProductsCategoryFirm() {
    const { state } = useLocation();
    const { cateID, firmID, select } = state;
    const data = useSelector((state) => state);
    const { firm, category, typeProduct } = data;
    const { categories } = category;
    const { firms } = firm;
    const { typeProducts } = typeProduct;
    const [products, setProducts] = useState([]);
    const [showProducts, setShowProducts] = useState(10);
    const [selectName, setSelectName] = useState('');
    const [active, setActive] = useState({
        High: false,
        Low: false,
        Select: select,
    });
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
        if (cateID) {
            const getProducts = typeProducts.filter((product) => {
                return product.Category_ID.includes(cateID) && product.Amount !== 0;
            });
            const filterProductByFirms = getProducts.filter((product) => {
                return product.Firm_ID === firmID;
            });
            setProducts(filterProductByFirms);
        } else {
            const getProducts = typeProducts.filter((product, index) => {
                return product.Firm_ID === firmID;
            });
            setProducts(getProducts);
        }
    }, [firmID, categories, firms, typeProducts, cateID]);

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
            <div>
                <h3 className={cx('title')}>Tiêu chí</h3>
                <button
                    className={cx('btn', {
                        active: active.High,
                    })}
                    onClick={handleHighPrice}
                >
                    Giá cao
                </button>
                <button
                    className={cx('btn', {
                        active: active.Low,
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
                    .map((product, index) => <CardProduct key={product._id} product={product} />)
                    .slice(0, showProducts)}
            </div>
            {products.length >= showProducts && <ButtonShowMore showMore={10} onClick={handleShowMoreProducts} />}
        </div>
    );
}

export default ProductsCategoryFirm;
