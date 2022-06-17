import React, { useEffect, useState } from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import clsx from 'clsx';
import styles from './TagInput.module.scss';

function TagInput(props) {
    const { placeholder, id, name, formik } = props;
    const [tags, setTags] = useState([]);

    useEffect(() => {
        formik.setFieldValue('types.color', tags);
    }, [tags]);

    const handleDelete = (i) => {
        setTags(tags.filter((tag, index) => index !== i));
    };

    const handleAddition = (tag) => {
        setTags([...tags, tag]);
    };

    const handleTagClick = (index) => {
        console.log('The tag at index ' + index + ' was clicked');
    };

    return (
        <ReactTags
            tags={tags}
            handleDelete={handleDelete}
            handleAddition={handleAddition}
            handleTagClick={handleTagClick}
            inputFieldPosition="bottom"
            autocomplete
            classNames={{
                tags: clsx(styles.tags),
                tag: clsx(styles.tag),
                remove: clsx(styles.remove),
            }}
            placeholder={placeholder}
        />
    );
}

export default TagInput;
