import React from 'react';
import clsx from 'clsx';
import styles from './Sidebar.module.scss';
import MenuLeft from '../MenuLeft/MenuLeft';
import Slider from '~/components/Sliders/SliderImage/SliderImage.js/SliderImage';
import MenuRight from '../MenuRight/MenuRight';

function Sidebar() {
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.menuLeft)}>
                <MenuLeft />
            </div>
            <div className={clsx(styles.slider)}>
                <Slider autoplay slideShow={1} slideScroll={1} />
            </div>
            <div className={clsx(styles.menuRight)}>
                <MenuRight />
            </div>
        </div>
    );
}

export default Sidebar;
