import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import styles from './CardProduct.module.scss';
import { Link } from 'react-router-dom';

const cx = classnames.bind(styles);

function CardProduct(props) {
    const { boxShadow, product } = props;

    return (
        <div className={cx('wrapper', { 'box-shadow': boxShadow })}>
            <Link to={`/product/detail`} state={{ product: product }}>
                <img alt="Hình Ảnh Sản Phẩm" className={cx('image')} src={product.Images[0]} />
            </Link>
            <div className={cx('info')}>
                <Link to={`/product/detail`} state={{ product: product }}>
                    <h4 className={cx('name')}>
                        {product.Name}
                        <span>{` (${product.Color} / ${product.Type})`}</span>
                    </h4>
                </Link>
                {product.Sale === 0 ? (
                    <span className={cx('price-now')}>{new Intl.NumberFormat('de-DE').format(product.Price)} đ</span>
                ) : (
                    <>
                        <span className={cx('price-now')}>{new Intl.NumberFormat('de-DE').format(product.Sale)} đ</span>
                        <span className={cx('price-old')}>
                            {new Intl.NumberFormat('de-DE').format(product.Price)} đ
                        </span>
                    </>
                )}

                <p className={cx('info-sale')}>
                    [HOT] Thu cũ lên đời giá cao - Thủ tục nhanh - Trợ giá lên tới 1.000.000đ và 1 km khác
                </p>
            </div>
        </div>
    );
}

CardProduct.propTypes = {
    boxShadow: PropTypes.bool,
    product: PropTypes.object.isRequired,
};

export default CardProduct;
