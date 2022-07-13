import React, { useEffect, useMemo, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import DialogProvince from '~/components/Form/Dialog/DialogProvince/DialogProvince';
import { useFormik } from 'formik';
import provincesApi from '~/api/provincesApi';
import areasApi from '~/api/areasApi';
import TableProvince from '~/components/Tables/TableProvince';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import PaginationOutlined from '~/components/Pagination';
import SearchByCate from '~/components/SearchByCate';
import classnames from 'classnames/bind';
import styles from './Provinces.module.scss';

const cx = classnames.bind(styles);

function Provinces() {
    const [editProvince, setEditProvince] = useState({});
    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const DeleteSwal = withReactContent(Swal);

    const [areas, setAreas] = useState([]);

    const [totalPage, setTotalPage] = useState({
        pageAll: 1,
        pageSearch: 1,
    });
    const [provinces, setProvinces] = useState({
        provincesAll: [],
        provincesSearch: [],
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
            const result = await provincesApi.getAll(currentPage);
            console.log(result);
            setTotalPage({ ...totalPage, pageAll: result.totalPage, pageSearch: result.totalPage });
            setProvinces({ ...provinces, provincesAll: result.provinces, provincesSearch: result.provinces });
        } catch (err) {
            console.log('Err: ', err);
        }
    };

    const handlePagination = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        getAreas();
        getProvinces();
    }, [currentPage]);

    const newAreas = useMemo(() => {
        return areas.map((area, i) => {
            return {
                label: area.Name,
                value: area._id,
            };
        });
    }, [areas]);

    const handleOpenDialog = (province) => {
        if (province?._id) {
            const convertSelect = {
                value: province.Areas._id,
                label: province.Areas.Name,
            };
            formik.setFieldValue('area_Id', province.Areas._id);
            setEditProvince({ ...province, Areas: convertSelect });
            setOpenEdit(true);
        } else {
            setOpenCreate(true);
            setEditProvince({});
        }
    };

    const handleCloseDialog = () => {
        setOpenCreate(false);
        setOpenEdit(false);
    };

    const handleDeleteProvince = (province) => {
        DeleteSwal.fire({
            title: 'Bạn muốn xóa tỉnh/thành này?',
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
                    const result = await provincesApi.deleteProvince(province._id);
                    if (result.Exist) {
                        DeleteSwal.fire({
                            icon: 'error',
                            title: result.Exist,
                            customClass: {
                                popup: `${cx('popup')}`,
                            },
                        });
                    } else {
                        DeleteSwal.fire({
                            icon: 'success',
                            title: 'Tỉnh/Thành Đã Được Xóa',
                            customClass: {
                                popup: `${cx('popup')}`,
                            },
                        });
                        getProvinces();
                    }
                } catch (err) {
                    throw Error(err);
                }
            }
        });
    };

    const handleSelectArea = (option) => {
        setEditProvince({ ...editProvince, Areas: option });
        formik.setFieldValue('area_Id', option.value);
    };

    const handleSearchProvinces = (data) => {
        if (Object.keys(data).length !== 0) {
            setProvinces({ ...provinces, provincesSearch: data.data });
            setTotalPage({ ...totalPage, pageSearch: data.totalPage });
        } else {
            setProvinces({ ...provinces, provincesSearch: provinces.provincesAll });
            setTotalPage({ ...totalPage, pageSearch: totalPage.pageAll });
        }
    };

    const objectProvince = () => {
        if (editProvince._id) {
            return {
                id: editProvince._id,
                name: editProvince.Name,
                area_Id: editProvince.Areas.value,
            };
        } else {
            return {
                name: '',
                area_Id: '',
            };
        }
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: objectProvince(),
        onSubmit: (values) => {
            const submit = async () => {
                try {
                    if (editProvince._id) {
                        const result = await provincesApi.editProvince(values, editProvince._id);
                        if (result.Exist) {
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
                            setEditProvince({});
                            getProvinces();
                        }
                    } else {
                        const result = await provincesApi.addProvince(values);
                        if (result.Exist) {
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
                            setEditProvince({});
                            getProvinces();
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
            <ToastContainer />
            <button className={cx('create-btn')} onClick={handleOpenDialog}>
                Tạo tỉnh/thành
            </button>
            <SearchByCate type="province" onSearch={handleSearchProvinces} />
            <PaginationOutlined count={totalPage.pageSearch} onClick={handlePagination} />
            <DialogProvince
                formik={formik}
                open={openCreate || openEdit}
                onHandleCloseDialog={handleCloseDialog}
                areas={newAreas}
                handleSelectArea={handleSelectArea}
                editProvince={editProvince}
                textTitle={['Tạo Tỉnh/Thành', 'Cập nhật Tỉnh/Thành']}
            />
            <TableProvince
                provinces={provinces.provincesSearch}
                onHandleOpenDialog={handleOpenDialog}
                onHandleDeleteProvince={handleDeleteProvince}
            />
        </div>
    );
}

export default Provinces;
