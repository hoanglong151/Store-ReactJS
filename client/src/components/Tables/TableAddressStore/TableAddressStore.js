import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import clsx from 'clsx';
import styles from './TableAddressStore.module.scss';

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
                                {store?.Areas.map((area) => {
                                    return area.Name;
                                }).join(', ')}
                            </TableCell>
                            <TableCell align="right">
                                {store?.Provinces.map((province) => {
                                    return province.Name;
                                }).join(', ')}
                            </TableCell>
                            <TableCell align="right">
                                {store?.Districts.map((district) => {
                                    return district.Name;
                                }).join(', ')}
                            </TableCell>
                            <TableCell align="right">{store.Name}</TableCell>
                            <TableCell align="right">
                                <button
                                    className={clsx(styles.btn, styles.editBtn)}
                                    onClick={() => onHandleOpenDialog(store)}
                                >
                                    Edit
                                </button>
                                <button
                                    className={clsx(styles.btn, styles.deleteBtn)}
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
