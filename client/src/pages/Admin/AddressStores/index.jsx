import React, { useEffect, useMemo, useState } from 'react';
import DialogAddressStore from '~/components/Form/Dialog/DialogAddressStore/DialogAddressStore';
import { useFormik } from 'formik';
import addressStoresApi from '~/api/addressStoresApi';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import TableAddressStore from '~/components/Tables/TableAddressStore/TableAddressStore';
import areasApi from '~/api/areasApi';
import provincesApi from '~/api/provincesApi';
import districtsApi from '~/api/districtsApi';
import PaginationOutlined from '~/components/Pagination';
import SearchByCate from '~/components/SearchByCate';
import classnames from 'classnames/bind';
import styles from './AddressStores.module.scss';

const cx = classnames.bind(styles);

function AddressStores() {
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
            const dd = await getAreas();
            console.log(dd);
            await getProvinces();
            await getDistricts();
            await getAddressStores();
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
                popup: `${cx('popup')}`,
            },
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const result = await addressStoresApi.deleteAddressStore(store._id);
                    if (result.exist) {
                        DeleteSwal.fire({
                            title: 'Cửa Hàng Đang Được Sử Dụng',
                            customClass: {
                                popup: `${cx('popup')}`,
                            },
                        });
                    } else {
                        DeleteSwal.fire({
                            title: 'Cửa Hàng Đã Được Xóa',
                            customClass: {
                                popup: `${cx('popup')}`,
                            },
                        });
                        getAddressStores();
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
                    getAddressStores();
                } catch (err) {
                    alert('Error: ', Error);
                }
            };
            submit();
        },
    });
    return (
        <div>
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
