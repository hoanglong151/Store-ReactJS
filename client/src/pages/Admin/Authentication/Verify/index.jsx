import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import authenticationApi from '~/api/authenticationApi';
import classnames from 'classnames/bind';
import styles from './Verify.module.scss';

const cx = classnames.bind(styles);
function VerifyAuth() {
    const navigate = useNavigate();
    const location = useLocation();
    const [count, setCount] = useState(60);
    const { user } = location.state;
    const OTPSchema = Yup.object().shape({
        otp: Yup.string().required('Vui lòng nhập OTP'),
    });
    useEffect(() => {
        let timerID;
        if (count !== 0) {
            timerID = setInterval(() => {
                setCount((pre) => pre - 1);
            }, 1000);
        }
        return () => clearInterval(timerID);
    }, [count]);

    const formik = useFormik({
        initialValues: {
            id: user.ID,
            otp: '',
        },
        validationSchema: OTPSchema,
        onSubmit: (values) => {
            const submit = async () => {
                const result = await authenticationApi.verifyOTP(values);
                if (result.Incorrect) {
                    alert(result.Incorrect);
                } else {
                    sessionStorage.setItem('accessToken', result.token);
                    const data = JSON.parse(sessionStorage.getItem('auth'));
                    const user = {
                        ...data,
                        verify: true,
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
                <h2 className={cx('title')}>Xác minh OTP</h2>
                <div className={cx('wrap-input')}>
                    <input
                        className={cx('input')}
                        name="otp"
                        id="otp"
                        value={formik.values.otp}
                        onChange={formik.handleChange}
                        type="text"
                        placeholder="Mã xác minh"
                    />
                    {formik.errors.otp && formik.touched.otp ? (
                        <p className={cx('error-message')}>{formik.errors.otp}</p>
                    ) : null}
                </div>
                <button className={cx('send-otp')} type="button">
                    {count === 0 ? (
                        <Link className={cx('login')} to="/Admin/Login">
                            Vui lòng đăng nhập lại
                        </Link>
                    ) : (
                        `Mã xác minh hết hạn sau ${count}s`
                    )}
                </button>
                <button className={cx('btn')} type="submit">
                    Xác minh
                </button>
            </form>
        </div>
    );
}

export default VerifyAuth;
