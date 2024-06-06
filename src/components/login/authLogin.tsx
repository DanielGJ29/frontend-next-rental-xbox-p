'use client';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LoadingButton from '@mui/lab/LoadingButton';

import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import logo from '../../assets/img/logocyberplay.png';

//NEX AUT
import { useSession, signIn, getCsrfToken } from 'next-auth/react';

import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { Alert } from '@mui/material';

interface Props {
  csrfToken?: any;
  providers?: any;
}

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Cyber Play
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignInSide({ providers, csrfToken }: Props) {
  const router = useRouter();
  const { update, data: session, status } = useSession();
  const [crsf, setcrsf] = React.useState<any>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [errors, setErrors] = React.useState<string>('');

  React.useEffect(() => {
    const crs = async () => {
      const csrfTokenCurrente = await getCsrfToken();
      // console.log('csrfToken', csrfTokenCurrente);
      // console.log('useSession', session);
      setcrsf(csrfTokenCurrente);
    };
    crs();
  }, []);

  //*************************************************FUNCTIONS*************************************************/
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setErrors('');
    const data = new FormData(event.currentTarget);

    // try {
    //   const resultNextAuth = await signIn("Credentials", {
    //     redirect: false,
    //     username: data.get("email"),
    //     password: data.get("password"),
    //     callbackUrl: "/",
    //   });

    //   if (!resultNextAuth) {
    //     console.log("no hubo resultados de singIn", resultNextAuth);
    //     // return;
    //   }
    // } catch (error) {
    //   console.log("error", { error });
    //   throw error;
    // }

    const resultNextAuth = await signIn('credentials', {
      redirect: false,
      username: data.get('email'),
      password: data.get('password'),
      callbackUrl: '/'
    });

    setLoading(false);
    if (!resultNextAuth?.ok) {
      console.log('no hubo resultados de singIn', resultNextAuth);
      setErrors(resultNextAuth?.error as string);
      return;
    }

    console.log('resultNextAuth', resultNextAuth);
    if (resultNextAuth?.ok) {
      router.push('/');
    }
  };

  return (
    // <ThemeProvider theme={defaultTheme}>
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(/xbox.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        sx={{ minHeight: { xs: '100vh' } }}
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ background: 'linear-gradient(white, slategrey)' }}
      >
        <Box
          sx={{
            backgroundImage: 'url(/logocyberplay.png)',
            backgroundRepeat: 'no-repeat',
            display: 'flex',
            mb: 1,
            height: '5vmax',
            width: '65vmin',
            maxWidth: '200px',
            animation: 'spin 5s linear',

            '@keyframes spin': {
              '0%': {
                transform: 'rotateY(720deg)'
              },
              '100%': {
                transformStyle: 'preserve-3d'
              }
            }
          }}
        ></Box>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar alt="Logo" src="/logocyberplay.png" sx={{ width: 300, height: 300 }} />

          <Typography component="h1" variant="h5">
            INICIAR SESION
          </Typography>
          <form onSubmit={handleSubmit} noValidate>
            {/* <input name="crsf" type="" defaultValue={crsf} /> */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo Electronico"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Recordar" />
            {loading ? (
              <LoadingButton
                sx={{ mt: 3, mb: 2 }}
                fullWidth
                //endIcon={<SendIcon />}
                loading={true}
                loadingPosition="end"
                variant="contained"
              >
                <span>Ingresar</span>
              </LoadingButton>
            ) : (
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Ingresar
              </Button>
            )}

            {errors && <Alert severity="error">{errors}</Alert>}

            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </form>
        </Box>
      </Grid>
    </Grid>
    // </ThemeProvider>
  );
}
