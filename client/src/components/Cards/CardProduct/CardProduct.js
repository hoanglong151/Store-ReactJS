import React, { useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import styles from './CardProduct.module.scss';
import { Link } from 'react-router-dom';

function CardProduct(props) {
    const { boxShadow, product } = props;
    const [typeSelect, setTypeSelect] = useState({});

    useMemo(() => {
        const getTypeCheap = product.TypesProduct.reduce((pre, next) => {
            if (pre.Sale !== 0 && next.Sale !== 0) {
                return pre.Sale < next.Sale ? pre : next;
            } else if (pre.Sale !== 0 && next.Sale === 0) {
                return pre.Sale < next.Price ? pre : next;
            } else if (pre.Sale === 0 && next.Sale !== 0) {
                return pre.Price < next.Sale ? pre : next;
            } else {
                return pre.Price < next.Price ? pre : next;
            }
        }, {});
        setTypeSelect(getTypeCheap);
    }, [product]);

    return (
        <div className={clsx(styles.wrapper, { [styles.boxShadow]: boxShadow })}>
            <Link to={`/product/detail/${product._id}`}>
                <img className={clsx(styles.image)} src={product?.Image[0]} />
            </Link>
            <div className={clsx(styles.info)}>
                <Link to={`/product/detail/${product._id}`}>
                    <h4 className={clsx(styles.name)}>{product?.Name}</h4>
                </Link>
                {typeSelect.Sale === 0 ? (
                    <span className={clsx(styles.priceNow)}>
                        {new Intl.NumberFormat('de-DE').format(typeSelect.Price)} đ
                    </span>
                ) : (
                    <>
                        <span className={clsx(styles.priceNow)}>
                            {new Intl.NumberFormat('de-DE').format(typeSelect.Sale)} đ
                        </span>
                        <span className={clsx(styles.priceOld)}>
                            {new Intl.NumberFormat('de-DE').format(typeSelect.Price)} đ
                        </span>
                    </>
                )}

                <p className={clsx(styles.infoSale)}>
                    [HOT] Thu cũ lên đời giá cao - Thủ tục nhanh - Trợ giá lên tới 1.000.000đ và 1 km khác
                </p>
            </div>
        </div>
    );
}

export default CardProduct;
