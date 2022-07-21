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

function DialogAddressStore(props) {
    const {
        onHandleCloseDialog,
        open,
        areas,
        formik,
        handleSelectArea,
        editAddressStore,
        provinces,
        handleSelectProvince,
        handleSelectDistrict,
        districts,
    } = props;

    return (
        <Dialog open={open} onClose={onHandleCloseDialog}>
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle>{editAddressStore._id ? 'Cập Nhật Địa Chỉ Cửa Hàng' : 'Tạo Địa Chỉ Cửa Hàng'}</DialogTitle>
                <DialogContent>
                    <Selects
                        className="mb1"
                        data={areas}
                        select={editAddressStore.Areas}
                        onChangeSelect={handleSelectArea}
                    />
                    {formik.errors.area_Id && formik.touched.area_Id ? (
                        <ErrorMessage>{formik.errors.area_Id}</ErrorMessage>
                    ) : null}
                    <Selects
                        className="mb1"
                        data={provinces}
                        select={editAddressStore.Provinces}
                        onChangeSelect={handleSelectProvince}
                    />
                    {formik.errors.province_Id && formik.touched.province_Id ? (
                        <ErrorMessage>{formik.errors.province_Id}</ErrorMessage>
                    ) : null}
                    <Selects
                        className="mb1"
                        data={districts}
                        select={editAddressStore.Districts}
                        onChangeSelect={handleSelectDistrict}
                    />
                    {formik.errors.district_Id && formik.touched.district_Id ? (
                        <ErrorMessage>{formik.errors.district_Id}</ErrorMessage>
                    ) : null}
                    <Input
                        id="name"
                        name="name"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        placeholder="Địa Chỉ"
                    />
                    {formik.errors.name && formik.touched.name ? (
                        <ErrorMessage>{formik.errors.name}</ErrorMessage>
                    ) : null}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onHandleCloseDialog}>Hủy</Button>
                    <Button type="submit">{editAddressStore._id ? 'Cập Nhật' : 'Tạo'}</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

DialogAddressStore.propTypes = {
    onHandleCloseDialog: PropTypes.func,
    open: PropTypes.bool,
    areas: PropTypes.array,
    formik: PropTypes.object,
    handleSelectArea: PropTypes.func,
    editAddressStore: PropTypes.object,
    provinces: PropTypes.array,
    handleSelectProvince: PropTypes.func,
    handleSelectDistrict: PropTypes.func,
    districts: PropTypes.array,
};

export default DialogAddressStore;
