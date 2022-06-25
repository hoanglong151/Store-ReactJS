import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { StyledEngineProvider } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import theme from '~/styles/GlobalStylesMUI';
import GlobalStyles from '~/styles/index';

ReactDOM.createRoot(document.querySelector('#root')).render(
    // <React.StrictMode>
    <GlobalStyles>
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <App />
                </Provider>
            </ThemeProvider>
        </StyledEngineProvider>
    </GlobalStyles>,
    // </React.StrictMode>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
