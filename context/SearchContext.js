import { useState, createContext } from 'react';

import { useForm } from '../hooks/useForm';
import { getItem } from '../lib/api';

const fetcher = (...args) => fetch(...args).then((res) => res.json());
const BASE_URL = 'https://ax-strapi-sayer-ecommerce.herokuapp.com';

export const SearchContext = createContext();

const SearchContextProvider = ({ children }) => {
    const [item, setItem] = useState(null);
    const [values, handleChange] = useForm({ item: '' });

    const getProduct = async (e, value = values.item) => {
        e.preventDefault();

        const valueFormatted = value.replace('.', '_').toLowerCase();
        const item = await getItem(valueFormatted);
        setItem(item[0]);
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
