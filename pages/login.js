import { useContext } from 'react';

import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const { values, handleChange, handleSubmit } = useContext(AuthContext);

    return (
        <main className='login'>
            <form className='login__form' onSubmit={handleSubmit}>
                <h1 className='login__title'>Inicia Sesión</h1>
                <label className='login__label' htmlFor='email'>
                    E-mail :
                </label>
                <input
                    className='login__email'
                    type='email'
                    id='email'
                    name='email'
                    value={values.email}
                    onChange={handleChange}
                    required
                />

                <label className='login__label' htmlFor='password'>
                    Password :
                </label>
                <input
                    className='login__password'
                    type='password'
                    id='password'
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
