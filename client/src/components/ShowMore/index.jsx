import React from 'react';
import PropTypes from 'prop-types';
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

ShowMore.propTyes = {
    showMore: PropTypes.number,
    onClick: PropTypes.func,
};

export default ShowMore;
