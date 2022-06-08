import React, { useEffect, useState } from 'react';
import TableBill from '~/components/Tables/TableBill/TableBill';
import billsApi from '~/api/billsApi';

function Bills() {
    const [bills, setBills] = useState([]);
    useEffect(() => {
        const getAllBills = async () => {
            const getBill = await billsApi.getAll();
            setBills(getBill);
        };
        getAllBills();
    }, []);
    return (
        <div>
            <TableBill rows={bills} />
        </div>
    );
}

export default Bills;
