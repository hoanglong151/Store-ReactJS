import React, { useState } from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import classnames from 'classnames/bind';
import styles from './BottomNavigationSmartPhone.module.scss';
import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import { useNavigate } from 'react-router-dom';
import SidebarSmartPhone from '../SidebarSmartPhone';

const cx = classnames.bind(styles);

function BottomNavigationSmartPhone() {
    const [value, setValue] = useState(0);
    const navigate = useNavigate();
    return (
        <div className={cx('wrapper')}>
            {value === 1 && (
                <div className={cx('category-smartphone')}>
                    <SidebarSmartPhone />
                </div>
            )}
            <Box className={cx('bottom-navigation')}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        switch (newValue) {
                            case 0:
                                navigate('/');
                                break;
                        }
                        setValue(newValue);
                    }}
                >
                    <BottomNavigationAction label="Trang Chủ" icon={<HomeIcon />} />
                    <BottomNavigationAction label="Danh Mục" icon={<ArticleIcon />} />
                </BottomNavigation>
            </Box>
        </div>
    );
}

export default BottomNavigationSmartPhone;
