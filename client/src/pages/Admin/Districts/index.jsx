import React, { useEffect, useMemo, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import DialogDistrict from '~/components/Form/Dialog/DialogDistrict/DialogDistrict';
import { useFormik } from 'formik';
import districtsApi from '~/api/districtsApi';
import provincesApi from '~/api/provincesApi';
import areasApi from '~/api/areasApi';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import withReactContent from 'sweetalert2-react-content';
import TableDistrict from '~/components/Tables/TableDistrict';
import PaginationOutlined from '~/components/Pagination';
import SearchByCate from '~/components/SearchByCate';
import classnames from 'classnames/bind';
import styles from './Districts.module.scss';
import LoadingCRUD from '~/components/Loading/LoadingCRUD';

const cx = classnames.bind(styles);

function District() {
    const [loading, setLoading] = useState(false);
    const [editDistrict, setEditDistrict] = useState({});
    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const DeleteSwal = withReactContent(Swal);

    const [areas, setAreas] = useState([]);
    const [provinces, setProvinces] = useState([]);

    const [totalPage, setTotalPage] = useState({
        pageAll: 1,
        pageSearch: 1,
    });
    const [districts, setDistricts] = useState({
        districtsAll: [],
        districtsSearch: [],
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
            setTotalPage({ ...totalPage, pageAll: result.totalPage, pageSearch: result.totalPage });
            setDistricts({ ...districts, districtsAll: result.districts, districtsSearch: result.districts });
        } catch (err) {
            console.log('Err: ', err);
        }
    };

    const handlePagination = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        const callApi = async () => {
            Promise.all([getAreas(), getProvinces(), getDistricts()]);
        };
        callApi();
    }, [currentPage]);

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

    const handleOpenDialog = (district) => {
        if (district?._id) {
            const convertSelectArea = {
                value: district.Areas._id,
                label: district.Areas.Name,
            };
            const convertSelectProvince = {
                value: district.Provinces._id,
                label: district.Provinces.Name,
            };
            formik.setFieldValue('area_Id', district.Areas._id);
            formik.setFieldValue('province_Id', district.Provinces._id);
            setEditDistrict({ ...district, Areas: convertSelectArea, Provinces: convertSelectProvince });
            setOpenEdit(true);
        } else {
            setOpenCreate(true);
            setEditDistrict({});
        }
    };

    const handleCloseDialog = () => {
        setOpenCreate(false);
        setOpenEdit(false);
    };

    const handleDeleteDistrict = (district) => {
        DeleteSwal.fire({
            title: 'Bạn muốn xóa quận/huyện này?',
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
                    const result = await districtsApi.deleteDistrict(district._id);
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
                        getDistricts();
                        setLoading(false);
                        DeleteSwal.fire({
                            icon: 'success',
                            title: 'Quận/Huyện Đã Được Xóa',
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
        setEditDistrict({ ...editDistrict, Areas: option });
        formik.setFieldValue('area_Id', option.value);
    };

    const handleSelectProvince = (option) => {
        setEditDistrict({ ...editDistrict, Provinces: option });
        formik.setFieldValue('province_Id', option.value);
    };

    const handleSearchDistricts = (data) => {
        if (Object.keys(data).length !== 0) {
            setDistricts({ ...districts, districtsSearch: data.data });
            setTotalPage({ ...totalPage, pageSearch: data.totalPage });
        } else {
            setDistricts({ ...districts, districtsSearch: districts.districtsAll });
            setTotalPage({ ...totalPage, pageSearch: totalPage.pageAll });
        }
    };

    const objectDistrict = () => {
        if (editDistrict._id) {
            return {
                id: editDistrict._id,
                name: editDistrict.Name,
                area_Id: editDistrict.Areas.value,
                province_Id: editDistrict.Provinces.value,
            };
        } else {
            return {
                name: '',
                area_Id: '',
                province_Id: '',
            };
        }
    };

    const validationSchema = Yup.object({
        name: Yup.string('Nhập Quận/Huyện').required('Vui Lòng Nhập Quận/Huyện'),
        area_Id: Yup.string().required('Vui Lòng Chọn Vùng Miền'),
        province_Id: Yup.string().required('Vui Lòng Chọn Tỉnh/Thành'),
    });

    const formik = useFormik({
        enableReinitialize: true,
        validationSchema: validationSchema,
        initialValues: objectDistrict(),
        onSubmit: (values) => {
            const submit = async () => {
                try {
                    if (editDistrict._id) {
                        setLoading(true);
                        const result = await districtsApi.editDistrict(values, editDistrict._id);
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
                            setEditDistrict({});
                            getDistricts();
                            setLoading(false);
                        }
                    } else {
                        setLoading(true);
                        const result = await districtsApi.addDistrict(values);
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
                            setEditDistrict({});
                            getDistricts();
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
                Tạo quận/huyện
            </button>
            <SearchByCate type="district" onSearch={handleSearchDistricts} />
            <PaginationOutlined count={totalPage.pageSearch} onClick={handlePagination} />
            <DialogDistrict
                formik={formik}
                open={openCreate || openEdit}
                onHandleCloseDialog={handleCloseDialog}
                areas={newAreas}
                provinces={newProvinces}
                handleSelectArea={handleSelectArea}
                handleSelectProvince={handleSelectProvince}
                editDistrict={editDistrict}
                textTitle={['Tạo Quận/Huyên', 'Cập nhật Quận/Huyện']}
            />
            <TableDistrict
                districts={districts.districtsSearch}
                onHandleOpenDialog={handleOpenDialog}
                onHandleDeleteDistrict={handleDeleteDistrict}
            />
        </div>
    );
}

export default District;
