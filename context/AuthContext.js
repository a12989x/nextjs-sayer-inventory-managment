import { createContext, useState } from 'react';
import { useRouter } from 'next/router';
import { setCookie, destroyCookie } from 'nookies';
import Notiflix from 'notiflix';

import { useForm } from '../hooks/useForm';

import { login } from '../lib/auth';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const router = useRouter();

    const [values, handleChange] = useForm({ email: '', password: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const loginResponse = await login(values.email, values.password);

        if (loginResponse.statusCode === 400) {
            Notiflix.Notify.Failure('Email o contraseña incorrectos');
            return;
        }

        setCookie(null, 'jwt', loginResponse.jwt, {
            maxAge: 30 * 24 * 60 * 60,
            path: '/',
            secure: true,
            sameSite: 'Strict',
        });

        router.push('/');
        Notiflix.Notify.Success('Sesión iniciada correctamente');
    };

    const logOut = () => {
        destroyCookie(null, 'jwt', { path: '/' });

        router.push('/login');
        Notiflix.Notify.Info('Sesión cerrada correctamente');
    };

    return (
        <AuthContext.Provider
            value={{
                values,
                handleChange,
                handleSubmit,
                logOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
