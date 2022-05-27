import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import styles from './TableProduct.module.scss';

export default function TablesProduct(props) {
    const { titles, products } = props;
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
                    {products.map((data, index) => (
                        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell align="left" className={clsx(styles.imgProduct)}>
                                <img className={clsx(styles.img)} src={data.Image[0]} />
                            </TableCell>
                            <TableCell align="left">{data.Name}</TableCell>
                            <TableCell align="left">
                                {data.Category_ID.map((category, index) => category.Name).join(', ')}
                            </TableCell>
                            <TableCell align="left">{new Intl.NumberFormat('de-DE').format(data.Price)} VNĐ</TableCell>
                            <TableCell align="left">
                                <Link
                                    to={`/Admin/DetailProduct/${data._id}`}
                                    className={clsx(styles.btn, styles.detailBtn)}
                                >
                                    Detail
                                </Link>
                                <Link
                                    to={`/Admin/EditProduct/${data._id}`}
                                    className={clsx(styles.btn, styles.editBtn)}
                                >
                                    Edit
                                </Link>
                                <Link
                                    to={`/Admin/DeleteProduct/${data._id}`}
                                    className={clsx(styles.btn, styles.deleteBtn)}
                                >
                                    Delete
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
