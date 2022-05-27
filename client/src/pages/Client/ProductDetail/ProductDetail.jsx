import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProductDetail() {
    let { id } = useParams();
    const [productDetail, setProductDetail] = useState({});
    const { products } = useSelector(state => state.product)
    useEffect(() => {
        const getProduct = products.find(product => product._id === id);
        if (getProduct !== undefined) {
            const mapCategories = getProduct.Category_ID.map(category => ({ value: category._id, label: category.Name }))

            const detailProduct = { ...getProduct, Category_ID: mapCategories }
            setProductDetail(detailProduct);
        }
    }, [products])
    return (
        <div>Product Detail USer</div>
    )
}

export default ProductDetail