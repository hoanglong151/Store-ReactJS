import React from 'react';
import Slider from 'react-slick';
import clsx from 'clsx';
import './Slider.scss';

function Sliders(props) {
    const { data } = props;
    const settings = {
        customPaging: function (i) {
            return <img src={data[i]} />;
        },
        arrows: false,
        dots: true,
        dotsClass: 'slick-thumb slick-dots',
        infinite: true,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <div className={clsx('wrapper')}>
            <Slider {...settings}>
                {data.map((image, index) => (
                    <div key={index} className={clsx('wrapImage')}>
                        <img className={clsx('image')} src={image} />
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default Sliders;
