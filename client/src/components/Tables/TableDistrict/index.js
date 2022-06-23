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

function TableDistrict(props) {
    const { districts, onHandleOpenDialog, onHandleDeleteDistrict } = props;
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Vùng miền</TableCell>
                        <TableCell align="right">Tỉnh/Thành</TableCell>
                        <TableCell align="right">Quận/Huyện</TableCell>
                        <TableCell align="right">Chức năng</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {districts.map((district) => (
                        <TableRow key={district._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">
                                {district?.Areas.map((area) => {
                                    return area.Name;
                                }).join(', ')}
                            </TableCell>
                            <TableCell align="right">
                                {district?.Provinces.map((province) => {
                                    return province.Name;
                                }).join(', ')}
                            </TableCell>
                            <TableCell align="right">{district.Name}</TableCell>
                            <TableCell align="right">
                                <button className={cx('btn', 'btn-edit')} onClick={() => onHandleOpenDialog(district)}>
                                    Edit
                                </button>
                                <button
                                    className={cx('btn', 'btn-delete')}
                                    onClick={() => onHandleDeleteDistrict(district)}
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

export default TableDistrict;
