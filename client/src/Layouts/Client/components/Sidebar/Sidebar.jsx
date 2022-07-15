import React from 'react';
import classnames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import MenuLeft from '../MenuLeft/MenuLeft';
import Slider from '~/components/Sliders/SliderImage';
import MenuRight from '../MenuRight/MenuRight';

const cx = classnames.bind(styles);

function Sidebar() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('menu-left')}>
                <MenuLeft />
            </div>
            <div className={cx('slider')}>
                <Slider autoplay slideShow={1} slideScroll={1} />
            </div>
            <div className={cx('menu-right')}>
                <MenuRight />
            </div>
        </div>
    );
}

export default Sidebar;
