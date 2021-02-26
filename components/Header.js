import Link from 'next/link';
import Image from 'next/image';
import { useContext } from 'react';

import { SearchContext } from '../context/SearchContext';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
    const { values, handleChange, getProduct } = useContext(SearchContext);
    const { logOut } = useContext(AuthContext);

    return (
        <header className='header'>
            <Link href='/'>
                <a className='header__logo'>
                    <Image
                        className='header__logoSvg'
                        src='/assets/svg/sayer-logo.min.svg'
                        height='28'
                        width='37'
                    />
                    <h1 className='header__title'>Sayer</h1>
                </a>
            </Link>
            <form className='header__header' onSubmit={getProduct}>
                <input
                    type='text'
                    className='header__search'
                    name='item'
                    value={values.item}
                    onChange={handleChange}
                />
            </form>
            <button className='header__logOut' onClick={logOut}>
                <Image
                    className='header__svg'
                    src='/assets/svg/log-out.min.svg'
                    height='18'
                    width='18'
                />
            </button>
        </header>
    );
};

export default Header;
