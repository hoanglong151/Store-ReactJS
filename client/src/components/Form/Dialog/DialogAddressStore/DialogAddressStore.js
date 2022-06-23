import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Selects from '../../Selects';
import Input from '../../Input/Input';

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
                    <Selects multiple data={areas} select={editAddressStore.Areas} onChangeSelect={handleSelectArea} />
                    <Selects
                        multiple
                        data={provinces}
                        select={editAddressStore.Provinces}
                        onChangeSelect={handleSelectProvince}
                    />
                    <Selects
                        multiple
                        data={districts}
                        select={editAddressStore.Districts}
                        onChangeSelect={handleSelectDistrict}
                    />
                    <Input
                        id="name"
                        name="name"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        placeholder="Địa Chỉ"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onHandleCloseDialog}>Hủy</Button>
                    <Button type="submit">{editAddressStore._id ? 'Cập Nhật' : 'Tạo'}</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default DialogAddressStore;
