import React from 'react';
import clsx from 'clsx';
import styles from './CardProductSearch.module.scss';
import { Link } from 'react-router-dom';

function CardProductSearch(props) {
    const { product } = props;
    return (
        <Link to={`/product/detail`} state={{ product: product }} className={clsx(styles.wrapper)}>
            <img src={product.Image[0]} className={clsx(styles.img)} />
            <div className={clsx(styles.wrapperInfo)}>
                <p className={clsx(styles.nameProduct)}>{product.NameProduct}</p>

                {product.sale === 0 ? (
                    <span className={clsx(styles.newPrice)}>
                        {new Intl.NumberFormat('de-DE').format(product.Price)} đ
                    </span>
                ) : (
                    <>
                        <span className={clsx(styles.newPrice)}>
                            {new Intl.NumberFormat('de-DE').format(product.Sale)} đ
                        </span>
                        <span className={clsx(styles.oldPrice)}>
                            {new Intl.NumberFormat('de-DE').format(product.Price)} đ
                        </span>
                    </>
                )}
            </div>
        </Link>
    );
}

export default CardProductSearch;
