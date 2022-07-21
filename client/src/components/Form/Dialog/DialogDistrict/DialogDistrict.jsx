import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Selects from '../../Selects';
import Input from '../../Input/Input';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';

function DialogDistrict(props) {
    const {
        onHandleCloseDialog,
        open,
        areas,
        formik,
        handleSelectArea,
        editDistrict,
        provinces,
        handleSelectProvince,
        textTitle,
    } = props;
    const checkDataEdit = Object.keys(editDistrict).length;
    return (
        <Dialog open={open} onClose={onHandleCloseDialog}>
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle>{checkDataEdit ? textTitle[1] : textTitle[0]}</DialogTitle>
                <DialogContent>
                    <Selects
                        className="mb1"
                        data={areas}
                        select={editDistrict.Areas}
                        onChangeSelect={handleSelectArea}
                    />
                    {formik.errors.area_Id && formik.touched.area_Id ? (
                        <ErrorMessage>{formik.errors.area_Id}</ErrorMessage>
                    ) : null}
                    <Selects
                        className="mb1"
                        data={provinces}
                        select={editDistrict.Provinces}
                        onChangeSelect={handleSelectProvince}
                    />
                    {formik.errors.province_Id && formik.touched.province_Id ? (
                        <ErrorMessage>{formik.errors.province_Id}</ErrorMessage>
                    ) : null}
                    <Input
                        id="name"
                        name="name"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        placeholder="Tên Tỉnh/Thành"
                    />
                    {formik.errors.name && formik.touched.name ? (
                        <ErrorMessage>{formik.errors.name}</ErrorMessage>
                    ) : null}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onHandleCloseDialog}>Hủy</Button>
                    <Button type="submit">{editDistrict._id ? 'Cập Nhật' : 'Tạo'}</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

DialogDistrict.propTypes = {
    onHandleCloseDialog: PropTypes.func,
    open: PropTypes.bool,
    areas: PropTypes.array,
    formik: PropTypes.object,
    handleSelectArea: PropTypes.func,
    editDistrict: PropTypes.object,
    provinces: PropTypes.array,
    handleSelectProvince: PropTypes.func,
    textTitle: PropTypes.string,
};

export default DialogDistrict;
