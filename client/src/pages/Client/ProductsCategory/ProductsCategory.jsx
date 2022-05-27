import { Grid } from '@mui/material';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function ProductsCategory() {
    const [products, setProducts] = useState([]);
    const { product, category } = useSelector(state => state);
    const { cate } = useParams();

    useEffect(() => {
        const getCategory = category.categories.find(selector => selector.Name === cate);
        const result = product.products.filter(product => {
            if (getCategory.Products.includes(product._id)) {
                console.log(product)
                return product;
            }
        });
        setProducts(result)
    }, [])

    return (
        <div>
            Products Category User
        </div>
    )
}

export default ProductsCategory