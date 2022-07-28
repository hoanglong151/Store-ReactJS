import React, { useEffect, useState } from 'react';
import classnames from 'classnames/bind';
import styles from './Home.module.scss';
import { useSelector } from 'react-redux';
import { Area } from '@ant-design/plots';
import { productsApi, detailBillsApi } from '~/api';

const cx = classnames.bind(styles);
function Home() {
    const { category, firm } = useSelector((state) => state);
    const [countProducts, setCountProducts] = useState(0);
    const [countBillByStatus, setCountBillByStatus] = useState([]);
    const [data, setData] = useState([]);
    const getProducts = async () => {
        const result = await productsApi.getAll();
        setCountProducts(result.products.length);
    };

    const getDetailBills = async () => {
        let arrChart = [];
        const result = await detailBillsApi.getAll();
        const today = new Date();
        for (let i = 1; i <= 30; i++) {
            const startDate = new Date(new Date().setDate(today.getDate() - i)).toLocaleDateString('en-US');
            const data = result.filter((item) => {
                const dateCreateBill = new Date(item.createdAt).toLocaleDateString('en-US');
                return dateCreateBill === startDate;
            });
            arrChart.push({ timePeriod: startDate, HD: data.length });
        }
        setData(arrChart);
    };

    const getCountBillByStatus = async () => {
        const result = await detailBillsApi.getBillByStatusCount();
        setCountBillByStatus(result.billByStatus);
    };

    useEffect(() => {
        const getData = async () => {
            Promise.all([getProducts(), getDetailBills(), getCountBillByStatus()]);
        };
        getData();
    }, []);
    const config = {
        data,
        xField: 'timePeriod',
        yField: 'HD',
        xAxis: {
            range: [1, 0],
        },
    };

    return (
        <div className={cx('wrapper')}>
            <div>
                <h2 className={cx('title-dashboard')}>Thống kê</h2>
                <div className={cx('wrapper-statistics')}>
                    <div className={cx('dashboard', 'dashboard-category')}>
                        <span className={cx('title')}>Sản phẩm: </span>
                        <span className={cx('content')}>{countProducts}</span>
                    </div>
                    <div className={cx('dashboard', 'dashboard-category')}>
                        <span className={cx('title')}>Danh mục: </span>
                        <span className={cx('content')}>{category.categories.length}</span>
                    </div>
                    <div className={cx('dashboard', 'dashboard-category')}>
                        <span className={cx('title')}>Hãng: </span>
                        <span className={cx('content')}>{firm.firms.length}</span>
                    </div>
                    <div className={cx('dashboard', 'dashboard-category')}>
                        <span className={cx('title')}>Mã khuyến mãi: </span>
                        <span className={cx('content')}>{firm.firms.length}</span>
                    </div>
                </div>
            </div>
            <div>
                <h2 className={cx('title-dashboard')}>Thống kê hóa đơn</h2>
                <div className={cx('wrapper-bill')}>
                    <div className={cx('dashboard', 'dashboard-bill')}>
                        <span className={cx('title')}>Chờ xử lý: </span>
                        <span className={cx('content')}>{countBillByStatus[0]?.billByStatus.length}</span>
                    </div>
                    <div className={cx('dashboard', 'dashboard-bill')}>
                        <span className={cx('title')}>Đang xử lý: </span>
                        <span className={cx('content')}>{countBillByStatus[1]?.billByStatus.length}</span>
                    </div>
                    <div className={cx('dashboard', 'dashboard-bill')}>
                        <span className={cx('title')}>Đang xuất kho: </span>
                        <span className={cx('content')}>{countBillByStatus[2]?.billByStatus.length}</span>
                    </div>
                    <div className={cx('dashboard', 'dashboard-bill')}>
                        <span className={cx('title')}>Đang giao hàng: </span>
                        <span className={cx('content')}>{countBillByStatus[3]?.billByStatus.length}</span>
                    </div>
                    <div className={cx('dashboard', 'dashboard-bill')}>
                        <span className={cx('title')}>Hoàn tất: </span>
                        <span className={cx('content')}>{countBillByStatus[4]?.billByStatus.length}</span>
                    </div>
                </div>
            </div>
            <div>
                <h2 className={cx('title-dashboard')}>Thống kê hóa đơn</h2>
                <Area {...config} />
            </div>
        </div>
    );
}

export default Home;
