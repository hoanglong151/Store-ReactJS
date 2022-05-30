import React, { useMemo, useState } from 'react';
import clsx from 'clsx';
import styles from './CardProduct.module.scss';
import { Link } from 'react-router-dom';

function CardProduct(props) {
    const { boxShadow, product } = props;
    const [typeSelect, setTypeSelect] = useState({});

    useMemo(() => {
        const getTypeCheap = product.TypesProduct.reduce((pre, next) => {
            if (pre.sale !== 0 && next.sale !== 0) {
                return pre.sale < next.sale ? pre : next;
            } else if (pre.sale !== 0 && next.sale === 0) {
                return pre.sale < next.price ? pre : next;
            } else if (pre.sale === 0 && next.sale !== 0) {
                return pre.price < next.sale ? pre : next;
            } else {
                return pre.price < next.price ? pre : next;
            }
        });
        setTypeSelect(getTypeCheap);
    }, [product]);

    return (
        <div className={clsx(styles.wrapper, { [styles.boxShadow]: boxShadow })}>
            <Link to={`/product/detail/${product._id}`}>
                <img className={clsx(styles.image)} src={product?.Image[0]} />
            </Link>
            <div className={clsx(styles.info)}>
                <Link to={`/product/detail/${product._id}`}>
                    <h3 className={clsx(styles.name)}>{product?.Name}</h3>
                </Link>
                {typeSelect.sale === 0 ? (
                    <span className={clsx(styles.priceNow)}>
                        {new Intl.NumberFormat('de-DE').format(typeSelect.price)} đ
                    </span>
                ) : (
                    <>
                        <span className={clsx(styles.priceNow)}>
                            {new Intl.NumberFormat('de-DE').format(typeSelect.sale)} đ
                        </span>
                        <span className={clsx(styles.priceOld)}>
                            {new Intl.NumberFormat('de-DE').format(typeSelect.price)} đ
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
