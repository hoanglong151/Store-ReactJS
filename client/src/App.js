import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getProducts } from '~/app/reducerProduct';
import { getCategories } from '~/app/reducerCategory';
import { getFirms } from '~/app/reducerFirm';
import { getCarts } from '~/app/reducerCart';
import { getAreas } from '~/app/reducerArea';
import { getProvinces } from './app/reducerProvince';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { publicRoutes, privateRoutes } from '~/routes';
import { DefaultLayout } from '~/components/Layouts/Admin';
import { DefaultLayout as DefaultLayoutClient } from '~/components/Layouts/Client';
import { getDistricts } from './app/reducerDistrict';
import { getSaleCodes } from './app/reducerSaleCode';
import { getAddressStores } from './app/reducerAddressStore';
import Login from './pages/Admin/Authentication/Login/Login';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const getProduct = async () => {
            await dispatch(getProducts());
        };
        getProduct();
    }, []);

    useEffect(() => {
        const getCategory = async () => {
            await dispatch(getCategories());
        };
        getCategory();
    }, []);

    useEffect(() => {
        const getFirm = async () => {
            await dispatch(getFirms());
        };
        getFirm();
    }, []);

    useEffect(() => {
        const getArea = async () => {
            await dispatch(getAreas());
        };
        getArea();
    }, []);

    useEffect(() => {
        const getProvince = async () => {
            await dispatch(getProvinces());
        };
        getProvince();
    }, []);

    useEffect(() => {
        const getDistrict = async () => {
            await dispatch(getDistricts());
        };
        getDistrict();
    }, []);

    useEffect(() => {
        const getSaleCode = async () => {
            await dispatch(getSaleCodes());
        };
        getSaleCode();
    }, []);

    useEffect(() => {
        const getAddressStore = async () => {
            await dispatch(getAddressStores());
        };
        getAddressStore();
    }, []);

    useEffect(() => {
        const getCart = async () => {
            await dispatch(getCarts());
        };
        getCart();
    }, []);

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    {publicRoutes.map((route, index) => {
                        let LayoutClient = DefaultLayoutClient;
                        const Page = route.component;

                        if (route.layout) {
                            LayoutClient = route.layout;
                        }

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <LayoutClient>
                                        <Page />
                                    </LayoutClient>
                                }
                            />
                        );
                    })}

                    {privateRoutes.map((route, index) => {
                        const checkLogin = sessionStorage.getItem('tokenUser');
                        let LayoutAdmin = DefaultLayout;
                        const Page = route.component;

                        if (route.layout) {
                            LayoutAdmin = route.layout;
                        } else if (route.layout === null) {
                            LayoutAdmin = Fragment;
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <LayoutAdmin>
                                        <Page auth={checkLogin} />
                                    </LayoutAdmin>
                                }
                            />
                        );
                    })}
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
