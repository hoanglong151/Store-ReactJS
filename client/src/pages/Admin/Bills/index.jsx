import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import TableBill from '~/components/Tables/TableBill';
import billsApi from '~/api/billsApi';
import billStatusApi from '~/api/billStatusApi';
import { detailBillsApi } from '~/api';
import PaginationOutlined from '~/components/Pagination';
import SearchByCate from '~/components/SearchByCate';
import classnames from 'classnames/bind';
import styles from './Bills.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDetailBills } from '~/app/reducerDetailBill';
import * as XLSX from 'xlsx/xlsx.mjs';
import Input from '~/components/Form/Input/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const cx = classnames.bind(styles);

function Bills() {
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [billsByStatus, setBillsByStatus] = useState([]);
    const [billStatus, setBillStatus] = useState([]);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [convertBillStatusGet, setConvertBillStatusGet] = useState();
    const [editBill, setEditBill] = useState({});
    const { detailBills } = useSelector((state) => state.detailBill);
    const dispatch = useDispatch();

    const UpdateSwal = withReactContent(Swal);

    const [totalPage, setTotalPage] = useState({
        pageAll: 1,
        pageSearch: 1,
    });
    const [bills, setBills] = useState({
        billsAll: [],
        billsSearch: [],
    });
    const [currentPage, setCurrentPage] = useState(1);

    const getBills = async () => {
        try {
            const result = await billsApi.getAll(currentPage);
            setTotalPage({ ...totalPage, pageAll: result.totalPage, pageSearch: result.totalPage });
            setBills({ ...bills, billsAll: result.bills, billsSearch: result.bills });
        } catch (err) {
            console.log('Err: ', err);
        }
    };

    const handlePagination = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        const callApi = async () => {
            await getBills();
        };

        const getAllBillStatus = async () => {
            const getBillStatus = await billStatusApi.getAll();
            const convertStatus = getBillStatus.billStatus.map((status) => {
                return {
                    value: status._id,
                    label: status.Name,
                };
            });
            setBillStatus(convertStatus);
        };
        callApi();
        getAllBillStatus();
    }, [openDialog, currentPage, detailBills]);

    const handleSelectStatus = (status) => {
        setConvertBillStatusGet(status);
    };

    const handleEditBill = (bill, row) => {
        setOpenDialog(true);
        setEditBill({ bill: bill, customer: row });
        setConvertBillStatusGet({ value: bill.BillStatus._id, label: bill.BillStatus.Name });
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleUpdateStatusBill = async () => {
        const result = await detailBillsApi.updateBillStatus({
            billID: editBill.bill._id,
            statusBill: convertBillStatusGet,
        });
        dispatch(fetchDetailBills());
        if (result) {
            setOpenDialog(false);
            UpdateSwal.fire({
                position: 'center',
                icon: 'success',
                title: 'C???p nh???t th??nh c??ng',
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    const handleFilterByStatus = (status) => {
        const getBillByStatus = bills.billsSearch.map((bill) => {
            const getItemByBill = bill.DetailBills.filter((item) => {
                return item.BillStatus._id === status._id;
            });
            const newBill = {
                ...bill,
                DetailBills: getItemByBill,
            };
            return newBill;
        });

        setBillsByStatus(getBillByStatus);
    };

    const handleAllBills = () => {
        setBillsByStatus([]);
    };

    const handleSearchBills = (data) => {
        if (Object.keys(data).length !== 0) {
            setBills({ ...bills, billsSearch: data.data });
            setTotalPage({ ...totalPage, pageSearch: data.totalPage });
        } else {
            setBills({ ...bills, billsSearch: bills.billsAll });
            setTotalPage({ ...totalPage, pageSearch: totalPage.pageAll });
        }
    };

    const handleExportExcelBill = () => {
        let arrBill = [];
        let ws;
        let wb = XLSX.utils.book_new();
        if (billsByStatus.length === 0) {
            const newData = bills.billsSearch
                .map((bill) => {
                    if (bill.DetailBills.length !== 0) {
                        return bill.DetailBills.map((detailBill) => {
                            return {
                                'M?? Kh??ch H??ng': bill._id,
                                'T??n Kh??ch H??ng': bill.Name,
                                'S??? ??i???n Tho???i': bill.Phone,
                                'M?? H??a ????n': detailBill._id,
                                'T???ng Ti???n': new Intl.NumberFormat('DE-de').format(detailBill.Cart.totalPrice),
                                'Khuy???n M??i': detailBill.Cart.saleCode?.Sale || 0,
                                'Th??nh Ti???n': new Intl.NumberFormat('DE-de').format(detailBill.Cart.totalPriceSale),
                            };
                        });
                    }
                })
                .filter((item) => item !== undefined);
            newData.forEach((item) => {
                arrBill.push(...item);
            });
            if (arrBill.length !== 0) {
                ws = XLSX.utils.json_to_sheet(arrBill, {
                    origin: 'A5',
                    header: [
                        'M?? Kh??ch H??ng',
                        'T??n Kh??ch H??ng',
                        'S??? ??i???n Tho???i',
                        'M?? H??a ????n',
                        'T???ng Ti???n',
                        'Khuy???n M??i',
                        'Th??nh Ti???n',
                    ],
                });
                console.log(arrBill);
                const widthCodeCustomer = arrBill.reduce((w, r) => Math.max(w, r['M?? Kh??ch H??ng'].length), 15);
                const widthNameCustomer = arrBill.reduce((w, r) => Math.max(w, r['T??n Kh??ch H??ng'].length), 15);
                const widthPhoneCustomer = arrBill.reduce((w, r) => Math.max(w, r['S??? ??i???n Tho???i'].length), 15);
                const widthCodeBill = arrBill.reduce((w, r) => Math.max(w, r['M?? H??a ????n'].length), 15);
                const widthTotalPrice = arrBill.reduce((w, r) => Math.max(w, r['T???ng Ti???n'].length), 12);
                const widthSaleTotalPrice = arrBill.reduce((w, r) => Math.max(w, r['Th??nh Ti???n'].length), 12);
                ws['!cols'] = [
                    { wch: widthCodeCustomer },
                    { wch: widthNameCustomer },
                    { wch: widthPhoneCustomer },
                    { wch: widthCodeBill },
                    { wch: widthTotalPrice },
                    { wch: 11 },
                    { wch: widthSaleTotalPrice },
                ];
                XLSX.utils.sheet_add_aoa(ws, [['Th???ng K?? H??a ????n']], { origin: 'C1' });

                if (startDate && endDate) {
                    XLSX.utils.sheet_add_aoa(ws, [[`T??? Ng??y: ${startDate}`, '-', `?????n Ng??y: ${endDate}`]], {
                        origin: 'B3',
                    });
                } else if (startDate) {
                    XLSX.utils.sheet_add_aoa(ws, [[`T??? Ng??y: ${startDate}`]], {
                        origin: 'C3',
                    });
                } else {
                    XLSX.utils.sheet_add_aoa(ws, [[`?????n Ng??y: ${endDate || new Date().toLocaleDateString('en-US')}`]], {
                        origin: 'C3',
                    });
                }
                XLSX.utils.book_append_sheet(wb, ws, 'MySheet1');
                XLSX.writeFile(wb, 'Bill.xlsx');
            }
        } else {
            const newData = billsByStatus
                .map((bill) => {
                    if (bill.DetailBills.length !== 0) {
                        return bill.DetailBills.map((detailBill) => {
                            return {
                                'M?? Kh??ch H??ng': bill._id,
                                'T??n Kh??ch H??ng': bill.Name,
                                'S??? ??i???n Tho???i': bill.Phone,
                                'M?? H??a ????n': detailBill._id,
                                'T???ng Ti???n': new Intl.NumberFormat('DE-de').format(detailBill.Cart.totalPrice),
                                'Khuy???n M??i': detailBill.Cart.saleCode?.Sale || 0,
                                'Th??nh Ti???n': new Intl.NumberFormat('DE-de').format(detailBill.Cart.totalPriceSale),
                            };
                        });
                    }
                })
                .filter((item) => item !== undefined);
            newData.forEach((item) => {
                arrBill.push(...item);
            });
            if (arrBill.length !== 0) {
                ws = XLSX.utils.json_to_sheet(arrBill, {
                    origin: 'A5',
                    header: [
                        'M?? Kh??ch H??ng',
                        'T??n Kh??ch H??ng',
                        'S??? ??i???n Tho???i',
                        'M?? H??a ????n',
                        'T???ng Ti???n',
                        'Khuy???n M??i',
                        'Th??nh Ti???n',
                    ],
                });

                const widthCodeCustomer = arrBill.reduce((w, r) => Math.max(w, r['M?? Kh??ch H??ng'].length), 15);
                const widthNameCustomer = arrBill.reduce((w, r) => Math.max(w, r['T??n Kh??ch H??ng'].length), 15);
                const widthPhoneCustomer = arrBill.reduce((w, r) => Math.max(w, r['S??? ??i???n Tho???i'].length), 15);
                const widthCodeBill = arrBill.reduce((w, r) => Math.max(w, r['M?? H??a ????n'].length), 15);
                const widthTotalPrice = arrBill.reduce((w, r) => Math.max(w, r['T???ng Ti???n'].length), 12);
                const widthSaleTotalPrice = arrBill.reduce((w, r) => Math.max(w, r['Th??nh Ti???n'].length), 12);
                ws['!cols'] = [
                    { wch: widthCodeCustomer },
                    { wch: widthNameCustomer },
                    { wch: widthPhoneCustomer },
                    { wch: widthCodeBill },
                    { wch: widthTotalPrice },
                    { wch: 11 },
                    { wch: widthSaleTotalPrice },
                ];
                XLSX.utils.sheet_add_aoa(ws, [['Th???ng K?? H??a ????n']], { origin: 'C1' });

                if (startDate && endDate) {
                    XLSX.utils.sheet_add_aoa(ws, [[`T??? Ng??y: ${startDate}`, '-', `?????n Ng??y: ${endDate}`]], {
                        origin: 'B3',
                    });
                } else if (startDate) {
                    XLSX.utils.sheet_add_aoa(ws, [[`T??? Ng??y: ${startDate}`]], {
                        origin: 'C3',
                    });
                } else {
                    XLSX.utils.sheet_add_aoa(ws, [[`?????n Ng??y: ${endDate || new Date().toLocaleDateString('en-US')}`]], {
                        origin: 'C3',
                    });
                }
                XLSX.utils.book_append_sheet(wb, ws, 'MySheet1');
                XLSX.writeFile(wb, 'Bill.xlsx');
            }
        }
    };

    const handleStartDate = (e) => {
        setStartDate(e.target.value);
    };

    const handleEndDate = (e) => {
        setEndDate(e.target.value);
    };

    const handleFilterBillByDate = () => {
        const filterBills = bills.billsAll.filter((bill) => {
            if (!startDate && !endDate) {
                alert('Ko nh???p ng??y ????i t??m ????');
            }
            if (
                new Date(bill.CreateAt) >= new Date(startDate) &&
                new Date(bill.CreateAt) <= new Date(endDate).setHours(24)
            ) {
                return bill;
            } else if (new Date(bill.CreateAt) >= new Date(startDate) && !endDate) {
                return bill;
            } else if (!startDate && new Date(bill.CreateAt) <= new Date(endDate).setHours(24)) {
                return bill;
            }
        });
        setBills({ ...bills, billsSearch: filterBills });
        setTotalPage({ ...totalPage, pageSearch: Math.ceil(filterBills.length / 10) });
    };

    return (
        <div>
            <div>
                <SearchByCate type="bill" onSearch={handleSearchBills} />
                <div>
                    <h4>T??m ki???m theo ng??y</h4>
                    <div className={cx('search-bill-by-date')}>
                        <span className={cx('search-date')}>T??? ng??y</span>
                        <Input type="date" onChange={handleStartDate} />
                        <span className={cx('search-date')}>?????n ng??y</span>
                        <Input type="date" onChange={handleEndDate} />
                        <button className={cx('btn-search')} onClick={handleFilterBillByDate}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>
                </div>
                <button className={cx('btn-export-excel')} onClick={handleExportExcelBill}>
                    Export Excel
                </button>
                <PaginationOutlined count={totalPage.pageSearch} onClick={handlePagination} />
                <button className={cx('btn')} onClick={handleAllBills}>
                    T???t c???
                </button>
                {detailBills.map((status, index) => (
                    <button key={status._id} className={cx('btn')} onClick={() => handleFilterByStatus(status)}>
                        {status.status} <span className={cx('number-bill')}>{status.billByStatus.length}</span>
                    </button>
                ))}
            </div>

            <TableBill
                rows={billsByStatus.length !== 0 ? billsByStatus : bills.billsSearch}
                handleEditBill={handleEditBill}
                handleCloseDialog={handleCloseDialog}
                openDialog={openDialog}
                billStatus={billStatus}
                billStatusSelect={convertBillStatusGet}
                handleSelectStatus={handleSelectStatus}
                handleUpdateStatusBill={handleUpdateStatusBill}
            />
        </div>
    );
}

export default Bills;
