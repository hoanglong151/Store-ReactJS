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
    const [firms, setFirms] = useState([]);
    const [categories, setCategories] = useState([]);
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

    const fileObj = [];
    const fileArray = [];
    const fileImages = [];
    const [images, setImage] = useState([]);
    const [typesProduct, setTypesProduct] = useState([]);

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
        images: Yup.array().min(1, 'Không chọn hình đòi tạo sản phẩm ?'),
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
            },
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const submit = async () => {
                const fd = new FormData();
                for (let key in values) {
                    fd.append(key, values[key]);
                }
                values.images.map((image, index) => {
                    fd.append('images', image);
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
                Sold: 0,
            };
            setTypesProduct([...typesProduct, type]);
            formik.values.types.name = '';
            formik.values.types.color = '';
            formik.values.types.price = formik.values.types.price;
            formik.values.types.sale = formik.values.types.sale;
            formik.values.types.amount = 0;
        }
    };

    const handleDeleteType = (i) => {
        const newTypes = typesProduct.filter((type, index) => {
            return index !== i;
        });
        setTypesProduct(newTypes);
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

    const uploadMultipleFiles = (e) => {
        fileObj.push(e.target.files);
        for (let i = 0; i < fileObj[0].length; i++) {
            fileArray.push(URL.createObjectURL(fileObj[0][i]));
            fileImages.push(fileObj[0][i]);
        }
        formik.setFieldValue('images', fileImages);
        setImage(fileArray);
    };

    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('header')}>Tạo Sản Phẩm</h1>
            <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                <Label>Tên Sản Phẩm</Label>
                <Input
                    placeholder="Tên Sản Phẩm"
                    id="name"
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                />
                {formik.errors.name && formik.touched.name ? <ErrorMessage>{formik.errors.name}</ErrorMessage> : null}
                <Label>Danh Mục</Label>
                <Selects onChangeSelect={handleSelectCategory} data={optionsCate} multiple />
                <Label>Hãng</Label>
                <Selects onChangeSelect={handleSelectFirm} data={optionsFirm} multiple={false} />
                <Label>Loại</Label>
                <Accordion
                    onHandleDeleteType={handleDeleteType}
                    onHandleAddType={handleAddType}
                    formik={formik}
                    typesProduct={typesProduct}
                />
                <Label>Mô Tả</Label>
                <TextArea onChange={handleInput} />
                <Label>Hình Ảnh</Label>
                <SelectImage id="images" name="images" images={images} onChange={uploadMultipleFiles} />
                <div>
                    {formik.errors.images && formik.touched.images ? (
                        <ErrorMessage>{formik.errors.images}</ErrorMessage>
                    ) : null}
                </div>
                <button type="submit" className={cx('create-btn')}>
                    Tạo Sản Phẩm
                </button>
            </form>
        </div>
    );
}

export default AddProduct;
