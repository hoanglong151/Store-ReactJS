import React, { useEffect, useMemo, useState } from 'react';
import DialogDistrict from '~/components/Form/Dialog/DialogDistrict/DialogDistrict';
import { useFormik } from 'formik';
import districtsApi from '~/api/districtsApi';
import provincesApi from '~/api/provincesApi';
import areasApi from '~/api/areasApi';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import TableDistrict from '~/components/Tables/TableDistrict';
import PaginationOutlined from '~/components/Pagination';
import SearchByCate from '~/components/SearchByCate';
import classnames from 'classnames/bind';
import styles from './Districts.module.scss';

const cx = classnames.bind(styles);

function District() {
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
            const convertSelectArea = district.Areas.map((area) => {
                return {
                    value: area._id,
                    label: area.Name,
                };
            });
            const getProvinceIDArea = district.Areas.map((area) => {
                return area._id;
            });
            const convertSelectProvince = district.Provinces.map((province) => {
                return {
                    value: province._id,
                    label: province.Name,
                };
            });
            const getProvinceIDProvince = district.Provinces.map((province) => {
                return province._id;
            });
            formik.setFieldValue('area_Id', getProvinceIDArea);
            formik.setFieldValue('province_Id', getProvinceIDProvince);
            setEditDistrict({ ...district, Areas: convertSelectArea, Provinces: convertSelectProvince });
            setOpenEdit(true);
        } else {
            setOpenCreate(true);
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
                    const result = await districtsApi.deleteDistrict(district._id);
                    if (result.exist) {
                        DeleteSwal.fire({
                            title: 'Quận/Huyện Đang Được Sử Dụng',
                            customClass: {
                                popup: `${cx('popup')}`,
                            },
                        });
                    } else {
                        DeleteSwal.fire({
                            title: 'Quận/Huyện Đã Được Xóa',
                            customClass: {
                                popup: `${cx('popup')}`,
                            },
                        });
                        getDistricts();
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
        setEditDistrict({ ...editDistrict, Areas: options });
        formik.setFieldValue('area_Id', optionList);
    };

    const handleSelectProvince = (options) => {
        const optionList = options.map((option, index) => {
            return option.value;
        });
        setEditDistrict({ ...editDistrict, Provinces: options });
        formik.setFieldValue('province_Id', optionList);
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
            };
        } else {
            return {
                name: '',
                area_Id: [],
                province_Id: [],
            };
        }
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: objectDistrict(),
        onSubmit: (values) => {
            const submit = async () => {
                try {
                    if (editDistrict._id) {
                        await districtsApi.editDistrict(values, editDistrict._id);
                    } else {
                        await districtsApi.addDistrict(values);
                    }
                    formik.setFieldValue('name', '');
                    setOpenCreate(false);
                    setOpenEdit(false);
                    setEditDistrict({});
                    getDistricts();
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