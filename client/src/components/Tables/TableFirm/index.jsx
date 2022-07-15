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

function TableFirm(props) {
    const { titles, firms, handleOpenPopup, handleDeleteFirm } = props;
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
                    {firms.map((data, index) => (
                        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell align="left">{data.Name}</TableCell>
                            <TableCell align="left">
                                <button className={cx('btn', 'btn-edit')} onClick={() => handleOpenPopup(data)}>
                                    Edit
                                </button>
                                <button className={cx('btn', 'btn-delete')} onClick={() => handleDeleteFirm(data)}>
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

TableFirm.propTypes = {
    titles: PropTypes.array,
    firms: PropTypes.array,
    handleOpenPopup: PropTypes.func,
    handleDeleteFirm: PropTypes.func,
};

export default TableFirm;
