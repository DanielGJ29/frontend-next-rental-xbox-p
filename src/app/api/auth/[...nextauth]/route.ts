import NextAuth from 'next-auth';

import type { NextAuthOptions } from 'next-auth';

import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  //secret: process.env.NEXTAUTH_SECRET,
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      //id: 'login',
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'email' },
        password: { label: 'Password', type: 'password', placeholder: 'Contraseña' }
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        try {
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: credentials?.username, password: credentials?.password })
          };
          const response = await fetch(`${process.env.REACT_APP_API_URL}/users/login`, requestOptions);
          const result = await response.json();
          const user = result.data.user;

          if (user) {
            // Any object returned will be saved in `user` property of the JWT
            //user.data['token'] = result?.data?.token;
            user.accessToken = result.data.token;

            //const user = { email: 'J Smith', password: 'jsmith@example.com' };
            //console.log('user api response', user);
            return user;
          } else {
            // If you return null then an error will be displayed advising the user to check their details.
            return result;
            // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
          }
        } catch (error) {
          console.log('error', error);
          // throw new Error('entro al error');
          throw error;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      // console.log('token de callback', token);
      // console.log('user de callback', user);
      // console.log('account de callback', account);
      if (user) {
        // console.log('TOKEN', token);
        // console.log('USER', user);
        // @ts-ignore
        // token.accessToken = user.accessToken;
        // token.id = user.id;

        return { ...token, ...user };
      }
      return token;
    },
    async session({ session, user, token }) {
      // console.log('user', user);
      // console.log('token', token);
      if (token) {
        // console.log('SESSION', session);
        console.log('TOKEN', token);
        // session.user.id = token.id;
        // session.user.name = token.name;
        // session.user.lastName = token.lastName;
        // session.user.motherLastName = token.motherLastName;
        // session.user.email = token.email;
        // session.user.avatarUrl = token.avatarUrl;
        // session.token = token.accessToken;

        session.user = token;
      }
      return session;
    }
  },
  session: {
    strategy: 'jwt',
    maxAge: Number(process.env.NEXT_APP_JWT_TIMEOUT!)
  },
  jwt: {
    secret: process.env.NEXT_APP_JWT_SECRET
  },

  pages: {
    signIn: '/login',
    //error: '/login'
    signOut: '/login'
  }
  //debug: true
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
