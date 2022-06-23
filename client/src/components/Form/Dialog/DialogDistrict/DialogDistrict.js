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
    } = props;

    return (
        <Dialog open={open} onClose={onHandleCloseDialog}>
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle>Tạo Quận/Huyện</DialogTitle>
                <DialogContent>
                    <Selects multiple data={areas} select={editDistrict.Areas} onChangeSelect={handleSelectArea} />
                    <Selects
                        multiple
                        data={provinces}
                        select={editDistrict.Provinces}
                        onChangeSelect={handleSelectProvince}
                    />
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
