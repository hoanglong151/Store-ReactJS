import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import classnames from 'classnames/bind';
import styles from './TableCategory.module.scss';

const cx = classnames.bind(styles);

function TableCategory(props) {
    const { titles, categories, onHandleClick, onHandleDelete } = props;
    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
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
                            <TableCell align="left" className={cx('img-product')}>
                                <img className={cx('img')} src={data.Image} />
                            </TableCell>
                            <TableCell style={{ minWidth: '12rem' }} align="left">
                                {data.Name}
                            </TableCell>
                            <TableCell align="left">
                                <button className={cx('btn', 'btn-edit')} onClick={() => onHandleClick(data)}>
                                    Edit
                                </button>
                                <button className={cx('btn', 'btn-delete')} onClick={() => onHandleDelete(data._id)}>
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
