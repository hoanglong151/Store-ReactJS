import React from 'react';
import Select from 'react-select';
import clsx from 'clsx';
import styles from './Selects.module.scss';

function Selects(props) {
    const { onChangeSelect, data, select, multiple } = props;
    return (
        <Select
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
