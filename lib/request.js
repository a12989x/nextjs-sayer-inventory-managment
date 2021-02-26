export const requestOptions = (method, headers, raw = null) => {
    return {
        method,
        headers,
        body: raw,
        redirect: 'follow',
    };
};
