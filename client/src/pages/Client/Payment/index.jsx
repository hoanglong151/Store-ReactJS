import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import TotalPriceCart from '~/components/TotalPriceCart';
import Input from '~/components/Form/Input/Input';
import HeaderCart from '~/Layouts/Client/components/HeaderCart/HeaderCart';
import Selects from '~/components/Form/Selects';
import { useDispatch, useSelector } from 'react-redux';
import billStatusApi from '~/api/billStatusApi';
import billsApi from '~/api/billsApi';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { emptyCart } from '~/app/reducerCart';
import { fetchTypeProducts } from '~/app/reducerTypeProduct';
import { addressStoresApi, areasApi, districtsApi, provincesApi } from '~/api';
import classnames from 'classnames/bind';
import styles from './Payment.module.scss';
import { io } from 'socket.io-client';
import * as yup from 'yup';
import ErrorMessage from '~/components/Form/ErrorMessage/ErrorMessage';

const cx = classnames.bind(styles);

function Bill() {
    console.log(process.env.REACT_APP_URL);
    const { cart } = useSelector((state) => state);
    const [addressStores, setAddressStores] = useState([]);
    const [areas, setAreas] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [provinces, setProvinces] = useState([]);

    const [selectMethodShip, setSelectMethodShip] = useState('Nhận tại cửa hàng');
    const [selectArea, setSelectArea] = useState();
    const [selectProvince, setSelectProvince] = useState();
    const [selectDistrict, setSelectDistrict] = useState();
    const [selectBillStatus, setSelectBillStatus] = useState({});
    const [selectAddressStore, setSelectAddressStore] = useState();
    const [info, setInfo] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        other: '',
    });
    const SuccessSwal = withReactContent(Swal);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getAddressStores = async () => {
        const result = await addressStoresApi.getAll();
        setAddressStores(result.addressStores);
    };

    const getAreas = async () => {
        const result = await areasApi.getAll();
        setAreas(result.areas);
    };

    const getProvinces = async () => {
        const result = await provincesApi.getAll();
        setProvinces(result.provinces);
    };

    const getDistricts = async () => {
        const result = await districtsApi.getAll();
        setDistricts(result.districts);
    };

    const getBillStatus = async () => {
        const billStatus = await billStatusApi.getAll();
        setSelectBillStatus(billStatus.billStatus[0]);
    };

    useEffect(() => {
        getAreas();
        getAddressStores();
        getProvinces();
        getDistricts();
        getBillStatus();
        const info = JSON.parse(sessionStorage.getItem('Info'));
        if (info) {
            setInfo(info);
        }
    }, []);

    const selectProvinces = useMemo(() => {
        const getProvinceByArea = provinces
            .filter((province) => {
                return province.Areas._id === selectArea?.value;
            })
            .map((item) => {
                return { value: item._id, label: item.Name };
            });
        setSelectProvince(getProvinceByArea[0]);
        return getProvinceByArea;
    }, [selectArea, provinces]);

    const selectDistricts = useMemo(() => {
        const getDistrictsByAreaAndProvince = districts
            .filter((district) => {
                if (district.Areas._id === selectArea?.value && district.Provinces._id === selectProvince?.value) {
                    return district;
                }
            })
            .map((item) => {
                return { value: item._id, label: item.Name };
            });
        return getDistrictsByAreaAndProvince;
    }, [selectArea, selectProvince, districts]);

    const selectAddressStores = useMemo(() => {
        const getAddressStoresByAreaAndProvinceAndDistrict = addressStores
            .filter((store) => {
                if (
                    store.Areas._id === selectArea?.value &&
                    store.Provinces._id === selectProvince?.value &&
                    store.Districts._id === selectDistrict?.value
                ) {
                    return store;
                }
            })
            .map((item) => {
                return {
                    value: item._id,
                    label: item.Name,
                };
            });
        return getAddressStoresByAreaAndProvinceAndDistrict;
    }, [selectArea, selectProvince, selectDistrict, addressStores]);

    const convertSelects = useMemo(() => {
        const newAreas = areas.map((area) => {
            return {
                value: area._id,
                label: area.Name,
            };
        });
        setSelectArea(newAreas[0]);
        return {
            Areas: newAreas,
        };
    }, [areas]);

    const handleSelectMethodShip = (method) => {
        setSelectMethodShip(method);
        setSelectDistrict(null);
        setSelectAddressStore(null);
    };

    const handleSelectArea = (area) => {
        setSelectArea(area);
        setSelectDistrict(null);
        formik.setFieldValue('area', area.value);
    };

    const handleSelectProvince = (province) => {
        setSelectProvince(province);
        setSelectDistrict(null);
        formik.setFieldValue('province', province.value);
    };

    const handleSelectDistrict = (district) => {
        setSelectDistrict(district);
        setSelectAddressStore(null);
        formik.setFieldValue('district', district.value);
    };

    const handleSelectAddressStore = (address) => {
        setSelectAddressStore(address);
        formik.setFieldValue('addressStore', address.value);
    };

    const handleSetName = (e) => {
        setInfo({ ...info, name: e.target.value });
        sessionStorage.setItem('Info', JSON.stringify({ ...info, name: e.target.value }));
        formik.setFieldValue('name', e.target.value);
    };
    const handleSetPhone = (e) => {
        setInfo({ ...info, phone: e.target.value });
        sessionStorage.setItem('Info', JSON.stringify({ ...info, phone: e.target.value }));
        formik.setFieldValue('phone', e.target.value);
    };
    const handleSetEmail = (e) => {
        setInfo({ ...info, email: e.target.value });
        sessionStorage.setItem('Info', JSON.stringify({ ...info, email: e.target.value }));
        formik.setFieldValue('email', e.target.value);
    };
    const handleSetAddress = (e) => {
        setInfo({ ...info, address: e.target.value });
        sessionStorage.setItem('Info', JSON.stringify({ ...info, address: e.target.value }));
        formik.setFieldValue('address', e.target.value);
    };
    const handleSetOther = (e) => {
        setInfo({ ...info, other: e.target.value });
        sessionStorage.setItem('Info', JSON.stringify({ ...info, other: e.target.value }));
        formik.setFieldValue('other', e.target.value);
    };

    const validationSchema = yup.object({
        name: yup.string().required('Vui lòng nhập đầy đủ họ tên'),
        phone: yup
            .string()
            .required('Vui lòng nhập số điện thoại')
            .matches(/^[0-9]+$/, 'Vui lòng kiểm tra lại số điện thoại'),
        email: yup
            .string()
            .required('Vui lòng nhập email')
            .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Vui lòng kiểm tra lại email'),
        addressStore: yup.string().when('shipPayment', {
            is: 'Nhận tại cửa hàng',
            then: yup.string().required('Vui lòng chọn địa chỉ cửa hàng bạn muốn nhận hàng'),
        }),
        address: yup.string().when('shipPayment', {
            is: 'Giao hàng tận nơi',
            then: yup.string().required('Vui lòng nhập địa chỉ giao hàng'),
        }),
        district: yup.string().required('Vui lòng chọn Quận/Huyện'),
    });

    const formik = useFormik({
        enableReinitialize: true,
        validationSchema: validationSchema,
        initialValues: {
            name: info.name || '',
            phone: info.phone || '',
            email: info.email || '',
            shipPayment: selectMethodShip,
            area: selectArea?.value || '',
            province: selectProvince?.value || '',
            district: selectDistrict?.value || '',
            addressStore: selectAddressStore?.value || '',
            address: info.address || '',
            other: info.other || '',
            cart: cart || {},
            billStatus: selectBillStatus || {},
        },
        onSubmit: (values) => {
            const submit = async () => {
                const result = await billsApi.paymentBill(values);
                if (result.Amount) {
                    SuccessSwal.fire({
                        icon: 'error',
                        title: `Đặt Hàng Thất Bại <br /> (${result.Product})`,
                        text: result.Amount,
                    });
                } else {
                    SuccessSwal.fire({
                        icon: 'success',
                        title: 'Đặt Hàng Thành Công',
                        text: 'Đơn Hàng Của Bạn Đang Chờ Xử Lý. Chúng Tôi Sẽ Liên Hệ Với Bạn Sớm Nhất',
                        confirmButtonText: 'OK',
                    }).then((confirm) => {
                        if (confirm.isConfirmed) {
                            const socket = io(process.env.REACT_APP_URL);
                            socket.emit('payment', { bill: result });
                            localStorage.setItem('cart', null);
                            dispatch(emptyCart());
                            dispatch(fetchTypeProducts());
                            navigate('/');
                        }
                    });
                }
            };
            submit();
        },
    });

    return (
        <div className={cx('wrapper')}>
            <form onSubmit={formik.handleSubmit}>
                <HeaderCart title="Thông Tin Đặt Hàng" link="/cart" />
                <div className={cx('payment-info')}>
                    <div>
                        <h3 className={cx('mb1')}>Thông tin khách hàng</h3>
                        <Input
                            id="name"
                            name="name"
                            onChange={handleSetName}
                            value={formik.values.name}
                            placeholder="Họ và tên (bắt buộc)"
                            errors={formik.errors.name && formik.touched.name}
                            className={cx('mb1')}
                        />
                        {formik.errors.name && formik.touched.name ? (
                            <ErrorMessage>{formik.errors.name}</ErrorMessage>
                        ) : null}
                        <Input
                            id="phone"
                            name="phone"
                            maxLength="10"
                            onChange={handleSetPhone}
                            value={formik.values.phone}
                            placeholder="Số điện thoại (bắt buộc)"
                            errors={formik.errors.phone && formik.touched.phone}
                            className={cx('mb1')}
                        />
                        {formik.errors.phone && formik.touched.phone ? (
                            <ErrorMessage>{formik.errors.phone}</ErrorMessage>
                        ) : null}
                        <Input
                            id="email"
                            name="email"
                            onChange={handleSetEmail}
                            value={formik.values.email}
                            placeholder="Email (Vui lòng điền email để nhận hóa đơn VAT)"
                            type="email"
                            errors={formik.errors.email && formik.touched.email}
                            className={cx('mb1')}
                        />
                        {formik.errors.email && formik.touched.email ? (
                            <ErrorMessage>{formik.errors.email}</ErrorMessage>
                        ) : null}
                    </div>
                    <div>
                        <h3>Chọn cách thức giao hàng</h3>
                        <div className={cx('ship-method')}>
                            {['Nhận tại cửa hàng', 'Giao hàng tận nơi'].map((methodShip) => (
                                <div key={methodShip} className={cx('wrap-method')}>
                                    <Input
                                        id="shipPayment"
                                        name="shipPayment"
                                        onChange={(formik.handleChange, () => handleSelectMethodShip(methodShip))}
                                        value={formik.values.shipPayment}
                                        type="radio"
                                        checked={methodShip === selectMethodShip}
                                        errors={formik.errors.shipPayment && formik.touched.shipPayment}
                                        className={cx('input-width')}
                                    />
                                    <label className={cx('text-ship-method')}>{methodShip}</label>
                                </div>
                            ))}
                        </div>
                        <div className={cx('wrap-address')}>
                            <div className={cx('wrap-area-city')}>
                                <Selects
                                    name="area"
                                    id="area"
                                    select={selectArea}
                                    data={convertSelects?.Areas || []}
                                    onChangeSelect={handleSelectArea}
                                    className={cx('w100', 'mb1')}
                                />
                                <Selects
                                    select={selectProvince}
                                    data={selectProvinces}
                                    onChangeSelect={handleSelectProvince}
                                    className={cx('w100', 'mb1')}
                                />
                            </div>
                            <Selects
                                name="district"
                                id="district"
                                errors={formik.errors.district && formik.touched.district}
                                data={selectDistricts}
                                select={selectDistrict}
                                onChangeSelect={handleSelectDistrict}
                                className={cx('mb1')}
                                placeholder="Quận / Huyện"
                            />
                            {formik.errors.district && formik.touched.district ? (
                                <ErrorMessage>{formik.errors.district}</ErrorMessage>
                            ) : null}
                            {selectMethodShip === 'Nhận tại cửa hàng' ? (
                                <>
                                    <Selects
                                        name="addressStore"
                                        id="addressStore"
                                        data={selectAddressStores}
                                        select={selectAddressStore}
                                        onChangeSelect={handleSelectAddressStore}
                                        className={cx('mb0')}
                                        placeholder="Chọn địa chỉ cửa hàng"
                                        errors={formik.errors.addressStore && formik.touched.addressStore}
                                    />
                                    {formik.errors.addressStore && formik.touched.addressStore ? (
                                        <ErrorMessage>{formik.errors.addressStore}</ErrorMessage>
                                    ) : null}
                                </>
                            ) : (
                                <>
                                    <Input
                                        id="address"
                                        name="address"
                                        onChange={handleSetAddress}
                                        value={formik.values.address}
                                        placeholder="Số nhà, tên đường"
                                        errors={formik.errors.address && formik.touched.address}
                                        className={cx('mb0')}
                                    />
                                    {formik.errors.address && formik.touched.address ? (
                                        <ErrorMessage>{formik.errors.address}</ErrorMessage>
                                    ) : null}
                                </>
                            )}
                        </div>
                        <Input
                            name="other"
                            id="other"
                            onChange={handleSetOther}
                            value={formik.values.other}
                            placeholder="Yêu cầu khác"
                            errors={formik.errors.other && formik.touched.other}
                        />
                    </div>
                </div>
                <TotalPriceCart title="Thanh Toán" />
            </form>
        </div>
    );
}

export default Bill;
