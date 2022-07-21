import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-toastify/dist/ReactToastify.css';
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
import Loading from './components/Loading/LoadingAPI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronUp } from '@fortawesome/free-solid-svg-icons';
import classnames from 'classnames/bind';
import VerifyAuth from './pages/Admin/Authentication/Verify';

const cx = classnames.bind();
function App() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [goToTop, setGoToTop] = useState(false);

    useEffect(() => {
        window.fbAsyncInit = function () {
            window.FB.init({
                xfbml: true,
                version: 'v14.0',
            });
        };

        window.addEventListener('scroll', () => {
            window.scrollY > 400 ? setGoToTop(true) : setGoToTop(false);
        });
    }, []);

    useEffect(() => {
        const callApi = async () => {
            setLoading(true);
            try {
                const resultCart = dispatch(getCarts());
                const resultCategory = dispatch(fetchCategories());
                const resultFirm = dispatch(fetchFirms());
                const resultTypeProduct = dispatch(fetchTypeProducts());
                Promise.all([resultCart, resultCategory, resultFirm, resultTypeProduct]).then(() => setLoading(false));
            } catch (err) {
                console.log('Call API Err');
            }
        };
        callApi();
    }, []);

    const handleGoToTop = () => {
        window.scroll(0, 0);
    };

    return (
        <div className="App">
            <div id="fb-root"></div>

            <div
                id="fb-customer-chat"
                className="fb-customerchat"
                page_id={process.env.REACT_APP_PAGE_ID}
                attribution="biz_inbox"
            ></div>
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
                    <Route path="/Admin/Verify" element={<VerifyAuth />} />
                </Routes>
            </BrowserRouter>

            <div className={cx('top', { 'go-to-top': goToTop })} onClick={handleGoToTop}>
                <FontAwesomeIcon icon={faCircleChevronUp} />
            </div>
        </div>
    );
}

export default App;
