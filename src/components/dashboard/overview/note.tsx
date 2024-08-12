import React from 'react';
import { useRouter } from 'next/navigation';

//Material UI
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StarIcon from '@mui/icons-material/Star';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';

const Note = () => {
  const router = useRouter();
  const theme = useTheme();
  return (
    <Paper sx={{ p: 3, mt: 8, width: '80%', mx: 'auto', bgcolor: 'primary.main', color: 'white' }}>
      <Stack>
        <Typography variant="h4" textAlign={'center'} textTransform={'uppercase'}>
          Debe
          <Button color="info" sx={{ fontSize: theme.typography.h4 }} onClick={() => router.push('/login')}>
            Iniciar sesión
          </Button>
          para ver todo el funcionamiento
        </Typography>
        <Stack sx={{ border: 1, borderRadius: 1, p: 1, width: { xs: '100%', md: '80%', xl: '50%' }, mt: 2, mx: 'auto' }}>
          <Typography variant="h5" fontStyle={'italic'} textAlign={'center'}>
            Credenciales:
          </Typography>
          <Grid container mt={2}>
            <Grid item container columnSpacing={2} xs={12}>
              <Grid item xs={12} md={6}>
                <Typography variant="h5" color="inherit" sx={{ textAlign: { xs: 'center', md: 'right' } }}>
                  Correo electronico:
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h5" color="info.main" fontWeight={'bold'} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                  test@dominio.test
                </Typography>
              </Grid>
            </Grid>

            <Grid item container columnSpacing={2} xs={12}>
              <Grid item xs={12} md={6}>
                <Typography variant="h5" color="inherit" sx={{ textAlign: { xs: 'center', md: 'right' } }}>
                  contraseña:
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h5" color="info.main" fontWeight={'bold'} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                  admin
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Stack>
        <Typography variant="h6" color="inherit" mt={3}>
          El sistema cuenta con 2 roles:
        </Typography>

        <List sx={{ width: '100%' }}>
          <ListItem disablePadding>
            <ListItemIcon>
              <StarIcon color="info" />
            </ListItemIcon>
            <ListItemText primaryTypographyProps={{ fontSize: '20px' }} primary="Administrador cuenta con todos los permisos" />
          </ListItem>
          <ListItem disablePadding>
            <ListItemIcon>
              <StarIcon color="info" />
            </ListItemIcon>
            <ListItemText primaryTypographyProps={{ fontSize: '20px' }} primary="Invitado tiene limitaciones" />
          </ListItem>
        </List>
        <Typography variant="h6" color="inherit" mt={3}>
          Tener encuenta que al iniciar sesión por primera vez, puede demorar aproximadamente 50 segundos ya que el proyecto esta en un
          servidor gratuito.
        </Typography>
      </Stack>
    </Paper>
  );
};

export default Note;
