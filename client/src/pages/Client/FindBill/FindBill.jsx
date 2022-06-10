import React, { useState } from 'react';
import clsx from 'clsx';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import styles from './FindBill.module.scss';
import Label from '~/components/Form/Label/Label';
import Input from '~/components/Form/Input/Input';
import billsApi from '~/api/billsApi';

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
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.wrapperFormBill)}>
                <h2 className={clsx(styles.title)}>kiểm tra thông tin đơn hàng & tình trạng vận chuyển</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className={clsx(styles.wrapperInfo)}>
                        <Label>Số điện thoại: </Label>
                        <Input
                            name="phone"
                            id="phone"
                            onChange={formik.handleChange}
                            placeholder="(Bắt buộc)"
                            className={clsx(styles.input)}
                        />
                        <Label>Mã đơn hàng: </Label>
                        <Input
                            name="billID"
                            id="billID"
                            onChange={formik.handleChange}
                            placeholder="(Bắt buộc)"
                            className={clsx(styles.input)}
                        />
                        <button className={clsx(styles.btn)} type="submit">
                            Kiểm tra
                        </button>
                    </div>
                </form>
            </div>
            {bill && (
                <div className={clsx(styles.wrapperFindBill)}>
                    <h2 className={clsx(styles.title)}>thông tin & tình trạng vận chuyển</h2>
                    <div className={clsx(styles.customerInfo)}>
                        <p>
                            <span className={clsx(styles.tag)}>Tên khách hàng: </span>
                            {bill.Name}
                        </p>
                        <p>
                            <span className={clsx(styles.tag)}>Số điện thoại: </span>
                            {bill.Phone}
                        </p>
                        <p>
                            <span className={clsx(styles.tag)}>Email: </span>
                            {bill.Email}
                        </p>
                        <p>
                            <span className={clsx(styles.tag)}>Tình trạng vận chuyển: </span>
                            {bill.Bill.BillStatus.Name}
                        </p>
                    </div>
                    <h2 className={clsx(styles.title)}>đơn hàng</h2>
                    <div className={styles.wrapperProduct}>
                        <div className={styles.infoBill}>
                            <div className={styles.wrapperProductItem}>
                                {bill.Bill.Cart.cartProducts.map((cart) => (
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
                            <div className={styles.wrapperInfoPrice}>
                                <p>
                                    <span className={styles.titleInfo}>Tổng tiền: </span>
                                    {new Intl.NumberFormat('de-DE').format(bill.Bill.Cart.totalPrice)} đ
                                </p>
                                {bill.Bill.Cart.saleCode && (
                                    <>
                                        <p>
                                            <h3>Khuyến mãi: </h3>
                                            <p>
                                                <span className={clsx(styles.titleInfo, styles.saleCode)}>
                                                    Mã khuyến mãi:{' '}
                                                </span>
                                                {bill.Bill.Cart.saleCode.Name}
                                            </p>
                                            <p>
                                                <span className={clsx(styles.titleInfo, styles.salePrice)}>
                                                    Giảm giá:{' '}
                                                </span>
                                                {new Intl.NumberFormat('de-DE').format(bill.Bill.Cart.saleCode.Sale)} đ
                                            </p>
                                        </p>
                                        <p>
                                            <span className={styles.titleInfo}>Giá sau khuyến mãi: </span>
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
