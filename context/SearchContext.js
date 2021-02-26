import { useRouter } from 'next/router';
import { useState, createContext } from 'react';
import { parseCookies } from 'nookies';
import Notiflix from 'notiflix';

import { useForm } from '../hooks/useForm';
import { getItem } from '../lib/items';

export const SearchContext = createContext();

const SearchContextProvider = ({ children }) => {
    const [item, setItem] = useState(null);
    const [values, handleChange] = useForm({ item: '' });

    const getProduct = async (e, value = values.item) => {
        e.preventDefault();
        const valueFormatted = value.replace('.', '_').toLowerCase();

        const jwt = parseCookies().jwt;

        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', `Bearer ${jwt}`);

        const item = await getItem(valueFormatted, myHeaders);
        setItem(item[0]);

        if (item.length === 0)
            Notiflix.Notify.Failure('Producto no encontrado');
        else Notiflix.Notify.Success('Producto Obtenido Correctamente');
    };

    return (
        <SearchContext.Provider
            value={{ values, handleChange, item, getProduct }}
        >
            {children}
        </SearchContext.Provider>
    );
};

export default SearchContextProvider;
