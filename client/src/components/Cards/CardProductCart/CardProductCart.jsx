import React from 'react';
import classnames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import styles from './CardProductCart.module.scss';

const cx = classnames.bind(styles);

function CardProductCart(props) {
    const { product, onIncrease, onDecrease, onRemove } = props;
    return (
        <div className={cx('wrapper-cart')}>
            <button className={cx('btn-close')} onClick={() => onRemove(product)}>
                <FontAwesomeIcon icon={faXmark} />
            </button>
            <img className={cx('image')} src={product.Image[0]} />
            <div className={cx('info-product')}>
                <h3 className={cx('name-product')}>
                    {product.Name + ` (${product.Description}${product.Color && ' - ' + product.Color})`}
                </h3>
                <div className={cx('price-product')}>
                    {product.Sale !== 0 ? (
                        <div>
                            <span className={cx('price-active')}>
                                {new Intl.NumberFormat('de-DE').format(product.Sale)} ₫
                            </span>
                            <span className={cx('price-old')}>
                                {new Intl.NumberFormat('de-DE').format(product.Price)} ₫
                            </span>
                        </div>
                    ) : (
                        <span className={cx('price-active')}>
                            {new Intl.NumberFormat('de-DE').format(product.Price)} ₫
                        </span>
                    )}
                </div>
                <div className={cx('number-product')}>
                    <span>Chọn số lượng:</span>
                    <div className={cx('select-number')}>
                        <button className={cx('decrease')} onClick={() => onDecrease(product)}>
                            -
                        </button>
                        <span className={cx('number')}>{product.NumberProduct}</span>
                        <button className={cx('increase')} onClick={() => onIncrease(product)}>
                            +
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardProductCart;
