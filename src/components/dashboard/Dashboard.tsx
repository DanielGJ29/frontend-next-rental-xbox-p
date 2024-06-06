'use client';

//NEX AUT
import { Button, Paper, Typography } from '@mui/material';
import { useSession, signIn, signOut, getCsrfToken } from 'next-auth/react';
import { useEffect } from 'react';

const Dashboard = () => {
  const { update, data: session, status } = useSession();

  useEffect(() => {
    async function myFunction() {
      const csrfToken = await getCsrfToken();
      /* ... */
      //console.log('csrfToken de dashboard', csrfToken);
    }
    myFunction();
  }, []);

  //console.log('data', data);
  // console.log('session', Session);
  // console.log('status', status);
  // if (Session) {
  //   return (
  //     <>
  //       LOGEADO CORRECTAMENTE <br />
  //       {/* <button onClick={() => signOut()}>Sign out</button> */}
  //     </>
  //   );
  // }
  // return (
  //   <>
  //     FAIL LOGIN <br />
  //     <button
  //       onClick={() =>
  //         signIn('Credentials', {
  //           redirect: false,
  //           username: 'daniel.zam29@gmail.com',
  //           password: 'admin',
  //           callbackUrl: '/'
  //         })
  //       }
  //     >
  //       Sign in
  //     </button>
  //   </>
  // );
  // console.log('session dese dashboard', session);

  // console.log('status desde dashboard', status);

  return (
    <Paper sx={{ p: 2 }}>
      <Typography>DASHBOARD</Typography>
      {/* <button
        onClick={() =>
          signIn('Credentials', {
            redirect: false,
            username: 'daniel.zam29@gmail.com',
            password: 'admin',
            callbackUrl: '/user'
          })
        }
      >
        Sign in
        
      </button> */}
    </Paper>
  );
};

export default Dashboard;
