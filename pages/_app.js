import nookies from 'nookies';

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
    ctx.res.setHeader('location', location);
    ctx.res.statusCode = 302;
    ctx.res.end();
};

MyApp.getInitialProps = async ({ Component, ctx }) => {
    let pageProps = {};

    const jwt = nookies.get(ctx).jwt;

    if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
    }

    if (!jwt && ctx.pathname !== '/login') redirectUser(ctx, '/login');
    else if (jwt && ctx.pathname === '/login') redirectUser(ctx, '/');

    return { pageProps };
};

export default MyApp;
