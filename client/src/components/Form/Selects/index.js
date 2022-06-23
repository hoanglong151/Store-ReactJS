import React from 'react';
import Select from 'react-select';
import classnames from 'classnames/bind';
import styles from './Selects.module.scss';

const cx = classnames.bind(styles);

function Selects(props) {
    const { onChangeSelect, data, select, multiple, className, placeholder } = props;
    const customStyles = {
        menu: (provided, state) => ({
            ...provided,
            zIndex: 2,
        }),
    };
    return (
        <Select
            styles={customStyles}
            onChange={onChangeSelect}
            className={cx('select', { [className]: className })}
            closeMenuOnSelect={!multiple}
            value={select}
            isMulti={multiple}
            options={data}
            placeholder={placeholder || 'Select'}
        />
    );
}

export default Selects;
