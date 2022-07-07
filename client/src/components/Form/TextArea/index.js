import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { productsApi } from '~/api';

function TextArea(props) {
    const { onChange, data } = props;

    function uploadAdapter(loader) {
        return {
            upload: () => {
                return new Promise((resolve, reject) => {
                    const body = new FormData();
                    loader.file.then(async (file) => {
                        body.append('uploadImg', file);
                        const getUrl = await productsApi.uploadImg(body);
                        if (getUrl) {
                            resolve({
                                default: getUrl,
                            });
                        } else {
                            reject('Err');
                        }
                    });
                });
            },
        };
    }

    function uploadPlugin(editor) {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return uploadAdapter(loader);
        };
    }
    return (
        <CKEditor
            config={{ extraPlugins: [uploadPlugin] }}
            editor={ClassicEditor}
            data={data}
            onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
                console.log('Editor is ready to use!', editor);
            }}
            onChange={(event, editor) => {
                onChange(event, editor);
            }}
            onBlur={(event, editor) => {
                console.log('Blur.', editor);
            }}
            onFocus={(event, editor) => {
                console.log('Focus.', editor);
            }}
        />
    );
}

export default TextArea;
