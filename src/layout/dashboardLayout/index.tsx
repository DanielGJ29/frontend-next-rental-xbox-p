'use client';
import * as React from 'react';

//MATERIAL UI
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Avatar from '@mui/material/Avatar';
import Drawer from '@mui/material/Drawer';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';

//MATERIAL ICON
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

//IMG
import logocyberplay from '@/assets/img/logocyberplay.png';

//COMPONETS
import Footer from './Footer';
import BasicBreadcrumbs from '../breadcrumb';
import ItemMenu from './ItemMenu';

//Next-auth
import { useSession, signOut, signIn } from 'next-auth/react';

//Context
import ConfigContext from '@/context/configContext';

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  //width: `calc(100%-${drawerWidth}px)`,
  // width: `calc(100% - ${theme.spacing(9)})`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(100% - ${theme.spacing(9)})`
  },

  ...(open && {
    marginLeft: drawerWidth,
    zIndex: theme.zIndex.drawer,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  })
}));

// TODO remove, this demo shouldn't need to reset the theme.
// const defaultTheme = createTheme();

interface Props {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.up('sm'));
  const { update, data: session, status } = useSession();
  const { onChangeLogin, onChangeMode, mode } = React.useContext(ConfigContext);

  //***********************************************************USE STATE*****************************************************************
  //const [open, setOpen] = React.useState(!matchesSM ? true : false);
  const [open, setOpen] = React.useState(true);
  //const [mainMenu, setMainMenu] = React.useState<any>({ items: [] });
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  //***********************************************************USE EFFECT*****************************************************************

  React.useEffect(() => {
    if (session) {
      onChangeLogin(true);
    }
  }, [session]);

  //***********************************************************FUNCTIONS*****************************************************************

  const DrawerPermanet = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      background: mode === 'light' ? theme.palette.primary.main : theme.palette.secondary.main,
      color: 'primary',
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9)
        }
      })
    }
  }));

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      sx={{ mt: 1 }}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {session && (
        <MenuItem sx={{ cursor: 'default', p: 3, '&:hover': { backgroundColor: 'transparent' } }}>
          <Stack justifyContent={'center'} alignItems={'center'} rowGap={1}>
            <Avatar alt={session?.user?.name} src={`${session?.user.avatarUrl}`} />
            <ListItemText> {`${session?.user.name} ${session?.user.lastName} ${session?.user.motherLastName}`}</ListItemText>
            <ListItemText sx={{ textTransform: 'capitalize' }}>
              {' '}
              {`${session?.user.role === 'admin' ? 'administrador' : 'invitado'}`}
            </ListItemText>
          </Stack>
        </MenuItem>
      )}

      <Divider />

      <MenuItem onClick={handleMenuClose} disabled={session ? false : true}>
        <ListItemIcon>
          <PersonOutlineIcon fontSize="small" />
        </ListItemIcon>
        Ver perfil
      </MenuItem>
      {/* <MenuItem onClick={handleMenuClose}>My account</MenuItem> */}

      <MenuItem onClick={() => signOut({ callbackUrl: '/login' })}>
        <ListItemIcon>
          <LogoutIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>{session ? 'Cerrar sessión' : 'Iniciar sessión'}</ListItemText>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        {/* <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton> */}
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const handleChangeMode = () => {
    if (mode === 'dark') {
      onChangeMode('light');
    } else {
      onChangeMode('dark');
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="absolute" open={open}>
        <Toolbar
          variant="dense"
          sx={{
            pr: '24px', // keep right padding when drawer closed
            py: 1
            //  ...(matchesSM && { py: 1 })
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' })
            }}
          >
            <MenuIcon />
          </IconButton>

          <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            {/* Dashboard */}
          </Typography>

          {/* <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton> */}

          <IconButton color="inherit" onClick={handleChangeMode}>
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>

          <IconButton
            onClick={handleProfileMenuOpen}
            color="inherit"
            // disableRipple={true}
            edge={'end'}
          >
            <Avatar
              sx={{ width: { xs: 30, md: 35 }, height: { xs: 30, md: 35 } }}
              alt={session?.user?.name}
              src={`${session?.user.avatarUrl}`}
            />
            {matchesSM && (
              <Typography color="inherit" noWrap sx={{ ml: 1, flexGrow: 1 }}>
                {session?.user.name}
              </Typography>
            )}
          </IconButton>
        </Toolbar>
        {renderMobileMenu}
        {renderMenu}
      </AppBar>

      {matchesSM && (
        <DrawerPermanet
          variant={'permanent'}
          open={open}
          //sx={{ bgcolor: 'primary.main' }}
          //onClose={toggleDrawer}
          //color="primary"
        >
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1]
              // bgcolor: 'primary.main'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                columnGap: 1,
                position: 'absolute',
                left: 0,
                right: 0,
                margin: 'auto'
              }}
            >
              <Avatar sx={{ width: 44, height: 44 }} alt="Logo" src={logocyberplay.src} />
              <Typography variant="button" color="white" sx={{ mr: 3, ...(!open && { display: 'none' }) }}>
                Cyber Play
              </Typography>
            </Box>

            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <ItemMenu />

            <Divider sx={{ my: 1 }} />
          </List>
        </DrawerPermanet>
      )}

      {!matchesSM && (
        <Drawer
          variant={'temporary'}
          open={open}
          onClose={toggleDrawer}
          PaperProps={{
            sx: { width: '70%', bgcolor: mode === 'light' ? 'primary.main' : 'secondary.main' }
          }}
        >
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1]
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                columnGap: 1,
                position: 'absolute',
                left: 0,
                right: 0,
                margin: 'auto'
              }}
            >
              <Avatar sx={{ width: 44, height: 44 }} alt="Logo" src={logocyberplay.src} />
              <Typography variant="button" color="initial" sx={{ ...(!open && { display: 'none' }) }}>
                Cyber Play
              </Typography>
            </Box>

            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <ItemMenu />

            <Divider sx={{ my: 1 }} />
          </List>
        </Drawer>
      )}

      <Box
        component="main"
        sx={{
          backgroundColor: (theme) => (theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600]),
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto'
        }}
      >
        <Toolbar />
        <Container
          maxWidth="xl"
          sx={{
            mt: 4,
            // mb: 4,
            position: 'relative',
            minHeight: 'calc(100vh - 110px)',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <BasicBreadcrumbs />
          {children}

          <Footer sx={{ pt: 4 }} />
        </Container>
      </Box>
    </Box>
  );
}
