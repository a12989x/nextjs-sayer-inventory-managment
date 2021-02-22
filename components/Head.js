import NextHead from 'next/head';

const Head = () => {
    return (
        <NextHead>
            <meta charSet='UTF-8' />
            <title>Inventario Sayer</title>
            <meta
                name='description'
                content='Sistema de inventario para Sayer La Via'
            />
            <meta
                name='viewport'
                content='width=device-width, initial-scale=1'
            />
        </NextHead>
    );
};

export default Head;
