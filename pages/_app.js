import Layout from '../components/Layout';

import SearchContextProvider from '../context/SearchContext';

import '../styles/main.scss';

const MyApp = ({ Component, pageProps }) => {
    return (
        <SearchContextProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </SearchContextProvider>
    );
};

export default MyApp;
