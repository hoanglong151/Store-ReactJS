import React, { useEffect, useState } from 'react';
import categoriesApi from '~/api/categoriesApi';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '~/app/reducerCategory';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import clsx from 'clsx';
import styles from './Categories.module.scss';
import TableCategory from '~/components/Tables/TableCategory/TableCategory';
import DialogCategory from '~/components/Form/Dialog/DialogCategory/DialogCategory';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function Categories() {
    const [image, setImage] = useState('');
    const [cateClick, setCateClick] = React.useState({});
    const [createCate, setCreateCate] = React.useState(false);
    const [editCate, setEditCate] = React.useState(false);
    const DeleteSwal = withReactContent(Swal);
    const { categories } = useSelector((state) => state.category);
    const dispatch = useDispatch();

    const handleDeleteCategory = (id) => {
        const delCategory = async () => {
            DeleteSwal.fire({
                title: 'Bạn muốn xóa danh mục này?',
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
                        DeleteSwal.fire({
                            title: 'Danh Mục Đã Được Xóa',
                            customClass: {
                                popup: `${clsx(styles.popup)}`,
                            },
                        });
                        await categoriesApi.deleteCategory(id);
                        dispatch(getCategories());
                    } catch (err) {
                        throw Error(err);
                    }
                }
            });
        };
        delCategory();
    };

    const handleChangeImage = (e) => {
        URL.revokeObjectURL(image);
        const getImage = URL.createObjectURL(e.target.files[0]);
        setImage(getImage);
        formik.setFieldValue('image', e.target.files[0]);
    };

    const handleClickOpen = (cate) => {
        if (cate._id) {
            setCateClick(cate);
            setEditCate(true);
            setImage(cate.Image);
        } else {
            setCreateCate(true);
            setImage('');
        }
    };

    const handleClose = () => {
        setCateClick({});
        setCreateCate(false);
        setEditCate(false);
    };

    const validationSchema = Yup.object({
        name: Yup.string('Nhập Tên Danh Mục').required('Vui Lòng Nhập Tên Danh Mục'),
    });

    const objectCate = () => {
        if (Object.keys(cateClick).length !== 0) {
            return {
                id: cateClick._id,
                name: cateClick.Name,
                image: cateClick.Image,
            };
        } else {
            return {
                name: '',
                image: {},
            };
        }
    };

    const formik = useFormik({
        initialValues: objectCate(),
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const submit = async () => {
                try {
                    const fd = new FormData();
                    for (let key in values) {
                        fd.append(key, values[key]);
                    }
                    if (!formik.initialValues.name) {
                        await categoriesApi.addCategory(fd);
                        formik.setFieldValue('name', '');
                    } else {
                        await categoriesApi.editCategory(fd, values.id);
                    }
                    setCateClick({});
                    setCreateCate(false);
                    setEditCate(false);
                    dispatch(getCategories());
                } catch (Error) {
                    alert('Error: ', Error);
                }
            };
            submit();
        },
    });

    return (
        <div className={clsx(styles.wrapper)}>
            <button onClick={handleClickOpen} className={clsx(styles.createBtn)}>
                Tạo Danh Mục
            </button>
            <DialogCategory
                open={createCate || editCate}
                onHandleClose={handleClose}
                title={createCate ? 'Tạo Danh Mục' : 'Cập Nhật Danh Mục'}
                formik={formik}
                onHandleImage={handleChangeImage}
                image={image}
                editCate={editCate}
            />
            <TableCategory
                titles={['Image', 'Name', 'Actions']}
                categories={categories}
                onHandleClick={handleClickOpen}
                onHandleDelete={handleDeleteCategory}
            />
        </div>
    );
}

export default Categories;
