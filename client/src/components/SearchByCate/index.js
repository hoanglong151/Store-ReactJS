import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './SearchByCate.module.scss';

function SearchByCate(props) {
    const { type, onSearch } = props;
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        const id = setTimeout(() => {
            const result = type.filter((item) => {
                const itemArr = item.Name.toLowerCase().split(' ');
                const searchArr = searchInput.split(' ');
                const containsAll = searchArr.every((element) => {
                    return itemArr.includes(element);
                });
                if (containsAll) {
                    return item;
                } else {
                    return item.Name.toLowerCase().includes(searchInput);
                }
            });
            onSearch(result);
        }, 800);
        return () => {
            clearTimeout(id);
        };
    }, [searchInput]);

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
