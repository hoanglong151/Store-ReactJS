import React, { useEffect, useMemo, useState } from 'react';
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
            const convertSelect = province.Areas.map((area) => {
                return {
                    value: area._id,
                    label: area.Name,
                };
            });
            const getProvinceID = province.Areas.map((area) => {
                return area._id;
            });
            formik.setFieldValue('area_Id', getProvinceID);
            setEditProvince({ ...province, Areas: convertSelect });
            setOpenEdit(true);
        } else {
            setOpenCreate(true);
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
                    if (result.exist) {
                        DeleteSwal.fire({
                            title: 'Tỉnh/Thành Đang Được Sử Dụng',
                            customClass: {
                                popup: `${cx('popup')}`,
                            },
                        });
                    } else {
                        DeleteSwal.fire({
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

    const handleSelectArea = (options) => {
        const optionList = options.map((option, index) => {
            return option.value;
        });
        setEditProvince({ ...editProvince, Areas: options });
        formik.setFieldValue('area_Id', optionList);
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
            };
        } else {
            return {
                name: '',
                area_Id: [],
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
                        await provincesApi.editProvince(values, editProvince._id);
                    } else {
                        await provincesApi.addProvince(values);
                    }
                    formik.setFieldValue('name', '');
                    setOpenCreate(false);
                    setOpenEdit(false);
                    setEditProvince({});
                    getProvinces();
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
