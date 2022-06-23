import React from 'react';
import classnames from 'classnames';
import styles from './CardProductSearch.module.scss';
import { Link } from 'react-router-dom';

const cx = classnames.bind(styles);

function CardProductSearch(props) {
    const { product } = props;
    return (
        <Link to={`/product/detail`} state={{ product: product }} className={cx('wrapper')}>
            <img src={product.Image[0]} className={cx('img')} />
            <div className={cx('wrapper-info')}>
                <p className={cx('name-product')}>{product.NameProduct}</p>

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

export default CardProductSearch;
