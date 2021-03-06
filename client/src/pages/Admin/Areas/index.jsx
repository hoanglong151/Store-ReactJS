import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import DialogOneField from '~/components/Form/Dialog/DialogOneField/DialogOneField';
import { useFormik } from 'formik';
import TableTwoColumn from '~/components/Tables/TableTwoColumn';
import areasApi from '~/api/areasApi';
import * as Yup from 'yup';
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
            setEditArea({});
        }
    };

    const handleCloseDialog = () => {
        setOpenCreate(false);
        setOpenEdit(false);
    };

    const handleDeleteArea = (area) => {
        DeleteSwal.fire({
            title: 'B???n mu???n x??a v??ng mi???n n??y?',
            icon: 'error',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '?????ng ??',
            cancelButtonText: 'H???y',
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
                            title: 'V??ng Mi???n ???? ???????c X??a',
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

    const validationSchema = Yup.object({
        name: Yup.string('Nh???p V??ng Mi???n').required('Vui L??ng Nh???p V??ng Mi???n'),
    });

    const formik = useFormik({
        enableReinitialize: true,
        validationSchema: validationSchema,
        initialValues: objectArea(),
        onSubmit: (values) => {
            const submit = async () => {
                try {
                    if (Object.keys(editArea).length !== 0) {
                        const result = await areasApi.editArea(values, editArea._id);
                        if (result.Exist) {
                            toast.error(`???? ${result.Exist}`, {
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
                            getAreas();
                        }
                    } else {
                        const result = await areasApi.addArea(values);
                        if (result.Exist) {
                            toast.error(`???? ${result.Exist}`, {
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
                            getAreas();
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
                T???o v??ng mi???n
            </button>
            <SearchByCate type="area" onSearch={handleSearchAreas} />
            <PaginationOutlined count={totalPage.pageSearch} onClick={handlePagination} />
            <DialogOneField
                formik={formik}
                open={openCreate || openEdit}
                onHandleCloseDialog={handleCloseDialog}
                edit={editArea}
                textTitle={['T???o v??ng mi???n', 'C???p nh???t v??ng mi???n']}
                placeholder="T??n v??ng mi???n"
            />
            <TableTwoColumn
                data={areas.areasSearch}
                onHandleOpenDialog={handleOpenDialog}
                onHandleDelete={handleDeleteArea}
                title={['V??ng mi???n', 'Ch???c n??ng']}
            />
        </div>
    );
}

export default Areas;
