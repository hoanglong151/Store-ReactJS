import React, { useEffect, useState } from 'react';
import categoriesApi from '~/api/categoriesApi';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import { useFormik } from 'formik';
import TableCategory from '~/components/Tables/TableCategory';
import DialogCategory from '~/components/Form/Dialog/DialogCategory/DialogCategory';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import PaginationOutlined from '~/components/Pagination';
import SearchByCate from '~/components/SearchByCate';
import classnames from 'classnames/bind';
import styles from './Categories.module.scss';

const cx = classnames.bind(styles);

function Categories() {
    const [image, setImage] = useState('');
    const [cateClick, setCateClick] = React.useState({});
    const [createCate, setCreateCate] = React.useState(false);
    const [editCate, setEditCate] = React.useState(false);
    const DeleteSwal = withReactContent(Swal);

    const [totalPage, setTotalPage] = useState({
        pageAll: 1,
        pageSearch: 1,
    });
    const [categories, setCategories] = useState({
        categoriesAll: [],
        categoriesSearch: [],
    });
    const [currentPage, setCurrentPage] = useState(1);

    const getCategories = async () => {
        try {
            const result = await categoriesApi.getAll(currentPage);
            setTotalPage({ ...totalPage, pageAll: result.totalPage, pageSearch: result.totalPage });
            setCategories({ ...categories, categoriesAll: result.categories, categoriesSearch: result.categories });
        } catch (err) {
            console.log('Err: ', err);
        }
    };

    const handlePagination = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        const callApi = async () => {
            await getCategories();
        };
        callApi();
    }, [currentPage]);

    const handleDeleteCategory = (id) => {
        const delCategory = async () => {
            DeleteSwal.fire({
                title: 'B???n mu???n x??a danh m???c n??y?',
                icon: 'error',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '?????ng ??',
                cancelButtonText: 'H???y',
                customClass: {
                    popup: `${cx('popup')}`,
                },
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const result = await categoriesApi.deleteCategory(id);
                        if (result.Exist) {
                            DeleteSwal.fire({
                                icon: 'error',
                                title: result.Exist,
                                customClass: {
                                    popup: `${cx('popup')}`,
                                },
                            });
                        } else {
                            DeleteSwal.fire({
                                icon: 'success',
                                title: 'Danh M???c ???? ???????c X??a',
                                customClass: {
                                    popup: `${cx('popup')}`,
                                },
                            });
                        }
                        getCategories();
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
        console.log(e.target.files[0]);
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

    const handleSearchCategories = (data) => {
        if (Object.keys(data).length !== 0) {
            setCategories({ ...categories, categoriesSearch: data.data });
            setTotalPage({ ...totalPage, pageSearch: data.totalPage });
        } else {
            setCategories({ ...categories, categoriesSearch: categories.categoriesAll });
            setTotalPage({ ...totalPage, pageSearch: totalPage.pageAll });
        }
    };

    const validationSchema = Yup.object({
        name: Yup.string('Nh???p T??n Danh M???c').required('Vui L??ng Nh???p T??n Danh M???c'),
        image: Yup.object({
            name: Yup.string().required('Vui L??ng Ch???n H??nh ???nh'),
        }),
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
                        const result = await categoriesApi.addCategory(fd);
                        if (result.Exist) {
                            toast.error(`???? ${result.Exist}`, {
                                position: 'top-right',
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                        } else {
                            formik.setFieldValue('name', '');
                            setCateClick({});
                            setCreateCate(false);
                            setEditCate(false);
                            getCategories();
                        }
                    } else {
                        const result = await categoriesApi.editCategory(fd, values.id);
                        if (result.Exist) {
                            toast.error(`???? ${result.Exist}`, {
                                position: 'top-right',
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                        } else {
                            setCateClick({});
                            setCreateCate(false);
                            setEditCate(false);
                            getCategories();
                        }
                    }
                } catch (Error) {
                    alert('Error: ', Error);
                }
            };
            submit();
        },
    });

    return (
        <div className={cx('wrapper')}>
            <ToastContainer />
            <button onClick={handleClickOpen} className={cx('create-btn')}>
                T???o Danh M???c
            </button>
            <SearchByCate type="category" onSearch={handleSearchCategories} />
            <PaginationOutlined count={totalPage.pageSearch} onClick={handlePagination} />
            <DialogCategory
                open={createCate || editCate}
                onHandleClose={handleClose}
                title={createCate ? 'T???o Danh M???c' : 'C???p Nh???t Danh M???c'}
                formik={formik}
                onHandleImage={handleChangeImage}
                image={image}
                editCate={editCate}
            />
            <TableCategory
                titles={['Image', 'Name', 'Actions']}
                categories={categories.categoriesSearch}
                onHandleClick={handleClickOpen}
                onHandleDelete={handleDeleteCategory}
            />
        </div>
    );
}

export default Categories;
