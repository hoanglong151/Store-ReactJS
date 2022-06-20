import { useEffect, useState } from 'react';

function usePagination(products) {
    const [productsByPage, setProductByPage] = useState([]);
    const [countPage, setCountPage] = useState(1);

    useEffect(() => {
        const count = Math.ceil(products.length / 10);
        const productPageInit = products.slice(0, 10);
        setCountPage(count);
        setProductByPage(productPageInit);
    }, [products]);
    return [countPage, productsByPage, setProductByPage];
}

export default usePagination;
