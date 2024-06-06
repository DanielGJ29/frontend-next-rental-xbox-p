// next
import { NextPageContext } from 'next';
import { getProviders, getCsrfToken } from 'next-auth/react';
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';

// material-ui
import { Grid } from '@mui/material';

// project import
import SignInSide from './authLogin';

import Divider from '@mui/material/Divider';

export default function SignIn({ providers, csrfToken }: any) {
  return (
    // <AuthWrapper>
    <Grid item xs={12}>
      <SignInSide csrfToken={csrfToken} />
    </Grid>
    // </AuthWrapper>
  );
}

// export async function getServerSideProps(context: NextPageContext) {
//   const providers = await getProviders();
//   const csrfToken = await getCsrfToken(context);
//   console.log('csrfToken de getServerSideProps', csrfToken);
//   return {
//     props: { providers, csrfToken }
//   };
// }

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const csrfToken = await getCsrfToken(context);
//   console.log('csrfToken de nuevo login', csrfToken);
//   return {
//     props: {
//       csrfToken: await getCsrfToken(context)
//     }
//   };
// }

export const getServerSide = async (req: any, res: any) => {
  const csrfToken = await getCsrfToken({ req });
  /* ... */
  console.log('csrfToken', csrfToken);
  res.end();
};
