import React, { useMemo, useState } from 'react';
import clsx from 'clsx';
import styles from './Districts.module.scss';
import DialogDistrict from '~/components/Form/Dialog/DialogDistrict/DialogDistrict';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import districtsApi from '~/api/districtsApi';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import TableDistrict from '~/components/Tables/TableDistrict/TableDistrict';
import { getDistricts } from '~/app/reducerDistrict';

function District() {
    const [editDistrict, setEditDistrict] = useState({});
    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const { areas } = useSelector((state) => state.area);
    const { provinces } = useSelector((state) => state.province);
    const { districts } = useSelector((state) => state.district);
    const DeleteSwal = withReactContent(Swal);
    const dispatch = useDispatch();

    const newAreas = useMemo(() => {
        return areas.map((area, i) => {
            return {
                label: area.Name,
                value: area._id,
            };
        });
    }, [areas]);

    const newProvinces = useMemo(() => {
        return provinces.map((area, i) => {
            return {
                label: area.Name,
                value: area._id,
            };
        });
    }, [provinces]);

    const handleOpenDialog = (district) => {
        if (district?._id) {
            const convertSelectArea = district.Areas.map((area) => {
                return {
                    value: area._id,
                    label: area.Name,
                };
            });
            const getProvinceIDArea = district.Areas.map((area) => {
                return area._id;
            });
            const convertSelectProvince = district.Provinces.map((province) => {
                return {
                    value: province._id,
                    label: province.Name,
                };
            });
            const getProvinceIDProvince = district.Provinces.map((province) => {
                return province._id;
            });
            formik.setFieldValue('area_Id', getProvinceIDArea);
            formik.setFieldValue('province_Id', getProvinceIDProvince);
            setEditDistrict({ ...district, Areas: convertSelectArea, Provinces: convertSelectProvince });
            setOpenEdit(true);
        } else {
            setOpenCreate(true);
        }
    };

    const handleCloseDialog = () => {
        setOpenCreate(false);
        setOpenEdit(false);
    };

    const handleDeleteDistrict = (district) => {
        DeleteSwal.fire({
            title: 'Bạn muốn xóa quận/huyện này?',
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
                    const result = await districtsApi.deleteDistrict(district._id);
                    if (result.exist) {
                        DeleteSwal.fire({
                            title: 'Quận/Huyện Đang Được Sử Dụng',
                            customClass: {
                                popup: `${clsx(styles.popup)}`,
                            },
                        });
                    } else {
                        DeleteSwal.fire({
                            title: 'Quận/Huyện Đã Được Xóa',
                            customClass: {
                                popup: `${clsx(styles.popup)}`,
                            },
                        });
                        dispatch(getDistricts());
                    }
                } catch (err) {
                    throw Error(err);
                }
            }
        });
    };

    const handleSelectArea = (options) => {
        const optionList = options.map((option, index) => {
            return option.value;
        });
        setEditDistrict({ ...editDistrict, Areas: options });
        formik.setFieldValue('area_Id', optionList);
    };

    const handleSelectProvince = (options) => {
        const optionList = options.map((option, index) => {
            return option.value;
        });
        setEditDistrict({ ...editDistrict, Provinces: options });
        formik.setFieldValue('province_Id', optionList);
    };

    const objectDistrict = () => {
        if (editDistrict._id) {
            return {
                id: editDistrict._id,
                name: editDistrict.Name,
            };
        } else {
            return {
                name: '',
                area_Id: [],
                province_Id: [],
            };
        }
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: objectDistrict(),
        onSubmit: (values) => {
            console.log(values);
            const submit = async () => {
                try {
                    if (editDistrict._id) {
                        await districtsApi.editDistrict(values, editDistrict._id);
                    } else {
                        await districtsApi.addDistrict(values);
                    }
                    formik.setFieldValue('name', '');
                    setOpenCreate(false);
                    setOpenEdit(false);
                    setEditDistrict({});
                    dispatch(getDistricts());
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
                Tạo quận/huyện
            </button>
            <DialogDistrict
                formik={formik}
                open={openCreate || openEdit}
                onHandleCloseDialog={handleCloseDialog}
                areas={newAreas}
                provinces={newProvinces}
                handleSelectArea={handleSelectArea}
                handleSelectProvince={handleSelectProvince}
                editDistrict={editDistrict}
            />
            <TableDistrict
                districts={districts}
                onHandleOpenDialog={handleOpenDialog}
                onHandleDeleteDistrict={handleDeleteDistrict}
            />
        </div>
    );
}

export default District;
