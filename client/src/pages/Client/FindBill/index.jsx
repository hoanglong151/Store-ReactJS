import React, { useState } from 'react';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Label from '~/components/Form/Label/Label';
import Input from '~/components/Form/Input/Input';
import billsApi from '~/api/billsApi';
import classnames from 'classnames/bind';
import styles from './FindBill.module.scss';

const cx = classnames.bind(styles);

function FindBill() {
    const [bill, setBill] = useState();
    const InvalidSwal = withReactContent(Swal);
    const formik = useFormik({
        initialValues: {
            phone: '',
            billID: '',
        },
        onSubmit: (values) => {
            const submit = async () => {
                const result = await billsApi.findBill(values);
                if (result.Invalid) {
                    InvalidSwal.fire({
                        icon: 'error',
                        title: 'Thất Bại!',
                        text: result.Invalid,
                    });
                } else {
                    setBill(result);
                }
            };
            submit();
        },
    });
    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-form-bill')}>
                <h2 className={cx('title')}>kiểm tra thông tin đơn hàng & tình trạng vận chuyển</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className={cx('wrapper-info')}>
                        <Label>Số điện thoại: </Label>
                        <Input
                            name="phone"
                            id="phone"
                            onChange={formik.handleChange}
                            placeholder="(Bắt buộc)"
                            className={cx('input')}
                        />
                        <Label>Mã đơn hàng: </Label>
                        <Input
                            name="billID"
                            id="billID"
                            onChange={formik.handleChange}
                            placeholder="(Bắt buộc)"
                            className={cx('input')}
                        />
                        <button className={cx('btn')} type="submit">
                            Kiểm tra
                        </button>
                    </div>
                </form>
            </div>
            {bill && (
                <div className={cx('wrapper-find-bill')}>
                    <h2 className={cx('title')}>thông tin & tình trạng vận chuyển</h2>
                    <div className={cx('customer-info')}>
                        <p>
                            <span className={cx('tag')}>Tên khách hàng: </span>
                            {bill.Name}
                        </p>
                        <p>
                            <span className={cx('tag')}>Số điện thoại: </span>
                            {bill.Phone}
                        </p>
                        <p>
                            <span className={cx('tag')}>Email: </span>
                            {bill.Email}
                        </p>
                        <p>
                            <span className={cx('tag')}>Tình trạng vận chuyển: </span>
                            {bill.Bill.BillStatus.Name}
                        </p>
                    </div>
                    <h2 className={cx('title')}>đơn hàng</h2>
                    <div className={cx('wrapper-product')}>
                        <div className={cx('info-bill')}>
                            <div className={cx('wrapper-product-item')}>
                                {bill.Bill.Cart.cartProducts.map((cart) => (
                                    <div key={cart._id} className={cx('wrapper-cart')}>
                                        <img className={cx('image')} src={cart.Image[0]} />
                                        <div>
                                            <h3 className={cx('name-product')}>{cart.Name}</h3>
                                            <div className={cx('price-product')}>
                                                {cart.Sale !== 0 ? (
                                                    <div>
                                                        <span className={cx('price-active')}>
                                                            {new Intl.NumberFormat('de-DE').format(cart.Sale)} ₫
                                                        </span>
                                                        <span className={cx('price-old')}>
                                                            {new Intl.NumberFormat('de-DE').format(cart.Price)} ₫
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <span className={cx('price-active')}>
                                                        {new Intl.NumberFormat('de-DE').format(cart.Price)} ₫
                                                    </span>
                                                )}
                                            </div>
                                            <p>
                                                <span className={cx('title-info')}>Số lượng sản phẩm: </span>
                                                {cart.NumberProduct}
                                            </p>
                                            <p>
                                                <span className={cx('title-info')}>Tổng tiền: </span>
                                                {new Intl.NumberFormat('de-DE').format(
                                                    cart.Sale !== 0
                                                        ? cart.NumberProduct * cart.Sale
                                                        : cart.NumberProduct * cart.Price,
                                                )}{' '}
                                                đ
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={cx('info-price')}>
                            <div className={cx('wrapper-info-price')}>
                                <p>
                                    <span className={cx('title-info')}>Tổng tiền: </span>
                                    {new Intl.NumberFormat('de-DE').format(bill.Bill.Cart.totalPrice)} đ
                                </p>
                                {bill.Bill.Cart.saleCode && (
                                    <>
                                        <p>
                                            <h3>Khuyến mãi: </h3>
                                            <p>
                                                <span className={cx('title-info', 'sale-code')}>Mã khuyến mãi: </span>
                                                {bill.Bill.Cart.saleCode.Name}
                                            </p>
                                            <p>
                                                <span className={cx('title-info', 'sale-price')}>Giảm giá: </span>
                                                {new Intl.NumberFormat('de-DE').format(bill.Bill.Cart.saleCode.Sale)} đ
                                            </p>
                                        </p>
                                        <p>
                                            <span className={cx('title-info')}>Giá sau khuyến mãi: </span>
                                            {new Intl.NumberFormat('de-DE').format(bill.Bill.Cart.totalPriceSale)} đ
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FindBill;
