import { csrfToken, providers, signIn } from 'next-auth/client';

export const getServerSideProps = async (ctx) => {
    const allProviders = await providers();
    const token = await csrfToken(ctx);

    return { props: { allProviders, token } };
};

const SignIn = ({ allProviders: { credentials, google }, token }) => {
    console.clear();
    console.log(credentials, google);

    return (
        <main className='signIn'>
            <form
                className='signIn__form'
                method='post'
                action='/api/auth/callback/credentials'
            >
                <input
                    className='signIn__token'
                    name='csrfToken'
                    type='hidden'
                    defaultValue={token}
                />

                <label className='signIn__label' htmlFor='email'>
                    E-mail
                </label>
                <input
                    className='signIn__email'
                    id='email'
                    name='email'
                    type='email'
                />

                <label className='signIn__label' htmlFor='password'>
                    Contraseña
                </label>
                <input
                    className='signIn__password'
                    id='password'
                    name='password'
                    type='password'
                />

                <button className='signIn__button' type='submit'>
                    Inicia Sesión
                </button>
            </form>

            <button
                className='signIn__google'
                onClick={() => signIn(google.id)}
            >
                Inicia sesion con {google.name}
            </button>
        </main>
    );
};

export default SignIn;
