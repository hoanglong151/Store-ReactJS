import React, { useState } from 'react';
import styles from './AddProductStyle.module.scss';
import clsx from 'clsx';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import productsApi from '~/api/productApi';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '~/app/reducerProduct';
import Label from '~/components/Form/Label/Label';
import Input from '~/components/Form/Input/Input';
import Selects from '~/components/Form/Selects/Selects';
import TextArea from '~/components/Form/TextArea/TextArea';
import SelectImage from '~/components/Form/SelectImage/SelectImage';
import ErrorMessage from '~/components/Form/ErrorMessage/ErrorMessage';

function AddProduct() {
    const navigate = useNavigate();
    const categories = useSelector((state) => state.category.categories);
    const firms = useSelector((state) => state.firm.firms);
    const dispatch = useDispatch();

    const fileObj = [];
    const fileArray = [];
    const fileImages = [];
    const [images, setImage] = useState([]);

    const today = new Date();
    let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(today);
    let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(today);
    let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(today);
    const getNowDate = `${ye}-${mo}-${da}`;

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
        price: Yup.number().min(0, 'Tối thiếu 0đ').required('Vui Lòng Nhập Giá Sản Phẩm').integer(),
        amount: Yup.number().min(1, 'Tối thiếu 1 sản phẩm').required('Vui Lòng Nhập số lượng Sản Phẩm').integer(),
        description: Yup.string().required('Vui Lòng Nhập Mô Tả Sản Phẩm'),
        images: Yup.array().min(1, 'Không chọn hình đòi tạo sản phẩm ?'),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            images: [],
            description: '',
            category_Id: [],
            amount: 0,
            sale: 0,
            price: 0,
            createDate: getNowDate,
            updateDate: '',
            sold: 0,
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
        <div className={clsx(styles.wrapper)}>
            <h1 className={clsx(styles.header)}>Tạo Sản Phẩm</h1>
            <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                <Label>Ngày Tạo</Label>
                <Input
                    id="createDate"
                    name="createDate"
                    onChange={formik.handleChange}
                    value={formik.values.createDate ? formik.values.createDate : getNowDate}
                    type="date"
                />
                <Label>Tên Sản Phẩm</Label>
                <Input
                    id="name"
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    placeholder="Tên Sản Phẩm"
                    errors={formik.touched.name && formik.errors.name}
                />
                {formik.errors.name && formik.touched.name ? <ErrorMessage>{formik.errors.name}</ErrorMessage> : null}
                <Label>Danh Mục</Label>
                <Selects onChangeSelect={handleSelectCategory} data={optionsCate} multiple />
                <Label>Hãng</Label>
                <Selects onChangeSelect={handleSelectFirm} data={optionsFirm} multiple={false} />
                <Label>Mô Tả</Label>
                <TextArea onChange={handleInput} />
                <Label>Giá Sản Phẩm</Label>
                <Input
                    id="price"
                    name="price"
                    onChange={formik.handleChange}
                    value={formik.values.price}
                    type="number"
                    placeholder="Giá Sản Phẩm"
                    errors={formik.touched.price && formik.errors.price}
                />
                {formik.errors.price && formik.touched.price ? (
                    <ErrorMessage>{formik.errors.price}</ErrorMessage>
                ) : null}
                <Label>Giá Khuyến Mãi</Label>
                <Input
                    id="sale"
                    name="sale"
                    onChange={formik.handleChange}
                    value={formik.values.sale}
                    type="number"
                    placeholder="Giá Khuyến Mãi"
                />
                <Label>Số Lượng</Label>
                <Input
                    id="amount"
                    name="amount"
                    onChange={formik.handleChange}
                    value={formik.values.amount}
                    type="number"
                    placeholder="Số Lượng"
                />
                <Label>Hình Ảnh</Label>
                <SelectImage id="images" name="images" images={images} onChange={uploadMultipleFiles} />
                <div>
                    {formik.errors.images && formik.touched.images ? (
                        <ErrorMessage>{formik.errors.images}</ErrorMessage>
                    ) : null}
                </div>
                <button type="submit" className={clsx(styles.createBtn)}>
                    Tạo Sản Phẩm
                </button>
            </form>
        </div>
    );
}

export default AddProduct;
