import React, { useEffect, useMemo, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import TableBill from '~/components/Tables/TableBill';
import billsApi from '~/api/billsApi';
import billStatusApi from '~/api/billStatusApi';
import PaginationOutlined from '~/components/Pagination';
import SearchByCate from '~/components/SearchByCate';
import classnames from 'classnames/bind';
import styles from './Bills.module.scss';

const cx = classnames.bind(styles);

function Bills() {
    const [billsByStatus, setBillsByStatus] = useState([]);
    const [billStatus, setBillStatus] = useState([]);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [convertBillStatusGet, setConvertBillStatusGet] = useState();
    const [editBill, setEditBill] = useState({});
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
    }, [openDialog, currentPage]);

    const numberBill = useMemo(() => {
        const getBills = bills.billsSearch.reduce((pre, next) => {
            const getBill = next.Bill.map((item) => item);
            return pre.concat(getBill);
        }, []);
        return billStatus.map((status) => {
            return getBills.filter((bill) => bill.BillStatus._id === status.value).length;
        });
    }, [bills]);

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
        const result = await billsApi.updateBill({
            customerID: editBill.customer._id,
            billID: editBill.bill.BillID,
            statusBill: convertBillStatusGet,
        });
        if (result) {
            setOpenDialog(false);
            UpdateSwal.fire({
                position: 'center',
                icon: 'success',
                title: 'Cập nhật thành công',
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    const handleFilterByStatus = (status) => {
        const getBillByStatus = bills.billsSearch.map((bill) => {
            const getItemByBill = bill.Bill.filter((item) => {
                return item.BillStatus._id === status.value;
            });
            const newBill = {
                ...bill,
                Bill: getItemByBill,
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

    return (
        <div>
            <div>
                <button className={cx('btn')} onClick={handleAllBills}>
                    Tất cả
                </button>
                <SearchByCate type="bill" onSearch={handleSearchBills} />
                <PaginationOutlined count={totalPage.pageSearch} onClick={handlePagination} />
                {billStatus.map((status, index) => (
                    <button key={status.value} className={cx('btn')} onClick={() => handleFilterByStatus(status)}>
                        {status.label} <span className={cx('number-bill')}>({numberBill[index]})</span>
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
