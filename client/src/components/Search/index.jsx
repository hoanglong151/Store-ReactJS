import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames/bind';
import styles from './Search.module.scss';
import Tippy from '@tippyjs/react/headless';
import WrapperPopper from '~/components/Popper';
import CardProductItem from '~/components/Cards/CardProductSearch/CardProductSearch';
import { faCircleXmark, faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { typeProductsApi } from '~/api';
import { useDebounce, useSortProductByTitle } from '~/hooks';

const cx = classnames.bind(styles);

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
                const products = await typeProductsApi.searchTypeProduct(debounce, PAGE_SIZE);
                console.log(products);
                setSearchResult(products.data);
                setLoading(false);
            };
            searchProduct();
        } else {
            setSearchResult([]);
        }
    }, [debounce]);

    return (
        <div className={cx('search')}>
            <div className={cx('icon-search')}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
            <Tippy
                visible={visible && productsCheap.length > 0}
                interactive={true}
                render={(attrs) => (
                    <div className={cx('search-products')} tabIndex="-1" {...attrs}>
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
                    className={cx('input-search')}
                    placeholder="Bạn cần tìm gì ?"
                    value={valueSearch}
                    onChange={(e) => setValuesSearch(e.target.value)}
                    ref={inputSearchRef}
                    onClick={() => setVisible(true)}
                />
            </Tippy>

            {loading && (
                <div className={cx('spinner')}>
                    <FontAwesomeIcon icon={faSpinner} />
                </div>
            )}
            {valueSearch && !loading && (
                <div className={cx('remove')} onClick={handleRemoveValueSearch}>
                    <FontAwesomeIcon icon={faCircleXmark} />
                </div>
            )}
        </div>
    );
}

export default Search;
