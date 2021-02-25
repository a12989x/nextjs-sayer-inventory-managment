const { BASE_URL } = process.env;

var myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');

const requestOptions = (raw) => {
    return {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
    };
};

export const getItems = async () => {
    const res = await fetch(
        `${BASE_URL}/items?qty_lte=2&_sort=qty:ASC&_limit=35`
    );
    const data = await res.json();

    return data;
};

export const getItem = async (code) => {
    const res = await fetch(`${BASE_URL}/items?code_eq=${code}`);
    const data = await res.json();

    return data;
};

export const changeItemQty = (id, qty) => {
    const raw = JSON.stringify({ qty });

    fetch(`${BASE_URL}/items/${id}`, requestOptions(raw));
};
