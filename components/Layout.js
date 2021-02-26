import { useRouter } from 'next/router';

import Head from './Head';
import Header from './Header';

const Layout = ({ children }) => {
    const router = useRouter();

    return (
        <>
            <Head />
            {router.pathname !== '/login' && <Header />}
            {children}
        </>
    );
};

export default Layout;
