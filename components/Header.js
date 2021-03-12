import Link from 'next/link';
import Image from 'next/image';
import { signIn, signOut, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import useDarkMode from 'use-dark-mode';

import { SearchContext } from '../context/SearchContext';

const Header = () => {
    const [session, loading] = useSession();
    const { values, handleChange, getProduct } = useContext(SearchContext);
    const darkMode = useDarkMode(false);
    const router = useRouter();

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
                {session && router.pathname === '/' && (
                    <input
                        type='text'
                        className='header__search'
                        name='item'
                        value={values.item}
                        onChange={handleChange}
                    />
                )}
            </form>
            <button className='header__theme' onClick={darkMode.toggle}>
                <Image
                    className='header__svg'
                    alt={`${darkMode.value ? 'sun' : 'moon'} icon`}
                    src={`/assets/svg/${
                        darkMode.value ? 'sun' : 'moon'
                    }.min.svg`}
                    height='18'
                    width='18'
                />
            </button>
            {session && (
                <Link href='/new'>
                    <a className='header__plus'>
                        <Image
                            className='header__svg'
                            alt='plus icon'
                            src={`/assets/svg/plus-${
                                darkMode.value ? 'dark' : 'light'
                            }.min.svg`}
                            height='18'
                            width='18'
                        />
                    </a>
                </Link>
            )}
            {session && (
                <button className='header__logOut' onClick={() => signOut()}>
                    <Image
                        className='header__svg'
                        src={`/assets/svg/log-out-${
                            darkMode.value ? 'dark' : 'light'
                        }.min.svg`}
                        height='18'
                        width='18'
                    />
                </button>
            )}
        </header>
    );
};

export default Header;
