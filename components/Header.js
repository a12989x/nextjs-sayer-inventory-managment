import Link from 'next/link';
import Image from 'next/image';
import { useContext } from 'react';

import { SearchContext } from '../context/SearchContext';

const Header = () => {
    const { values, handleChange, getProduct } = useContext(SearchContext);

    return (
        <header className='header'>
            <Link href='/'>
                <a className='header__logo'>
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
            <button className='header__logOut'>
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
