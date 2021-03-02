import nookies, { parseCookies } from 'nookies';
import { useState } from 'react';
import Notiflix from 'notiflix';

import { useForm } from '../hooks/useForm';
import { getOthers } from '../lib/others';

import SelectInput from '../components/SelectInput';
import { newItem } from '../lib/items';

export const getServerSideProps = async (ctx) => {
    const jwt = nookies.get(ctx).jwt;

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${jwt}`);

    const colors = await getOthers('colors', myHeaders, '?_sort=name:asc');
    const variants = await getOthers('variants', myHeaders);
    const sizes = await getOthers('sizes', myHeaders);

    const defaultOption = (type) => {
        return { name: '', id: type.length + 100 };
    };

    colors.push(defaultOption(colors));
    variants.push(defaultOption(variants));
    sizes.push(defaultOption(sizes));

    return { props: { colors, variants, sizes } };
};

const New = ({ colors, variants, sizes }) => {
    const [values, handleChange] = useForm({ code: '', qty: 0 });
    const [color, setColor] = useState(colors[colors.length - 1]);
    const [variant, setVariant] = useState(variants[variants.length - 1]);
    const [size, setSize] = useState(sizes[sizes.length - 1]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const jwt = parseCookies().jwt;

        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', `Bearer ${jwt}`);

        if (color.name === '' || size.name === '') {
            Notiflix.Notify.Info('Porfavor excoje un color o tamaño');
            return;
        }

        const item = {
            code: values.code.replace('.', '_'),
            qty: values.qty,
            color: color.id,
            variant: variant.name === '' ? null : variant.id,
            size: size.id,
        };

        try {
            await newItem(item, myHeaders);
            Notiflix.Notify.Success('Producto creado correctamente');
        } catch (err) {
            Notiflix.Notify.Failure('Producto no creado');
        }
    };

    return (
        <main className='new'>
            <form className='new__form' onSubmit={handleSubmit}>
                <h1 className='new__product'>Nuevo Producto :</h1>

                <div className='new__titles'>
                    <label htmlFor='code' className='new__title'>
                        Clave :
                    </label>
                    <label htmlFor='qty' className='new__title'>
                        Cantidad :
                    </label>
                </div>
                <input
                    className='new__code'
                    type='text'
                    id='code'
                    name='code'
                    value={values.code}
                    onChange={handleChange}
                    required
                />
                <input
                    className='new__qty'
                    type='number'
                    id='qty'
                    name='qty'
                    value={values.qty}
                    onChange={handleChange}
                    required
                />

                <div className='new__titles'>
                    <label className='new__title' htmlFor='colors'>
                        Color :
                    </label>
                    <label className='new__title' htmlFor='variants'>
                        Variante :
                    </label>
                </div>
                <SelectInput
                    values={colors}
                    id='colors'
                    state={color}
                    setState={setColor}
                />
                <SelectInput
                    values={variants}
                    id='variants'
                    state={variant}
                    setState={setVariant}
                />

                <div className='new__titles'>
                    <label className='new__title' htmlFor='sizes'>
                        Sizes :
                    </label>
                </div>
                <div className='new__sizes'>
                    <SelectInput
                        values={sizes}
                        id='sizes'
                        state={size}
                        setState={setSize}
                    />
                </div>

                <button className='new__button'>Crear nuevo color</button>
            </form>
        </main>
    );
};

export default New;
