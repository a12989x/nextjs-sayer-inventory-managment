const { BASE_URL } = process.env;

import { requestOptions } from './request';

const myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');

export const login = async (email, password) => {
    const raw = JSON.stringify({ identifier: email, password });

    const res = await fetch(
        `${BASE_URL}/auth/local`,
        requestOptions('POST', myHeaders, raw)
    );
    const data = await res.json();

    return data;
};
