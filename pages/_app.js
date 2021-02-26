import Router from 'next/router';
import { parseCookies } from 'nookies';

import Layout from '../components/Layout';

import SearchContextProvider from '../context/SearchContext';

import '../styles/main.scss';
import AuthContextProvider from '../context/AuthContext';

const MyApp = ({ Component, pageProps }) => {
    return (
        <SearchContextProvider>
            <AuthContextProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </AuthContextProvider>
        </SearchContextProvider>
    );
};

const redirectUser = (ctx, location) => {
    if (ctx.req) {
        ctx.res.writeHead(302, { Location: location });
        ctx.res.end();
    } else {
        Router.push(location);
    }
};

MyApp.getInitialProps = async ({ Component, ctx }) => {
    let pageProps = {};
    const jwt = parseCookies(ctx).jwt;

    if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
    }

    if (!jwt && ctx.pathname !== '/login') {
        redirectUser(ctx, '/login');
    }

    return { pageProps };
};

export default MyApp;
