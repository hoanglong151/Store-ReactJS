import React from 'react';
import clsx from 'clsx';
import styles from './ShowMore.module.scss';

function ShowMore(props) {
    const { showMore, onClick } = props;
    return (
        <button className={clsx(styles.btn)} onClick={() => onClick(showMore)}>
            Xem thêm sản phẩm
        </button>
    );
}

export default ShowMore;
