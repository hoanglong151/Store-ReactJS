import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getCarts } from '~/app/reducerCart';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes } from '~/routes';
import { DefaultLayout } from '~/Layouts/Admin';
import { DefaultLayout as DefaultLayoutClient } from '~/Layouts/Client';
import Login from './pages/Admin/Authentication/Login';
import PrivateRoutes from './routes/PrivateRoutes';
import { fetchCategories } from '~/app/reducerCategory';
import { fetchFirms } from '~/app/reducerFirm';
import { fetchTypeProducts } from '~/app/reducerTypeProduct';
import Loading from './components/Loading';
function App() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getCart = async () => {
            await dispatch(getCarts());
        };
        getCart();
    }, []);

    useEffect(() => {
        const callApi = async () => {
            setLoading(true);
            try {
                const resultCategory = dispatch(fetchCategories());
                const resultFirm = dispatch(fetchFirms());
                const resultTypeProduct = dispatch(fetchTypeProducts());
                Promise.all([resultCategory, resultFirm, resultTypeProduct]).then(() => setLoading(false));
            } catch (err) {
                console.log('Call API Err');
            }
        };
        callApi();
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
                                element={<LayoutClient>{loading ? <Loading /> : <Page />}</LayoutClient>}
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
