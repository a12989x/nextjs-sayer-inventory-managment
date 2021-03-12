import { useState, createContext } from 'react';
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

        const item = await getItem(valueFormatted);
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
