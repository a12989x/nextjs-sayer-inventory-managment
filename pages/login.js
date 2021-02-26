import { useContext } from 'react';

import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const { values, handleChange, handleSubmit } = useContext(AuthContext);

    return (
        <main className='login'>
            <form className='login__form' onSubmit={handleSubmit}>
                <h1 className='login__title'>Inicia Sesión</h1>
                <input
                    className='login__email'
                    type='email'
                    name='email'
                    value={values.email}
                    onChange={handleChange}
                    required
                />
                <input
                    className='login__password'
                    type='password'
                    name='password'
                    value={values.password}
                    onChange={handleChange}
                    required
                />
                <button className='login__btn'>Login</button>
            </form>
        </main>
    );
};

export default Login;
