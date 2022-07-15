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

function TableTwoColumn(props) {
    const { data, onHandleOpenDialog, onHandleDelete, title } = props;
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 300 }} aria-label="simple table">
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

TableTwoColumn.propTypes = {
    data: PropTypes.array,
    onHandleOpenDialog: PropTypes.func,
    onHandleDelete: PropTypes.func,
    title: PropTypes.array,
};

export default TableTwoColumn;
