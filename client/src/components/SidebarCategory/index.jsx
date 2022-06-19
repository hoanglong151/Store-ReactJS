import React from 'react';
import clsx from 'clsx';
import styles from './SidebarCategory.module.scss';
import { Link } from 'react-router-dom';

function SidebarCategory(props) {
    const { name, link, className, select } = props;
    return (
        <Link
            to={`/category`}
            state={{ cateID: link, select: select }}
            className={clsx(styles.category, { [styles.itemCate]: className })}
        >
            {name}
        </Link>
    );
}

export default SidebarCategory;
