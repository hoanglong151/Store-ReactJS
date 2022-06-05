import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import clsx from 'clsx';
import styles from './TableProvince.module.scss';

function TableProvince(props) {
    const { provinces, onHandleOpenDialog, onHandleDeleteProvince } = props;
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Vùng miền</TableCell>
                        <TableCell align="right">Tỉnh thành</TableCell>
                        <TableCell align="right">Chức năng</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {provinces.map((province) => (
                        <TableRow key={province._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">
                                {province?.Areas.map((area) => {
                                    return area.Name;
                                }).join(', ')}
                            </TableCell>
                            <TableCell align="right">{province.Name}</TableCell>
                            <TableCell align="right">
                                <button
                                    className={clsx(styles.btn, styles.editBtn)}
                                    onClick={() => onHandleOpenDialog(province)}
                                >
                                    Edit
                                </button>
                                <button
                                    className={clsx(styles.btn, styles.deleteBtn)}
                                    onClick={() => onHandleDeleteProvince(province)}
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

export default TableProvince;
