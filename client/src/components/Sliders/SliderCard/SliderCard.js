import React from 'react';
import clsx from 'clsx';
import Slider from 'react-slick';
import styles from './SliderCard.module.scss';
import CardProduct from '~/components/Cards/CardProduct/CardProduct';
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

function SliderCard(props) {
    const { slideShow, slideScroll } = props;
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: slideShow,
        slidesToScroll: slideScroll,
        className: `${clsx(styles.initSlider)}`,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };
    return (
        <div className={clsx(styles.wrapper)}>
            <Slider {...settings}>
                <div className={clsx(styles.slide)}>
                    <CardProduct />
                </div>
                <div className={clsx(styles.slide)}>
                    <CardProduct />
                </div>
                <div className={clsx(styles.slide)}>
                    <CardProduct />
                </div>
                <div className={clsx(styles.slide)}>
                    <CardProduct />
                </div>
                <div className={clsx(styles.slide)}>
                    <CardProduct />
                </div>
                <div className={clsx(styles.slide)}>
                    <CardProduct />
                </div>
            </Slider>
        </div>
    );
}

export default SliderCard;
