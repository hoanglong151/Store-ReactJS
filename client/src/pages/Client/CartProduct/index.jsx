import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CardProductCart from '~/components/Cards/CardProductCart/CardProductCart';
import { increase, decrease, remove } from '~/app/reducerCart';
import TotalPriceCart from '~/components/TotalPriceCart';
import HeaderCart from '~/Layouts/Client/components/HeaderCart/HeaderCart';
import classnames from 'classnames/bind';
import styles from './CartProduct.module.scss';

const cx = classnames.bind(styles);

function CartProduct() {
    const navigate = useNavigate();
    const { cartProducts } = useSelector((state) => state.cart);
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
        <div className={cx('wrapper')}>
            <HeaderCart title="Giỏ Hàng" link="/" />
            {cartProducts &&
                cartProducts.map((product, index) => (
                    <div key={index}>
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
