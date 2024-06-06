'use client';
import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
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
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';

import Footer from './Footer';
import { mainListItems, secondaryListItems } from './listItems';

import BasicBreadcrumbs from '../breadcrumb';
import { AccountCircle } from '@mui/icons-material';
import { Avatar, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';

//Material UI Icon
import LogoutIcon from '@mui/icons-material/Logout';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

//Next-auth
import { getSession, useSession, signOut, signIn } from 'next-auth/react';
import type { AppProps } from 'next/app';

import { sistemaAPI } from '../../server/index';
import ItemMenu from './ItemMenu';

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
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
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

// TODO remove, this demo shouldn't need to reset the theme.
// const defaultTheme = createTheme();

interface Props {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  const { update, data: session, status } = useSession();
  const { menuItems, loading, onChangeLogin } = React.useContext(ConfigContext);
  const [open, setOpen] = React.useState(true);
  //const [mainMenu, setMainMenu] = React.useState<any>({ items: [] });
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  // React.useLayoutEffect(() => {
  //   console.log('SE LANZO USEEFFECT');
  //   sistemaAPI.getAllMenu().then((response) => {
  //     console.log(response);
  //     // setMainMenu(response.data);
  //     mainMenu.items = response.data;
  //     setMainMenu({ items: [...mainMenu.items] });
  //   });
  // }, []);

  React.useEffect(() => {
    if (session) {
      onChangeLogin(true);
    }
  }, [session]);

  console.log('menu item', menuItems);

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
      <MenuItem onClick={handleMenuClose}>
        <ListItemIcon>
          <PersonOutlineIcon fontSize="small" />
        </ListItemIcon>
        Ver perfil
      </MenuItem>
      {/* <MenuItem onClick={handleMenuClose}>My account</MenuItem> */}
      <Divider />

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

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="absolute" open={open}>
        <Toolbar
          variant="dense"
          sx={{
            pr: '24px' // keep right padding when drawer closed
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
            Dashboard
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            //size="large"
            // edge="end"
            // aria-label="account of current user"
            // aria-controls={menuId}
            // aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            {/* <AccountCircle /> */}

            <Avatar sx={{ width: 34, height: 34 }} alt={session?.user?.name} src={`${session?.user.avatarUrl}`} />
            <Typography color="inherit" noWrap sx={{ ml: 1, flexGrow: 1 }}>
              {session?.user.name}
            </Typography>
          </IconButton>
        </Toolbar>
        {renderMobileMenu}
        {renderMenu}
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1]
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          {/* {mainListItems} */}
          {/* {mainMenu.map((item: any, index) => {
            let Icon = item.icon;
            let IconMenu = <Icon />;
            return (
              <Link key={index} className={'active'} href={`/${item.name}`}>
                <ListItemButton>
                  <ListItemIcon>{IconMenu}</ListItemIcon>
                  <ListItemText sx={{ textTransform: 'capitalize' }} primary={item.name} />
                </ListItemButton>
              </Link>
            );
          })} */}
          {/* {menuItems.map((item: any) => (
            <ItemMenu key={item.name} name={item.name} path={item.url} status={true} iconName={item.icon} loading={loading} />
          ))} */}

          <ItemMenu />

          <Divider sx={{ my: 1 }} />
          {secondaryListItems}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          backgroundColor: (theme) => (theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900]),
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
