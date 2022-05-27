import React, { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getProducts } from '~/app/reducerProduct';
import { getCategories } from '~/app/reducerCategory';
import { getFirms } from '~/app/reducerFirm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes } from '~/routes';
import { DefaultLayout } from '~/components/Layouts/Admin';
import { DefaultLayout as DefaultLayoutClient } from '~/components/Layouts/Client';

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

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    {publicRoutes.map((route, index) => {
                        let LayoutClient = DefaultLayoutClient;
                        const Page = route.component;

                        // if (route.layout) {
                        //     LayoutAdmin = route.layout;
                        // }

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

                        // if (route.layout) {
                        //     LayoutUser = route.layout;
                        // }

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <LayoutAdmin>
                                        <Page />
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
