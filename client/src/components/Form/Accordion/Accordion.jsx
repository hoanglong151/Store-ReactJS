import * as React from 'react';
import PropTypes from 'prop-types';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import classnames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Accordion.module.scss';
import Input from '../Input/Input';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

const cx = classnames.bind(styles);
export default function AccordionBasic(props) {
    const {
        onHandleAddType,
        formik,
        typesProduct,
        onHandleDeleteType,
        onHandleSelectType,
        onHandleUpdateType,
        onHandleSelectImage,
        reviewImages,
        statusUpdateType,
    } = props;

    return (
        <div>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <Typography>
                        Số lượng loại: <strong>{typesProduct.length}</strong>
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <button
                        className={cx('btn')}
                        onClick={statusUpdateType ? onHandleUpdateType : onHandleAddType}
                        type="button"
                    >
                        {statusUpdateType ? 'Cập Nhật' : 'Thêm Loại'}
                    </button>
                    <div className={cx('form-input')}>
                        <Input
                            placeholder="Màu Sắc"
                            id="types.color"
                            name="types.color"
                            onChange={formik.handleChange}
                            value={formik.values.types.color}
                        />
                        <Input
                            placeholder="Loại"
                            id="types.name"
                            name="types.name"
                            onChange={formik.handleChange}
                            value={formik.values.types.name}
                        />
                        <Input
                            placeholder="Giá"
                            id="types.price"
                            name="types.price"
                            type="number"
                            onChange={formik.handleChange}
                            value={formik.values.types.price}
                        />
                        <Input
                            placeholder="Giá Khuyễn Mãi"
                            id="types.sale"
                            name="types.sale"
                            type="number"
                            onChange={formik.handleChange}
                            value={formik.values.types.sale}
                        />
                        <Input
                            placeholder="Số Lượng"
                            id="types.amount"
                            name="types.amount"
                            type="number"
                            onChange={formik.handleChange}
                            value={formik.values.types.amount}
                        />
                        <label className={cx('label-image')} htmlFor="types.images">
                            Hình Ảnh
                        </label>
                        <input
                            onChange={onHandleSelectImage}
                            className={cx('input-image')}
                            multiple
                            id="types.images"
                            name="types.images"
                            type="file"
                        />
                    </div>
                    <div className={cx('review-image')}>
                        {reviewImages.map((image, index) => {
                            return <img className={cx('image')} src={image} key={index} />;
                        })}
                    </div>

                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ minWidth: '10rem' }}>Màu Sắc</TableCell>
                                    <TableCell style={{ minWidth: '8rem' }}>Loại</TableCell>
                                    <TableCell style={{ minWidth: '12rem' }} align="right">
                                        Giá
                                    </TableCell>
                                    <TableCell style={{ minWidth: '14rem' }} align="right">
                                        Giá Khuyến Mãi
                                    </TableCell>
                                    <TableCell style={{ minWidth: '10rem' }} align="right">
                                        Số Lượng
                                    </TableCell>
                                    <TableCell style={{ minWidth: '10rem' }} align="right">
                                        Hình Ảnh
                                    </TableCell>
                                    <TableCell style={{ minWidth: '8rem' }} align="right">
                                        Del
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {typesProduct.map((type, index) => (
                                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell onClick={() => onHandleSelectType(type)} component="th" scope="row">
                                            {type.Color}
                                        </TableCell>
                                        <TableCell onClick={() => onHandleSelectType(type)} component="th" scope="row">
                                            {type.Name}
                                        </TableCell>
                                        <TableCell onClick={() => onHandleSelectType(type)} align="right">
                                            {new Intl.NumberFormat('de-DE').format(type.Price)} đ
                                        </TableCell>
                                        <TableCell onClick={() => onHandleSelectType(type)} align="right">
                                            {new Intl.NumberFormat('de-DE').format(type.Sale)} đ
                                        </TableCell>
                                        <TableCell onClick={() => onHandleSelectType(type)} align="right">
                                            {type.Amount}
                                        </TableCell>
                                        <TableCell onClick={() => onHandleSelectType(type)} align="right">
                                            {type.Images.length}
                                        </TableCell>
                                        <TableCell align="right">
                                            <button
                                                className={cx('btn')}
                                                type="button"
                                                onClick={() => onHandleDeleteType(index)}
                                            >
                                                <FontAwesomeIcon icon={faCircleXmark} />
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

AccordionBasic.propTypes = {
    onHandleAddType: PropTypes.func,
    formik: PropTypes.object,
    typesProduct: PropTypes.array,
    onHandleDeleteType: PropTypes.func,
    onHandleSelectType: PropTypes.func,
    onHandleUpdateType: PropTypes.func,
    onHandleSelectImage: PropTypes.func,
    reviewImages: PropTypes.array,
    statusUpdateType: PropTypes.bool,
};
