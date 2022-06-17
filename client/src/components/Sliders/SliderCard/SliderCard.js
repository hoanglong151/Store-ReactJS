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
    const { slideShow, slideScroll, product } = props;
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: slideShow,
        slidesToScroll: slideScroll,
        slide: 'span',
        className: `${clsx(styles.initSlider)}`,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };

    return (
        <div className={clsx(styles.wrapper)}>
            <Slider {...settings}>
                {product.map((product, index) => (
                    <CardProduct key={product._id} product={product} />
                ))}
            </Slider>
        </div>
    );
}

export default SliderCard;
