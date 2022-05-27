import React from 'react';
import clsx from 'clsx';
import styles from './SelectImage.module.scss';

function SelectImage(props) {
    const { onChange, images, id, name } = props;
    return (
        <>
            <label className={clsx(styles.uploadImages)} htmlFor={id}>
                Upload Images
            </label>
            <input onChange={onChange} id={id} name={name} multiple className={clsx(styles.inputImage)} type="file" />
            <div className={clsx(styles.reviewImages)}>
                {typeof images === 'string' ? (
                    <img className={clsx(styles.reviewImage)} src={images} />
                ) : (
                    images.map((image, index) => <img key={index} className={clsx(styles.reviewImage)} src={image} />)
                )}
            </div>
        </>
    );
}

export default SelectImage;
