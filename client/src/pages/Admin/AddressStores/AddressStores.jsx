import React, { useMemo, useState } from 'react';
import clsx from 'clsx';
import styles from './AddressStores.module.scss';
import DialogAddressStore from '~/components/Form/Dialog/DialogAddressStore/DialogAddressStore';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import addressStoresApi from '~/api/addressStoresApi';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import TableAddressStore from '~/components/Tables/TableAddressStore/TableAddressStore';
import { getAddressStores } from '~/app/reducerAddressStore';

function AddressStores() {
    const [editAddressStore, setEditAddressStore] = useState({});
    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const { areas } = useSelector((state) => state.area);
    const { provinces } = useSelector((state) => state.province);
    const { districts } = useSelector((state) => state.district);
    const { addressStores } = useSelector((state) => state.addressStore);
    const DeleteSwal = withReactContent(Swal);
    const dispatch = useDispatch();

    const newAreas = useMemo(() => {
        return areas.map((area, i) => {
            return {
                label: area.Name,
                value: area._id,
            };
        });
    }, [areas]);

    const newProvinces = useMemo(() => {
        return provinces.map((area, i) => {
            return {
                label: area.Name,
                value: area._id,
            };
        });
    }, [provinces]);

    const newDistricts = useMemo(() => {
        return districts.map((district, i) => {
            return {
                label: district.Name,
                value: district._id,
            };
        });
    }, [districts]);

    const handleOpenDialog = (adressStore) => {
        if (adressStore?._id) {
            const convertSelectArea = adressStore.Areas.map((area) => {
                return {
                    value: area._id,
                    label: area.Name,
                };
            });
            const getProvinceIDArea = adressStore.Areas.map((area) => {
                return area._id;
            });
            const convertSelectProvince = adressStore.Provinces.map((province) => {
                return {
                    value: province._id,
                    label: province.Name,
                };
            });
            const getProvinceIDProvince = adressStore.Provinces.map((province) => {
                return province._id;
            });
            const convertSelectDistrict = adressStore.Districts.map((district) => {
                return {
                    value: district._id,
                    label: district.Name,
                };
            });
            const getProvinceIDDistrict = adressStore.Districts.map((district) => {
                return district._id;
            });
            formik.setFieldValue('area_Id', getProvinceIDArea);
            formik.setFieldValue('province_Id', getProvinceIDProvince);
            formik.setFieldValue('addressStore_Id', getProvinceIDDistrict);
            setEditAddressStore({
                ...adressStore,
                Areas: convertSelectArea,
                Provinces: convertSelectProvince,
                Districts: convertSelectDistrict,
            });
            setOpenEdit(true);
        } else {
            setOpenCreate(true);
        }
    };

    const handleCloseDialog = () => {
        setEditAddressStore({});
        setOpenCreate(false);
        setOpenEdit(false);
    };

    const handleDeleteAddressStore = (store) => {
        DeleteSwal.fire({
            title: 'Bạn muốn xóa cửa hàng này?',
            icon: 'error',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Đồng Ý',
            cancelButtonText: 'Hủy',
            customClass: {
                popup: `${clsx(styles.popup)}`,
            },
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const result = await addressStoresApi.deleteAddressStore(store._id);
                    if (result.exist) {
                        DeleteSwal.fire({
                            title: 'Cửa Hàng Đang Được Sử Dụng',
                            customClass: {
                                popup: `${clsx(styles.popup)}`,
                            },
                        });
                    } else {
                        DeleteSwal.fire({
                            title: 'Cửa Hàng Đã Được Xóa',
                            customClass: {
                                popup: `${clsx(styles.popup)}`,
                            },
                        });
                        dispatch(getAddressStores());
                    }
                } catch (err) {
                    throw Error(err);
                }
            }
        });
    };

    const handleSelectArea = (options) => {
        const optionList = options.map((option, index) => {
            return option.value;
        });
        setEditAddressStore({ ...editAddressStore, Areas: options });
        formik.setFieldValue('area_Id', optionList);
    };

    const handleSelectProvince = (options) => {
        const optionList = options.map((option, index) => {
            return option.value;
        });
        setEditAddressStore({ ...editAddressStore, Provinces: options });
        formik.setFieldValue('province_Id', optionList);
    };

    const handleSelectDistrict = (options) => {
        const optionList = options.map((option, index) => {
            return option.value;
        });
        setEditAddressStore({ ...editAddressStore, Districts: options });
        formik.setFieldValue('district_Id', optionList);
    };

    const objectAddressStore = () => {
        if (editAddressStore._id) {
            return {
                id: editAddressStore._id,
                name: editAddressStore.Name,
            };
        } else {
            return {
                name: '',
                area_Id: [],
                province_Id: [],
                addressStore_Id: [],
            };
        }
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: objectAddressStore(),
        onSubmit: (values) => {
            const submit = async () => {
                try {
                    if (editAddressStore._id) {
                        await addressStoresApi.editAddressStore(values, editAddressStore._id);
                    } else {
                        await addressStoresApi.addAddressStore(values);
                    }
                    formik.setFieldValue('name', '');
                    setOpenCreate(false);
                    setOpenEdit(false);
                    setEditAddressStore({});
                    dispatch(getAddressStores());
                } catch (err) {
                    alert('Error: ', Error);
                }
            };
            submit();
        },
    });
    return (
        <div>
            <button className={clsx(styles.createBtn)} onClick={handleOpenDialog}>
                Tạo cửa hàng
            </button>
            <DialogAddressStore
                formik={formik}
                open={openCreate || openEdit}
                onHandleCloseDialog={handleCloseDialog}
                areas={newAreas}
                provinces={newProvinces}
                districts={newDistricts}
                handleSelectArea={handleSelectArea}
                handleSelectProvince={handleSelectProvince}
                handleSelectDistrict={handleSelectDistrict}
                editAddressStore={editAddressStore}
            />
            <TableAddressStore
                addressStores={addressStores}
                onHandleOpenDialog={handleOpenDialog}
                onHandleDeleteAddressStore={handleDeleteAddressStore}
            />
        </div>
    );
}

export default AddressStores;
