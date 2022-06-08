import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { useFormik } from 'formik';
import TotalPriceCart from '~/components/TotalPriceCart/TotalPriceCart';
import styles from './Payment.module.scss';
import Input from '~/components/Form/Input/Input';
import HeaderCart from '~/components/Layouts/Client/components/HeaderCart/HeaderCart';
import Selects from '~/components/Form/Selects/Selects';
import { useDispatch, useSelector } from 'react-redux';
import billStatusApi from '~/api/billStatusApi';
import billsApi from '~/api/billsApi';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { emptyCart } from '~/app/reducerCart';

function Bill() {
    const { addressStore, area, district, province, cart } = useSelector((state) => state);
    const { addressStores } = addressStore;
    const { areas } = area;
    const { districts } = district;
    const { provinces } = province;
    const [selectMethodShip, setSelectMethodShip] = useState('Nhận tại cửa hàng');
    const [selectArea, setSelectArea] = useState();
    const [selectProvince, setSelectProvince] = useState();
    const [selectDistrict, setSelectDistrict] = useState();
    const [selectBillStatus, setSelectBillStatus] = useState({});
    const [selectAddressStore, setSelectAddressStore] = useState();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [other, setOther] = useState('');
    const SuccessSwal = withReactContent(Swal);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const getBillStatus = async () => {
            const billStatus = await billStatusApi.getAll();
            setSelectBillStatus(billStatus[0]);
        };
        getBillStatus();
    }, []);

    const selectProvinces = useMemo(() => {
        const getProvinceByArea = provinces.filter((province) => {
            const getProvince = province.Areas.find((area) => {
                if (area._id === selectArea?.value) {
                    return province;
                }
            });
            return getProvince;
        });

        const convertProvince = getProvinceByArea.map((value) => {
            return {
                value: value._id,
                label: value.Name,
            };
        });
        setSelectProvince(convertProvince[0]);
        return convertProvince;
    }, [selectArea]);

    const selectDistricts = useMemo(() => {
        const getDistrictsByAreaAndProvince = districts.filter((district) => {
            const getDistrict = district.Areas.find((area) => {
                if (area._id === selectArea?.value) {
                    return district.Provinces.find((province) => {
                        if (province._id === selectProvince?.value) {
                            return district;
                        }
                    });
                }
            });
            return getDistrict;
        });

        return getDistrictsByAreaAndProvince.map((value) => {
            return {
                value: value._id,
                label: value.Name,
            };
        });
    }, [selectArea, selectProvince]);

    const selectAddressStores = useMemo(() => {
        const getAddressStoresByAreaAndProvinceAndDistrict = addressStores.filter((store) => {
            const getStore = store.Areas.find((area) => {
                if (area._id === selectArea?.value) {
                    return store.Provinces.find((province) => {
                        if (province._id === selectProvince?.value) {
                            if (selectDistrict?.value) {
                                return store.Districts.find((district) => {
                                    if (district._id == selectDistrict?.value) {
                                        return store;
                                    }
                                });
                            }
                            return store;
                        }
                    });
                }
            });
            return getStore;
        });

        return getAddressStoresByAreaAndProvinceAndDistrict.map((value) => {
            return {
                value: value._id,
                label: value.Name,
            };
        });
    }, [selectArea, selectProvince, selectDistrict]);

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
        setName(e.target.value);
        formik.setFieldValue('name', e.target.value);
    };
    const handleSetPhone = (e) => {
        setPhone(e.target.value);
        formik.setFieldValue('phone', e.target.value);
    };
    const handleSetEmail = (e) => {
        setEmail(e.target.value);
        formik.setFieldValue('email', e.target.value);
    };
    const handleSetAddress = (e) => {
        setAddress(e.target.value);
        formik.setFieldValue('address', e.target.value);
    };
    const handleSetOther = (e) => {
        setOther(e.target.value);
        formik.setFieldValue('other', e.target.value);
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: name,
            phone: phone,
            email: email,
            shipPayment: selectMethodShip,
            area: selectArea?.value || '',
            province: selectProvince?.value || '',
            district: selectDistrict?.value || '',
            addressStore: selectAddressStore?.value || '',
            address: address,
            other: other,
            cart: cart || {},
            billStatus: selectBillStatus || {},
        },
        onSubmit: (values) => {
            const submit = async () => {
                const result = await billsApi.paymentBill(values);
                if (result) {
                    SuccessSwal.fire({
                        icon: 'success',
                        title: 'Đặt Hàng Thành Công',
                        text: 'Đơn Hàng Của Bạn Đang Chờ Xử Lý. Chúng Tôi Sẽ Liên Hệ Với Bạn Sớm Nhất',
                        confirmButtonText: 'OK',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            localStorage.setItem('cart', null);
                            dispatch(emptyCart());
                            navigate('/');
                        }
                    });
                }
            };
            submit();
        },
    });

    return (
        <div className={clsx(styles.wrapper)}>
            <form onSubmit={formik.handleSubmit}>
                <HeaderCart title="Thông Tin Đặt Hàng" link="/cart" />
                <div className={clsx(styles.paymentInfo)}>
                    <div>
                        <h3 className={clsx(styles.mb1)}>Thông tin khách hàng</h3>
                        <Input
                            id="name"
                            name="name"
                            onChange={handleSetName}
                            value={formik.values.name}
                            placeholder="Họ và tên (bắt buộc)"
                            errors={formik.errors.name && formik.touched.name}
                            className={clsx(styles.mb1)}
                        />
                        <Input
                            id="phone"
                            name="phone"
                            onChange={handleSetPhone}
                            value={formik.values.phone}
                            placeholder="Số điện thoại (bắt buộc)"
                            errors={formik.errors.phone && formik.touched.phone}
                            className={clsx(styles.mb1)}
                        />
                        <Input
                            id="email"
                            name="email"
                            onChange={handleSetEmail}
                            value={formik.values.email}
                            placeholder="Email (Vui lòng điền email để nhận hóa đơn VAT)"
                            type="email"
                            errors={formik.errors.email && formik.touched.email}
                            className={clsx(styles.mb1)}
                        />
                    </div>
                    <div>
                        <h3>Chọn cách thức giao hàng</h3>
                        <div className={clsx(styles.shipMethod)}>
                            {['Nhận tại cửa hàng', 'Giao hàng tận nơi'].map((methodShip) => (
                                <div key={methodShip} className={clsx(styles.wrapMethod)}>
                                    <Input
                                        id="shipPayment"
                                        name="shipPayment"
                                        onChange={(formik.handleChange, () => handleSelectMethodShip(methodShip))}
                                        value={formik.values.shipPayment}
                                        type="radio"
                                        checked={methodShip === selectMethodShip}
                                        errors={formik.errors.shipPayment && formik.touched.shipPayment}
                                        className={clsx(styles.inputWidth)}
                                    />
                                    <label className={clsx(styles.textShipMethod)}>{methodShip}</label>
                                </div>
                            ))}
                        </div>
                        <div className={clsx(styles.wrapAddress)}>
                            <div className={clsx(styles.wrapAreaCity)}>
                                <Selects
                                    select={selectArea}
                                    data={convertSelects.Areas}
                                    onChangeSelect={handleSelectArea}
                                    className={clsx(styles.w100, styles.mb1)}
                                />
                                <Selects
                                    select={selectProvince}
                                    data={selectProvinces}
                                    onChangeSelect={handleSelectProvince}
                                    className={clsx(styles.w100, styles.mb1)}
                                />
                            </div>
                            <Selects
                                data={selectDistricts}
                                select={selectDistrict}
                                onChangeSelect={handleSelectDistrict}
                                className={clsx(styles.mb1)}
                                placeholder="Quận / Huyện"
                            />
                            {selectMethodShip === 'Nhận tại cửa hàng' ? (
                                <Selects
                                    data={selectAddressStores}
                                    select={selectAddressStore}
                                    onChangeSelect={handleSelectAddressStore}
                                    className={clsx(styles.mb0)}
                                    placeholder="Chọn địa chỉ cửa hàng"
                                />
                            ) : (
                                <Input
                                    id="address"
                                    name="address"
                                    onChange={handleSetAddress}
                                    value={formik.values.address}
                                    placeholder="Số nhà, tên đường"
                                    errors={formik.errors.address && formik.touched.address}
                                    className={clsx(styles.mb0)}
                                />
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
