import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import authenticationApi from '~/api/authenticationApi';
import { io } from 'socket.io-client';
import { fetchBills } from '~/app/reducerBill';
import { useDispatch } from 'react-redux';

const socket = io(process.env.REACT_APP_WEB_SOCKET);
function PrivateRoutes({ children }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const checkLogin = sessionStorage.getItem('accessToken');
    useEffect(() => {
        const validation = async () => {
            const result = await authenticationApi.validateToken();
            if (result.token) {
                sessionStorage.removeItem('accessToken');
                navigate('/Admin/Login');
            } else {
                dispatch(fetchBills());
            }
        };
        validation();
    }, [children]);

    useEffect(() => {
        socket.on('message', async (arg) => {
            dispatch(fetchBills());
        });
    }, [socket]);
    return <>{checkLogin ? children : <Navigate to="/Admin/Login" />}</>;
}

export default PrivateRoutes;
