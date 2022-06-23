import React from 'react';
import Slider from 'react-slick';
import CardProduct from '~/components/Cards/CardProduct/CardProduct';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import styles from './SliderCard.module.scss';
import classnames from 'classnames/bind';

const cx = classnames.bind(styles);

function SampleNextArrow(props) {
    const { onClick } = props;
    return (
        <div className={cx('next-arrow')} onClick={onClick}>
            <FontAwesomeIcon icon={faAngleRight} />
        </div>
    );
}

function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
        <div className={cx('prev-arrow')} onClick={onClick}>
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
        className: `${cx('init-slider')}`,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };

    return (
        <div className={cx('wrapper')}>
            <Slider {...settings}>
                {product.map((product, index) => (
                    <CardProduct key={product._id} product={product} />
                ))}
            </Slider>
        </div>
    );
}

export default SliderCard;
