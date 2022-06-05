import React from 'react';
import Select from 'react-select';
import clsx from 'clsx';
import styles from './Selects.module.scss';

function Selects(props) {
    const { onChangeSelect, data, select, multiple } = props;
    const customStyles = {
        menu: (provided, state) => ({
            ...provided,
            zIndex: 100,
        }),
    };
    return (
        <Select
            styles={customStyles}
            onChange={onChangeSelect}
            className={clsx(styles.select)}
            closeMenuOnSelect={!multiple}
            value={select}
            isMulti={multiple}
            options={data}
        />
    );
}

export default Selects;
