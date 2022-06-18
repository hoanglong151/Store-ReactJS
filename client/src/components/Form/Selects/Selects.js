import React from 'react';
import Select from 'react-select';
import clsx from 'clsx';
import styles from './Selects.module.scss';

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
            className={clsx(styles.select, { [className]: className })}
            closeMenuOnSelect={!multiple}
            value={select}
            isMulti={multiple}
            options={data}
            placeholder={placeholder || 'Select'}
        />
    );
}

export default Selects;
