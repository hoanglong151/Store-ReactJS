import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Input from '../Form/Input/Input';
import saleCodesApi from '~/api/saleCodesApi';
import { applySale } from '~/app/reducerCart';
import classnames from 'classnames/bind';
import styles from './TotalPriceCart.module.scss';

const cx = classnames.bind(styles);

function TotalPriceCart(props) {
    const { title, onPayment } = props;
    const [saleCode, setSaleCode] = useState('');
    const { totalPrice, totalPriceSale } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const SaleCodeSwal = withReactContent(Swal);

    useEffect(() => {
        const getSaleCode = JSON.parse(localStorage.getItem('cart'));
        setSaleCode(getSaleCode?.saleCode.Name);
    }, []);

    const handleApplySaleCode = async () => {
        const result = await saleCodesApi.applySaleCode({ code: saleCode });
        if (result._id) {
            if (totalPrice - result.Sale > 0) {
                dispatch(applySale(result));
            } else {
                SaleCodeSwal.fire({
                    title: 'Hóa Đơn rẻ hơn Phiếu Khuyến Mãi. Bạn có muốn áp dụng?',
                    icon: 'info',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Đồng Ý',
                    cancelButtonText: 'Hủy',
                    customClass: {
                        popup: `${cx('popup')}`,
                    },
                }).then(async (confirm) => {
                    if (confirm.isConfirmed) {
                        dispatch(applySale(result));
                    }
                });
            }
        }
    };

    return (
        <div className={cx('wrap-payment-info')}>
            <div className={cx('wrap-sale-code')}>
                <h3 className={cx('title-sale-code')}>Mã khuyến mãi:</h3>
                <Input
                    value={saleCode}
                    className={cx('input-sale-code', 'mb0')}
                    onChange={(e) => setSaleCode(e.target.value)}
                />
                <button className={cx('btn-sale')} onClick={handleApplySaleCode} type="button">
                    Áp dụng
                </button>
            </div>
            <div className={cx('wrap-total-price')}>
                <h3 className={cx('title-total-price')}>Tổng tiền tạm tính:</h3>
                <span className={cx('total-price')}>{new Intl.NumberFormat('de-DE').format(totalPrice)} đ</span>
            </div>
            <div className={cx('wrap-total-price-sale')}>
                <h3 className={cx('title-total-priceSale')}>Tổng tiền sau khi giảm:</h3>
                <span className={cx('total-price-sale')}>
                    {new Intl.NumberFormat('de-DE').format(totalPriceSale)} đ
                </span>
            </div>
            <div className={cx('wrap-payment')}>
                <button className={cx('payment')} onClick={onPayment} type="submit">
                    {title}
                </button>
                <Link to="/" className={cx('other-product')}>
                    Chọn thêm sản phẩm khác
                </Link>
            </div>
        </div>
    );
}

TotalPriceCart.propTypes = {
    title: PropTypes.string,
    onPayment: PropTypes.func,
};

export default TotalPriceCart;
