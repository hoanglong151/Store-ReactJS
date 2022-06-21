import React, { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getCarts } from '~/app/reducerCart';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { publicRoutes, privateRoutes } from '~/routes';
import { DefaultLayout } from '~/components/Layouts/Admin';
import { DefaultLayout as DefaultLayoutClient } from '~/components/Layouts/Client';
import Login from './pages/Admin/Authentication/Login/Login';
import PrivateRoutes from './routes/PrivateRoutes';

function App() {
    const dispatch = useDispatch();

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
                                    <PrivateRoutes>
                                        <LayoutAdmin>
                                            <Page />
                                        </LayoutAdmin>
                                    </PrivateRoutes>
                                }
                            />
                        );
                    })}
                    <Route path="/Admin/Login" element={<Login />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
