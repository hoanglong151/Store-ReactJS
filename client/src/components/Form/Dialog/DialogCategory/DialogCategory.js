import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Input from '../../Input/Input';
import SelectImage from '../../SelectImage/SelectImage';
import classnames from 'classnames/bind';
import styles from './DialogCategory.module.scss';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';

const cx = classnames.bind(styles);

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
                        className={cx('input')}
                    />
                    {formik.errors.name && formik.touched.name ? (
                        <ErrorMessage>{formik.errors.name}</ErrorMessage>
                    ) : null}
                    <SelectImage name="image" id="image" images={image} onChange={onHandleImage} />
                    {formik.errors.image && formik.touched.image ? (
                        <ErrorMessage>{formik.errors.image.name}</ErrorMessage>
                    ) : null}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onHandleClose}>Hủy</Button>
                    <Button type="submit">{editCate ? 'Cập Nhật' : 'Tạo'}</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
