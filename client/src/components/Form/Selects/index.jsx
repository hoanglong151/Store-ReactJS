import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import classnames from 'classnames/bind';
import styles from './Selects.module.scss';

const cx = classnames.bind(styles);

function Selects(props) {
    const { onChangeSelect, data, select, multiple, className, placeholder, id, name, errors } = props;
    const customStyles = {
        menu: (provided, state) => ({
            ...provided,
            zIndex: 2,
        }),
    };
    return (
        <Select
            name={name}
            id={id}
            styles={customStyles}
            onChange={onChangeSelect}
            className={cx({ [className]: className, error: errors })}
            closeMenuOnSelect={!multiple}
            value={select}
            isMulti={multiple}
            options={data}
            placeholder={placeholder || 'Select'}
        />
    );
}

Selects.propTypes = {
    onChangeSelect: PropTypes.func,
    data: PropTypes.array,
    select: PropTypes.array,
    multiple: PropTypes.bool,
    className: PropTypes.node,
    placeholder: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    errors: PropTypes.bool,
};

export default Selects;
