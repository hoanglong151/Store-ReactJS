import React from 'react';
import clsx from 'clsx';
import Slider from 'react-slick';
import styles from './SliderImage.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

function SampleNextArrow(props) {
    const { onClick } = props;
    return (
        <div className={clsx(styles.nextArrow)} onClick={onClick}>
            <FontAwesomeIcon icon={faAngleRight} />
        </div>
    );
}

function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
        <div className={clsx(styles.prevArrow)} onClick={onClick}>
            <FontAwesomeIcon icon={faAngleLeft} />
        </div>
    );
}

function SliderBasic(props) {
    const { slideShow = 1, sliderScroll = 1, autoplay = false } = props;
    const settings = {
        infinite: true,
        speed: 1000,
        slidesToShow: slideShow,
        slidesToScroll: sliderScroll,
        autoplay: autoplay,
        autoplaySpeed: 5000,
        className: `${clsx(styles.initSlider)}`,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };
    return (
        <div className={clsx(styles.wrapper)}>
            <Slider {...settings}>
                <div className={clsx(styles.poster)}>
                    <img
                        className={clsx(styles.image)}
                        src="https://cdn.tgdd.vn/Files/2021/09/08/1381074/iphone_1280x720-800-resize.jpg"
                    />
                </div>
                <div className={clsx(styles.poster)}>
                    <img
                        className={clsx(styles.image)}
                        src="https://cdn.tgdd.vn/Files/2019/12/04/1224683/6-dau-hieu-ban-nen-thay-chiec-macbook-moi-4.jpg"
                    />
                </div>
                <div className={clsx(styles.poster)}>
                    <img
                        className={clsx(styles.image)}
                        src="https://i0.wp.com/www.eastmojo.com/wp-content/uploads/2020/10/Iphone.jpg?fit=1468%2C821&ssl=1"
                    />
                </div>
            </Slider>
        </div>
    );
}

export default SliderBasic;
