import React, { useMemo } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Selects from '../../Selects';
import Input from '../../Input/Input';

function DialogProvince(props) {
    const { onHandleCloseDialog, open, areas, formik, handleSelectArea, editProvince } = props;

    return (
        <Dialog open={open} onClose={onHandleCloseDialog}>
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle>Tạo Tỉnh/Thành</DialogTitle>
                <DialogContent style={{ minHeight: '15rem' }}>
                    <Selects multiple data={areas} select={editProvince.Areas} onChangeSelect={handleSelectArea} />
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
                    <Button type="submit">{editProvince._id ? 'Cập Nhật' : 'Tạo'}</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default DialogProvince;
