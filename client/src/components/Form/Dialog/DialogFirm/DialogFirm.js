import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Input from '~/components/Form/Input/Input';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';

function DialogFirm(props) {
    const { handleClose, open, formik, editFirmPopup } = props;
    const checkDataEdit = Object.keys(editFirmPopup).length;
    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={formik.handleSubmit}>
                    <DialogTitle>{checkDataEdit ? 'Cập Nhật Hãng' : 'Tạo Hãng'}</DialogTitle>
                    <DialogContent>
                        <Input
                            id="name"
                            name="name"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            placeholder="Tên Hãng"
                        />
                        {formik.errors.name && formik.touched.name ? (
                            <ErrorMessage>{formik.errors.name}</ErrorMessage>
                        ) : null}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Hủy</Button>
                        <Button type="submit">{checkDataEdit ? 'Cập Nhật' : 'Tạo'}</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}

export default DialogFirm;
