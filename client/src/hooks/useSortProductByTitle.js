import { useEffect, useState } from 'react';

function useSortProductByTitle(products, title = 'CHEAP') {
    const [product, setProduct] = useState([]);
    useEffect(() => {
        switch (title) {
            case 'HOT':
                const getProductsHot = [...products]
                    .sort((pre, next) => {
                        return next.Sold - pre.Sold;
                    })
                    .filter((item) => item.Amount !== 0);
                setProduct(getProductsHot);
                break;
            case 'NEW':
                const getProductsNew = [...products]
                    .sort((pre, next) => {
                        return new Date(next.CreateAt) - new Date(pre.CreateAt);
                    })
                    .filter((item) => item.Amount !== 0);
                setProduct(getProductsNew);
                break;
            case 'CHEAP':
                const getProductsCheap = [...products]
                    .sort((pre, next) => {
                        if (pre.Sale !== 0 && next.Sale !== 0) {
                            return pre.Sale - next.Sale;
                        } else if (pre.Sale !== 0 && next.Sale === 0) {
                            return pre.Sale - next.Price;
                        } else if (pre.Sale === 0 && next.Sale !== 0) {
                            return pre.Price - next.Sale;
                        } else {
                            return pre.Price - next.Price;
                        }
                    })
                    .filter((item) => item.Amount !== 0);
                setProduct(getProductsCheap);
                break;
            default:
                throw Error('Invalid');
        }
    }, [products, title]);
    return product;
}

export default useSortProductByTitle;
