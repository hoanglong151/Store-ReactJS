import React from 'react';
import clsx from 'clsx';
import styles from './MenuRight.module.scss';

function MenuRight() {
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.menuRight)}>
                <a href="https://www.google.com/" className={clsx(styles.poster)}>
                    <img
                        className={clsx(styles.image)}
                        src="https://cdn1.hoanghamobile.com/tin-tuc/wp-content/uploads/2020/06/1-2-15-1024x536.jpg"
                    />
                </a>
                <a href="https://www.google.com/" className={clsx(styles.poster)}>
                    <img
                        className={clsx(styles.image)}
                        src="https://i.pinimg.com/originals/e9/d3/35/e9d335f25758c4eca3f59d2284d470bf.jpg"
                    />
                </a>
                <a href="https://www.google.com/" className={clsx(styles.poster)}>
                    <img
                        className={clsx(styles.image)}
                        src="https://i.pinimg.com/originals/e9/d3/35/e9d335f25758c4eca3f59d2284d470bf.jpg"
                    />
                </a>
            </div>
        </div>
    );
}

export default MenuRight;
