const SelectInput = ({ values, id, state, setState }) => {
    return (
        <div className='selectInput'>
            <select
                className='selectInput__select'
                id={id}
                value={state.name}
                onChange={(e) =>
                    setState(
                        values.filter(
                            (value) => value.name === e.target.value
                        )[0]
                    )
                }
            >
                {values.map((value) => (
                    <option key={values.id} className='selectInput__option'>
                        {value.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectInput;
