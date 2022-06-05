import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './CartProduct.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import CardProductCart from '~/components/Cards/CardProductCart/CardProductCart';
import { increase, decrease, remove } from '~/app/reducerCart';
import TotalPriceCart from '~/components/Layouts/Client/components/TotalPriceCart/TotalPriceCart';

function CartProduct() {
    const navigate = useNavigate();
    const cartProducts = useSelector((state) => state.cart.cartProducts);
    const dispatch = useDispatch();

    const handleIncrease = (product) => {
        dispatch(increase({ ...product, NumberProduct: product.NumberProduct + 1 }));
    };

    const handleDecrease = (product) => {
        if (product.NumberProduct > 1) {
            dispatch(decrease({ ...product, NumberProduct: product.NumberProduct - 1 }));
        }
    };

    const handleRemoveProduct = (product) => {
        dispatch(remove(product));
    };

    const handlePayment = () => {
        navigate('/bill');
    };
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.header)}>
                <Link to="/" className={clsx(styles.btnBack)}>
                    <FontAwesomeIcon icon={faChevronLeft} className={clsx(styles.iconBack)} />
                    <span className={clsx(styles.textBack)}>Trở về</span>
                </Link>
                <h2 className={clsx(styles.cart)}>Giỏ hàng</h2>
            </div>

            {cartProducts &&
                cartProducts.map((product) => (
                    <div key={product._id}>
                        <CardProductCart
                            product={product}
                            onIncrease={handleIncrease}
                            onDecrease={handleDecrease}
                            onRemove={handleRemoveProduct}
                        />
                    </div>
                ))}

            <TotalPriceCart onPayment={handlePayment} title="Tiến hành đặt hàng" />
        </div>
    );
}

export default CartProduct;
