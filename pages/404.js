import Link from 'next/link';

const Custom404 = () => {
    return (
        <main className='fourOhFour'>
            <h1 className='fourOhFour__404'>404</h1>
            <p className='fourOhFour__description'>
                La página que buscas no existe o esta en mantenimiento.
            </p>
            <button className='fourOhFour__btn'>
                <Link href='/'>
                    <a className='fourOhFour__link'>Pagina principal</a>
                </Link>
            </button>
        </main>
    );
};

export default Custom404;
