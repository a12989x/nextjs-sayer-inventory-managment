import { useContext } from 'react';
import nookies from 'nookies';

import { getItems } from '../lib/items';

import { SearchContext } from '../context/SearchContext';

import Item from '../components/Item';

export const getServerSideProps = async (ctx) => {
    const jwt = nookies.get(ctx).jwt;

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${jwt}`);

    const items = await getItems(myHeaders);

    return { props: { items } };
};

const index = ({ items }) => {
    const { item } = useContext(SearchContext);

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
