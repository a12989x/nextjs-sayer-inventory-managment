import { useContext } from 'react';

import { getItems } from '../lib/api';

import { SearchContext } from '../context/SearchContext';

import Item from '../components/Item';

export const getServerSideProps = async () => {
    const items = await getItems();

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
