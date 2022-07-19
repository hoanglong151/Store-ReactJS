import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { categoriesApi, firmsApi, productsApi } from '~/api';
import Label from '~/components/Form/Label/Label';
import Input from '~/components/Form/Input/Input';
import ErrorMessage from '~/components/Form/ErrorMessage/ErrorMessage';
import Selects from '~/components/Form/Selects';
import TextArea from '~/components/Form/TextArea';
import Accordion from '~/components/Form/Accordion/Accordion';
import classnames from 'classnames/bind';
import styles from './EditProduct.module.scss';
import LoadingCRUD from '~/components/Loading/LoadingCRUD';

const cx = classnames.bind(styles);

function EditProduct() {
    const { state } = useLocation();
    const { product } = state;
    const [loading, setLoading] = useState(false);
    const [productEdit, setProductEdit] = useState({});
    const [productImageOld, setProductImageOld] = useState([]);
    let reviewImages1 = [];
    const [reviewImages, setReviewImages] = useState([]);
    const [select, setSelect] = useState([]);
    const [typesProduct, setTypesProduct] = useState([]);
    const [categories, setCategories] = useState([]);
    const [firms, setFirms] = useState([]);
    const [statusUpdateType, setStatusUpdateType] = useState(false);
    const [updateType, setUpdateType] = useState({});

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
        const editProduct = {
            ...product,
            Category_ID: mapCategoriesProduct,
            Firm_ID: { value: product.Firm_ID._id, label: product.Firm_ID.Name },
        };
        setProductEdit(editProduct);
        setTypesProduct(product.TypesProduct);
        setSelect(mapCategories);
    }, [product]);

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
        category_Id: Yup.array().min(1, 'Vui Lòng Chọn Danh Mục'),
        firm_Id: Yup.string().required('Vui Lòng Chọn Hãng'),
        description: Yup.string().required('Vui Lòng Nhập Mô Tả Sản Phẩm'),
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: productEdit?._id ? productEdit._id : '',
            name: productEdit?.Name ? productEdit.Name : '',
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
                    fd.append('imagesOld', productImageOld);
                    typesProduct.forEach((type, index) => {
                        type.Images.forEach((image) => {
                            fd.append(`typeImage${index}`, image);
                        });
                    });
                    fd.append('typesProduct', JSON.stringify(typesProduct));
                    try {
                        setLoading(true);
                        const result = await productsApi.editProduct(fd);
                        if (result.Exist) {
                            toast.error(`🦄 ${result.Exist}`, {
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
            formik.values.types.price !== '' &&
            formik.values.types.amount !== 0 &&
            formik.values.types.images.length !== 0
        ) {
            const type = {
                Color: formik.values.types.color,
                Name: formik.values.types.name,
                Price: formik.values.types.price,
                Sale: formik.values.types.sale,
                Images: formik.values.types.images,
                Amount: formik.values.types.amount,
                Sold: 0,
            };
            setTypesProduct([...typesProduct, type]);
            setReviewImages([]);
            formik.values.types.description = '';
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
        if (
            typeof typesProduct[getIndexType].Images[0] === 'string' &&
            typeof formik.values.types.images[0] === 'object'
        ) {
            setProductImageOld([...productImageOld, ...typesProduct[getIndexType].Images]);
            typesProduct[getIndexType].Images = formik.values.types.images;
        }
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

        const deleteTypes = typesProduct.find((type, index) => {
            return index === i;
        });
        if (typeof deleteTypes.Images[0] === 'string') {
            setProductImageOld([...productImageOld, ...deleteTypes.Images]);
        }
        setTypesProduct(newTypes);
    };

    const handleSelectCategory = (options) => {
        setProductEdit({ ...productEdit, Category_ID: options });
        const optionList = options.map((option, index) => {
            return option.value;
        });
        setSelect(optionList);
        formik.setFieldValue('category_Id', optionList);
    };

    const handleSelectFirm = (option) => {
        setProductEdit({ ...productEdit, Firm_ID: option });
        formik.setFieldValue('firm_Id', option.value);
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

    const handleInput = (event, editor) => {
        formik.setFieldValue('description', editor.getData());
    };

    return (
        <div className={cx('wrapper')}>
            {loading && <LoadingCRUD />}
            <ToastContainer />
            <h1 className={cx('header')}>Cập Nhật Sản Phẩm</h1>
            <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                <Label className={cx('form-label')}>Tên Sản Phẩm</Label>
                <Input
                    id="name"
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    placeholder="Tên Sản Phẩm"
                    errors={formik.touched.name && formik.errors.name}
                />
                {formik.errors.name && formik.touched.name ? <ErrorMessage>{formik.errors.name}</ErrorMessage> : null}
                <Label className={cx('form-label')}>Danh Mục</Label>
                <Selects
                    onChangeSelect={handleSelectCategory}
                    data={options}
                    select={productEdit.Category_ID}
                    multiple
                />
                {formik.errors.category_Id && formik.touched.category_Id ? (
                    <ErrorMessage>{formik.errors.category_Id}</ErrorMessage>
                ) : null}
                <Label className={cx('form-label')}>Hãng</Label>
                <Selects onChangeSelect={handleSelectFirm} select={productEdit.Firm_ID} data={optionsFirm} />
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
                <TextArea data={formik.values.description} onChange={handleInput} />
                {formik.errors.description && formik.touched.description ? (
                    <ErrorMessage>{formik.errors.description}</ErrorMessage>
                ) : null}
                <button type="submit" className={cx('create-btn')}>
                    Cập Nhật Sản Phẩm
                </button>
            </form>
        </div>
    );
}

export default EditProduct;
