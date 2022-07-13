import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Selects from '../../Selects';
import Input from '../../Input/Input';

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
                    <Selects data={areas} select={editDistrict.Areas} onChangeSelect={handleSelectArea} />
                    <Selects data={provinces} select={editDistrict.Provinces} onChangeSelect={handleSelectProvince} />
                    <Input
                        id="name"
                        name="name"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        placeholder="Tên Tỉnh/Thành"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onHandleCloseDialog}>Hủy</Button>
                    <Button type="submit">{editDistrict._id ? 'Cập Nhật' : 'Tạo'}</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default DialogDistrict;
