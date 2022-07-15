import React from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import classnames from 'classnames/bind';

const cx = classnames.bind();

function TableSaleCode(props) {
    const { data, onHandleOpenDialog, onHandleDelete } = props;
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Mã khuyến mãi</TableCell>
                        <TableCell>Giá giảm</TableCell>
                        <TableCell align="right">Chức năng</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((item) => (
                        <TableRow key={item._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">
                                {item.Name}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {new Intl.NumberFormat('de-DE').format(item.Sale)} đ
                            </TableCell>
                            <TableCell align="right">
                                <button className={cx('btn', 'btn-edit')} onClick={() => onHandleOpenDialog(item)}>
                                    Edit
                                </button>
                                <button className={cx('btn', 'btn-delete')} onClick={() => onHandleDelete(item)}>
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

TableSaleCode.propTypes = {
    data: PropTypes.array,
    onHandleOpenDialog: PropTypes.func,
    onHandleDelete: PropTypes.func,
};

export default TableSaleCode;
