import React, { useEffect, useMemo, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import DialogAddressStore from '~/components/Form/Dialog/DialogAddressStore/DialogAddressStore';
import { useFormik } from 'formik';
import addressStoresApi from '~/api/addressStoresApi';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import withReactContent from 'sweetalert2-react-content';
import TableAddressStore from '~/components/Tables/TableAddressStore/TableAddressStore';
import areasApi from '~/api/areasApi';
import provincesApi from '~/api/provincesApi';
import districtsApi from '~/api/districtsApi';
import PaginationOutlined from '~/components/Pagination';
import SearchByCate from '~/components/SearchByCate';
import classnames from 'classnames/bind';
import styles from './AddressStores.module.scss';
import LoadingCRUD from '~/components/Loading/LoadingCRUD';

const cx = classnames.bind(styles);

function AddressStores() {
    const [loading, setLoading] = useState(false);
    const [editAddressStore, setEditAddressStore] = useState({});
    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const DeleteSwal = withReactContent(Swal);

    const [areas, setAreas] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);

    const [totalPage, setTotalPage] = useState({
        pageAll: 1,
        pageSearch: 1,
    });
    const [addressStores, setAddressStores] = useState({
        addressStoresAll: [],
        addressStoresSearch: [],
    });
    const [currentPage, setCurrentPage] = useState(1);

    const getAreas = async () => {
        try {
            const result = await areasApi.getAll();
            setAreas(result.areas);
        } catch (err) {
            console.log('Err: ', err);
        }
    };

    const getProvinces = async () => {
        try {
            const result = await provincesApi.getAll();
            setProvinces(result.provinces);
        } catch (err) {
            console.log('Err: ', err);
        }
    };

    const getDistricts = async () => {
        try {
            const result = await districtsApi.getAll(currentPage);
            setDistricts(result.districts);
        } catch (err) {
            console.log('Err: ', err);
        }
    };

    const getAddressStores = async () => {
        try {
            const result = await addressStoresApi.getAll(currentPage);
            setTotalPage({ ...totalPage, pageAll: result.totalPage, pageSearch: result.totalPage });
            setAddressStores({
                ...addressStores,
                addressStoresAll: result.addressStores,
                addressStoresSearch: result.addressStores,
            });
        } catch (err) {
            console.log('Err: ', err);
        }
    };

    const handlePagination = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        const callApi = async () => {
            Promise.all([getAreas(), getProvinces(), getDistricts(), getAddressStores()]);
        };
        callApi();
    }, []);

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

    const handleOpenDialog = (addressStore) => {
        if (addressStore?._id) {
            const convertSelectArea = {
                value: addressStore.Areas._id,
                label: addressStore.Areas.Name,
            };
            const convertSelectProvince = {
                value: addressStore.Provinces._id,
                label: addressStore.Provinces.Name,
            };
            const convertSelectDistrict = {
                value: addressStore.Districts._id,
                label: addressStore.Districts.Name,
            };
            formik.setFieldValue('area_Id', addressStore.Areas._id);
            formik.setFieldValue('province_Id', addressStore.Provinces._id);
            formik.setFieldValue('addressStore_Id', addressStore.Districts._id);
            setEditAddressStore({
                ...addressStore,
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
                popup: `${cx('popup')}`,
            },
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    setLoading(true);
                    const result = await addressStoresApi.deleteAddressStore(store._id);
                    if (result.Exist) {
                        setLoading(false);
                        DeleteSwal.fire({
                            icon: 'error',
                            title: result.Exist,
                            customClass: {
                                popup: `${cx('popup')}`,
                            },
                        });
                    } else {
                        getAddressStores();
                        setLoading(false);
                        DeleteSwal.fire({
                            icon: 'success',
                            title: 'Cửa Hàng Đã Được Xóa',
                            customClass: {
                                popup: `${cx('popup')}`,
                            },
                        });
                    }
                } catch (err) {
                    throw Error(err);
                }
            }
        });
    };

    const handleSelectArea = (option) => {
        setEditAddressStore({ ...editAddressStore, Areas: option });
        formik.setFieldValue('area_Id', option.value);
    };

    const handleSelectProvince = (option) => {
        setEditAddressStore({ ...editAddressStore, Provinces: option });
        formik.setFieldValue('province_Id', option.value);
    };

    const handleSelectDistrict = (option) => {
        setEditAddressStore({ ...editAddressStore, Districts: option });
        formik.setFieldValue('district_Id', option.value);
    };

    const handleSearchAddressStores = (data) => {
        if (Object.keys(data).length !== 0) {
            setAddressStores({ ...addressStores, addressStoresSearch: data.data });
            setTotalPage({ ...totalPage, pageSearch: data.totalPage });
        } else {
            setAddressStores({ ...addressStores, addressStoresSearch: addressStores.addressStoresAll });
            setTotalPage({ ...totalPage, pageSearch: totalPage.pageAll });
        }
    };
    const objectAddressStore = () => {
        if (editAddressStore._id) {
            return {
                id: editAddressStore._id,
                name: editAddressStore.Name,
                area_Id: editAddressStore.Areas.value,
                province_Id: editAddressStore.Provinces.value,
                district_Id: editAddressStore.Districts.value,
            };
        } else {
            return {
                name: '',
                area_Id: '',
                province_Id: '',
                district_Id: '',
            };
        }
    };

    const validationSchema = Yup.object({
        name: Yup.string('Nhập Địa Chỉ Cửa Hàng').required('Vui Lòng Nhập Địa Chỉ Cửa Hàng'),
        area_Id: Yup.string().required('Vui Lòng Chọn Vùng Miền'),
        province_Id: Yup.string().required('Vui Lòng Chọn Tỉnh/Thành'),
        district_Id: Yup.string().required('Vui Lòng Chọn Quận/Huyện'),
    });

    const formik = useFormik({
        enableReinitialize: true,
        validationSchema: validationSchema,
        initialValues: objectAddressStore(),
        onSubmit: (values) => {
            const submit = async () => {
                try {
                    if (editAddressStore._id) {
                        setLoading(true);
                        const result = await addressStoresApi.editAddressStore(values, editAddressStore._id);
                        if (result.Exist) {
                            setLoading(false);
                            toast.error(`🦄 ${result.Exist}`, {
                                position: 'top-right',
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                        } else {
                            formik.setFieldValue('name', '');
                            setOpenCreate(false);
                            setOpenEdit(false);
                            setEditAddressStore({});
                            getAddressStores();
                            setLoading(false);
                        }
                    } else {
                        setLoading(true);
                        const result = await addressStoresApi.addAddressStore(values);
                        if (result.Exist) {
                            setLoading(false);
                            toast.error(`🦄 ${result.Exist}`, {
                                position: 'top-right',
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                        } else {
                            formik.setFieldValue('name', '');
                            setOpenCreate(false);
                            setOpenEdit(false);
                            setEditAddressStore({});
                            getAddressStores();
                            setLoading(false);
                        }
                    }
                } catch (err) {
                    alert('Error: ', Error);
                }
            };
            submit();
        },
    });
    return (
        <div>
            {loading && <LoadingCRUD />}
            <ToastContainer />
            <button className={cx('create-btn')} onClick={handleOpenDialog}>
                Tạo cửa hàng
            </button>
            <SearchByCate type="addressStore" onSearch={handleSearchAddressStores} />
            <PaginationOutlined count={totalPage.pageSearch} onClick={handlePagination} />
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
                addressStores={addressStores.addressStoresSearch}
                onHandleOpenDialog={handleOpenDialog}
                onHandleDeleteAddressStore={handleDeleteAddressStore}
            />
        </div>
    );
}

export default AddressStores;
