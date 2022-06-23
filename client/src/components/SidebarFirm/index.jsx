import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames/bind';
import styles from './SidebarFirm.module.scss';

const cx = classnames.bind(styles);

function SidebarFirm(props) {
    const { name, firmID, cateID, className, select } = props;
    return (
        <Link
            to={`/firm`}
            state={{ firmID: firmID, cateID: cateID, select: select }}
            className={cx('category', { 'item-cate': className })}
        >
            {name}
        </Link>
    );
}

export default SidebarFirm;
