import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import withReactContent from 'sweetalert2-react-content';
import { ToastContainer, toast } from 'react-toastify';
import saleCodesApi from '~/api/saleCodesApi';
import DialogSaleCode from '~/components/Form/Dialog/DialogSaleCode/DialogSaleCode';
import TableSaleCode from '~/components/Tables/TableSaleCode';
import PaginationOutlined from '~/components/Pagination';
import SearchByCate from '~/components/SearchByCate';
import classnames from 'classnames/bind';
import styles from './SaleCodes.module.scss';

const cx = classnames.bind(styles);

function SaleCodes() {
    const [editSaleCode, setEditSaleCode] = useState({});
    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const DeleteSwal = withReactContent(Swal);

    const [totalPage, setTotalPage] = useState({
        pageAll: 1,
        pageSearch: 1,
    });
    const [saleCodes, setSaleCodes] = useState({
        saleCodesAll: [],
        saleCodesSearch: [],
    });
    const [currentPage, setCurrentPage] = useState(1);

    const getSaleCodes = async () => {
        try {
            const result = await saleCodesApi.getAll(currentPage);
            setTotalPage({ ...totalPage, pageAll: result.totalPage, pageSearch: result.totalPage });
            setSaleCodes({ ...saleCodes, saleCodesAll: result.saleCodes, saleCodesSearch: result.saleCodes });
        } catch (err) {
            console.log('Err: ', err);
        }
    };

    const handlePagination = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        getSaleCodes();
    }, [currentPage]);

    const handleOpenDialog = (saleCode) => {
        if (saleCode._id) {
            setEditSaleCode(saleCode);
            setOpenEdit(true);
        } else {
            setOpenCreate(true);
            setEditSaleCode({});
        }
    };

    const handleCloseDialog = () => {
        setOpenCreate(false);
        setOpenEdit(false);
    };

    const handleDeleteSaleCode = (code) => {
        DeleteSwal.fire({
            title: 'B???n mu???n x??a m?? khuy???n m??i n??y?',
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
                    const result = await saleCodesApi.deleteSaleCode(code._id);
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
                            title: 'M?? Khuy???n M??i ???? ???????c X??a',
                            customClass: {
                                popup: `${cx('popup')}`,
                            },
                        });
                        getSaleCodes();
                    }
                } catch (err) {
                    throw Error(err);
                }
            }
        });
    };

    const handleSearchSaleCodes = (data) => {
        if (Object.keys(data).length !== 0) {
            setSaleCodes({ ...saleCodes, saleCodesSearch: data.data });
            setTotalPage({ ...totalPage, pageSearch: data.totalPage });
        } else {
            setSaleCodes({ ...saleCodes, saleCodesSearch: saleCodes.saleCodesAll });
            setTotalPage({ ...totalPage, pageSearch: totalPage.pageAll });
        }
    };

    const objectSaleCode = () => {
        if (editSaleCode._id) {
            return {
                id: editSaleCode._id,
                name: editSaleCode.Name,
                sale: editSaleCode.Sale,
            };
        } else {
            return {
                name: '',
                sale: 0,
            };
        }
    };

    const validationSchema = Yup.object({
        name: Yup.string('Nh???p M?? Khuy???n M??i').required('Vui L??ng Nh???p M?? Khuy???n M??i'),
        sale: Yup.number().min(1000, 'Khuy???n M??i T???i Thi???u 1000 Ngh??n').required('Gi?? Tr??? T???i Thi???u 1000??'),
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: objectSaleCode(),
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const submit = async () => {
                try {
                    if (editSaleCode._id) {
                        const result = await saleCodesApi.editSaleCode(values, editSaleCode._id);
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
                            formik.setFieldValue('sale', 0);
                            setOpenCreate(false);
                            setOpenEdit(false);
                            setEditSaleCode({});
                            getSaleCodes();
                        }
                    } else {
                        const result = await saleCodesApi.addSaleCode(values);
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
                            formik.setFieldValue('sale', 0);
                            setOpenCreate(false);
                            setOpenEdit(false);
                            setEditSaleCode({});
                            getSaleCodes();
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
                T???o m?? khuy???n m??i
            </button>
            <SearchByCate type="saleCode" onSearch={handleSearchSaleCodes} />
            <PaginationOutlined count={totalPage.pageSearch} onClick={handlePagination} />
            <DialogSaleCode
                formik={formik}
                open={openCreate || openEdit}
                onHandleCloseDialog={handleCloseDialog}
                edit={editSaleCode}
            />
            <TableSaleCode
                data={saleCodes.saleCodesSearch}
                onHandleOpenDialog={handleOpenDialog}
                onHandleDelete={handleDeleteSaleCode}
            />
        </div>
    );
}

export default SaleCodes;
