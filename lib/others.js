const { BASE_URL } = process.env;

import { requestOptions } from './request';

export const getOthers = async (type, parameters = '/') => {
    const res = await fetch(
        `${BASE_URL}/${type}${parameters}`,
        requestOptions('GET')
    );
    const data = await res.json();

    return data;
};
