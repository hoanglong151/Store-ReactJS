import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import classnames from 'classnames/bind';

const cx = classnames.bind();

function TableAddressStore(props) {
    const { addressStores, onHandleOpenDialog, onHandleDeleteAddressStore } = props;
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Vùng miền</TableCell>
                        <TableCell align="right">Tỉnh/Thành</TableCell>
                        <TableCell align="right">Quận/Huyện</TableCell>
                        <TableCell align="right">Địa chỉ</TableCell>
                        <TableCell align="right">Chức năng</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {addressStores.map((store) => (
                        <TableRow key={store._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">
                                {store.Areas.Name}
                            </TableCell>
                            <TableCell align="right">{store.Provinces.Name}</TableCell>
                            <TableCell align="right">{store.Districts.Name}</TableCell>
                            <TableCell align="right">{store.Name}</TableCell>
                            <TableCell align="right">
                                <button className={cx('btn', 'btn-edit')} onClick={() => onHandleOpenDialog(store)}>
                                    Edit
                                </button>
                                <button
                                    className={cx('btn', 'btn-delete')}
                                    onClick={() => onHandleDeleteAddressStore(store)}
                                >
                                    Delete
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TableAddressStore;
