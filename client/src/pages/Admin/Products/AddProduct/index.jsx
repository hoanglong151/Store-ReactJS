import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import productsApi from '~/api/productsApi';
import { useNavigate } from 'react-router-dom';
import Label from '~/components/Form/Label/Label';
import Input from '~/components/Form/Input/Input';
import Selects from '~/components/Form/Selects';
import TextArea from '~/components/Form/TextArea';
import ErrorMessage from '~/components/Form/ErrorMessage/ErrorMessage';
import Accordion from '~/components/Form/Accordion/Accordion';
import { categoriesApi, firmsApi } from '~/api';
import classnames from 'classnames/bind';
import styles from './AddProduct.module.scss';
import LoadingCRUD from '~/components/Loading/LoadingCRUD';

const cx = classnames.bind(styles);

function AddProduct() {
    let reviewImages1 = [];
    const [loading, setLoading] = useState(false);
    const [reviewImages, setReviewImages] = useState([]);
    const [typesProduct, setTypesProduct] = useState([]);
    const [firms, setFirms] = useState([]);
    const [categories, setCategories] = useState([]);
    const [statusUpdateType, setStatusUpdateType] = useState(false);
    const [updateType, setUpdateType] = useState({});
    const navigate = useNavigate();

    const getCategories = async () => {
        try {
            const result = await categoriesApi.getAll();
            setCategories(result.categories);
        } catch (err) {
            console.log('Err: ', err);
        }
    };

    const getFirms = async () => {
        try {
            const result = await firmsApi.getAll();
            setFirms(result.firms);
        } catch (err) {
            console.log('Err: ', err);
        }
    };

    useEffect(() => {
        getCategories();
        getFirms();
    }, []);

    const optionsCate = categories.map((cate, index) => {
        return {
            value: cate._id,
            label: cate.Name,
        };
    });

    const optionsFirm = firms.map((firm, index) => {
        return {
            value: firm._id,
            label: firm.Name,
        };
    });

    const validationSchema = Yup.object().shape({
        name: Yup.string('Nhập Tên Sản Phẩm').required('Vui Lòng Nhập Tên Sản Phẩm'),
        category_Id: Yup.array().min(1, 'Vui Lòng Chọn Danh Mục'),
        firm_Id: Yup.string().required('Vui Lòng Chọn Hãng'),
        description: Yup.string().required('Vui Lòng Nhập Mô Tả Sản Phẩm'),
    });
    const formik = useFormik({
        initialValues: {
            description: '',
            category_Id: [],
            firm_Id: '',
            name: '',
            types: {
                color: '',
                name: '',
                price: 0,
                sale: 0,
                amount: 0,
                sold: 0,
                images: [],
            },
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const submit = async () => {
                if (typesProduct.length !== 0) {
                    const fd = new FormData();
                    for (let key in values) {
                        fd.append(key, values[key]);
                    }
                    typesProduct.forEach((type, index) => {
                        type.Images.forEach((image) => {
                            fd.append(`typeImage${index}`, image);
                        });
                    });
                    fd.append('typesProduct', JSON.stringify(typesProduct));
                    try {
                        setLoading(true);
                        const result = await productsApi.addProduct(fd);
                        if (result.Exist) {
                            toast.error(`🦄 ${result.Exist} 🦄`, {
                                position: 'top-right',
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                        } else {
                            setLoading(false);
                            navigate('/Admin/Products');
                        }
                    } catch (err) {
                        throw Error(err.message);
                    }
                } else {
                    toast.error(`🦄 Vui Lòng Tạo Ít Nhật Một Loại Sản Phẩm 🦄`, {
                        position: 'top-right',
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            };
            submit();
        },
    });

    const handleAddType = () => {
        if (
            formik.values.types.name !== '' &&
            formik.values.types.price !== 0 &&
            formik.values.types.amount !== 0 &&
            formik.values.types.images.length !== 0
        ) {
            const type = {
                Color: formik.values.types.color,
                Name: formik.values.types.name,
                Price: formik.values.types.price,
                Sale: formik.values.types.sale,
                Amount: formik.values.types.amount,
                Images: formik.values.types.images,
                Sold: 0,
            };
            setTypesProduct([...typesProduct, type]);
            setReviewImages([]);
            formik.values.types.name = '';
            formik.values.types.color = '';
            formik.values.types.amount = 0;
        } else {
            toast.error(`🦄 Vui Lòng Không Để Trống Các Trường Thông Tin: Loại, Giá, Số Lượng, Hình Ảnh 🦄`, {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    const handleUpdateType = () => {
        const getIndexType = typesProduct.findIndex((type) => {
            return (
                type.Color === updateType.Color &&
                type.Name === updateType.Name &&
                type.Price === updateType.Price &&
                type.Sale === updateType.Sale &&
                type.Amount === updateType.Amount
            );
        });
        typesProduct[getIndexType].Color = formik.values.types.color;
        typesProduct[getIndexType].Name = formik.values.types.name;
        typesProduct[getIndexType].Price = formik.values.types.price;
        typesProduct[getIndexType].Sale = formik.values.types.sale;
        typesProduct[getIndexType].Amount = formik.values.types.amount;
        typesProduct[getIndexType].Images = formik.values.types.images;
        setTypesProduct([...typesProduct]);

        setStatusUpdateType(false);
        setReviewImages([]);
        formik.values.types.name = '';
        formik.values.types.color = '';
        formik.values.types.amount = 0;
    };

    const handleDeleteType = (i) => {
        const newTypes = typesProduct.filter((type, index) => {
            return index !== i;
        });
        setTypesProduct(newTypes);
        setStatusUpdateType(false);
    };

    const handleSelectCategory = (options) => {
        const optionList = options.map((option, index) => {
            return option.value;
        });
        formik.setFieldValue('category_Id', optionList);
    };

    const handleSelectFirm = (option) => {
        formik.setFieldValue('firm_Id', option.value);
    };

    const handleInput = (event, editor) => {
        formik.setFieldValue('description', editor.getData());
    };

    const handleSelectType = (type) => {
        setStatusUpdateType(true);
        setUpdateType(type);
        formik.setFieldValue('types.color', type.Color);
        formik.setFieldValue('types.name', type.Name);
        formik.setFieldValue('types.price', type.Price);
        formik.setFieldValue('types.sale', type.Sale);
        formik.setFieldValue('types.amount', type.Amount);
        if (typeof type.Images[0] === 'object') {
            for (let i = 0; i < type.Images.length; i++) {
                reviewImages1.push(URL.createObjectURL(type.Images[i]));
            }
            setReviewImages(reviewImages1);
        } else {
            setReviewImages(type.Images);
        }
    };

    const uploadMultipleFilesOfType = (e) => {
        const images1 = [];
        for (let i = 0; i < e.target.files.length; i++) {
            reviewImages1.push(URL.createObjectURL(e.target.files[i]));
            images1.push(e.target.files[i]);
        }
        formik.values.types.images = images1;
        setReviewImages(reviewImages1);
    };

    return (
        <div className={cx('wrapper')}>
            {loading && <LoadingCRUD />}

            <ToastContainer />
            <h1 className={cx('header')}>Tạo Sản Phẩm</h1>
            <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                <Label className={cx('form-label')}>Tên Sản Phẩm</Label>
                <Input
                    placeholder="Tên Sản Phẩm"
                    id="name"
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                />
                {formik.errors.name && formik.touched.name ? <ErrorMessage>{formik.errors.name}</ErrorMessage> : null}
                <Label className={cx('form-label')}>Danh Mục</Label>
                <Selects onChangeSelect={handleSelectCategory} data={optionsCate} multiple />
                {formik.errors.category_Id && formik.touched.category_Id ? (
                    <ErrorMessage>{formik.errors.category_Id}</ErrorMessage>
                ) : null}
                <Label className={cx('form-label')}>Hãng</Label>
                <Selects onChangeSelect={handleSelectFirm} data={optionsFirm} multiple={false} />
                {formik.errors.firm_Id && formik.touched.firm_Id ? (
                    <ErrorMessage>{formik.errors.firm_Id}</ErrorMessage>
                ) : null}
                <Label className={cx('form-label')}>Loại</Label>
                <Accordion
                    onHandleDeleteType={handleDeleteType}
                    onHandleAddType={handleAddType}
                    onHandleUpdateType={handleUpdateType}
                    onHandleSelectImage={uploadMultipleFilesOfType}
                    onHandleSelectType={handleSelectType}
                    formik={formik}
                    typesProduct={typesProduct}
                    reviewImages={reviewImages}
                    statusUpdateType={statusUpdateType}
                />
                <Label className={cx('form-label')}>Mô Tả</Label>
                <TextArea onChange={handleInput} />
                {formik.errors.description && formik.touched.description ? (
                    <ErrorMessage>{formik.errors.description}</ErrorMessage>
                ) : null}
                <button type="submit" className={cx('create-btn')}>
                    Tạo Sản Phẩm
                </button>
            </form>
        </div>
    );
}

export default AddProduct;
