import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import firmsApi from '~/api/firmsApi';
import TableFirm from '~/components/Tables/TableFirm';
import DialogFirm from '~/components/Form/Dialog/DialogFirm/DialogFirm';
import PaginationOutlined from '~/components/Pagination';
import SearchByCate from '~/components/SearchByCate';
import classnames from 'classnames/bind';
import styles from './Firms.module.scss';

const cx = classnames.bind(styles);

function Firms() {
    const [openPopupCreate, setOpenPopupCreate] = useState(false);
    const [openPopupEdit, setOpenPopupEdit] = useState(false);
    const [editFirmPopup, setEditFirmPopup] = useState({});
    const DeleteSwal = withReactContent(Swal);

    const [totalPage, setTotalPage] = useState({
        pageAll: 1,
        pageSearch: 1,
    });
    const [firms, setFirms] = useState({
        firmsAll: [],
        firmsSearch: [],
    });
    const [currentPage, setCurrentPage] = useState(1);

    const getFirms = async () => {
        try {
            const result = await firmsApi.getAll(currentPage);
            setTotalPage({ ...totalPage, pageAll: result.totalPage, pageSearch: result.totalPage });
            setFirms({ ...firms, firmsAll: result.firms, firmsSearch: result.firms });
        } catch (err) {
            console.log('Err: ', err);
        }
    };

    const handlePagination = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        getFirms();
    }, [currentPage]);

    const handleOpenPopup = (firm) => {
        if (firm._id) {
            setOpenPopupEdit(true);
            setEditFirmPopup(firm);
        } else {
            setOpenPopupCreate(true);
            setEditFirmPopup({});
        }
    };

    const handleClosePopup = (e) => {
        setOpenPopupCreate(false);
        setOpenPopupEdit(false);
    };

    const handleSearchFirms = (data) => {
        if (Object.keys(data).length !== 0) {
            setFirms({ ...firms, firmsSearch: data.data });
            setTotalPage({ ...totalPage, pageSearch: data.totalPage });
        } else {
            setFirms({ ...firms, firmsSearch: firms.firmsAll });
            setTotalPage({ ...totalPage, pageSearch: totalPage.pageAll });
        }
    };

    const handleDeleteFirm = (firm) => {
        DeleteSwal.fire({
            title: 'Bạn muốn xóa hãng này?',
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
                    const result = await firmsApi.deleteFirm(firm._id);
                    if (result.exist) {
                        DeleteSwal.fire({
                            title: 'Hãng Đang Được Sử Dụng',
                            customClass: {
                                popup: `${cx('popup')}`,
                            },
                        });
                    } else {
                        DeleteSwal.fire({
                            title: 'Hãng Đã Được Xóa',
                            customClass: {
                                popup: `${cx('popup')}`,
                            },
                        });
                        getFirms();
                    }
                } catch (err) {
                    throw Error(err);
                }
            }
        });
    };

    const initialValues = () => {
        if (Object.keys(editFirmPopup).length !== 0) {
            return {
                _id: editFirmPopup._id,
                name: editFirmPopup.Name,
            };
        } else {
            return {
                name: '',
            };
        }
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues(),
        onSubmit: (values) => {
            const submit = async () => {
                try {
                    if (Object.keys(editFirmPopup).length !== 0) {
                        await firmsApi.editFirm(values, editFirmPopup._id);
                    } else {
                        await firmsApi.addFirm(values);
                    }
                    formik.setFieldValue('name', '');
                    setOpenPopupCreate(false);
                    setOpenPopupEdit(false);
                    getFirms();
                } catch (err) {
                    throw err;
                }
            };
            submit();
        },
    });

    return (
        <div>
            <button onClick={handleOpenPopup} className={cx('create-btn')}>
                Tạo Hãng
            </button>
            <SearchByCate type="firm" onSearch={handleSearchFirms} />
            <PaginationOutlined count={totalPage.pageSearch} onClick={handlePagination} />
            <DialogFirm
                formik={formik}
                handleClose={handleClosePopup}
                open={openPopupCreate || openPopupEdit}
                editFirmPopup={editFirmPopup}
            />
            <TableFirm
                titles={['Name', 'Action']}
                firms={firms.firmsSearch}
                handleOpenPopup={handleOpenPopup}
                handleDeleteFirm={handleDeleteFirm}
            />
        </div>
    );
}

export default Firms;
