// import { getServerSession } from 'next-auth/next';
// import { authOptions } from './auth/[...nextauth]/route';

// export const a = async (req: any, res: any) => {
//   const session = await getServerSession(req, res, authOptions);

//   console.log('session de restricted', session);

//   if (session) {
//     res.send({
//       content: 'This is protected content. You can access this content because you are signed in.'
//     });
//   } else {
//     res.send({
//       error: 'You must be signed in to view the protected content on this page.'
//     });
//   }
// };

import { authOptions } from './auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';

// export async function getServerSideProps(context: any) {
//   const session = await getServerSession(context.req, context.res, authOptions);

//   if (!session) {
//     console.log('no hubo sesion');
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false
//       }
//     };
//   }

//   console.log('hay sesion');
//   return {
//     props: {
//       session
//     }
//   };
// }

// export default async function handler(req: any, res: any) {
//   const session = await getServerSession(req, res, authOptions);

//   if (!session) {
//     console.log('no hay session');
//     res.status(401).json({ message: 'You must be logged in.' });
//     return;
//   }

//   console.log('hay session');
//   return res.json({
//     message: 'Success'
//   });
// }

export default async function Page() {
  const session = await getServerSession(authOptions);
  console.log('session restricted', session);
  //return <pre>{JSON.stringify(session, null, 2)}</pre>
}
