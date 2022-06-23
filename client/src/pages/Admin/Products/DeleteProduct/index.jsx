import productsApi from '~/api/productsApi';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Sliders from '~/components/Sliders/Slider';
import DOMPurify from 'dompurify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import classnames from 'classnames/bind';
import styles from './DeleteProduct.module.scss';

const cx = classnames.bind(styles);

function DeleteProduct() {
    let { id } = useParams();
    const { state } = useLocation();
    const { product } = state;
    const [productDelete, setProductDelete] = useState({});
    const [typeByColor, setTypeByColor] = useState({});
    const [typeSelect, setTypeSelect] = useState({});
    const [filterType, setFilterType] = useState([]);
    const navigate = useNavigate();
    const DeleteSwal = withReactContent(Swal);
    useEffect(() => {
        const mapCategories = product.Category_ID.map((category) => ({
            value: category._id,
            label: category.Name,
        }));

        const getTypeCheap = product.TypesProduct.reduce((pre, next) => {
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

        const deleteProduct = { ...product, Category_ID: mapCategories };
        setProductDelete(deleteProduct);
    }, []);

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
                popup: `${cx('popup')}`,
            },
        }).then((result) => {
            if (result.isConfirmed) {
                const deleteProduct = async () => {
                    const responseResult = await productsApi.deleteProduct(id);
                    if (responseResult) {
                        DeleteSwal.fire({
                            title: 'Sản Phẩm Đã Được Xóa',
                            customClass: {
                                popup: `${cx('popup')}`,
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
        <div className={cx('wrapper')}>
            <div className={cx('images')}>
                <Sliders data={productDelete.Image || []} />
                <div className={cx('action')}>
                    <button className={cx('btn')} onClick={handleDeleteProduct}>
                        Delete
                    </button>
                </div>
            </div>
            <div className={cx('content')}>
                <h1>Giới Thiệu Sản Phẩm</h1>
                <h2>
                    {productDelete.Name}
                    <span className={cx('show-description')}>{`(${typeSelect.Name} ${
                        filterType[0]?.Color && '- ' + typeByColor?.Color
                    })`}</span>
                </h2>
                <div className={cx('price-info')}>
                    <span className={cx('title-price')}>Giá: </span>
                    {typeSelect.Sale === 0 ? (
                        <span className={cx('price')}>
                            {new Intl.NumberFormat('de-DE').format(typeSelect.Price)} VNĐ
                        </span>
                    ) : (
                        <>
                            <span className={cx('sale')}>
                                {new Intl.NumberFormat('de-DE').format(typeSelect.Sale)} VNĐ
                            </span>
                            <span className={cx('sale-price')}>
                                {new Intl.NumberFormat('de-DE').format(typeSelect.Price)} VNĐ
                            </span>
                        </>
                    )}
                </div>
                <div className={cx('wrapper-type')}>
                    <div className={cx('wrapper-item')}>
                        {typeByColor.type &&
                            typeByColor?.type.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <div
                                            className={cx('item', {
                                                active: item.Name === typeSelect.Name,
                                                'sold-out': item.Amount <= 0,
                                            })}
                                            onClick={item.Amount <= 0 ? undefined : () => handleSelectType(item)}
                                        >
                                            <p className={cx('type-description')}>{item.Name}</p>
                                            <p className={cx('type-price')}>
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
                        <div className={cx('wrapper-color')}>
                            <h4 className={cx('title-select-color')}>Chọn màu để xem giá mặt hàng</h4>
                            <div className={cx('wrapper-item')}>
                                {filterType.map((item, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className={cx('item', {
                                                active: item.Color === typeByColor.Color,
                                            })}
                                            onClick={() => handleSelectTypeByColor(item)}
                                        >
                                            <div>
                                                <p className={cx('type-description')}>{item.Color}</p>
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
