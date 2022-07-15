import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import styles from './SearchByCate.module.scss';
import {
    addressStoresApi,
    areasApi,
    billsApi,
    billStatusApi,
    categoriesApi,
    districtsApi,
    firmsApi,
    productsApi,
    provincesApi,
    saleCodesApi,
} from '~/api';
import { useDebounce } from '~/hooks';

const cx = classnames.bind(styles);

function SearchByCate(props) {
    const { type, onSearch } = props;
    const [searchInput, setSearchInput] = useState('');
    const debounce = useDebounce(searchInput, 800);

    useEffect(() => {
        if (debounce.trim()) {
            const submitSearch = async () => {
                let result;
                const PAGE_SIZE = 10;
                switch (type) {
                    case 'product':
                        result = await productsApi.searchProduct(searchInput.trim(), PAGE_SIZE);
                        onSearch(result);
                        break;
                    case 'category':
                        result = await categoriesApi.searchCategory(searchInput.trim(), PAGE_SIZE);
                        onSearch(result);
                        break;
                    case 'firm':
                        result = await firmsApi.searchFirm(searchInput.trim(), PAGE_SIZE);
                        onSearch(result);
                        break;
                    case 'bill':
                        result = await billsApi.searchBill(searchInput.trim(), PAGE_SIZE);
                        onSearch(result);
                        break;
                    case 'saleCode':
                        result = await saleCodesApi.searchSaleCode(searchInput.trim(), PAGE_SIZE);
                        onSearch(result);
                        break;
                    case 'billStatus':
                        result = await billStatusApi.searchBillStatus(searchInput.trim(), PAGE_SIZE);
                        onSearch(result);
                        break;
                    case 'area':
                        result = await areasApi.searchArea(searchInput.trim(), PAGE_SIZE);
                        onSearch(result);
                        break;
                    case 'province':
                        result = await provincesApi.searchProvince(searchInput.trim(), PAGE_SIZE);
                        onSearch(result);
                        break;
                    case 'district':
                        result = await districtsApi.searchDistrict(searchInput.trim(), PAGE_SIZE);
                        onSearch(result);
                        break;
                    case 'addressStore':
                        result = await addressStoresApi.searchAddressStore(searchInput.trim(), PAGE_SIZE);
                        onSearch(result);
                        break;
                }
            };
            submitSearch();
        } else {
            onSearch({});
        }
    }, [debounce]);

    const handleSearch = (input) => {
        setSearchInput(input);
    };

    return (
        <div className={cx('wrapper')}>
            <input
                className={cx('input')}
                placeholder="Tìm kiếm tại đây"
                onChange={(e) => handleSearch(e.target.value)}
                value={searchInput}
            />
        </div>
    );
}

SearchByCate.propTypes = {
    type: PropTypes.string,
    onSearch: PropTypes.func,
};

export default SearchByCate;
