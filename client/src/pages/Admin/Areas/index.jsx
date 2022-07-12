import React, { useEffect, useState } from 'react';
import DialogOneField from '~/components/Form/Dialog/DialogOneField/DialogOneField';
import { useFormik } from 'formik';
import TableTwoColumn from '~/components/Tables/TableTwoColumn';
import areasApi from '~/api/areasApi';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import PaginationOutlined from '~/components/Pagination';
import SearchByCate from '~/components/SearchByCate';
import classnames from 'classnames/bind';
import styles from './Areas.module.scss';

const cx = classnames.bind(styles);

function Areas() {
    const [editArea, setEditArea] = useState({});
    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const DeleteSwal = withReactContent(Swal);

    const [totalPage, setTotalPage] = useState({
        pageAll: 1,
        pageSearch: 1,
    });
    const [areas, setAreas] = useState({
        areasAll: [],
        areasSearch: [],
    });
    const [currentPage, setCurrentPage] = useState(1);

    const getAreas = async () => {
        try {
            const result = await areasApi.getAll(currentPage);
            setTotalPage({ ...totalPage, pageAll: result.totalPage, pageSearch: result.totalPage });
            setAreas({ ...areas, areasAll: result.areas, areasSearch: result.areas });
        } catch (err) {
            console.log('Err: ', err);
        }
    };

    const handlePagination = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        const callApi = async () => {
            await getAreas();
        };
        callApi();
    }, [currentPage]);

    const handleOpenDialog = (area) => {
        if (area._id) {
            setEditArea(area);
            setOpenEdit(true);
        } else {
            setOpenCreate(true);
        }
    };

    const handleCloseDialog = () => {
        setOpenCreate(false);
        setOpenEdit(false);
    };

    const handleDeleteArea = (area) => {
        DeleteSwal.fire({
            title: 'Bạn muốn xóa vùng miền này?',
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
                    const result = await areasApi.deleteArea(area._id);
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
                            title: 'Vùng Miền Đã Được Xóa',
                            customClass: {
                                popup: `${cx('popup')}`,
                            },
                        });
                        getAreas();
                    }
                } catch (err) {
                    throw Error(err);
                }
            }
        });
    };

    const handleSearchAreas = (data) => {
        if (Object.keys(data).length !== 0) {
            setAreas({ ...areas, areasSearch: data.data });
            setTotalPage({ ...totalPage, pageSearch: data.totalPage });
        } else {
            setAreas({ ...areas, areasSearch: areas.areasAll });
            setTotalPage({ ...totalPage, pageSearch: totalPage.pageAll });
        }
    };

    const objectArea = () => {
        if (Object.keys(editArea).length !== 0) {
            return {
                id: editArea._id,
                name: editArea.Name,
            };
        } else {
            return {
                name: '',
            };
        }
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: objectArea(),
        onSubmit: (values) => {
            const submit = async () => {
                try {
                    if (Object.keys(editArea).length !== 0) {
                        await areasApi.editArea(values, editArea._id);
                    } else {
                        await areasApi.addArea(values);
                    }
                    formik.setFieldValue('name', '');
                    setOpenCreate(false);
                    setOpenEdit(false);
                    getAreas();
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
                Tạo vùng miền
            </button>
            <SearchByCate type="area" onSearch={handleSearchAreas} />
            <PaginationOutlined count={totalPage.pageSearch} onClick={handlePagination} />
            <DialogOneField
                formik={formik}
                open={openCreate || openEdit}
                onHandleCloseDialog={handleCloseDialog}
                edit={editArea}
                textTitle={['Tạo vùng miền', 'Cập nhật vùng miền']}
                placeholder="Tên vùng miền"
            />
            <TableTwoColumn
                data={areas.areasSearch}
                onHandleOpenDialog={handleOpenDialog}
                onHandleDelete={handleDeleteArea}
                title={['Vùng miền', 'Chức năng']}
            />
        </div>
    );
}

export default Areas;
