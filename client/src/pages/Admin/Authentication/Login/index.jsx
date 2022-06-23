import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import authenticationApi from '~/api/authenticationApi';
import classnames from 'classnames/bind';
import styles from './Login.module.scss';

const cx = classnames.bind(styles);

function Login() {
    const navigate = useNavigate();

    const LoginSchema = Yup.object().shape({
        email: Yup.string().required('Vui lòng nhập email'),
        password: Yup.string().required('Vui lòng nhập mật khẩu'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: LoginSchema,
        onSubmit: (values) => {
            const submit = async () => {
                const result = await authenticationApi.login(values);
                if (result.Invalid) {
                    alert(result.Invalid);
                } else {
                    sessionStorage.setItem('accessToken', result.token);
                    const user = {
                        ID: result.user._id,
                        Name: result.user.Name,
                        Email: result.user.Email,
                    };
                    sessionStorage.setItem('auth', JSON.stringify(user));
                    navigate('/Admin');
                }
            };
            submit();
        },
    });

    return (
        <div className={cx('wrapper')}>
            <form onSubmit={formik.handleSubmit} className={cx('form-login')}>
                <h2 className={cx('title')}>Đăng Nhập</h2>
                <div className={cx('wrap-input')}>
                    <input
                        className={cx('input')}
                        name="email"
                        id="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        type="email"
                        placeholder="Email"
                    />
                    {formik.errors.email && formik.touched.email ? (
                        <p className={cx('error-message')}>{formik.errors.email}</p>
                    ) : null}
                </div>
                <div className={cx('wrap-input')}>
                    <input
                        className={cx('input')}
                        type="password"
                        placeholder="Password"
                        name="password"
                        id="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.password && formik.touched.password ? (
                        <p className={cx('error-message')}>{formik.errors.password}</p>
                    ) : null}
                </div>
                <button className={cx('btn')} type="submit">
                    Đăng Nhập
                </button>
            </form>
        </div>
    );
}

export default Login;
