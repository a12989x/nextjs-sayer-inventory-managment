import { signIn, useSession } from 'next-auth/client';
import { useContext, useEffect } from 'react';

import { getItems } from '../lib/items';

import { SearchContext } from '../context/SearchContext';

import Item from '../components/Item';

export const getStaticProps = async () => {
    const items = await getItems();

    return { props: { items }, revalidate: 10 };
};

const index = ({ items }) => {
    const [session, loading] = useSession();
    const { item } = useContext(SearchContext);

    useEffect(() => {
        if (loading) return;
        if (!session) signIn();
    }, [loading]);

    if (!session) return <p>Loading ...</p>;

    return (
        <main className='home'>
            <section className='home__item'>
                {item && <Item specific={true} {...item} />}
            </section>

            <section className='home__items'>
                <h2 className='home__products'>Productos :</h2>
                {items.map((item) => (
                    <Item key={item.code} {...item} />
                ))}
            </section>
        </main>
    );
};

export default index;
