import productsApi from '~/api/productsApi';
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
    const [typeByColor, setTypeByColor] = useState({});
    const [typeSelect, setTypeSelect] = useState({});
    const [filterType, setFilterType] = useState([]);
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

            const getTypeCheap = getProduct.TypesProduct.reduce((pre, next) => {
                if (pre.Sale !== 0 && next.Sale !== 0) {
                    return pre.Sale < next.Sale ? pre : next;
                } else if (pre.Sale !== 0 && next.Sale === 0) {
                    return pre.Sale < next.Price ? pre : next;
                } else if (pre.Sale === 0 && next.Sale !== 0) {
                    return pre.Price < next.Sale ? pre : next;
                } else {
                    return pre.Price < next.Price ? pre : next;
                }
            });

            setTypeSelect(getTypeCheap);

            const deleteProduct = { ...getProduct, Category_ID: mapCategories };
            setProductDelete(deleteProduct);
        }
    }, [products]);

    const handleSelectTypeByColor = (type) => {
        setTypeByColor(type);
        setTypeSelect(type.type[0]);
    };

    const handleSelectType = (type) => {
        setTypeSelect(type);
    };

    useEffect(() => {
        if (productDelete.TypesProduct) {
            const result = productDelete.TypesProduct.reduce((pre, next, i) => {
                if (pre.length !== 0) {
                    const getTypeByColor = pre.find((item) => item.Color === next.Color);
                    const getTypeByColorIndex = pre.findIndex((item) => item.Color === next.Color);
                    if (getTypeByColor) {
                        getTypeByColor.type.map((typeByColor) => {
                            if (typeByColor.Name === next.Name) {
                                return typeByColor;
                            } else {
                                pre[getTypeByColorIndex] = {
                                    ...pre[getTypeByColorIndex],
                                    type: [
                                        ...pre[getTypeByColorIndex].type,
                                        {
                                            _id: next._id,
                                            Name: next.Name,
                                            Price: next.Price,
                                            Sale: next.Sale,
                                            Amount: next.Amount,
                                            Sold: next.Sold,
                                        },
                                    ],
                                };
                                return pre;
                            }
                        });
                    } else {
                        pre.push({
                            Color: next.Color,
                            type: [
                                {
                                    _id: next._id,
                                    Name: next.Name,
                                    Price: next.Price,
                                    Sale: next.Sale,
                                    Amount: next.Amount,
                                    Sold: next.Sold,
                                },
                            ],
                        });
                    }
                } else {
                    pre.push({
                        Color: next.Color,
                        type: [
                            {
                                _id: next._id,
                                Name: next.Name,
                                Price: next.Price,
                                Sale: next.Sale,
                                Amount: next.Amount,
                                Sold: next.Sold,
                            },
                        ],
                    });
                }
                return pre;
            }, []);
            setFilterType(result);
            const data = result.find((product) => product.Color == typeSelect.Color);
            setTypeByColor(data);
        }
    }, [productDelete.TypesProduct]);

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
                <h2>
                    {productDelete.Name}
                    <span className={clsx(styles.showDescription)}>{`(${typeSelect.Name} ${
                        filterType[0]?.Color && '- ' + typeByColor?.Color
                    })`}</span>
                </h2>
                <div className={clsx(styles.priceInfo)}>
                    <span className={clsx(styles.titlePrice)}>Giá: </span>
                    {typeSelect.Sale === 0 ? (
                        <span className={clsx(styles.price)}>
                            {new Intl.NumberFormat('de-DE').format(typeSelect.Price)} VNĐ
                        </span>
                    ) : (
                        <>
                            <span className={clsx(styles.sale)}>
                                {new Intl.NumberFormat('de-DE').format(typeSelect.Sale)} VNĐ
                            </span>
                            <span className={clsx(styles.salePrice)}>
                                {new Intl.NumberFormat('de-DE').format(typeSelect.Price)} VNĐ
                            </span>
                        </>
                    )}
                </div>
                <div className={clsx(styles.wrapperType)}>
                    <div className={clsx(styles.wrapperItem)}>
                        {typeByColor.type &&
                            typeByColor?.type.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <div
                                            className={clsx(styles.item, {
                                                [styles.active]: item.Name === typeSelect.Name,
                                                [styles.soldOut]: item.Amount <= 0,
                                            })}
                                            onClick={item.Amount <= 0 ? undefined : () => handleSelectType(item)}
                                        >
                                            <p className={clsx(styles.typeDescription)}>{item.Name}</p>
                                            <p className={clsx(styles.typePrice)}>
                                                {item.Sale !== 0
                                                    ? new Intl.NumberFormat().format(item.Sale)
                                                    : item.Price}{' '}
                                                VNĐ
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                    {filterType[0]?.Color && (
                        <div className={clsx(styles.wrapperColor)}>
                            <h4 className={clsx(styles.titleSelectColor)}>Chọn màu để xem giá mặt hàng</h4>
                            <div className={clsx(styles.wrapperItem)}>
                                {filterType.map((item, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className={clsx(styles.item, {
                                                [styles.active]: item.Color === typeByColor.Color,
                                            })}
                                            onClick={() => handleSelectTypeByColor(item)}
                                        >
                                            <div>
                                                <p className={clsx(styles.typeDescription)}>{item.Color}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(productDelete.Description) }} />
            </div>
        </div>
    );
}

export default DeleteProduct;
