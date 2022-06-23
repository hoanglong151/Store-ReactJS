import React from 'react';
import classnames from 'classnames/bind';
import styles from './Footer.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faComment,
    faCreditCard,
    faEnvelope,
    faPhoneFlip,
    faRotate,
    faTruckFast,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const cx = classnames.bind(styles);

function Footer() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('footer-image')}>
                <div className={cx('item')}>
                    <FontAwesomeIcon className={cx('icon')} icon={faTruckFast} />
                    <div className={cx('content')}>
                        <h3 className={cx('title')}>CHÍNH SÁCH GIAO HÀNG</h3>
                        <p className={cx('info')}>Nhận hàng và thanh toán tại nhà</p>
                    </div>
                </div>
                <div className={cx('item')}>
                    <FontAwesomeIcon className={cx('icon')} icon={faRotate} />
                    <div className={cx('content')}>
                        <h3 className={cx('title')}>ĐỔI TRẢ DỄ DÀNG</h3>
                        <p className={cx('info')}>Dùng thử trong vòng 3 ngày</p>
                    </div>
                </div>
                <div className={cx('item')}>
                    <FontAwesomeIcon className={cx('icon')} icon={faCreditCard} />
                    <div className={cx('content')}>
                        <h3 className={cx('title')}>THANH TOÁN TIỆN LỢI</h3>
                        <p className={cx('info')}>Trả tiền mặt, CK, trả góp 0%</p>
                    </div>
                </div>
                <div className={cx('item')}>
                    <FontAwesomeIcon className={cx('icon')} icon={faComment} />
                    <div className={cx('content')}>
                        <h3 className={cx('title')}>HỖ TRỢ NHIỆT TÌNH</h3>
                        <p className={cx('info')}>Tư vấn, giải đáp mọi thắc mắc</p>
                    </div>
                </div>
            </div>
            <span className={cx('break-line')}></span>
            <div className={cx('footer-info')}>
                <div className={cx('general-info')}>
                    <h2>THÔNG TIN CHUNG</h2>
                    <ul className={cx('list')}>
                        <li>
                            <Link className={cx('link')} to="/">
                                Giới thiệu về Noly House
                            </Link>
                        </li>
                        <li>
                            <Link className={cx('link')} to="/">
                                Tin tức
                            </Link>
                        </li>
                        <li>
                            <Link className={cx('link')} to="/">
                                Tin Tuyển Dụng
                            </Link>
                        </li>
                        <li>
                            <Link className={cx('link')} to="/">
                                Liên hệ - góp ý
                            </Link>
                        </li>
                        <li>
                            <Link className={cx('link')} to="/">
                                Khách hàng doanh nghiệp
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={cx('support-client')}>
                    <h2>HỖ TRỢ KHÁCH HÀNG</h2>
                    <ul className={cx('list')}>
                        <li>
                            <Link className={cx('link')} to="/">
                                Hướng dẫn mua hàng trực tuyến
                            </Link>
                        </li>
                        <li>
                            <Link className={cx('link')} to="/">
                                Hướng dẫn thanh toán
                            </Link>
                        </li>
                        <li>
                            <Link className={cx('link')} to="/">
                                Hướng dẫn mua hàng trả góp
                            </Link>
                        </li>
                        <li>
                            <Link className={cx('link')} to="/">
                                In hóa đơn điện tử
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={cx('general-policy')}>
                    <h2>CHÍNH SÁCH CHUNG</h2>
                    <ul className={cx('list')}>
                        <li>
                            <Link className={cx('link')} to="/">
                                Chính sách vận chuyển
                            </Link>
                        </li>
                        <li>
                            <Link className={cx('link')} to="/">
                                Chính sách bảo hành
                            </Link>
                        </li>
                        <li>
                            <Link className={cx('link')} to="/">
                                Chính sách đổi trả và hoàn tiền
                            </Link>
                        </li>
                        <li>
                            <Link className={cx('link')} to="/">
                                Chính sách cho doanh nghiệp
                            </Link>
                        </li>
                        <li>
                            <Link className={cx('link')} to="/">
                                Chính sách hàng chính hãng
                            </Link>
                        </li>
                        <li>
                            <Link className={cx('link')} to="/">
                                Bảo mật thông tin khách hàng
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={cx('support')}>
                    <h2>CHÍNH SÁCH CHUNG</h2>
                    <ul className={cx('list')}>
                        <li className={cx('contact')}>
                            <FontAwesomeIcon icon={faPhoneFlip} />
                            <p className={cx('contact-info')}>Kinh doanh online: 0123.4567 phím 1</p>
                        </li>
                        <li className={cx('contact')}>
                            <FontAwesomeIcon icon={faPhoneFlip} />
                            <p className={cx('contact-info')}>Kinh doanh dự án: 0123.4567 phím 8</p>
                        </li>
                        <li className={cx('contact')}>
                            <FontAwesomeIcon icon={faPhoneFlip} />
                            <p className={cx('contact-info')}>Kỹ thuật - bảo hành: 0123.4567 phím 9</p>
                        </li>
                        <li className={cx('contact')}>
                            <FontAwesomeIcon icon={faPhoneFlip} />
                            <p className={cx('contact-info')}>Chăm sóc khách hàng: 0123.4567 phím 0</p>
                        </li>
                        <li className={cx('contact')}>
                            <FontAwesomeIcon icon={faPhoneFlip} />
                            <p className={cx('contact-info')}>Góp ý - khiếu nại: 0123.456789</p>
                        </li>
                        <li className={cx('contact')}>
                            <FontAwesomeIcon icon={faEnvelope} />
                            <p className={cx('contact-info')}>Email: sample@gmail.com</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Footer;
