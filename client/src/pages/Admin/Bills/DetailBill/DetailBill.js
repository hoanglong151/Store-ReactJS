import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import styles from './DetailBill.module.scss';

function DetailBill() {
    const { customerID, billID } = useParams();
    const location = useLocation();
    const { bill, customer } = location.state;
    console.log(bill, customer);
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={styles.infoCustomer}>
                <h2 className={styles.header}>Thông tin đơn hàng</h2>
                <div className={styles.wrapperInfo}>
                    <div className={styles.info}>
                        <p>
                            <span className={styles.titleInfo}>Tên KH: </span>
                            {customer.Name}
                        </p>
                        <p>
                            <span className={styles.titleInfo}>SĐT: </span>
                            {customer.Phone}
                        </p>
                        <p>
                            <span className={styles.titleInfo}>Email: </span>
                            {customer.Email}
                        </p>
                    </div>
                    <div className={styles.info}>
                        <p>
                            <span className={styles.titleInfo}>Mã đơn hàng: </span>
                            {bill.BillID}
                        </p>
                        <p>
                            <span className={styles.titleInfo}>Ngày tạo: </span>
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
                            <span className={styles.titleInfo}>Tình trạng đơn hàng: </span>
                            {bill.BillStatus.Name}
                        </p>
                        <p>
                            <span className={styles.titleInfo}>Phương thức nhận hàng: </span>
                            {bill.ShipPayment}
                        </p>
                    </div>
                    <div className={styles.info}>
                        <p>
                            <span className={styles.titleInfo}>Vùng miền: </span>
                            {bill.Areas.Name}
                        </p>
                        <p>
                            <span className={styles.titleInfo}>Tỉnh/Thành: </span>
                            {bill.Provinces.Name}
                        </p>
                        <p>
                            <span className={styles.titleInfo}>Quận/Huyện: </span>
                            {bill.Districts.Name}
                        </p>
                        <p>
                            {bill.AddressStores ? (
                                <>
                                    <span className={styles.titleInfo}>Địa chỉ cửa hàng: </span>
                                    {bill.AddressStores.Name}
                                </>
                            ) : (
                                <>
                                    <span className={styles.titleInfo}>Địa chỉ giao hàng: </span>
                                    {bill.Address}
                                </>
                            )}
                        </p>
                    </div>
                    {bill.Other && (
                        <>
                            <span className={styles.titleInfo}>Yêu cầu thêm: </span>
                            {bill.Other}
                        </>
                    )}
                </div>
            </div>
            <div className={styles.wrapperProduct}>
                <div className={styles.infoBill}>
                    <h2 className={styles.header}>Mặt Hàng</h2>
                    <div className={styles.wrapperProductItem}>
                        {bill.Cart.cartProducts.map((cart) => (
                            <div key={cart._id} className={styles.wrapperCart}>
                                <img className={clsx(styles.image)} src={cart.Image[0]} />
                                <div>
                                    <h3 className={clsx(styles.nameProduct)}>{cart.Name}</h3>
                                    <div className={clsx(styles.priceProduct)}>
                                        {cart.Sale !== 0 ? (
                                            <div>
                                                <span className={clsx(styles.priceActive)}>
                                                    {new Intl.NumberFormat('de-DE').format(cart.Sale)} ₫
                                                </span>
                                                <span className={clsx(styles.priceOld)}>
                                                    {new Intl.NumberFormat('de-DE').format(cart.Price)} ₫
                                                </span>
                                            </div>
                                        ) : (
                                            <span className={clsx(styles.priceActive)}>
                                                {new Intl.NumberFormat('de-DE').format(cart.Price)} ₫
                                            </span>
                                        )}
                                    </div>
                                    <p>
                                        <span className={styles.titleInfo}>Số lượng sản phẩm: </span>
                                        {cart.NumberProduct}
                                    </p>
                                    <p>
                                        <span className={styles.titleInfo}>Tổng tiền: </span>
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
                <div className={styles.infoPrice}>
                    <h2 className={styles.header}>Giá</h2>
                    <div className={styles.wrapperInfoPrice}>
                        <p>
                            <span className={styles.titleInfo}>Tổng tiền: </span>
                            {new Intl.NumberFormat('de-DE').format(bill.Cart.totalPrice)} đ
                        </p>
                        {bill.Cart.saleCode && (
                            <>
                                <p>
                                    <h3>Khuyến mãi: </h3>
                                    <p>
                                        <span className={clsx(styles.titleInfo, styles.saleCode)}>Mã khuyến mãi: </span>
                                        {bill.Cart.saleCode.Name}
                                    </p>
                                    <p>
                                        <span className={clsx(styles.titleInfo, styles.salePrice)}>Giảm giá: </span>
                                        {new Intl.NumberFormat('de-DE').format(bill.Cart.saleCode.Sale)} đ
                                    </p>
                                </p>
                                <p>
                                    <span className={styles.titleInfo}>Giá sau khuyến mãi: </span>
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
