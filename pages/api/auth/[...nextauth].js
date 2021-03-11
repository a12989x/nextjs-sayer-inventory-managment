import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    NEXT_PUBLIC_DATABASE_URL,
    NEXT_PUBLIC_API_URL,
} = process.env;

const getUser = async (credentials) => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
        identifier: credentials.email,
        password: credentials.password,
    });

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
    };

    const res = await fetch(
        `${NEXT_PUBLIC_API_URL}/auth/local`,
        requestOptions
    );
    const data = await res.json();

    return data;
};

export default NextAuth({
    providers: [
        Providers.Google({
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
        }),
        Providers.Credentials({
            name: 'E-mail',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email',
                    placeholder: 'jhon@doe.com',
                },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                const data = await getUser(credentials);
                const user = data.user;
                user.name = data.user.username;
                user.jwt = data.jwt;
                user.picture = null;

                if (user) return user;
                else return null;
            },
        }),
    ],
    // database: NEXT_PUBLIC_DATABASE_URL,
    session: { jwt: true },
    callbacks: {
        async signIn(user, account, profile) {
            const isAllowedToSignIn = user;
            if (isAllowedToSignIn) return true;
            else return false;
        },
        async jwt(token, user, account, profile, isNewUser) {
            const isSignIn = user ? true : false;

            if (isSignIn) {
                if (user.provider === 'local') {
                    token.jwt = user.jwt;
                    token.id = user.id;
                } else {
                    const res = await fetch(
                        `${NEXT_PUBLIC_API_URL}/auth/${account.provider}/callback?access_token=${account.accessToken}`
                    );
                    const data = await res.json();
                    token.jwt = data.jwt;
                    token.id = data.user.id;
                }
            }

            return Promise.resolve(token);
        },
        async session(session, user) {
            session.jwt = user.jwt;
            session.id = user.id;

            return Promise.resolve(session);
        },
    },
    pages: {
        signIn: '/auth/signin',
    },
});
