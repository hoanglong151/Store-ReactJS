import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import styles from './Search.module.scss';
import Tippy from '@tippyjs/react/headless';
import WrapperPopper from '~/components/Popper/Wrapper';
import CardProductItem from '~/components/Cards/CardProductSearch/CardProductSearch';
import { faCircleXmark, faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';
import productApi from '~/api/productsApi';
import { useDebounce, useSortProductByTitle } from '~/hooks';

function Search() {
    const [searchResult, setSearchResult] = useState([]);
    const [valueSearch, setValuesSearch] = useState('');
    const [visible, setVisible] = useState(true);
    const [loading, setLoading] = useState(false);
    const inputSearchRef = useRef();
    const debounce = useDebounce(valueSearch, 800);
    const productsCheap = useSortProductByTitle(searchResult, 'CHEAP');

    const hideResultProduct = () => {
        setVisible(false);
    };

    const handleRemoveValueSearch = () => {
        setValuesSearch('');
        inputSearchRef.current.focus();
        setSearchResult([]);
    };

    useEffect(() => {
        if (debounce?.trim()) {
            setLoading(true);
            const PAGE_SIZE = 5;
            const searchProduct = async () => {
                const products = await productApi.searchProduct(debounce, PAGE_SIZE);
                setSearchResult(products.data);
                setLoading(false);
            };
            searchProduct();
        } else {
            setSearchResult([]);
        }
    }, [debounce]);

    return (
        <div className={clsx(styles.search)}>
            <div className={clsx(styles.iconSearch)}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
            <Tippy
                visible={visible && productsCheap.length > 0}
                interactive={true}
                render={(attrs) => (
                    <div className={clsx(styles.searchProducts)} tabIndex="-1" {...attrs}>
                        <WrapperPopper>
                            {productsCheap?.map((product) => (
                                <CardProductItem key={product._id} product={product} />
                            ))}
                        </WrapperPopper>
                    </div>
                )}
                onClickOutside={hideResultProduct}
            >
                <input
                    className={clsx(styles.inputSearch)}
                    placeholder="Bạn cần tìm gì ?"
                    value={valueSearch}
                    onChange={(e) => setValuesSearch(e.target.value)}
                    ref={inputSearchRef}
                    onClick={() => setVisible(true)}
                />
            </Tippy>

            {loading && (
                <div className={clsx(styles.spinner)}>
                    <FontAwesomeIcon icon={faSpinner} />
                </div>
            )}
            {valueSearch && !loading && (
                <div className={clsx(styles.remove)} onClick={handleRemoveValueSearch}>
                    <FontAwesomeIcon icon={faCircleXmark} />
                </div>
            )}
        </div>
    );
}

export default Search;
