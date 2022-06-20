import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import clsx from 'clsx';
import styles from './Pagination.module.scss';

function PaginationOutlined(props) {
    const { onClick, count } = props;
    return (
        <Stack className={clsx(styles.wrapper)}>
            <Pagination count={count} variant="outlined" color="secondary" onChange={(e, page) => onClick(page)} />
        </Stack>
    );
}

export default PaginationOutlined;
