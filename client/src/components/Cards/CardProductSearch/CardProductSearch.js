import React, { useMemo, useState } from 'react';
import clsx from 'clsx';
import styles from './CardProductSearch.module.scss';
import { Link } from 'react-router-dom';

function CardProductSearch(props) {
    const [typeSelect, setTypeSelect] = useState({});
    const { product } = props;
    useMemo(() => {
        const getTypeCheap = product?.TypesProduct.reduce((pre, next) => {
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
        <Link to={`/product/detail/${product._id}`} className={clsx(styles.wrapper)}>
            <img src={product.Image[0]} className={clsx(styles.img)} />
            <div className={clsx(styles.wrapperInfo)}>
                <p className={clsx(styles.nameProduct)}>{product.Name}</p>

                {typeSelect.sale === 0 ? (
                    <span className={clsx(styles.newPrice)}>
                        {new Intl.NumberFormat('de-DE').format(typeSelect.price)} đ
                    </span>
                ) : (
                    <>
                        <span className={clsx(styles.newPrice)}>
                            {new Intl.NumberFormat('de-DE').format(typeSelect.sale)} đ
                        </span>
                        <span className={clsx(styles.oldPrice)}>
                            {new Intl.NumberFormat('de-DE').format(typeSelect.price)} đ
                        </span>
                    </>
                )}
            </div>
        </Link>
    );
}

export default CardProductSearch;
