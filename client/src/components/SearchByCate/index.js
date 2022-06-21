import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './SearchByCate.module.scss';
import { productsApi } from '~/api';
import { useDebounce } from '~/hooks';

function SearchByCate(props) {
    const { type, onSearch } = props;
    const [searchInput, setSearchInput] = useState('');
    const debounce = useDebounce(searchInput, 800);

    useEffect(() => {
        if (debounce.trim()) {
            const submitSearch = async () => {
                let result;
                switch (type) {
                    case 'product':
                        result = await productsApi.searchProduct(searchInput.trim());
                        onSearch(result);
                        break;
                }
            };
            submitSearch();
        } else {
            onSearch([]);
        }
    }, [debounce]);

    const handleSearch = (input) => {
        setSearchInput(input);
    };

    return (
        <div className={clsx(styles.wrapper)}>
            <input
                className={clsx(styles.input)}
                placeholder="Tìm kiếm tại đây"
                onChange={(e) => handleSearch(e.target.value)}
                value={searchInput}
            />
        </div>
    );
}

export default SearchByCate;
