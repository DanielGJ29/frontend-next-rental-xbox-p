'use client';

//NEX AUT
import { Button } from '@mui/material';
import { useSession, signIn, signOut, getCsrfToken } from 'next-auth/react';
import { useEffect } from 'react';

const Dashboard = () => {
  const { update, data: Session, status } = useSession();

  useEffect(() => {
    async function myFunction() {
      const csrfToken = await getCsrfToken();
      /* ... */
      console.log('csrfToken de dashboard', csrfToken);
    }
    myFunction();
  }, []);

  //console.log('data', data);
  console.log('session', Session);
  console.log('status', status);
  if (Session) {
    return (
      <>
        LOGEADO CORRECTAMENTE <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      FAIL LOGIN <br />
      <button
        onClick={() =>
          signIn('Credentials', {
            redirect: false,
            username: 'daniel.zam29@gmail.com',
            password: 'admin',
            callbackUrl: '/'
          })
        }
      >
        Sign in
      </button>
    </>
  );
};

export default Dashboard;
