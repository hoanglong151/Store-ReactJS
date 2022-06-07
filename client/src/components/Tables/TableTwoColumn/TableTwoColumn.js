import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import clsx from 'clsx';
import styles from './TableTwoColumn.module.scss';

function TableTwoColumn(props) {
    const { data, onHandleOpenDialog, onHandleDelete, title } = props;
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {title.map((name) => (
                            <TableCell key={name}>{name}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.length > 0 &&
                        data.map((item) => (
                            <TableRow key={item._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    {item.Name}
                                </TableCell>
                                <TableCell align="left">
                                    <button
                                        className={clsx(styles.btn, styles.editBtn)}
                                        onClick={() => onHandleOpenDialog(item)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className={clsx(styles.btn, styles.deleteBtn)}
                                        onClick={() => onHandleDelete(item)}
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

export default TableTwoColumn;
