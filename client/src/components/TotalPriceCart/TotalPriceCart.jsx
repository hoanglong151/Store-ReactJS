import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './TotalPriceCart.module.scss';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../Form/Input/Input';
import saleCodesApi from '~/api/saleCodesApi';
import { applySale } from '~/app/reducerCart';

function TotalPriceCart(props) {
    const { title, onPayment } = props;
    const [saleCode, setSaleCode] = useState('');
    const { totalPrice, totalPriceSale } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const handleApplySaleCode = async () => {
        const result = await saleCodesApi.applySaleCode({ code: saleCode });
        if (result._id) {
            dispatch(applySale(result));
        }
    };

    return (
        <div className={clsx(styles.wrapPaymentInfo)}>
            <div className={clsx(styles.wrapSaleCode)}>
                <h3 className={clsx(styles.titleSaleCode)}>Mã khuyến mãi:</h3>
                <Input value={saleCode} onChange={(e) => setSaleCode(e.target.value)} />
                <button className={styles.btnSale} onClick={handleApplySaleCode} type="button">
                    Áp dụng
                </button>
            </div>
            <div className={clsx(styles.wrapTotalPrice)}>
                <h3 className={clsx(styles.titleTotalPrice)}>Tổng tiền tạm tính:</h3>
                <span className={clsx(styles.totalPrice)}>{new Intl.NumberFormat('de-DE').format(totalPrice)} đ</span>
            </div>
            <div className={clsx(styles.wrapTotalPriceSale)}>
                {totalPriceSale !== 0 && (
                    <>
                        <h3 className={clsx(styles.titleTotalPriceSale)}>Tổng tiền sau khi giảm:</h3>
                        <span className={clsx(styles.totalPriceSale)}>
                            {new Intl.NumberFormat('de-DE').format(totalPriceSale)} đ
                        </span>
                    </>
                )}
            </div>
            <div className={clsx(styles.wrapPayment)}>
                <button className={clsx(styles.payment)} onClick={onPayment} type="submit">
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
