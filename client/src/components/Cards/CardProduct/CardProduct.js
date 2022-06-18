import React, { useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import styles from './CardProduct.module.scss';
import { Link } from 'react-router-dom';

function CardProduct(props) {
    const { boxShadow, product } = props;
    return (
        <div className={clsx(styles.wrapper, { [styles.boxShadow]: boxShadow })}>
            <Link to={`/product/detail`} state={{ product: product }}>
                <img className={clsx(styles.image)} src={product?.Image[0]} />
            </Link>
            <div className={clsx(styles.info)}>
                <Link to={`/product/detail`} state={{ product: product }}>
                    <h4 className={clsx(styles.name)}>
                        {product?.NameProduct}
                        <span>{` (${product.Color} / ${product.Name})`}</span>
                    </h4>
                </Link>
                {product.Sale === 0 ? (
                    <span className={clsx(styles.priceNow)}>
                        {new Intl.NumberFormat('de-DE').format(product.Price)} đ
                    </span>
                ) : (
                    <>
                        <span className={clsx(styles.priceNow)}>
                            {new Intl.NumberFormat('de-DE').format(product.Sale)} đ
                        </span>
                        <span className={clsx(styles.priceOld)}>
                            {new Intl.NumberFormat('de-DE').format(product.Price)} đ
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
