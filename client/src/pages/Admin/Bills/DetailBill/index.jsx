import React from 'react';
import { useLocation } from 'react-router-dom';
import classnames from 'classnames/bind';
import styles from './DetailBill.module.scss';

const cx = classnames.bind(styles);

function DetailBill() {
    const location = useLocation();
    const { bill, customer } = location.state;
    return (
        <div className={cx('wrapper')}>
            <div className={cx('info-customer')}>
                <h2 className={cx('header')}>Thông tin đơn hàng</h2>
                <div className={cx('wrapper-info')}>
                    <div className={cx('info')}>
                        <p>
                            <span className={cx('title-info')}>Tên KH: </span>
                            {customer.Name}
                        </p>
                        <p>
                            <span className={cx('title-info')}>SĐT: </span>
                            {customer.Phone}
                        </p>
                        <p>
                            <span className={cx('title-info')}>Email: </span>
                            {customer.Email}
                        </p>
                    </div>
                    <div className={cx('info')}>
                        <p>
                            <span className={cx('title-info')}>Mã đơn hàng: </span>
                            {bill.BillID}
                        </p>
                        <p>
                            <span className={cx('title-info')}>Ngày tạo: </span>
                            {new Date(bill.CreateDate).toLocaleDateString('en-GB', {
                                year: 'numeric',
                                month: 'numeric',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                                second: 'numeric',
                            })}
                        </p>
                        <p>
                            <span className={cx('title-info')}>Tình trạng đơn hàng: </span>
                            {bill.BillStatus.Name}
                        </p>
                        <p>
                            <span className={cx('title-info')}>Phương thức nhận hàng: </span>
                            {bill.ShipPayment}
                        </p>
                    </div>
                    <div className={cx('info')}>
                        <p>
                            <span className={cx('title-info')}>Vùng miền: </span>
                            {bill.Areas.Name}
                        </p>
                        <p>
                            <span className={cx('title-info')}>Tỉnh/Thành: </span>
                            {bill.Provinces.Name}
                        </p>
                        <p>
                            <span className={cx('title-info')}>Quận/Huyện: </span>
                            {bill.Districts.Name}
                        </p>
                        <p>
                            {bill.AddressStores ? (
                                <>
                                    <span className={cx('title-info')}>Địa chỉ cửa hàng: </span>
                                    {bill.AddressStores.Name}
                                </>
                            ) : (
                                <>
                                    <span className={cx('title-info')}>Địa chỉ giao hàng: </span>
                                    {bill.Address}
                                </>
                            )}
                        </p>
                    </div>
                    {bill.Other && (
                        <>
                            <span className={cx('title-info')}>Yêu cầu thêm: </span>
                            {bill.Other}
                        </>
                    )}
                </div>
            </div>
            <div className={cx('wrapper-product')}>
                <div className={cx('info-bill')}>
                    <h2 className={cx('header')}>Mặt Hàng</h2>
                    <div className={cx('wrapper-product-item')}>
                        {bill.Cart.cartProducts.map((cart) => (
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
                    <h2 className={cx('header')}>Giá</h2>
                    <div className={cx('wrapper-info-price')}>
                        <p>
                            <span className={cx('title-info')}>Tổng tiền: </span>
                            {new Intl.NumberFormat('de-DE').format(bill.Cart.totalPrice)} đ
                        </p>
                        {bill.Cart.saleCode && (
                            <>
                                <p>
                                    <h3>Khuyến mãi: </h3>
                                    <p>
                                        <span className={cx('title-info', styles.saleCode)}>Mã khuyến mãi: </span>
                                        {bill.Cart.saleCode.Name}
                                    </p>
                                    <p>
                                        <span className={cx('title-info', styles.salePrice)}>Giảm giá: </span>
                                        {new Intl.NumberFormat('de-DE').format(bill.Cart.saleCode.Sale)} đ
                                    </p>
                                </p>
                                <p>
                                    <span className={cx('title-info')}>Giá sau khuyến mãi: </span>
                                    {new Intl.NumberFormat('de-DE').format(bill.Cart.totalPriceSale)} đ
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailBill;
