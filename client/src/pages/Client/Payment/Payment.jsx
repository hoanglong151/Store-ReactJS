import React from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { useFormik } from 'formik';
import TotalPriceCart from '~/components/Layouts/Client/components/TotalPriceCart/TotalPriceCart';
import styles from './Payment.module.scss';
import Input from '~/components/Form/Input/Input';
import Label from '~/components/Form/Label/Label';

function Bill() {
    const navigate = useNavigate();
    const handlePayment = () => {
        navigate('/bill');
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            phone: '',
            email: '',
            shipPayment: 'atShop',
            area: 'Miền Nam',
            city: 'Hồ Chí Minh',
            ward: 'Quận/Huyện',
            address: '',
            other: '',
            exportBill: false,
        },
        onSubmit: (values) => {
            console.log(values);
        },
    });
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.paymentInfo)}>
                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <h3>Thông tin khách hàng</h3>
                        <Input
                            id="name"
                            name="name"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            placeholder="Họ và tên (bắt buộc)"
                            errors={formik.errors.name && formik.touched.name}
                        />
                        <Input
                            id="phone"
                            name="phone"
                            onChange={formik.handleChange}
                            value={formik.values.phone}
                            placeholder="Số điện thoại (bắt buộc)"
                            type="number"
                            errors={formik.errors.phone && formik.touched.phone}
                        />
                        <Input
                            id="email"
                            name="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            placeholder="Email (Vui lòng điền email để nhận hóa đơn VAT)"
                            type="email"
                            errors={formik.errors.email && formik.touched.email}
                        />
                    </div>
                    <div>
                        <h3>Chọn cách thức giao hàng</h3>
                        <div className={clsx(styles.shipMethod)}>
                            <div className={clsx(styles.atShop)}>
                                <Input
                                    id="shipPayment"
                                    name="shipPayment"
                                    onChange={formik.handleChange}
                                    value={formik.values.shipPayment}
                                    type="radio"
                                    errors={formik.errors.shipPayment && formik.touched.shipPayment}
                                    className={clsx(styles.inputWidth)}
                                />
                                <label htmlFor="shipPayment" className={clsx(styles.textShipMethod)}>
                                    Nhận tại cửa hàng
                                </label>
                            </div>
                            <div className={clsx(styles.ship)}>
                                <Input
                                    id="shipPayment"
                                    name="shipPayment"
                                    onChange={formik.handleChange}
                                    value={formik.values.shipPayment}
                                    type="radio"
                                    errors={formik.errors.shipPayment && formik.touched.shipPayment}
                                    className={clsx(styles.inputWidth)}
                                />
                                <label htmlFor="shipPayment" className={clsx(styles.textShipMethod)}>
                                    Giao hàng tận nơi
                                </label>
                            </div>
                        </div>
                        <div className={clsx(styles.wrapAddress)}></div>
                    </div>
                </form>
            </div>
            <TotalPriceCart onPayment={handlePayment} title="Tiếp tục" />
        </div>
    );
}

export default Bill;
