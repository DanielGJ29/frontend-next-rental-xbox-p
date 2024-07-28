'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

//Material Ui
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Alert from '@mui/material/Alert';

//Material Icons
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import StartIcon from '@mui/icons-material/Start';
import AllInboxIcon from '@mui/icons-material/AllInbox';

//React icon
import { GiGameConsole } from 'react-icons/gi';

//DATE PIKERS
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { es } from 'date-fns/locale/es';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { formatDistance } from 'date-fns/formatDistance';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';

//API
import { clientAPI, consolesApi, rentApi } from '@/server';

//Interfaces
import { IClient } from '@/interfaces/clients';
import { IAddToCart, IDeleteProductFromCart } from '@/interfaces/rent';

//Util
import convertToUppercase from '@/utils/convertToUppercase';
import { formatCurrency } from '@/utils/utils';

//Alert
import Swal from 'sweetalert2';

//Component
import ModalSearch from './ModalSearch';
import SearchByCode from './SearchByCode';
import Agreement from './Agreement';
import Pay from './Pay';

const Rent = () => {
  //***********************************************************USE STATE*****************************************************************

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingArticle, setLoadingArticle] = useState<boolean>(false);
  const [loadingAccessory, setLoadingAccessory] = useState<boolean>(false);
  const [loadingGamepad, setLoadingGamepad] = useState<boolean>(false);

  const [rows, setRows] = useState<any>([]);
  const [rowsSearch, setRowsSearch] = useState<any>([]);
  const [totales, setTotales] = useState<any>();
  const [statusCart, setStatusCart] = useState<string>('active');

  const [codeClient, setcodeClient] = useState<string>('');
  const [valueClient, setValueClient] = React.useState<IClient>();
  const [codeArticle, setcodeArticle] = useState<string>('');
  const [codeGamepad, setcodeGamepad] = useState<string>('');
  const [codeAccessory, setcodeAccessory] = useState<string>('');

  const [openModalSearch, setOpenModalSearch] = React.useState(false);

  const [valueSearchKeyword, setValueSearchKeyword] = React.useState<string>('');

  const [flag, setFlag] = useState('');

  const [dateRent, setDateRent] = React.useState<Date | undefined>(new Date());
  const [dateReturn, setDateReturn] = React.useState<Date | undefined>();

  const [openAgreement, setOpenAgreement] = React.useState<boolean>(false);
  const [openPay, setOpenPay] = React.useState<boolean>(false);

  const [alertDate, setAlertDate] = React.useState<boolean>(false);

  //***********************************************************USE EFFECT*****************************************************************

  useEffect(() => {
    if (valueClient) {
      getCartClient();
    }
  }, [valueClient]);

  useEffect(() => {
    if (valueSearchKeyword) {
      switch (flag) {
        case 'client':
          setLoading(true);
          setAlertDate(false);
          clientAPI.searchClientByKeyword(valueSearchKeyword).then((response) => {
            setLoading(false);
            setRowsSearch(response.data);
          });
          break;

        case 'console':
          setLoadingArticle(true);
          consolesApi.searchConsoleByKeyword(valueSearchKeyword).then((response) => {
            setLoadingArticle(false);
            setRowsSearch(response.data);
          });
          break;

        case 'gamepad':
          setLoadingGamepad(true);
          consolesApi.searchGamepadByKeyword(valueSearchKeyword).then((response) => {
            setLoadingGamepad(false);
            setRowsSearch(response.data);
          });
          break;

        case 'accessory':
          setLoadingAccessory(true);
          consolesApi.searchAccessoryByKeyword(valueSearchKeyword).then((response) => {
            setLoadingAccessory(false);
            setRowsSearch(response.data);
          });
          break;

        default:
          setRowsSearch([]);
          break;
      }
    } else {
      setRowsSearch([]);
    }
  }, [valueSearchKeyword]);

  //***********************************************************FUNCTIONS*****************************************************************

  const getRentalDays = () => {
    if (dateReturn && dateRent) {
      const startDate = dateRent;
      const endDate = dateReturn;
      return formatDistance(startDate, endDate, {
        locale: es,
        addSuffix: false
      });
    }

    return;
  };

  const handleSearchClient = () => {
    if (codeClient) {
      setLoading(true);
      setTotales(0);
      setAlertDate(false);
      const code = Number(codeClient);
      clientAPI
        .getByIdClients(code)
        .then((response) => {
          setLoading(false);

          setDateReturn(undefined);
          setcodeClient('');
          setValueClient(response.data);
        })
        .catch((error) => {
          setLoading(false);
          setAlertDate(false);
          setDateReturn(undefined);
          setcodeClient('');
          setValueClient(undefined);
          setRows([]);
          setTotales(undefined);
          console.log('error', error.response);
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Cliente no encontrado',
            showConfirmButton: false,
            timer: 2500
          });
        });
    }
  };

  const handleSearchArticle = () => {
    if (codeArticle && valueClient) {
      setLoadingArticle(true);
      consolesApi
        .searchConsoleBySerialNumber(codeArticle)
        .then((response) => {
          setcodeArticle('');

          addToCart({ productId: { id: response.data.id, articleType: 1 }, clientId: Number(valueClient.id), quantity: 1 });
          // setValueArticle(response.data);
        })
        .catch((error) => {
          setcodeArticle('');
          setLoadingArticle(false);
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Console no encontrada',
            showConfirmButton: false,
            timer: 2500
          });
        });
    }
  };

  const handleSearchGamePad = () => {
    if (codeGamepad && valueClient) {
      setLoadingGamepad(true);
      consolesApi
        .searchGamepadBySerialNumber(codeGamepad)
        .then((response) => {
          setcodeGamepad('');
          addToCart({ productId: { id: response.data.id, articleType: 2 }, clientId: Number(valueClient.id), quantity: 1 });
        })
        .catch((error) => {
          setcodeGamepad('');
          setLoadingGamepad(false);
          console.log(error);
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Control no encontrada',
            showConfirmButton: false,
            timer: 2500
          });
        });
    }
  };

  const handleSearchAccessory = () => {
    if (codeAccessory && valueClient) {
      setLoadingAccessory(true);
      consolesApi
        .getByIdAccessories(Number(codeAccessory))
        .then((response) => {
          setLoadingAccessory(false);
          addToCart({ productId: { id: response.data.id, articleType: 3 }, clientId: Number(valueClient.id), quantity: 1 });
        })
        .catch((error) => {
          setcodeAccessory('');
          setLoadingAccessory(false);
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Accesorio no encontrada',
            showConfirmButton: false,
            timer: 2500
          });
        });
    }
  };

  const addToCart = (body: IAddToCart) => {
    rentApi.addToCart(body).then((response) => {
      setLoadingArticle(false);
      setLoadingAccessory(false);
      setLoadingGamepad(false);
      getCartClient();
    });
  };

  const addToCartMultiple = (arrayId: number[], name: string) => {
    switch (name) {
      case 'client':
        if (arrayId.length > 0) {
          setLoading(true);
          const code = Number(arrayId[0]);
          clientAPI
            .getByIdClients(code)
            .then((response) => {
              setLoading(false);
              setValueClient(response.data);
            })
            .catch((error) => {
              setLoading(false);
              setValueClient(undefined);
              console.log('error', error.response);
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Cliente no encontrado',
                showConfirmButton: false,
                timer: 2500
              });
            });
        }

        break;

      case 'console':
        if (valueClient) {
          setLoadingArticle(true);
          const body = { productId: { id: arrayId, articleType: 1 }, clientId: Number(valueClient.id), quantity: 1 };
          rentApi.addToCartMultiple(body).then((response) => {
            setLoadingArticle(false);
            getCartClient();
          });
        }

        break;

      case 'gamepad':
        if (valueClient) {
          setLoadingGamepad(true);
          const body = { productId: { id: arrayId, articleType: 2 }, clientId: Number(valueClient.id), quantity: 1 };
          rentApi.addToCartMultiple(body).then((response) => {
            setLoadingGamepad(false);
            getCartClient();
          });
        }

        break;

      case 'accessory':
        if (valueClient) {
          setLoadingAccessory(true);
          const body = { productId: { id: arrayId, articleType: 3 }, clientId: Number(valueClient.id), quantity: 1 };
          rentApi.addToCartMultiple(body).then((response) => {
            setLoadingAccessory(false);
            getCartClient();
          });
        }

        break;

      default:
        break;
    }
  };

  const getCartClient = () => {
    if (valueClient) {
      rentApi
        .getClientCart(valueClient.id)
        .then((response) => {
          if (response.data) {
            const consoles = response.data.products.videoGames;
            const gamepads = response.data.products.gamepads;
            const accessories = response.data.products.accessories;

            const newRows: any = [];

            if (consoles.length > 0) {
              consoles.map((item: any) => {
                const newConsoles = {
                  id: item.id + '-' + 'C',
                  article: 'consola',
                  name: item.name,
                  model: item.model,
                  serialNumber: item.serialNumber,
                  rentalPrice: item.rentalPrice,
                  characteristics: item.color + 'Capacidad: ' + item.hardHDD
                };
                newRows.push(newConsoles);
              });
            }

            if (gamepads.length > 0) {
              gamepads.map((item: any) => {
                const newGamePad = {
                  id: item.id + '-' + 'G',
                  article: 'control',
                  name: item.name,
                  model: 'n/a',
                  serialNumber: item.serialNumber,
                  rentalPrice: 50,
                  characteristics: item.color + ' ' + item.connectionType
                };
                newRows.push(newGamePad);
              });
            }

            if (accessories.length > 0) {
              accessories.map((item: any) => {
                const newAccessory = {
                  id: item.id + '-' + 'A',
                  article: 'accesorio',
                  name: item.name,
                  model: item.name,
                  serialNumber: item.serialNumber,
                  rentalPrice: item.rentalPrice,
                  characteristics: item.color + ' ' + item.characteristics
                };
                newRows.push(newAccessory);
              });
            }
            setRows(newRows);
            setTotales(response.data.totales);
            setStatusCart(response.data.cart.status);
          } else {
            setRows([]);
            setStatusCart('active');
          }
        })
        .then((error) => {
          console.log(error);
        });
    }
  };

  const handleSearchByKeyboard = (name: string) => {
    setOpenModalSearch(true);
    setFlag(name);
  };

  const handleSeeClick = (id: number) => {
    console.log('see', id);
  };

  const handleDeleteClick = (row: any) => {
    Swal.fire({
      title: '¿Esta segur@?',

      html: `
        <div style={} >Eliminar ${row.article}: </br>
        ID: <b>${row.id}</b> </br>
        Nombre: <b>${row.name}</b></br>
        Modelo: <b>${row.model}</b> </br>
        Serie: <b>${row.serialNumber}</b> </br>
        Precio de renta: <b>${row.rentalPrice}</b> </br>
        </div>
        
      `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, ¡Eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed && valueClient) {
        setLoadingArticle(true);
        const article = row.article === 'consola' ? 1 : row.article === 'control' ? 2 : row.article === 'accesorio' && 3;
        const body: IDeleteProductFromCart = {
          productId: Number(row.id.split('-')[0]),
          clientId: Number(valueClient.id),
          articleType: Number(article)
        };
        rentApi.deleteProductTocart(body).then((response) => {
          setLoadingArticle(false);

          if (response.status === 'success') {
            getCartClient();
            Swal.fire({
              title: '¡Eliminado!',
              text: 'Articulo eliminado correctamente.',
              icon: 'success'
            });
          } else {
            Swal.fire({
              title: '¡Ocurrio un error!',
              icon: 'error'
            });
          }
        });
      }
    });
  };

  const clean = () => {
    setRows([]);
    setRowsSearch([]);
    setTotales(undefined);
    setValueSearchKeyword('');
    setFlag('');
    setDateRent(new Date());
    setDateReturn(undefined);
    setOpenPay(false);
    setValueClient(undefined);
  };

  const alertRented = () => {
    Swal.fire({
      icon: 'info',
      title: `El cliente tiene una renta activa`,
      // text: '',
      // html: '<Buttton>Ir a dev</Button>',
      // footer: '<a href="#">Ir a devoluciones</a>'
      // showDenyButton: true,
      confirmButtonText: ` Ir a devoluciones&nbsp;<i class="fa fa-arrow-right"></i> `,
      showCancelButton: true,
      cancelButtonText: 'Cancelar'
      //  confirmButtonText: 'Ir a devoluciones',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success');
      }
    });
  };

  return (
    <Grid sx={{ p: 0 }} container rowSpacing={4} columnSpacing={8}>
      <Grid item xs={12} md={4}>
        <Stack direction="column" rowGap={6}>
          {/* /**********SEARCH CLIENT ******/}
          <SearchByCode
            icon={<PersonSearchIcon color="action" />}
            title="Código Cliente"
            name="client"
            value={codeClient}
            setValueInput={setcodeClient}
            handleSearch={handleSearchClient}
            handleSearchByKeyboard={handleSearchByKeyboard}
          />

          {/* /********SEARCH CONSOLE ******/}
          <SearchByCode
            icon={<GiGameConsole color="action" fontSize={23} />}
            title="Código Consola"
            name="console"
            value={codeArticle}
            setValueInput={setcodeArticle}
            handleSearch={handleSearchArticle}
            handleSearchByKeyboard={handleSearchByKeyboard}
            disabled={valueClient && statusCart === 'active' ? false : true}
          />

          {/* /********SEARCH GAMEPADS ******/}
          <SearchByCode
            icon={<SportsEsportsIcon color="action" />}
            title="Código Control"
            name="gamepad"
            value={codeGamepad}
            setValueInput={setcodeGamepad}
            handleSearch={handleSearchGamePad}
            handleSearchByKeyboard={handleSearchByKeyboard}
            disabled={valueClient && statusCart === 'active' ? false : true}
          />

          {/* /************SEARCH ACCESSORIES *************/}
          <SearchByCode
            icon={<HeadsetMicIcon color="action" />}
            title="Código Accesorio"
            name="accessory"
            value={codeAccessory}
            setValueInput={setcodeAccessory}
            handleSearch={handleSearchAccessory}
            handleSearchByKeyboard={handleSearchByKeyboard}
            disabled={valueClient && statusCart === 'active' ? false : true}
          />

          {/* /*********************DATES ******************/}
          <Paper>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
              <DateTimePicker
                sx={{ width: 1 }}
                //slotProps={{ textField: { variant: 'standard' } }}
                // slotProps={{
                //   textField: ({ position }) => ({
                //     color: 'primary',
                //     focused: false
                //   })
                // }}
                // slotProps={{ textField: { variant: 'filled', focused: false, color: 'primary' } }}
                label="Fecha de renta"
                value={dateRent}
                format="dd/MM/yyyy hh:mm a"
                viewRenderers={{
                  hours: renderTimeViewClock,
                  minutes: renderTimeViewClock,
                  seconds: renderTimeViewClock
                }}
                ampm
                minDate={new Date()}
                onChange={(newValue) => {
                  if (newValue) {
                    setDateRent(newValue);
                  }
                }}
                closeOnSelect={true}
                disabled={valueClient && statusCart === 'active' ? false : true}
              />
            </LocalizationProvider>
          </Paper>

          <Paper>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
              <DateTimePicker
                sx={{ width: 1, bgcolor: 'transparent' }}
                // slotProps={{ textField: { variant: 'filled' } }}
                label="Fecha devolución"
                defaultValue={dateRent}
                value={dateReturn}
                disablePast={!alertDate ? false : true}
                //views={['day', 'month', 'year', 'hours', 'minutes']}
                format="dd/MM/yyyy hh:mm a"
                viewRenderers={{
                  hours: renderTimeViewClock,
                  minutes: renderTimeViewClock,
                  seconds: renderTimeViewClock
                }}
                ampm
                minDate={dateRent}
                onChange={(newValue) => {
                  if (newValue) {
                    setDateReturn(newValue);
                    setAlertDate(false);
                  }
                }}
                disabled={valueClient && statusCart === 'active' ? false : true}
              />
            </LocalizationProvider>
          </Paper>
        </Stack>
      </Grid>

      <Grid item container columnSpacing={3} xs={12} md={8} rowSpacing={4}>
        <Grid item xs={12} md={11}>
          <Paper sx={{ p: 3 }}>
            {!loading ? (
              <Stack
                flexDirection={{ xs: 'column', md: 'row' }}
                justifyContent={{ xs: 'center', md: 'flex-start' }}
                columnGap={3}
                rowGap={3}
              >
                <Box sx={{ mx: { xs: 'auto', md: '0' } }}>
                  <Avatar
                    alt={valueClient ? convertToUppercase(valueClient.name) : 'Avatar'}
                    src={valueClient ? valueClient.avatarUrl : ''}
                    sx={{ width: 150, height: 150, border: '1px dashed' }}
                  />
                </Box>
                <Stack justifyContent={'center'}>
                  <Stack flexDirection={'row'} gap={1}>
                    <Typography variant="button" gutterBottom>
                      ID:
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {valueClient ? valueClient.id : ''}
                    </Typography>
                  </Stack>

                  <Stack flexDirection={'row'} gap={1}>
                    <Typography variant="button" gutterBottom>
                      Cliente:
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {valueClient ? convertToUppercase(valueClient.name) : ''}
                    </Typography>
                  </Stack>

                  <Stack flexDirection={'row'} gap={1}>
                    <Typography variant="button" gutterBottom>
                      Dirección:
                    </Typography>
                    <Typography variant="body1" textTransform={'capitalize'} gutterBottom>
                      {valueClient
                        ? `Calle ${valueClient.street}, No. ${valueClient.numberInt}   ${valueClient.numberOut}, ${valueClient.colony}, ${valueClient.municipality}, ${valueClient.city}, ${valueClient.state}`
                        : ''}
                    </Typography>
                  </Stack>

                  <Stack flexDirection={'row'} gap={1}>
                    <Typography variant="button" gutterBottom>
                      Telefono:
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {valueClient ? valueClient.phone : ''}
                    </Typography>
                  </Stack>

                  <Stack flexDirection={'row'} gap={1}>
                    <Typography variant="button" gutterBottom>
                      Correo electronico:
                    </Typography>
                    <Typography variant="body1" textTransform={'lowercase'} gutterBottom>
                      {valueClient ? convertToUppercase(valueClient.email) : ''}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            ) : (
              <Stack
                flexDirection={{ xs: 'column', md: 'row' }}
                justifyContent={{ xs: 'center', md: 'flex-start' }}
                columnGap={3}
                rowGap={3}
              >
                <Box sx={{ mx: { xs: 'auto', md: '0' } }}>
                  <Skeleton variant="circular" animation="wave">
                    <Avatar
                      alt={valueClient ? convertToUppercase(valueClient.name) : 'Avatar'}
                      src={valueClient ? valueClient?.avatarUrl : ''}
                      sx={{ width: 150, height: 150, border: '1px dashed' }}
                    />
                  </Skeleton>
                </Box>

                <Stack justifyContent={'center'}>
                  <Stack flexDirection={'row'} gap={1}>
                    <Skeleton variant="text" animation="wave">
                      <Typography variant="button" gutterBottom>
                        Cliente:
                      </Typography>
                    </Skeleton>
                    <Skeleton variant="text" animation="wave">
                      <Typography variant="body1" gutterBottom>
                        {valueClient ? convertToUppercase(valueClient.name) : ''}
                      </Typography>
                    </Skeleton>
                  </Stack>

                  <Stack flexDirection={'row'} gap={1}>
                    <Skeleton variant="text" animation="wave">
                      <Typography variant="button" gutterBottom>
                        Dirección:
                      </Typography>
                    </Skeleton>
                    <Skeleton variant="text" animation="wave">
                      <Typography variant="body1" textTransform={'capitalize'} gutterBottom>
                        {valueClient
                          ? `Calle ${valueClient.street}, No. ${valueClient.numberInt}   ${valueClient.numberOut}, ${valueClient.colony}, ${valueClient.municipality}, ${valueClient.city}, ${valueClient.state}`
                          : ''}
                      </Typography>
                    </Skeleton>
                  </Stack>

                  <Stack flexDirection={'row'} gap={1}>
                    <Skeleton animation="wave">
                      <Typography variant="button" gutterBottom>
                        Telefono:
                      </Typography>
                    </Skeleton>
                    <Skeleton animation="wave">
                      <Typography variant="body1" gutterBottom>
                        {valueClient ? valueClient.phone : ''}
                      </Typography>
                    </Skeleton>
                  </Stack>

                  <Stack flexDirection={'row'} gap={1}>
                    <Skeleton animation="wave">
                      <Typography variant="button" gutterBottom>
                        Correo electronico:
                      </Typography>
                    </Skeleton>
                    <Skeleton animation="wave">
                      <Typography variant="body1" textTransform={'lowercase'} gutterBottom>
                        {valueClient ? convertToUppercase(valueClient.email) : ''}
                      </Typography>
                    </Skeleton>
                  </Stack>
                </Stack>
              </Stack>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper} sx={{ px: 2, py: 2 }}>
            <Table sx={{ minWidth: 900 }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  {/* <TableCell align="left" >
                    ID
                  </TableCell> */}
                  <TableCell align="left">Articulo</TableCell>
                  <TableCell align="left">Nombre</TableCell>
                  <TableCell align="left">Modelo</TableCell>
                  <TableCell align="left">No. de Serie</TableCell>
                  {/* <TableCell align="left">Caracteristicas</TableCell> */}
                  <TableCell align="right">Precio</TableCell>
                  <TableCell align="center">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.length > 0 ? (
                  <React.Fragment>
                    {rows.map((row: any) => (
                      <TableRow key={Math.random()}>
                        {/* <TableCell component="th" scope="row" style={{ minWidth: 60 }}>
                      {row.id}
                    </TableCell> */}
                        <TableCell style={{ minWidth: 100, textTransform: 'capitalize' }} align="left">
                          {row.article}
                        </TableCell>
                        <TableCell style={{ minWidth: 160, textTransform: 'capitalize' }} align="left">
                          {row.name}
                        </TableCell>
                        <TableCell style={{ minWidth: 160, textTransform: 'capitalize' }} align="left">
                          {row.model}
                        </TableCell>
                        <TableCell style={{ minWidth: 160, textTransform: 'uppercase' }} align="left">
                          {row.serialNumber}
                        </TableCell>
                        {/* <TableCell style={{ minWidth: 260, textTransform: 'capitalize' }} align="left">
                      {row.characteristics}
                    </TableCell> */}
                        <TableCell align="right">{formatCurrency(row.rentalPrice)}</TableCell>
                        <TableCell align="center" sx={{ p: 0, m: 0 }}>
                          <Stack flexDirection={'row'} justifyContent={'center'} rowGap={2} sx={{ m: 0, p: 0 }}>
                            <IconButton
                              size="small"
                              color="success"
                              disabled={statusCart === 'active' ? false : true}
                              onClick={() => handleSeeClick(row.id as number)}
                            >
                              <VisibilityIcon fontSize="inherit" />
                            </IconButton>
                            <IconButton
                              size="small"
                              color="error"
                              disabled={statusCart === 'active' ? false : true}
                              onClick={() => handleDeleteClick(row)}
                            >
                              <DeleteIcon fontSize="inherit" />
                            </IconButton>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))}
                    {totales ? (
                      <React.Fragment>
                        <TableRow key={Math.random()}>
                          {/* <TableCell rowSpan={3} sx={{ borderBottom: 'none' }} /> */}
                          {/* <TableCell rowSpan={4} sx={{ borderBottom: 'none' }} /> */}
                          <TableCell rowSpan={4} sx={{ borderBottom: 'none' }} />
                          <TableCell rowSpan={4} sx={{ borderBottom: 'none' }} />
                          <TableCell rowSpan={4} sx={{ borderBottom: 'none' }} />

                          <TableCell
                            sx={{
                              fontWeight: 'bold',
                              borderBottom: 'none'
                            }}
                          >
                            Sub Total
                          </TableCell>
                          <TableCell
                            sx={{
                              fontWeight: 'bold',
                              borderBottom: 'none'
                            }}
                            align="right"
                          >
                            {formatCurrency(totales?.subtotal)}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 'bold' }}>Descuento</TableCell>
                          <TableCell sx={{ fontWeight: 'bold' }} align="right">
                            {formatCurrency(totales?.descuento)}
                          </TableCell>
                        </TableRow>
                        {/* <TableRow>
                          <TableCell sx={{ fontWeight: 'bold' }}>Control</TableCell>
                          <TableCell sx={{ fontWeight: 'bold' }} align="right">
                            {formatCurrency(-totales?.control)}
                          </TableCell>
                        </TableRow> */}
                        <TableRow>
                          <TableCell sx={{ fontWeight: 'bold', borderBottom: 'none' }}>Total</TableCell>
                          <TableCell sx={{ fontWeight: 'bold', borderBottom: 'none' }} align="right">
                            {formatCurrency(totales?.total)}
                          </TableCell>
                        </TableRow>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <TableRow>
                          <TableCell></TableCell>
                        </TableRow>
                      </React.Fragment>
                    )}
                  </React.Fragment>
                ) : (
                  <TableRow>
                    {/* <TableCell rowSpan={4} sx={{ borderBottom: 'none' }} /> */}

                    <TableCell colSpan={6}>
                      <Stack justifyContent={'center'} alignItems={'center'} sx={{ minHeight: 200 }}>
                        <AllInboxIcon fontSize="large" color="action" />
                        <Typography variant="body1" color="action">
                          No hay datos
                        </Typography>
                      </Stack>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid item container xs={12} md={12} rowSpacing={2} alignItems={'center'}>
          <Grid xs={12} md={10}>
            <Stack flexDirection={'row'} columnGap={2}>
              <Card sx={{ maxWidth: 200 }}>
                <CardContent>
                  <Typography gutterBottom variant="button" component="div">
                    Dias de renta
                  </Typography>
                  <Typography variant="h5" textAlign={'center'} color="text.secondary">
                    {getRentalDays()}
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{ maxWidth: 200 }}>
                <CardContent>
                  <Typography gutterBottom variant="button" component="div">
                    Descuento
                  </Typography>
                  <Typography variant="h5" textAlign={'center'} color="text.secondary">
                    {formatCurrency(0)}
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{ maxWidth: 200 }}>
                <CardContent>
                  <Typography gutterBottom variant="button" component="div">
                    Total a pagar
                  </Typography>
                  <Typography variant="h5" textAlign={'center'} color="text.secondary">
                    {formatCurrency(totales ? totales.total : 0)}
                  </Typography>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<StartIcon />}
              onClick={() => {
                if (rows.length > 0 && dateReturn) {
                  setOpenAgreement(true);
                } else {
                  setOpenAgreement(false);
                  setAlertDate(true);
                }
              }}
              disabled={valueClient && statusCart === 'active' && rows.length > 0 ? false : true}
            >
              Continuar
            </Button>
          </Grid>
        </Grid>

        {alertDate && (
          <Grid item xs={12}>
            <Alert variant="filled" severity="error">
              Debe seleccionar fecha de devolución.
            </Alert>
          </Grid>
        )}

        {statusCart === 'rented' && valueClient && (
          <Grid item xs={12}>
            <Alert severity="info">
              Cliente cuenta con una renta activa. <Link href={`/devoluciones/${valueClient.id}`}> Ir a Devoluciones</Link>
            </Alert>
          </Grid>
        )}
      </Grid>

      <ModalSearch
        open={openModalSearch}
        setOpen={setOpenModalSearch}
        setValueSearch={setValueSearchKeyword}
        valueSearch={valueSearchKeyword}
        rowsGrid={rowsSearch}
        flag={flag}
        loading={loading || loadingAccessory || loadingArticle || loadingGamepad}
        addToCartMultiple={addToCartMultiple}
      />

      {rows.length > 0 && valueClient && dateReturn && (
        <Agreement
          open={openAgreement}
          setOpen={setOpenAgreement}
          setOpenPay={setOpenPay}
          cart={{ client: valueClient, products: rows, dataReturn: dateReturn }}
        />
      )}

      {rows.length > 0 && valueClient && dateReturn && (
        <Pay
          open={openPay}
          setOpen={setOpenPay}
          cart={{ client: valueClient, products: rows, startDate: dateRent, dataReturn: dateReturn, totales: totales }}
          clean={clean}
        />
      )}
    </Grid>
  );
};

export default Rent;
