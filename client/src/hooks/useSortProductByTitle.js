import React, { useEffect, useState } from 'react';

function useSortProductByTitle(products, title = 'CHEAP') {
    const [product, setProduct] = useState([]);
    useEffect(() => {
        switch (title) {
            case 'HOT':
                const productsHot = products.map((product) => {
                    // console.log('HOT: ', product);
                    const getProductsHot = product.TypesProduct.reduce((pre, next) => {
                        if (next.Amount > 0) {
                            return pre.Sold > next.Sold ? pre : next;
                        }
                        return pre;
                    }, {});
                    if (Object.keys(getProductsHot).length !== 0) {
                        return {
                            ...getProductsHot,
                            Image: product.Image,
                            NameProduct: product.Name,
                        };
                    }
                });

                const hotProducts = productsHot.sort((a, b) => b.Sold - a.Sold).filter((item) => item !== undefined);
                setProduct(hotProducts);
                break;
            case 'NEW':
                let newPro = [];
                let initReduce = { ...products[0] };
                products.reduce((pre, next) => {
                    const formatPreDay = new Intl.DateTimeFormat('en').format(new Date(pre.CreateDate));
                    const formatNextDay = new Intl.DateTimeFormat('en').format(new Date(next.CreateDate));
                    if (formatPreDay > formatNextDay) {
                        newPro = [pre, ...newPro];
                        return pre;
                    } else {
                        newPro = [next, ...newPro];
                        return next;
                    }
                }, initReduce);

                const newProducts = newPro
                    .map((product) => {
                        const getProductsCheap = product.TypesProduct.reduce((pre, next) => {
                            if (next.Amount > 0) {
                                if (pre.Sale !== 0 && next.Sale !== 0) {
                                    return pre.Sale < next.Sale ? pre : next;
                                } else if (pre.Sale !== 0 && next.Sale === 0) {
                                    return pre.Sale < next.Price ? pre : next;
                                } else if (pre.Sale === 0 && next.Sale !== 0) {
                                    return pre.Price < next.Sale ? pre : next;
                                } else {
                                    return pre.Price < next.Price ? pre : next;
                                }
                            }
                            return pre;
                        }, {});
                        if (Object.keys(getProductsCheap).length !== 0) {
                            return {
                                ...getProductsCheap,
                                Image: product.Image,
                                NameProduct: product.Name,
                            };
                        }
                    })
                    .filter((item) => item !== undefined);
                setProduct(newProducts);
                break;
            case 'CHEAP':
                const cheapProducts = products
                    .map((product) => {
                        const getProductsCheap = product.TypesProduct.reduce((pre, next) => {
                            if (next.Amount > 0) {
                                if (pre.Sale !== 0 && next.Sale !== 0) {
                                    return pre.Sale < next.Sale ? pre : next;
                                } else if (pre.Sale !== 0 && next.Sale === 0) {
                                    return pre.Sale < next.Price ? pre : next;
                                } else if (pre.Sale === 0 && next.Sale !== 0) {
                                    return pre.Price < next.Sale ? pre : next;
                                } else {
                                    return pre.Price < next.Price ? pre : next;
                                }
                            }
                            return pre;
                        }, {});
                        if (Object.keys(getProductsCheap).length !== 0) {
                            return {
                                ...getProductsCheap,
                                Image: product.Image,
                                NameProduct: product.Name,
                            };
                        }
                    })
                    .filter((item) => item !== undefined);
                const sortIncreasePrice = cheapProducts.sort((pre, next) => {
                    if (pre.Sale !== 0 && next.Sale !== 0) {
                        return pre.Sale - next.Sale;
                    } else if (pre.Sale !== 0 && next.Sale === 0) {
                        return pre.Sale - next.Price;
                    } else if (pre.Sale === 0 && next.Sale !== 0) {
                        return pre.Price - next.Sale;
                    } else {
                        return pre.Price - next.Price;
                    }
                });
                setProduct(sortIncreasePrice);
                break;
        }
    }, [products, title]);
    return product;
}

export default useSortProductByTitle;
