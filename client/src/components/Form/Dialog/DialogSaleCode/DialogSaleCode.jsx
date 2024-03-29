import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Input from '../../Input/Input';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';

function DialogSaleCode(props) {
    const { open, onHandleCloseDialog, formik, edit } = props;
    const checkDataEdit = Object.keys(edit).length;
    return (
        <Dialog open={open} onClose={onHandleCloseDialog}>
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle>{checkDataEdit ? 'Cập Nhật Mã Khuyến Mãi' : 'Tạo Mã Khuyến Mãi'}</DialogTitle>
                <DialogContent>
                    <Input
                        id="name"
                        name="name"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        placeholder="Mã khuyến mãi"
                        className="mb1"
                    />
                    {formik.errors.name && formik.touched.name ? (
                        <ErrorMessage>{formik.errors.name}</ErrorMessage>
                    ) : null}
                    <Input
                        id="sale"
                        name="sale"
                        onChange={formik.handleChange}
                        value={formik.values.sale}
                        placeholder="Giảm giá"
                        type="number"
                    />
                    {formik.errors.sale && formik.touched.sale ? (
                        <ErrorMessage>{formik.errors.sale}</ErrorMessage>
                    ) : null}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onHandleCloseDialog}>Hủy</Button>
                    <Button type="submit">{edit._id ? 'Cập Nhật' : 'Tạo'}</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

DialogSaleCode.propTypes = {
    open: PropTypes.bool,
    onHandleCloseDialog: PropTypes.func,
    formik: PropTypes.object,
    edit: PropTypes.object,
};

export default DialogSaleCode;
