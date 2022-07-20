import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import styles from './CardProductSearch.module.scss';
import { Link } from 'react-router-dom';

const cx = classnames.bind(styles);

function CardProductSearch(props) {
    const { product } = props;
    return (
        <Link to={`/product/detail`} state={{ product: product }} className={cx('wrapper')}>
            <img alt="Hình Ảnh Sản Phẩm" src={product.Images[0]} className={cx('img')} />
            <div className={cx('wrapper-info')}>
                <p className={cx('name-product')}>
                    {product.Product.Name} - ({product.Name}/{product.Color})
                </p>

                {product.sale === 0 ? (
                    <span className={cx('new-price')}>{new Intl.NumberFormat('de-DE').format(product.Price)} đ</span>
                ) : (
                    <>
                        <span className={cx('new-price')}>{new Intl.NumberFormat('de-DE').format(product.Sale)} đ</span>
                        <span className={cx('old-price')}>
                            {new Intl.NumberFormat('de-DE').format(product.Price)} đ
                        </span>
                    </>
                )}
            </div>
        </Link>
    );
}

CardProductSearch.propTypes = {
    product: PropTypes.object.isRequired,
};

export default CardProductSearch;
