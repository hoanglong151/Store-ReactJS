import * as React from 'react';
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
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Accordion.module.scss';
import Input from '../Input/Input';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

export default function AccordionBasic(props) {
    const { onHandleAddType, formik, typesProduct, onHandleDeleteType } = props;
    return (
        <div>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <Typography>
                        Số lượng loại: <strong>{typesProduct.length}</strong>
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <button className={clsx(styles.btn)} onClick={onHandleAddType} type="button">
                        Thêm Loại
                    </button>
                    <div className={clsx(styles.formInput)}>
                        <Input
                            placeholder="Loại"
                            id="types.description"
                            name="types.description"
                            onChange={formik.handleChange}
                            value={formik.values.types.description}
                        />
                        <Input
                            placeholder="Giá"
                            type="number"
                            id="types.price"
                            name="types.price"
                            onChange={formik.handleChange}
                            value={formik.values.types.price}
                        />
                        <Input
                            placeholder="Giá Khuyễn Mãi"
                            type="number"
                            id="types.sale"
                            name="types.sale"
                            onChange={formik.handleChange}
                            value={formik.values.types.sale}
                        />
                        <Input
                            placeholder="Số Lượng"
                            type="number"
                            id="types.amount"
                            name="types.amount"
                            onChange={formik.handleChange}
                            value={formik.values.types.amount}
                        />
                    </div>

                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Loại</TableCell>
                                    <TableCell align="right">Giá</TableCell>
                                    <TableCell align="right">Giá Khuyến Mãi</TableCell>
                                    <TableCell align="right">Số Lượng</TableCell>
                                    <TableCell align="right">Del</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {typesProduct.map((type, index) => (
                                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component="th" scope="row">
                                            {type.description}
                                        </TableCell>
                                        <TableCell align="right">{type.price} VNĐ</TableCell>
                                        <TableCell align="right">{type.sale} VNĐ</TableCell>
                                        <TableCell align="right">{type.amount}</TableCell>
                                        <TableCell align="right">
                                            <button
                                                className={clsx(styles.btn)}
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
