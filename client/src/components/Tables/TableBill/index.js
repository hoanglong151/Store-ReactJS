import React from 'react';
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
    const {
        row,
        handleEditBill,
        openDialog,
        handleCloseDialog,
        billStatus,
        billStatusSelect,
        handleSelectStatus,
        handleUpdateStatusBill,
    } = props;
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
                                Chi tiết hóa đơn
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Mã Hóa Đơn</TableCell>
                                        <TableCell style={{ minWidth: '10rem' }}>Ngày tạo</TableCell>
                                        <TableCell style={{ minWidth: '14rem' }}>Tình trạng HĐ</TableCell>
                                        <TableCell style={{ minWidth: '15rem' }}>Giao hàng</TableCell>
                                        <TableCell style={{ minWidth: '12rem' }}>Tổng tiền</TableCell>
                                        <TableCell style={{ minWidth: '12rem' }}>Khuyến mãi</TableCell>
                                        <TableCell style={{ minWidth: '12rem' }}>Tổng sau KM</TableCell>
                                        <TableCell style={{ minWidth: '13rem' }} align="center">
                                            Chi tiết
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
                                                {new Intl.NumberFormat('de-DE').format(bill.Cart.totalPrice)} đ
                                            </TableCell>
                                            <TableCell align="right">
                                                {new Intl.NumberFormat('de-DE').format(bill.Cart.saleCode?.Sale || 0)} đ
                                            </TableCell>
                                            <TableCell align="right">
                                                {new Intl.NumberFormat('de-DE').format(bill.Cart.totalPriceSale)} đ
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

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Cập nhật tình trạng đơn hàng</DialogTitle>
                <DialogContent style={{ height: '25rem' }}>
                    <Selects data={billStatus} select={billStatusSelect} onChangeSelect={handleSelectStatus} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Hủy</Button>
                    <Button onClick={handleUpdateStatusBill}>Cập nhật</Button>
                </DialogActions>
            </Dialog>
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
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Khách Hàng</TableCell>
                        <TableCell align="right">Điện Thoại</TableCell>
                        <TableCell align="right">Email</TableCell>
                        <TableCell align="right">Hóa Đơn</TableCell>
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
    );
}

// Row.propTypes = {
//     row: PropTypes.shape({
//         calories: PropTypes.number.isRequired,
//         carbs: PropTypes.number.isRequired,
//         fat: PropTypes.number.isRequired,
//         history: PropTypes.arrayOf(
//             PropTypes.shape({
//                 amount: PropTypes.number.isRequired,
//                 customerId: PropTypes.string.isRequired,
//                 date: PropTypes.string.isRequired,
//             }),
//         ).isRequired,
//         name: PropTypes.string.isRequired,
//         price: PropTypes.number.isRequired,
//         protein: PropTypes.number.isRequired,
//     }).isRequired,
// };

export default TableBill;
