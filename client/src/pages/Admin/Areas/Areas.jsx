import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './Areas.module.scss';
import TableTwoColumn from '~/components/Tables/TableTwoColumn/TableTwoColumn';
import DialogOneField from '~/components/Form/Dialog/DialogOneField/DialogOneField';
import { useFormik } from 'formik';
import { getAreas } from '~/app/reducerArea';
import { useDispatch, useSelector } from 'react-redux';
import areasApi from '~/api/areasApi';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function Areas() {
    const [editArea, setEditArea] = useState({});
    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const { areas } = useSelector((state) => state.area);
    const DeleteSwal = withReactContent(Swal);

    const dispatch = useDispatch();

    const handleOpenDialog = (area) => {
        if (area._id) {
            setEditArea(area);
            setOpenEdit(true);
        } else {
            setOpenCreate(true);
        }
    };

    const handleCloseDialog = () => {
        setOpenCreate(false);
        setOpenEdit(false);
    };

    const handleDeleteArea = (area) => {
        DeleteSwal.fire({
            title: 'Bạn muốn xóa vùng miền này?',
            icon: 'error',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Đồng Ý',
            cancelButtonText: 'Hủy',
            customClass: {
                popup: `${clsx(styles.popup)}`,
            },
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const result = await areasApi.deleteArea(area._id);
                    if (result.exist) {
                        DeleteSwal.fire({
                            title: 'Vùng Miền Đang Được Sử Dụng',
                            customClass: {
                                popup: `${clsx(styles.popup)}`,
                            },
                        });
                    } else {
                        DeleteSwal.fire({
                            title: 'Vùng Miền Đã Được Xóa',
                            customClass: {
                                popup: `${clsx(styles.popup)}`,
                            },
                        });
                        dispatch(getAreas());
                    }
                } catch (err) {
                    throw Error(err);
                }
            }
        });
    };

    const objectArea = () => {
        if (Object.keys(editArea).length !== 0) {
            return {
                id: editArea._id,
                name: editArea.Name,
            };
        } else {
            return {
                name: '',
            };
        }
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: objectArea(),
        onSubmit: (values) => {
            const submit = async () => {
                try {
                    if (Object.keys(editArea).length !== 0) {
                        await areasApi.editArea(values, editArea._id);
                    } else {
                        await areasApi.addArea(values);
                    }
                    formik.setFieldValue('name', '');
                    setOpenCreate(false);
                    setOpenEdit(false);
                    dispatch(getAreas());
                } catch (err) {
                    alert('Error: ', Error);
                }
            };
            submit();
        },
    });
    return (
        <div>
            <button className={clsx(styles.createBtn)} onClick={handleOpenDialog}>
                Tạo vùng miền
            </button>
            <DialogOneField
                formik={formik}
                open={openCreate || openEdit}
                onHandleCloseDialog={handleCloseDialog}
                edit={editArea}
                textTitle={['Tạo vùng miền', 'Cập nhật vùng miền']}
                placeholder="Tên vùng miền"
            />
            <TableTwoColumn
                data={areas}
                onHandleOpenDialog={handleOpenDialog}
                onHandleDelete={handleDeleteArea}
                title="Vùng miền"
            />
        </div>
    );
}

export default Areas;
