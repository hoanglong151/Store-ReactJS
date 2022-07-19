import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import styles from './SelectImage.module.scss';

const cx = classnames.bind(styles);

function SelectImage(props) {
    const { onChange, images, id, name } = props;
    return (
        <>
            <label className={cx('upload-images')} htmlFor={id}>
                Upload Images
            </label>
            <input onChange={onChange} id={id} name={name} multiple className={cx('input-image')} type="file" />
            <div className={cx('review-images')}>
                {typeof images === 'string' ? (
                    <img alt="Review Hình Ảnh" className={cx('review-image')} src={images} />
                ) : (
                    images.map((image, index) => (
                        <img alt="Review Hình Ảnh" key={index} className={cx('review-image')} src={image} />
                    ))
                )}
            </div>
        </>
    );
}

SelectImage.propTypes = {
    onChange: PropTypes.func,
    images: PropTypes.node,
    id: PropTypes.string,
    name: PropTypes.string,
};

export default SelectImage;
