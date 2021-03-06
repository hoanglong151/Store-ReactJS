import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Input from '../../Input/Input';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';

function DialogOneField(props) {
    const { open, onHandleCloseDialog, formik, edit, placeholder, textTitle } = props;
    const checkDataEdit = Object.keys(edit).length;
    return (
        <Dialog open={open} onClose={onHandleCloseDialog}>
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle>{checkDataEdit ? textTitle[1] : textTitle[0]}</DialogTitle>
                <DialogContent>
                    <Input
                        id="name"
                        name="name"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        placeholder={placeholder}
                    />
                    {formik.errors.name && formik.touched.name ? (
                        <ErrorMessage>{formik.errors.name}</ErrorMessage>
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

DialogOneField.propTypes = {
    open: PropTypes.bool,
    onHandleCloseDialog: PropTypes.func,
    formik: PropTypes.object,
    edit: PropTypes.object,
    placeholder: PropTypes.string,
    textTitle: PropTypes.array,
};

export default DialogOneField;
