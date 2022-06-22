import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './SaleCodes.module.scss';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import saleCodesApi from '~/api/saleCodesApi';
import DialogSaleCode from '~/components/Form/Dialog/DialogSaleCode/DialogSaleCode';
import TableSaleCode from '~/components/Tables/TableSaleCode/TableSaleCode';
import PaginationOutlined from '~/components/Pagination';
import SearchByCate from '~/components/SearchByCate';

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
        }
    };

    const handleCloseDialog = () => {
        setOpenCreate(false);
        setOpenEdit(false);
    };

    const handleDeleteSaleCode = (code) => {
        DeleteSwal.fire({
            title: 'Bạn muốn xóa mã khuyến mãi này?',
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
                    const result = await saleCodesApi.deleteSaleCode(code._id);
                    if (result.exist) {
                        DeleteSwal.fire({
                            title: 'Mã Khuyến Mãi Đang Được Sử Dụng',
                            customClass: {
                                popup: `${clsx(styles.popup)}`,
                            },
                        });
                    } else {
                        DeleteSwal.fire({
                            title: 'Mã Khuyến Mãi Đã Được Xóa',
                            customClass: {
                                popup: `${clsx(styles.popup)}`,
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

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: objectSaleCode(),
        onSubmit: (values) => {
            const submit = async () => {
                try {
                    if (editSaleCode._id) {
                        await saleCodesApi.editSaleCode(values, editSaleCode._id);
                    } else {
                        await saleCodesApi.addSaleCode(values);
                    }
                    formik.setFieldValue('name', '');
                    formik.setFieldValue('sale', 0);
                    setOpenCreate(false);
                    setOpenEdit(false);
                    setEditSaleCode({});
                    getSaleCodes();
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
                Tạo mã khuyến mãi
            </button>
            <SearchByCate type="saleCode" onSearch={handleSearchSaleCodes} />
            <PaginationOutlined count={totalPage.pageSearch} onClick={handlePagination} />
            <DialogSaleCode
                formik={formik}
                open={openCreate || openEdit}
                onHandleCloseDialog={handleCloseDialog}
                edit={editSaleCode}
                textTitle={['Tạo mã khuyến mãi', 'Cập nhật mã khuyến mãi']}
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
