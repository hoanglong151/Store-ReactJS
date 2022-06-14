import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import authenticationApi from '~/api/authenticationApi';

function PrivateRoutes({ children }) {
    const navigate = useNavigate();
    const checkLogin = sessionStorage.getItem('accessToken');
    useEffect(() => {
        const validation = async () => {
            const result = await authenticationApi.validateToken(checkLogin);
            if (result.token) {
                sessionStorage.setItem('accessToken', null);
                navigate('/Admin/Login');
            }
        };
        validation();
    }, [children]);
    return <>{checkLogin ? children : <Navigate to="/Admin/Login" />}</>;
}

export default PrivateRoutes;
