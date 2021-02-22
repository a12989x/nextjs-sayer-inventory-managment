import Head from './Head';
import Header from './Header';

const Layout = ({ children }) => {
    return (
        <>
            <Head />
            <Header />
            {children}
        </>
    );
};

export default Layout;
