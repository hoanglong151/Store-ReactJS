import React from 'react';
import classnames from 'classnames/bind';
import styles from './ShowMore.module.scss';

const cx = classnames.bind(styles);

function ShowMore(props) {
    const { showMore, onClick } = props;
    return (
        <div className={cx('wrapper')}>
            <button className={cx('btn', 'show-more')} onClick={() => onClick(showMore)}>
                Xem thêm sản phẩm
            </button>
        </div>
    );
}

export default ShowMore;
