import productsApi from '~/api/productApi';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './DeleteProduct.module.scss';
import clsx from 'clsx';
import Sliders from '~/components/Sliders/Slider/Slider';
import DOMPurify from 'dompurify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function DeleteProduct() {
    let { id } = useParams();
    const [productDelete, setProductDelete] = useState({});
    const navigate = useNavigate();
    const DeleteSwal = withReactContent(Swal);
    const { products } = useSelector((state) => state.product);
    useEffect(() => {
        const getProduct = products.find((product) => product._id === id);
        if (getProduct !== undefined) {
            const mapCategories = getProduct.Category_ID.map((category) => ({
                value: category._id,
                label: category.Name,
            }));

            const detailProduct = { ...getProduct, Category_ID: mapCategories };
            setProductDelete(detailProduct);
        }
    }, [products]);

    const handleDeleteProduct = () => {
        DeleteSwal.fire({
            title: 'Bạn muốn xóa sản phẩm này?',
            icon: 'error',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Đồng Ý',
            cancelButtonText: 'Hủy',
            customClass: {
                popup: `${clsx(styles.popup)}`,
            },
        }).then((result) => {
            if (result.isConfirmed) {
                const deleteProduct = async () => {
                    const responseResult = await productsApi.deleteProduct(id);
                    if (responseResult) {
                        DeleteSwal.fire({
                            title: 'Sản Phẩm Đã Được Xóa',
                            customClass: {
                                popup: `${clsx(styles.popup)}`,
                            },
                        }).then((action) => {
                            if (action.isConfirmed) {
                                navigate('/Admin/Products');
                            }
                        });
                    }
                };
                deleteProduct();
            }
        });
    };
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.images)}>
                <Sliders data={productDelete.Image || []} />
                <div className={clsx(styles.action)}>
                    <button className={clsx(styles.btn)} onClick={handleDeleteProduct}>
                        Delete
                    </button>
                </div>
            </div>
            <div className={clsx(styles.content)}>
                <h1>Giới Thiệu Sản Phẩm</h1>
                <h2>{productDelete.Name}</h2>
                <div className={clsx(styles.wrapperType)}>
                    <div>
                        {productDelete.TypesProduct ? (
                            productDelete.TypesProduct.map((type, index) => (
                                <div key={index} className={clsx(styles.item)}>
                                    <p className={clsx(styles.typeDescription)}>{type.description}</p>
                                    <p className={clsx(styles.typePrice)}>
                                        {type.sale !== 0 ? new Intl.NumberFormat().format(type.sale) : type.price} VNĐ
                                    </p>
                                </div>
                            ))
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(productDelete.Description) }} />
            </div>
        </div>
    );
}

export default DeleteProduct;
