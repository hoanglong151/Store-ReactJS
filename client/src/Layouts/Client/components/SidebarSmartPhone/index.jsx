import React, { useEffect, useState } from 'react';
import classnames from 'classnames/bind';
import styles from './SidebarSmartPhone.module.scss';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const cx = classnames.bind(styles);
function SidebarSmartPhone() {
    const [firmByProduct, setFirmByProduct] = useState([]);
    const [activeCategory, setActiveCategory] = useState({});
    const state = useSelector((state) => state);
    const { category, firm, typeProduct } = state;
    const { categories } = category;
    const { firms } = firm;
    const { typeProducts } = typeProduct;
    const arrayBackgroundColor = [
        '90, 160, 141',
        '137, 219, 236',
        '255, 208, 141',
        '246, 131, 112',
        '254, 171, 185',
        '207, 151, 215',
        '212, 212, 212',
        '237, 170, 125',
        '240, 199, 171',
    ];

    useEffect(() => {
        setActiveCategory(categories[0]);
        const getFirmsID = typeProducts.map((type) => {
            if (type.Category_ID.includes(categories[0]._id)) {
                return type.Firm_ID;
            }
        });
        const getFirms = firms.filter((firm, index) => {
            return getFirmsID.includes(firm._id);
        });
        setFirmByProduct(getFirms);
    }, []);

    const handleGetCategory = (category) => {
        setActiveCategory(category);
        const getFirmsID = typeProducts.map((type) => {
            if (type.Category_ID.includes(category._id)) {
                return type.Firm_ID;
            }
        });
        const getFirms = firms.filter((firm, index) => {
            return getFirmsID.includes(firm._id);
        });
        setFirmByProduct(getFirms);
    };

    return (
        <div className={cx('wrapper')}>
            <ul className={cx('sidebar')}>
                <div className={cx('menu')}>
                    {categories.map((category, index) => (
                        <li
                            className={cx('item', { 'active-item': activeCategory._id === category._id })}
                            key={category._id}
                        >
                            <button
                                style={{ backgroundColor: `rgb(${arrayBackgroundColor[index]})` }}
                                className={cx('link')}
                                onClick={() => handleGetCategory(category)}
                            >
                                <img alt="Danh Mục Sản Phẩm" className={cx('image')} src={category.Image} />
                                <span className={cx('name')}>{category.Name}</span>
                            </button>
                        </li>
                    ))}
                </div>
                <ul className={cx('sub-menu')}>
                    <div className={cx('show-all')}>
                        <h3>{activeCategory.Name}</h3>
                        <Link to={`/category`} state={{ cateID: activeCategory._id }}>
                            Xem tất cả
                        </Link>
                    </div>
                    {firmByProduct.map((firm, index) => (
                        <li key={firm._id}>
                            <Link
                                to={`/firm`}
                                state={{ cateID: category._id, firmID: firm._id }}
                                className={cx('sub-menu-name')}
                            >
                                {firm.Name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </ul>
        </div>
    );
}

export default SidebarSmartPhone;
