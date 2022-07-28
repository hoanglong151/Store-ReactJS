import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Input from '../../Input/Input';
import SelectImage from '../../SelectImage/SelectImage';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';

export default function DialogCategory(props) {
    const { open, onHandleClose, title, formik, onHandleImage, image, editCate } = props;
    return (
        <Dialog open={open} onClose={onHandleClose}>
            <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <Input
                        name="name"
                        id="name"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        placeholder="Tên Danh Mục"
                        errors={formik.touched.name && formik.errors.name}
                    />
                    {formik.errors.name && formik.touched.name ? (
                        <ErrorMessage>{formik.errors.name}</ErrorMessage>
                    ) : null}
                    <SelectImage name="image" id="image" images={image} onChange={onHandleImage} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onHandleClose}>Hủy</Button>
                    <Button type="submit">{editCate ? 'Cập Nhật' : 'Tạo'}</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

DialogCategory.propTypes = {
    open: PropTypes.bool,
    onHandleClose: PropTypes.func,
    title: PropTypes.string,
    formik: PropTypes.object,
    onHandleImage: PropTypes.func,
    image: PropTypes.string,
    editCate: PropTypes.bool,
};
