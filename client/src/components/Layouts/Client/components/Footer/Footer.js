import React from 'react';
import clsx from 'clsx';
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

function Footer() {
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.footerImage)}>
                <div className={clsx(styles.item)}>
                    <FontAwesomeIcon className={clsx(styles.icon)} icon={faTruckFast} />
                    <div className={clsx(styles.content)}>
                        <h3 className={clsx(styles.title)}>CHÍNH SÁCH GIAO HÀNG</h3>
                        <p className={clsx(styles.info)}>Nhận hàng và thanh toán tại nhà</p>
                    </div>
                </div>
                <div className={clsx(styles.item)}>
                    <FontAwesomeIcon className={clsx(styles.icon)} icon={faRotate} />
                    <div className={clsx(styles.content)}>
                        <h3 className={clsx(styles.title)}>ĐỔI TRẢ DỄ DÀNG</h3>
                        <p className={clsx(styles.info)}>Dùng thử trong vòng 3 ngày</p>
                    </div>
                </div>
                <div className={clsx(styles.item)}>
                    <FontAwesomeIcon className={clsx(styles.icon)} icon={faCreditCard} />
                    <div className={clsx(styles.content)}>
                        <h3 className={clsx(styles.title)}>THANH TOÁN TIỆN LỢI</h3>
                        <p className={clsx(styles.info)}>Trả tiền mặt, CK, trả góp 0%</p>
                    </div>
                </div>
                <div className={clsx(styles.item)}>
                    <FontAwesomeIcon className={clsx(styles.icon)} icon={faComment} />
                    <div className={clsx(styles.content)}>
                        <h3 className={clsx(styles.title)}>HỖ TRỢ NHIỆT TÌNH</h3>
                        <p className={clsx(styles.info)}>Tư vấn, giải đáp mọi thắc mắc</p>
                    </div>
                </div>
            </div>
            <span className={clsx(styles.breakLine)}></span>
            <div className={clsx(styles.footerInfo)}>
                <div className={clsx(styles.generalInfo)}>
                    <h2>THÔNG TIN CHUNG</h2>
                    <ul className={clsx(styles.list)}>
                        <li>
                            <Link className={clsx(styles.link)} to="/">
                                Giới thiệu về Noly House
                            </Link>
                        </li>
                        <li>
                            <Link className={clsx(styles.link)} to="/">
                                Tin tức
                            </Link>
                        </li>
                        <li>
                            <Link className={clsx(styles.link)} to="/">
                                Tin Tuyển Dụng
                            </Link>
                        </li>
                        <li>
                            <Link className={clsx(styles.link)} to="/">
                                Liên hệ - góp ý
                            </Link>
                        </li>
                        <li>
                            <Link className={clsx(styles.link)} to="/">
                                Khách hàng doanh nghiệp
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={clsx(styles.supportClient)}>
                    <h2>HỖ TRỢ KHÁCH HÀNG</h2>
                    <ul className={clsx(styles.list)}>
                        <li>
                            <Link className={clsx(styles.link)} to="/">
                                Hướng dẫn mua hàng trực tuyến
                            </Link>
                        </li>
                        <li>
                            <Link className={clsx(styles.link)} to="/">
                                Hướng dẫn thanh toán
                            </Link>
                        </li>
                        <li>
                            <Link className={clsx(styles.link)} to="/">
                                Hướng dẫn mua hàng trả góp
                            </Link>
                        </li>
                        <li>
                            <Link className={clsx(styles.link)} to="/">
                                In hóa đơn điện tử
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={clsx(styles.generalPolicy)}>
                    <h2>CHÍNH SÁCH CHUNG</h2>
                    <ul className={clsx(styles.list)}>
                        <li>
                            <Link className={clsx(styles.link)} to="/">
                                Chính sách vận chuyển
                            </Link>
                        </li>
                        <li>
                            <Link className={clsx(styles.link)} to="/">
                                Chính sách bảo hành
                            </Link>
                        </li>
                        <li>
                            <Link className={clsx(styles.link)} to="/">
                                Chính sách đổi trả và hoàn tiền
                            </Link>
                        </li>
                        <li>
                            <Link className={clsx(styles.link)} to="/">
                                Chính sách cho doanh nghiệp
                            </Link>
                        </li>
                        <li>
                            <Link className={clsx(styles.link)} to="/">
                                Chính sách hàng chính hãng
                            </Link>
                        </li>
                        <li>
                            <Link className={clsx(styles.link)} to="/">
                                Bảo mật thông tin khách hàng
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={clsx(styles.support)}>
                    <h2>CHÍNH SÁCH CHUNG</h2>
                    <ul className={clsx(styles.list)}>
                        <li className={clsx(styles.contact)}>
                            <FontAwesomeIcon icon={faPhoneFlip} />
                            <p className={clsx(styles.contactInfo)}>Kinh doanh online: 0123.4567 phím 1</p>
                        </li>
                        <li className={clsx(styles.contact)}>
                            <FontAwesomeIcon icon={faPhoneFlip} />
                            <p className={clsx(styles.contactInfo)}>Kinh doanh dự án: 0123.4567 phím 8</p>
                        </li>
                        <li className={clsx(styles.contact)}>
                            <FontAwesomeIcon icon={faPhoneFlip} />
                            <p className={clsx(styles.contactInfo)}>Kỹ thuật - bảo hành: 0123.4567 phím 9</p>
                        </li>
                        <li className={clsx(styles.contact)}>
                            <FontAwesomeIcon icon={faPhoneFlip} />
                            <p className={clsx(styles.contactInfo)}>Chăm sóc khách hàng: 0123.4567 phím 0</p>
                        </li>
                        <li className={clsx(styles.contact)}>
                            <FontAwesomeIcon icon={faPhoneFlip} />
                            <p className={clsx(styles.contactInfo)}>Góp ý - khiếu nại: 0123.456789</p>
                        </li>
                        <li className={clsx(styles.contact)}>
                            <FontAwesomeIcon icon={faEnvelope} />
                            <p className={clsx(styles.contactInfo)}>Email: sample@gmail.com</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Footer;
