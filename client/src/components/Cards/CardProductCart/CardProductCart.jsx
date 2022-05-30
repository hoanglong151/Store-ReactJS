import React from 'react';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import styles from './CardProductCart.module.scss';

function CardProductCart(props) {
    const { product, onIncrease, onDecrease, onRemove } = props;
    return (
        <div className={clsx(styles.wrapperCart)}>
            <button className={clsx(styles.btnClose)} onClick={() => onRemove(product)}>
                <FontAwesomeIcon icon={faXmark} />
            </button>
            <img className={clsx(styles.image)} src={product.Image[0]} />
            <div className={clsx(styles.infoProduct)}>
                <h3 className={clsx(styles.nameProduct)}>{product.Name}</h3>
                <div className={clsx(styles.priceProduct)}>
                    {product.Sale !== 0 ? (
                        <div>
                            <span className={clsx(styles.priceActive)}>
                                {new Intl.NumberFormat('de-DE').format(product.Sale)} ₫
                            </span>
                            <span className={clsx(styles.priceOld)}>
                                {new Intl.NumberFormat('de-DE').format(product.Price)} ₫
                            </span>
                        </div>
                    ) : (
                        <span className={clsx(styles.priceActive)}>
                            {new Intl.NumberFormat('de-DE').format(product.Price)} ₫
                        </span>
                    )}
                </div>
                <div className={clsx(styles.numberProduct)}>
                    <span>Chọn số lượng:</span>
                    <div className={clsx(styles.selectNumber)}>
                        <button className={clsx(styles.decrease)} onClick={() => onDecrease(product)}>
                            -
                        </button>
                        <span className={clsx(styles.number)}>{product.NumberProduct}</span>
                        <button className={clsx(styles.increase)} onClick={() => onIncrease(product)}>
                            +
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardProductCart;
