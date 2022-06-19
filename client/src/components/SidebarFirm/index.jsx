import React from 'react';
import clsx from 'clsx';
import styles from './SidebarFirm.module.scss';
import { Link } from 'react-router-dom';

function SidebarFirm(props) {
    const { name, firmID, cateID, className, select } = props;
    return (
        <Link
            to={`/firm`}
            state={{ firmID: firmID, cateID: cateID, select: select }}
            className={clsx(styles.category, { [styles.itemCate]: className })}
        >
            {name}
        </Link>
    );
}

export default SidebarFirm;
