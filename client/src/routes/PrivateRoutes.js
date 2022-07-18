import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Navigate, useNavigate } from 'react-router-dom';
import authenticationApi from '~/api/authenticationApi';
import { io } from 'socket.io-client';
import { fetchDetailBills } from '~/app/reducerDetailBill';
import { useDispatch } from 'react-redux';

const socket = io(process.env.REACT_APP_URL);
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
                dispatch(fetchDetailBills());
            }
        };
        validation();
    }, [children]);

    useEffect(() => {
        socket.on('message', async (arg) => {
            dispatch(fetchDetailBills());
        });
    }, [socket]);
    return <>{checkLogin ? children : <Navigate to="/Admin/Login" />}</>;
}

PrivateRoutes.propTypes = {
    children: PropTypes.node,
};

export default PrivateRoutes;
