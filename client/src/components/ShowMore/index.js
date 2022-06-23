import React from 'react';
import classnames from 'classnames/bind';
import styles from './ShowMore.module.scss';

const cx = classnames.bind(styles);

function ShowMore(props) {
    const { showMore, onClick } = props;
    return (
        <button className={cx('btn')} onClick={() => onClick(showMore)}>
            Xem thêm sản phẩm
        </button>
    );
}

export default ShowMore;
