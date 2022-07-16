import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classnames from 'classnames/bind';
import styles from './SidebarCategory.module.scss';

const cx = classnames.bind(styles);

function SidebarCategory(props) {
    const { name, link, className, select } = props;
    return (
        <Link
            to={`/category`}
            state={{ cateID: link, select: select }}
            className={cx('category', { 'item-cate': className })}
        >
            {name}
        </Link>
    );
}

SidebarCategory.propTypes = {
    name: PropTypes.string,
    link: PropTypes.string,
    className: PropTypes.string,
    select: PropTypes.string,
};

export default SidebarCategory;
