'use client';

//NEX AUT
import { useSession, getCsrfToken } from 'next-auth/react';
import { useEffect } from 'react';

import Grid from '@mui/material/Unstable_Grid2';

import { GameController } from '@phosphor-icons/react';
import BallotIcon from '@mui/icons-material/Ballot';

//Components
import Carts from '@/components/dashboard/overview/cart';
import Note from './overview/note';

const Dashboard = () => {
  const { update, data: session, status } = useSession();

  useEffect(() => {
    async function myFunction() {
      const csrfToken = await getCsrfToken();
    }
    myFunction();
  }, []);

  return (
    <>
      {/* <Paper sx={{ p: 2 }}>
        <Typography>DASHBOARD</Typography>
      </Paper> */}
      <Grid container spacing={3}>
        <Grid lg={3} sm={6} xs={12}>
          <Carts title={'Rentar'} path="/renta" icon={<GameController size={60} weight="fill" />} sx={{ height: '100%' }} />
        </Grid>
        <Grid lg={3} sm={6} xs={12}>
          <Carts title={'Devoluciones'} path="/devoluciones" icon={<BallotIcon sx={{ fontSize: 50 }} />} sx={{ height: '100%' }} />
        </Grid>
        {/* <Grid lg={3} sm={6} xs={12}>
          <Carts title={'Devoluciones'} path="/devoluciones" icon={<BallotIcon sx={{ fontSize: 50 }} />} sx={{ height: '100%' }} />
        </Grid>
        <Grid lg={3} sm={6} xs={12}>
          <TotalProfit sx={{ height: '100%' }} value="$15k" />
        </Grid> */}
      </Grid>
      <Note />
    </>
  );
};

export default Dashboard;
