import * as React from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import classnames from 'classnames/bind';
import styles from './TableProduct.module.scss';

const cx = classnames.bind(styles);

export default function TablesProduct(props) {
    const { titles, products } = props;
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 800 }} aria-label="simple table">
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
                            <TableCell align="left" className={cx('img-product')}>
                                <img
                                    alt="Hình Ảnh Sản Phẩm"
                                    className={cx('img')}
                                    src={data.TypesProduct[0].Images[0]}
                                />
                            </TableCell>
                            <TableCell align="left">{data.Name}</TableCell>
                            <TableCell align="left">
                                {data.Category_ID.map((category, index) => category.Name).join(', ')}
                            </TableCell>
                            <TableCell align="left">
                                {new Date(data.createdAt).toLocaleDateString('en-GB', {
                                    year: 'numeric',
                                    month: 'numeric',
                                    day: 'numeric',
                                })}
                            </TableCell>
                            <TableCell align="left">
                                <Link
                                    to={`/Admin/Products/DetailProduct`}
                                    state={{ product: data }}
                                    className={cx('btn', 'btn-detail')}
                                >
                                    Detail
                                </Link>
                                <Link
                                    to={`/Admin/Products/EditProduct`}
                                    state={{ product: data }}
                                    className={cx('btn', 'btn-edit')}
                                >
                                    Edit
                                </Link>
                                <Link
                                    to={`/Admin/Products/DeleteProduct`}
                                    state={{ product: data }}
                                    className={cx('btn', 'btn-delete')}
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

TablesProduct.propTypes = {
    titles: PropTypes.array,
    products: PropTypes.array,
};
