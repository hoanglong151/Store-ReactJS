import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import DialogOneField from '~/components/Form/Dialog/DialogOneField/DialogOneField';
import { useFormik } from 'formik';
import TableTwoColumn from '~/components/Tables/TableTwoColumn';
import billStatusApi from '~/api/billStatusApi';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import withReactContent from 'sweetalert2-react-content';
import PaginationOutlined from '~/components/Pagination';
import SearchByCate from '~/components/SearchByCate';
import classnames from 'classnames/bind';
import styles from './BillStatus.module.scss';

const cx = classnames.bind(styles);

function BillStatus() {
    const [editBillStatus, setEditBillStatus] = useState({});
    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const DeleteSwal = withReactContent(Swal);

    const [totalPage, setTotalPage] = useState({
        pageAll: 1,
        pageSearch: 1,
    });
    const [billStatus, setBillStatus] = useState({
        billStatusAll: [],
        billStatusSearch: [],
    });
    const [currentPage, setCurrentPage] = useState(1);

    const getBillStatus = async () => {
        try {
            const result = await billStatusApi.getAll(currentPage);
            setTotalPage({ ...totalPage, pageAll: result.totalPage, pageSearch: result.pageSearch });
            setBillStatus({ ...billStatus, billStatusAll: result.billStatus, billStatusSearch: result.billStatus });
        } catch (err) {
            console.log('Err: ', err);
        }
    };

    const handlePagination = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        const callApi = async () => {
            await getBillStatus();
        };
        callApi();
    }, [currentPage]);

    const handleOpenDialog = (status) => {
        if (status._id) {
            setEditBillStatus(status);
            setOpenEdit(true);
        } else {
            setOpenCreate(true);
            setEditBillStatus({});
        }
    };

    const handleCloseDialog = () => {
        setOpenCreate(false);
        setOpenEdit(false);
    };

    const handleSearchBillStatus = (data) => {
        if (Object.keys(data).length !== 0) {
            setBillStatus({ ...billStatus, billStatusSearch: data.data });
            setTotalPage({ ...totalPage, pageSearch: data.totalPage });
        } else {
            setBillStatus({ ...billStatus, billStatusSearch: billStatus.billStatusAll });
            setTotalPage({ ...totalPage, pageSearch: totalPage.pageAll });
        }
    };

    const handleDeleteBillStatus = (status) => {
        DeleteSwal.fire({
            title: 'Bạn muốn xóa tình trạng này?',
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
                    const result = await billStatusApi.deleteBillStatus(status._id);
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
                            title: 'Tình Trạng Đã Được Xóa',
                            customClass: {
                                popup: `${cx('popup')}`,
                            },
                        });
                        getBillStatus();
                    }
                } catch (err) {
                    throw Error(err);
                }
            }
        });
    };

    const objectBillStatus = () => {
        if (Object.keys(editBillStatus).length !== 0) {
            return {
                id: editBillStatus._id,
                name: editBillStatus.Name,
            };
        } else {
            return {
                name: '',
            };
        }
    };

    const validationSchema = Yup.object({
        name: Yup.string('Nhập Tên Tình Trạng').required('Vui Lòng Nhập Tên Tình Trạng'),
    });

    const formik = useFormik({
        enableReinitialize: true,
        validationSchema: validationSchema,
        initialValues: objectBillStatus(),
        onSubmit: (values) => {
            const submit = async () => {
                try {
                    if (Object.keys(editBillStatus).length !== 0) {
                        const result = await billStatusApi.editBillStatus(values, editBillStatus._id);
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
                            setEditBillStatus({});
                            getBillStatus();
                        }
                    } else {
                        const result = await billStatusApi.addBillStatus(values);
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
                            setEditBillStatus({});
                            getBillStatus();
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
                Tạo tình trạng
            </button>
            <SearchByCate type="billStatus" onSearch={handleSearchBillStatus} />
            <PaginationOutlined count={totalPage.pageSearch} onClick={handlePagination} />
            <DialogOneField
                formik={formik}
                open={openCreate || openEdit}
                onHandleCloseDialog={handleCloseDialog}
                edit={editBillStatus}
                textTitle={['Tạo tình trạng', 'Cập nhật tình trạng']}
                placeholder="Tình trạng"
            />
            <TableTwoColumn
                data={billStatus.billStatusSearch}
                onHandleOpenDialog={handleOpenDialog}
                title={['Tình trạng', 'Chức năng']}
                onHandleDelete={handleDeleteBillStatus}
            />
        </div>
    );
}

export default BillStatus;
