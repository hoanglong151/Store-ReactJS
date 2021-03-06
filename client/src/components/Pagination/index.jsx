import React from 'react';
import PropTypes from 'prop-types';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import classnames from 'classnames/bind';
import styles from './Pagination.module.scss';

const cx = classnames.bind(styles);

function PaginationOutlined(props) {
    const { onClick, count } = props;
    return (
        <Stack className={cx('wrapper')}>
            <Pagination count={count} variant="outlined" color="secondary" onChange={(e, page) => onClick(page)} />
        </Stack>
    );
}

PaginationOutlined.propTypes = {
    onClick: PropTypes.func,
    count: PropTypes.number,
};

export default PaginationOutlined;
