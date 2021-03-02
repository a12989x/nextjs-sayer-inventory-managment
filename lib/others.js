const { BASE_URL } = process.env;

import { requestOptions } from './request';

export const getOthers = async (type, myHeaders, parameters = '/') => {
    const res = await fetch(
        `${BASE_URL}/${type}${parameters}`,
        requestOptions('GET', myHeaders)
    );
    const data = await res.json();

    return data;
};
