import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Sliders from '~/components/Sliders/Slider';
import DOMPurify from 'dompurify';
import { addProductToCart } from '~/app/reducerCart';
import classnames from 'classnames/bind';
import styles from './ProductDetail.module.scss';

const cx = classnames.bind(styles);

function ProductDetail() {
    const { state } = useLocation();
    const { product } = state;

    let navigate = useNavigate();
    const [typeByColor, setTypeByColor] = useState({});
    const [typeSelect, setTypeSelect] = useState({});
    const [allTypeOfProduct, setAllTypeOfProduct] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const getAllTypeOfProduct = product.TypesProduct.reduce((pre, next) => {
            if (pre.length === 0) {
                return [
                    ...pre,
                    {
                        Color: next.Color,
                        Types: [
                            {
                                _id: next._id,
                                Images: next.Images,
                                Type: next.Name,
                                Amount: next.Amount,
                                Price: next.Price,
                                Sale: next.Sale,
                            },
                        ],
                    },
                ];
            } else {
                const findIndexPre = pre.findIndex((item) => item.Color === next.Color);
                if (findIndexPre !== -1) {
                    pre[findIndexPre] = {
                        ...pre[findIndexPre],
                        Types: [
                            ...pre[findIndexPre].Types,
                            {
                                _id: next._id,
                                Images: next.Images,
                                Type: next.Name,
                                Amount: next.Amount,
                                Price: next.Price,
                                Sale: next.Sale,
                            },
                        ],
                    };
                } else {
                    pre.push({
                        Color: next.Color,
                        Types: [
                            {
                                _id: next._id,
                                Images: next.Images,
                                Type: next.Name,
                                Amount: next.Amount,
                                Price: next.Price,
                                Sale: next.Sale,
                            },
                        ],
                    });
                }
                return pre;
            }
        }, []);
        setAllTypeOfProduct(getAllTypeOfProduct);

        const typeOfColor = getAllTypeOfProduct.find((color) => color.Color === product.Color);
        setTypeByColor(typeOfColor);

        setTypeSelect({
            _id: product._id,
            Color: product.Color,
            Type: product.Type,
            Images: product.Images,
            Amount: product.Amount,
            Price: product.Price,
            Sale: product.Sale,
        });
    }, [product]);

    const handleSelectTypeByColor = (type) => {
        setTypeByColor(type);
        setTypeSelect({ ...type.Types[0], Color: type.Color });
    };

    const handleSelectType = (type) => {
        setTypeSelect({ ...type, Color: typeByColor.Color });
    };

    const handleAddToCart = (type) => {
        const itemProduct = {
            _id: product.ID_Product,
            Name: product.Name,
            Image: type.Images,
            Price: type.Price,
            Sale: type.Sale,
            Description: type.Type,
            Color: type.Color,
            TypeProductID: type._id,
        };
        dispatch(addProductToCart(itemProduct));
        navigate('/cart');
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('images')}>
                <Sliders data={typeSelect.Images || []} />
            </div>
            <div className={cx('content')}>
                <h1 className={cx('content__header--title')}>Giới Thiệu Sản Phẩm</h1>
                <h2 className={cx('content__product--name')}>
                    {product.Name}
                    <span className={cx('show-description')}>{`(${typeSelect.Type} ${
                        typeSelect.Color && '- ' + typeSelect.Color
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
                        {Object.keys(typeByColor).length !== 0 &&
                            typeByColor.Types.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <div
                                            className={cx('item', {
                                                active: item.Type === typeSelect.Type,
                                                'sold-out': item.Amount <= 0,
                                            })}
                                            onClick={item.Amount <= 0 ? undefined : () => handleSelectType(item)}
                                        >
                                            <p className={cx('type-description')}>{item.Type}</p>
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
                    {allTypeOfProduct[0]?.Color && (
                        <div className={cx('wrapper-color')}>
                            <h4 className={cx('title-select-color')}>Chọn màu để xem giá mặt hàng</h4>
                            <div className={cx('wrapper-item')}>
                                {allTypeOfProduct.map((item, index) => {
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
                <button onClick={() => handleAddToCart(typeSelect)} className={cx('btn')}>
                    <h3 className={cx('add-cart')}>Mua Ngay</h3>
                    <p className={cx('method-payment')}>(Giao tận nơi hoặc lấy tại cửa hàng)</p>
                </button>
            </div>
            <div
                className={cx('description')}
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.Description) }}
            />
        </div>
    );
}

export default ProductDetail;
