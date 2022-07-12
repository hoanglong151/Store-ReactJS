import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import productsApi from '~/api/productsApi';
import { useNavigate } from 'react-router-dom';
import Label from '~/components/Form/Label/Label';
import Input from '~/components/Form/Input/Input';
import Selects from '~/components/Form/Selects';
import TextArea from '~/components/Form/TextArea';
import SelectImage from '~/components/Form/SelectImage/SelectImage';
import ErrorMessage from '~/components/Form/ErrorMessage/ErrorMessage';
import Accordion from '~/components/Form/Accordion/Accordion';
import { categoriesApi, firmsApi } from '~/api';
import classnames from 'classnames/bind';
import styles from './AddProduct.module.scss';

const cx = classnames.bind(styles);

function AddProduct() {
    let reviewImages1 = [];
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
        // price: Yup.number().min(0, 'Tối thiếu 0đ').required('Vui Lòng Nhập Giá Sản Phẩm').integer(),
        // amount: Yup.number().min(1, 'Tối thiếu 1 sản phẩm').required('Vui Lòng Nhập số lượng Sản Phẩm').integer(),
        description: Yup.string().required('Vui Lòng Nhập Mô Tả Sản Phẩm'),
        // images: Yup.array().min(1, 'Không chọn hình đòi tạo sản phẩm ?'),
    });

    const formik = useFormik({
        initialValues: {
            images: [],
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
                const fd = new FormData();
                for (let key in values) {
                    fd.append(key, values[key]);
                }
                typesProduct.map((type, index) => {
                    type.Images.map((image) => {
                        fd.append(`typeImage${index}`, image);
                    });
                });
                fd.append('typesProduct', JSON.stringify(typesProduct));
                try {
                    await productsApi.addProduct(fd);
                    navigate('/Admin/Products');
                } catch (err) {
                    throw Error(err.message);
                }
            };
            submit();
        },
    });

    const handleAddType = () => {
        if (formik.values.types.name !== '' && formik.values.types.price !== 0 && formik.values.types.amount !== 0) {
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
            formik.values.types.price = formik.values.types.price;
            formik.values.types.sale = formik.values.types.sale;
            formik.values.types.amount = 0;
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
        formik.values.types.price = formik.values.types.price;
        formik.values.types.sale = formik.values.types.sale;
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
                <Label className={cx('form-label')}>Hãng</Label>
                <Selects onChangeSelect={handleSelectFirm} data={optionsFirm} multiple={false} />
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
                <button type="submit" className={cx('create-btn')}>
                    Tạo Sản Phẩm
                </button>
            </form>
        </div>
    );
}

export default AddProduct;
