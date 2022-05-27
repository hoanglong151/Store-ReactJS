import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import clsx from 'clsx';
import styles from './TableCategory.module.scss';

function TableCategory(props) {
    const { titles, categories, onHandleClick, onHandleDelete } = props;
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {titles.map((title, index) => (
                            <TableCell align="left" key={index}>
                                {title}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {categories.map((data, index) => (
                        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell align="left" className={clsx(styles.imgProduct)}>
                                <img className={clsx(styles.img)} src={data.Image} />
                            </TableCell>
                            <TableCell align="left">{data.Name}</TableCell>
                            <TableCell align="left">
                                <button
                                    className={clsx(styles.btn, styles.editBtn)}
                                    onClick={() => onHandleClick(data)}
                                >
                                    Edit
                                </button>
                                <button
                                    className={clsx(styles.btn, styles.deleteBtn)}
                                    onClick={() => onHandleDelete(data._id)}
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

export default TableCategory;
