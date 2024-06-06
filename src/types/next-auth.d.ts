// // eslint-disable-next-line
// import NextAuth from 'next-auth';

// declare module 'next-auth' {
//   /**
//    * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
//    */
//   interface Session {
//     id: any;
//     provider: any;
//     token: any;
//     tocken: any;
//     logo: any;
//     avatarUrl: string;
//   }
// }

import NextAuth from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    // user: {
    //   /** The user's postal address. */

    //   name: any;
    //   email: any;
    //   sub: any;
    //   id: any;
    //   lastName: any;
    //   motherLastName: any;
    //   userName: any;
    //   avatarUrl: any;
    //   role: any;
    //   status: any;

    //   createdAt: any;
    //   updatedAt: any;
    //   accessToken: any;
    //   iat: any;
    //   exp: any;
    //   jti: any;
    // };
    // token: any;
    user: any;
  }
}
