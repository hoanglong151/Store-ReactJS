import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { categoriesApi, firmsApi, productsApi } from '~/api';
import Label from '~/components/Form/Label/Label';
import Input from '~/components/Form/Input/Input';
import ErrorMessage from '~/components/Form/ErrorMessage/ErrorMessage';
import Selects from '~/components/Form/Selects';
import TextArea from '~/components/Form/TextArea';
import SelectImage from '~/components/Form/SelectImage/SelectImage';
import Accordion from '~/components/Form/Accordion/Accordion';
import classnames from 'classnames/bind';
import styles from './EditProduct.module.scss';

const cx = classnames.bind(styles);

function EditProduct() {
    let { id } = useParams();
    const { state } = useLocation();
    const { product } = state;
    const [productEdit, setProductEdit] = useState({});
    const [productImageOld, setProductImageOld] = useState([]);
    const fileObj = [];
    const fileArray = [];
    const fileImages = [];
    const [images, setImages] = useState([]);
    const [select, setSelect] = useState([]);
    const [typesProduct, setTypesProduct] = useState([]);
    const [categories, setCategories] = useState([]);
    const [firms, setFirms] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const getCategories = async () => {
            const result = await categoriesApi.getAll();
            setCategories(result.categories);
        };

        const getFirms = async () => {
            const result = await firmsApi.getAll();
            setFirms(result.firms);
        };
        getCategories();
        getFirms();
    }, []);

    useEffect(() => {
        const mapCategories = product.Category_ID.map((category) => category._id);
        const mapCategoriesProduct = product.Category_ID.map((category) => ({
            value: category._id,
            label: category.Name,
        }));
        const getIndexCreateDate = product.CreateDate.indexOf('T');
        const formatCreateDate = product.CreateDate.slice(0, getIndexCreateDate);
        const getIndexUpdateDate = product.UpdateDate ? product.UpdateDate.indexOf('T') : null;
        const formatUpdateDate = product.UpdateDate ? product.UpdateDate.slice(0, getIndexUpdateDate) : null;
        const editProduct = {
            ...product,
            Category_ID: mapCategoriesProduct,
            CreateDate: formatCreateDate,
            UpdateDate: formatUpdateDate,
            Firm_ID: { value: product.Firm_ID._id, label: product.Firm_ID.Name },
        };
        setProductEdit(editProduct);
        setTypesProduct(product.TypesProduct);
        setProductImageOld(product.Image);
        setImages(product.Image);
        setSelect(mapCategories);
    }, []);

    const today = new Date();
    let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(today);
    let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(today);
    let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(today);
    const getNowDate = `${ye}-${mo}-${da}`;

    const options = categories?.map((cate, index) => {
        return {
            value: cate._id,
            label: cate.Name,
        };
    });

    const optionsFirm = firms?.map((firm, index) => {
        return {
            value: firm._id,
            label: firm.Name,
        };
    });

    const validationSchema = Yup.object().shape({
        name: Yup.string('Nhập Tên Sản Phẩm').required('Vui Lòng Nhập Tên Sản Phẩm'),
        // price: Yup.number().min(0, 'Tối thiếu 0đ').required('Vui Lòng Nhập Giá Sản Phẩm').integer(),
        // amount: Yup.number().min(1, 'Tối thiếu 1 sản phẩm').required('Vui Lòng Nhập số lượng Sản Phẩm').integer(),
        description: Yup.string().required(),
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: productEdit?._id ? productEdit._id : '',
            name: productEdit?.Name ? productEdit.Name : '',
            images: productEdit?.Image ? productEdit.Image : [],
            description: productEdit?.Description ? productEdit.Description : '',
            category_Id: select,
            firm_Id: productEdit.Firm_ID?.value,
            types: {
                color: '',
                name: '',
                price: 0,
                sale: 0,
                amount: 0,
                sold: 0,
            },
            createDate: productEdit?.CreateDate ? productEdit.CreateDate : '',
            updateDate: productEdit?.UpdateDate ? productEdit.UpdateDate : getNowDate,
        },
        // validationSchema: validationSchema,
        onSubmit: (values) => {
            const submit = async () => {
                const fd = new FormData();
                for (let key in values) {
                    fd.append(key, values[key]);
                }
                if (typeof values.images[0] === 'object') {
                    values.images.map((image, index) => {
                        fd.append('images', image);
                    });
                    fd.append('imagesOld', productImageOld);
                }
                fd.append('typesProduct', JSON.stringify(typesProduct));
                try {
                    await productsApi.editProduct(fd);
                    navigate('/Admin/Products');
                } catch (err) {
                    throw Error(err.message);
                }
            };
            submit();
        },
    });

    const handleAddType = () => {
        if (formik.values.types.name !== '' && formik.values.types.price !== '' && formik.values.types.amount !== 0) {
            const type = {
                Color: formik.values.types.color,
                Name: formik.values.types.name,
                Price: formik.values.types.price,
                Sale: formik.values.types.sale,
                Amount: formik.values.types.amount,
                Sold: 0,
            };
            setTypesProduct([...typesProduct, type]);
            formik.values.types.description = '';
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
        setProductEdit({ ...productEdit, Category_ID: options });
        const optionList = options.map((option, index) => {
            return option.value;
        });
        formik.setFieldValue('category_Id', optionList);
    };

    const handleSelectFirm = (option) => {
        setProductEdit({ ...productEdit, Firm_ID: option });
        formik.setFieldValue('firm_Id', option.value);
    };

    const uploadMultipleFiles = (e) => {
        fileObj.push(e.target.files);
        for (let i = 0; i < fileObj[0].length; i++) {
            fileArray.push(URL.createObjectURL(fileObj[0][i]));
            fileImages.push(fileObj[0][i]);
        }
        formik.setFieldValue('images', fileImages);
        setImages(fileArray);
    };

    const handleInput = (event, editor) => {
        formik.setFieldValue('description', editor.getData());
    };

    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('header')}>Cập Nhật Sản Phẩm</h1>
            <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                <Label>Ngày Tạo</Label>
                <Input
                    id="createDate"
                    name="createDate"
                    onChange={formik.handleChange}
                    value={formik.values.createDate}
                    type="date"
                />
                <Label>Ngày Cập Nhật</Label>
                <Input
                    id="updateDate"
                    name="updateDate"
                    onChange={formik.handleChange}
                    value={formik.values.updateDate ? formik.values.updateDate : getNowDate}
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
                <Selects
                    onChangeSelect={handleSelectCategory}
                    data={options}
                    select={productEdit.Category_ID}
                    multiple
                />
                <Label>Hãng</Label>
                <Selects
                    onChangeSelect={handleSelectFirm}
                    select={productEdit.Firm_ID}
                    data={optionsFirm}
                    multiple={false}
                />
                <Label>Loại</Label>
                <Accordion
                    onHandleDeleteType={handleDeleteType}
                    onHandleAddType={handleAddType}
                    formik={formik}
                    typesProduct={typesProduct}
                />
                <Label>Mô Tả</Label>
                <TextArea data={formik.values.description} onChange={handleInput} />
                <Label>Hình Ảnh</Label>
                <SelectImage id="images" name="images" images={images} onChange={uploadMultipleFiles} />
                <button type="submit" className={cx('create-btn')}>
                    Cập Nhật Sản Phẩm
                </button>
            </form>
        </div>
    );
}

export default EditProduct;