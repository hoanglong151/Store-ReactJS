import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import classnames from 'classnames/bind';
import styles from './Slider.module.scss';

const cx = classnames.bind(styles);

function Sliders(props) {
    const { data } = props;
    const settings = {
        customPaging: function (i) {
            return <img alt="Menu Hình Ảnh" src={data[i]} />;
        },
        arrows: false,
        dots: true,
        dotsClass: cx('slick-thumb', 'slick-dots'),
        infinite: true,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <div className={cx('wrapper')}>
            <Slider {...settings}>
                {data.map((image, index) => (
                    <div key={index} className={cx('wrap-image')}>
                        <img alt="Hình Ảnh" className={cx('image')} src={image} />
                    </div>
                ))}
            </Slider>
        </div>
    );
}

Sliders.propTypes = {
    data: PropTypes.array,
};

export default Sliders;
