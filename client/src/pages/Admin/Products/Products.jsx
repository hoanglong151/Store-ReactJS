import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '~/app/reducerProduct';
import { useEffect, useMemo } from 'react';
import {Link} from 'react-router-dom'
import TablesProduct from '~/components/Tables/TableProduct/TableProduct';
import clsx from 'clsx';
import styles from './Products.module.scss';

function Products() {
    const { products } = useSelector(state => state.product);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts());
    }, [])

    return (
        <div className={clsx(styles.wrapper)}>
            <Link to="/Admin/AddProduct" className={clsx(styles.createBtn)}>Tạo Sản Phẩm</Link>
            <TablesProduct
             titles={['Image', 'Name', 'Categories', 'Price', 'Actions']}
             products={products}
            />
        </div>
    )
}

export default Products