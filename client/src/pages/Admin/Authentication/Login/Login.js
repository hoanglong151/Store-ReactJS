import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import clsx from 'clsx';
import styles from './Login.module.scss';
import authenticationApi from '~/api/authenticationApi';

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
                }
            };
            submit();
        },
    });

    return (
        <div className={clsx(styles.wrapper)}>
            <form onSubmit={formik.handleSubmit} className={clsx(styles.formLogin)}>
                <h2 className={clsx(styles.title)}>Đăng Nhập</h2>
                <div className={clsx(styles.wrapInput)}>
                    <input
                        className={clsx(styles.input)}
                        name="email"
                        id="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        type="email"
                        placeholder="Email"
                    />
                    {formik.errors.email && formik.touched.email ? (
                        <p className={clsx(styles.errorMessage)}>{formik.errors.email}</p>
                    ) : null}
                </div>
                <div className={clsx(styles.wrapInput)}>
                    <input
                        className={clsx(styles.input)}
                        type="password"
                        placeholder="Password"
                        name="password"
                        id="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.password && formik.touched.password ? (
                        <p className={clsx(styles.errorMessage)}>{formik.errors.password}</p>
                    ) : null}
                </div>
                <button className={clsx(styles.btn)} type="submit">
                    Đăng Nhập
                </button>
            </form>
        </div>
    );
}

export default Login;
