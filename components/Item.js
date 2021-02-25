import { useState, useEffect } from 'react';

import { changeItemQty } from '../lib/api';

const Item = ({ id, code, qty, specific }) => {
    const [qtyState, setQtyState] = useState(qty);

    useEffect(() => {
        setQtyState(qty);
    }, [code]);

    const handleChange = async (plus = true) => {
        const currentQty = plus ? qtyState + 1 : qtyState - 1;
        changeItemQty(id, currentQty);
        setQtyState(currentQty);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        changeItemQty(id, qtyState);
    };

    return (
        <div className='item'>
            {specific && (
                <>
                    <span className='item__codeName'>Clave :</span>
                    <span className='item__qtyName'>Cantidad :</span>
                </>
            )}
            <p className='item__code'>{code.replace('_', '.').toUpperCase()}</p>
            <div className='item__buttons'>
                <button
                    className='item__minus'
                    onClick={() => handleChange(false)}
                >
                    -
                </button>
                <form className='item__form' onSubmit={handleSubmit}>
                    <input
                        className='item__input'
                        type='number'
                        value={qtyState}
                        onChange={(e) => setQtyState(+e.target.value)}
                    />
                </form>
                <button className='item__plus' onClick={handleChange}>
                    +
                </button>
            </div>
        </div>
    );
};

export default Item;
