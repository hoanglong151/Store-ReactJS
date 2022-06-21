import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import styles from './BillStatus.module.scss';
import DialogOneField from '~/components/Form/Dialog/DialogOneField/DialogOneField';
import { useFormik } from 'formik';
import TableTwoColumn from '~/components/Tables/TableTwoColumn/TableTwoColumn';
import billStatusApi from '~/api/billStatusApi';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import PaginationOutlined from '~/components/Pagination';

function BillStatus() {
    const [billStatus, setBillStatus] = useState([]);
    const [editBillStatus, setEditBillStatus] = useState({});
    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const DeleteSwal = withReactContent(Swal);

    const [totalPage, setTotalPage] = useState();
    const [currentPage, setCurrentPage] = useState(1);

    const getBillStatus = async () => {
        try {
            const result = await billStatusApi.getAll(currentPage);
            setTotalPage(result.totalPage);
            setBillStatus(result.billStatus);
        } catch (err) {
            console.log('Err: ', err);
        }
    };

    const handlePagination = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        getBillStatus();
    }, [currentPage]);

    const handleOpenDialog = (status) => {
        if (status._id) {
            setEditBillStatus(status);
            setOpenEdit(true);
        } else {
            setOpenCreate(true);
        }
    };

    const handleCloseDialog = () => {
        setOpenCreate(false);
        setOpenEdit(false);
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
                popup: `${clsx(styles.popup)}`,
            },
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const result = await billStatusApi.deleteBillStatus(status._id);
                    if (result.exist) {
                        DeleteSwal.fire({
                            title: 'Tình Trạng Đang Được Sử Dụng',
                            customClass: {
                                popup: `${clsx(styles.popup)}`,
                            },
                        });
                    } else {
                        DeleteSwal.fire({
                            title: 'Tình Trạng Đã Được Xóa',
                            customClass: {
                                popup: `${clsx(styles.popup)}`,
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

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: objectBillStatus(),
        onSubmit: (values) => {
            const submit = async () => {
                try {
                    if (Object.keys(editBillStatus).length !== 0) {
                        await billStatusApi.editBillStatus(values, editBillStatus._id);
                    } else {
                        await billStatusApi.addBillStatus(values);
                    }
                    formik.setFieldValue('name', '');
                    setOpenCreate(false);
                    setOpenEdit(false);
                    setEditBillStatus({});
                    getBillStatus();
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
                Tạo tình trạng
            </button>
            <PaginationOutlined count={totalPage} onClick={handlePagination} />
            <DialogOneField
                formik={formik}
                open={openCreate || openEdit}
                onHandleCloseDialog={handleCloseDialog}
                edit={editBillStatus}
                textTitle={['Tạo tình trạng', 'Cập nhật tình trạng']}
                placeholder="Tình trạng"
            />
            <TableTwoColumn
                data={billStatus}
                onHandleOpenDialog={handleOpenDialog}
                title={['Tình trạng', 'Chức năng']}
                onHandleDelete={handleDeleteBillStatus}
            />
        </div>
    );
}

export default BillStatus;
