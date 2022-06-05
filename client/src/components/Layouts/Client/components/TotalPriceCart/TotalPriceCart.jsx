import React from 'react';
import clsx from 'clsx';
import styles from './TotalPriceCart.module.scss';
import { Link } from 'react-router-dom';

function TotalPriceCart(props) {
    const { onPayment, title } = props;
    return (
        <div className={clsx(styles.wrapPaymentInfo)}>
            <div className={clsx(styles.wrapTotalPrice)}>
                <h3 className={clsx(styles.titleTotalPrice)}>Tổng tiền tạm tính:</h3>
                <span className={clsx(styles.totalPrice)}>20.000.000 đ</span>
            </div>
            <div className={clsx(styles.wrapPayment)}>
                <button className={clsx(styles.payment)} onClick={onPayment}>
                    {title}
                </button>
                <Link to="/" className={clsx(styles.otherProduct)}>
                    Chọn thêm sản phẩm khác
                </Link>
            </div>
        </div>
    );
}

export default TotalPriceCart;
