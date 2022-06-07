import React from 'react';
import Select from 'react-select';
import clsx from 'clsx';
import styles from './Selects.module.scss';

function Selects(props) {
    const { onChangeSelect, data, select, multiple, className, placeholder } = props;
    return (
        <Select
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
