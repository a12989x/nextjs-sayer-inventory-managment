export const myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');

export const requestOptions = (method, headers = myHeaders, raw = null) => {
    return {
        method,
        headers,
        body: raw,
        redirect: 'follow',
    };
};
