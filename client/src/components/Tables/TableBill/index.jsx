import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Link } from 'react-router-dom';
import classnames from 'classnames/bind';
import Selects from '~/components/Form/Selects';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faInfo } from '@fortawesome/free-solid-svg-icons';

const cx = classnames.bind();

function Row(props) {
    const { row, handleEditBill } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.Name}
                </TableCell>
                <TableCell align="right">{row.Phone}</TableCell>
                <TableCell align="right">{row.Email}</TableCell>
                <TableCell align="right">{row.DetailBills.length}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Chi ti???t h??a ????n
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>M?? H??a ????n</TableCell>
                                        <TableCell style={{ minWidth: '10rem' }}>Ng??y t???o</TableCell>
                                        <TableCell style={{ minWidth: '14rem' }}>T??nh tr???ng H??</TableCell>
                                        <TableCell style={{ minWidth: '15rem' }}>Giao h??ng</TableCell>
                                        <TableCell style={{ minWidth: '12rem' }}>T???ng ti???n</TableCell>
                                        <TableCell style={{ minWidth: '12rem' }}>Khuy???n m??i</TableCell>
                                        <TableCell style={{ minWidth: '12rem' }}>T???ng sau KM</TableCell>
                                        <TableCell style={{ minWidth: '13rem' }} align="center">
                                            Chi ti???t
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.DetailBills.map((bill, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{bill.BillID}</TableCell>
                                            <TableCell component="th" scope="row">
                                                {new Date(bill.createdAt).toLocaleDateString('en-GB', {
                                                    year: 'numeric',
                                                    month: 'numeric',
                                                    day: 'numeric',
                                                    hour: 'numeric',
                                                    minute: 'numeric',
                                                    second: 'numeric',
                                                })}
                                            </TableCell>
                                            <TableCell>{bill.BillStatus.Name}</TableCell>
                                            <TableCell align="right">{bill.ShipPayment}</TableCell>
                                            <TableCell align="right">
                                                {new Intl.NumberFormat('de-DE').format(bill.Cart.totalPrice)} ??
                                            </TableCell>
                                            <TableCell align="right">
                                                {new Intl.NumberFormat('de-DE').format(bill.Cart.saleCode?.Sale || 0)} ??
                                            </TableCell>
                                            <TableCell align="right">
                                                {new Intl.NumberFormat('de-DE').format(bill.Cart.totalPriceSale)} ??
                                            </TableCell>
                                            <TableCell align="center">
                                                <Link
                                                    to={`/Admin/Bills/DetailBill`}
                                                    style={{ padding: '1rem 1.5rem' }}
                                                    state={{ customer: row, bill: bill }}
                                                    className={cx('btn', 'btn-detail')}
                                                >
                                                    <FontAwesomeIcon icon={faInfo} />
                                                </Link>
                                                <button
                                                    className={cx('btn', 'btn-edit')}
                                                    onClick={() => handleEditBill(bill, row)}
                                                >
                                                    <FontAwesomeIcon icon={faPenToSquare} />
                                                </button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

function TableBill(props) {
    const {
        rows,
        handleEditBill,
        openDialog,
        handleCloseDialog,
        billStatus,
        billStatusSelect,
        handleSelectStatus,
        handleUpdateStatusBill,
    } = props;

    return (
        <>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>C???p nh???t t??nh tr???ng ????n h??ng</DialogTitle>
                <DialogContent style={{ height: '25rem' }}>
                    <Selects data={billStatus} select={billStatusSelect} onChangeSelect={handleSelectStatus} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>H???y</Button>
                    <Button onClick={handleUpdateStatusBill}>C???p nh???t</Button>
                </DialogActions>
            </Dialog>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Kh??ch H??ng</TableCell>
                            <TableCell align="right">??i???n Tho???i</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">H??a ????n</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => {
                            return (
                                row.DetailBills.length !== 0 && (
                                    <Row
                                        key={row._id}
                                        row={row}
                                        handleCloseDialog={handleCloseDialog}
                                        handleEditBill={handleEditBill}
                                        openDialog={openDialog}
                                        billStatus={billStatus}
                                        billStatusSelect={billStatusSelect}
                                        handleSelectStatus={handleSelectStatus}
                                        handleUpdateStatusBill={handleUpdateStatusBill}
                                    />
                                )
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

TableBill.propTypes = {
    rows: PropTypes.array,
    handleEditBill: PropTypes.func,
    openDialog: PropTypes.bool,
    handleCloseDialog: PropTypes.func,
    billStatus: PropTypes.array,
    billStatusSelect: PropTypes.object,
    handleSelectStatus: PropTypes.func,
    handleUpdateStatusBill: PropTypes.func,
};

Row.propTypes = {
    row: PropTypes.object,
    handleEditBill: PropTypes.func,
};

export default TableBill;
