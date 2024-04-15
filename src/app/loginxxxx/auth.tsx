// next
import { NextPageContext } from 'next';
import { getProviders, getCsrfToken } from 'next-auth/react';

// material-ui
import { Grid } from '@mui/material';

// project import
import SignInSide from '@/components/login/login';

import Divider from '@mui/material/Divider';
export default function SignIn({ providers, csrfToken }: any) {
  return (
    // <AuthWrapper>
    <Grid item xs={12}>
      <p className="cell-center ">Inicio de sesión Bweb2</p>
      <Divider /> <br></br>
      <SignInSide csrfToken={csrfToken} />
    </Grid>
    // </AuthWrapper>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);
  console.log('csrfToken de getServerSideProps', csrfToken);
  return {
    props: { providers, csrfToken }
  };
}
