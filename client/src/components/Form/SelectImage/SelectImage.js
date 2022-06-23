import React from 'react';
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
                    <img className={cx('review-image')} src={images} />
                ) : (
                    images.map((image, index) => <img key={index} className={cx('review-image')} src={image} />)
                )}
            </div>
        </>
    );
}

export default SelectImage;
