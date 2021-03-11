import { Provider } from 'next-auth/client';

import Layout from '../components/Layout';

import SearchContextProvider from '../context/SearchContext';

import '../styles/main.scss';

const MyApp = ({ Component, pageProps }) => {
    return (
        <Provider session={pageProps.session}>
            <SearchContextProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </SearchContextProvider>
        </Provider>
    );
};

export default MyApp;
