import React from 'react';
import clsx from 'clsx';
import styles from './CardProduct.module.scss';

function CardProduct(props) {
    const { boxShadow } = props;
    return (
        <div className={clsx(styles.wrapper, { [styles.boxShadow]: boxShadow })}>
            <img
                className={clsx(styles.image)}
                src="https://www.renderhub.com/madmix/apple-iphone-13-pro-max-sierra-blue/apple-iphone-13-pro-max-sierra-blue-02.jpg"
            />
            <div className={clsx(styles.info)}>
                <h3 className={clsx(styles.name)}>Iphone 13 Pro Max 256GB</h3>
                <span className={clsx(styles.priceSale, styles.priceNow)}>24.190.000 đ</span>
                <span className={clsx(styles.price, styles.priceOld)}>30.190.000 đ</span>
                <p className={clsx(styles.infoSale)}>
                    [HOT] Thu cũ lên đời giá cao - Thủ tục nhanh - Trợ giá lên tới 1.000.000đ và 1 km khác
                </p>
            </div>
        </div>
    );
}

export default CardProduct;
