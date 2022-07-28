import React, { useEffect } from 'react';
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
        swipeToSlide: true,
        draggable: true,
        arrows: false,
        dots: true,
        dotsClass: cx('slick-thumb', 'slick-dots', 'draggable'),
        infinite: true,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    useEffect(() => {
        let isDown = false;
        let startX;
        let scrollLeft;
        const elementDraggable = document.querySelector('.draggable');
        elementDraggable?.addEventListener('mousedown', (event) => {
            isDown = true;
            startX = event.pageX - elementDraggable.offsetLeft;
            scrollLeft = elementDraggable.scrollLeft;
            elementDraggable.style.cursor = 'grabbing';
        });
        elementDraggable?.addEventListener('mouseleave', (event) => {
            isDown = false;
        });
        elementDraggable?.addEventListener('mouseup', (event) => {
            isDown = false;
            elementDraggable.style.cursor = 'grab';
        });
        elementDraggable?.addEventListener('mousemove', (event) => {
            if (!isDown) return;
            event.preventDefault();
            const x = event.pageX - elementDraggable.offsetLeft;
            const walk = (x - startX) * 2;
            elementDraggable.scrollLeft = scrollLeft - walk;
        });
    }, [settings]);
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
