const { BASE_URL } = process.env;

import { requestOptions } from './request';

export const getItems = async (myHeaders) => {
    const res = await fetch(
        `${BASE_URL}/items?qty_lte=2&_sort=qty:ASC&_limit=35`,
        requestOptions('GET', myHeaders)
    );
    const data = await res.json();

    return data;
};

export const getItem = async (code, myHeaders) => {
    const res = await fetch(
        `${BASE_URL}/items?code_eq=${code}`,
        requestOptions('GET', myHeaders)
    );
    const data = await res.json();

    return data;
};

export const getLastItem = async (myHeaders) => {
    const res = await fetch(
        `${BASE_URL}/items?_sort=id:DESC&_limit=1`,
        requestOptions('GET', myHeaders)
    );
    const data = await res.json();

    return data;
};

export const changeItemQty = async (id, qty, myHeaders) => {
    const raw = JSON.stringify({ qty });

    await fetch(
        `${BASE_URL}/items/${id}`,
        requestOptions('PUT', myHeaders, raw)
    );
};

export const newItem = async (item, myHeaders) => {
    const raw = JSON.stringify(item);

    await fetch(`${BASE_URL}/items/`, requestOptions('POST', myHeaders, raw));
};
