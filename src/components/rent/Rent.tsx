'use client';
import React, { useEffect, useState } from 'react';

//Material Ui
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import DirectionsIcon from '@mui/icons-material/Directions';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridToolbarContainer } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

//Material Icons
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, Button, Icon, Skeleton, Stack, Typography } from '@mui/material';
import { GiGameConsole } from 'react-icons/gi';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import KeyboardIcon from '@mui/icons-material/Keyboard';

//API
import { clientAPI, consolesApi, rentApi } from '@/server';

//Interfaces
import { IClient } from '@/interfaces/clients';
import { IConsole } from '@/interfaces/consoles';
import { IAccessories } from '@/interfaces/accessories';
import { IAddToCart } from '@/interfaces/rent';

//Util
import convertToUppercase from '@/utils/convertToUppercase';
import CustomDataGrid from '../shared/CustomDataGrid';

//Alert
import Swal from 'sweetalert2';
import ModalSearch from './ModalSearch';
import SearchByCode from './SearchByCode';

const Rent = () => {
  //***********************************************************USE STATE*****************************************************************

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingArticle, setLoadingArticle] = useState<boolean>(false);
  const [loadingAccessory, setLoadingAccessory] = useState<boolean>(false);
  const [loadingGamepad, setLoadingGamepad] = useState<boolean>(false);

  const [rows, setRows] = useState<any>([]);
  const [rowsSearch, setRowsSearch] = useState<any>([]);

  const [codeClient, setcodeClient] = useState<string>('');
  const [valueClient, setValueClient] = React.useState<IClient>();
  const [codeArticle, setcodeArticle] = useState<string>('');
  const [codeGamepad, setcodeGamepad] = useState<string>('');
  const [codeAccessory, setcodeAccessory] = useState<string>('');

  const [openModalSearch, setOpenModalSearch] = React.useState(false);

  const [valueSearchKeyword, setValueSearchKeyword] = React.useState<string>('');

  const [flag, setFlag] = useState('');

  //***********************************************************USE EFFECT*****************************************************************

  useEffect(() => {
    if (valueClient) {
      getCartClient();
    }
  }, [valueClient]);

  useEffect(() => {
    console.log('FLAG', flag);
    console.log('valueSearchKeyword', valueSearchKeyword);
    if (valueSearchKeyword) {
      switch (flag) {
        case 'client':
          console.log('SEARCH BY CLIENTE');
          setLoading(true);
          clientAPI.searchClientByKeyword(valueSearchKeyword).then((response) => {
            setLoading(false);
            console.log('clientes search', response);
            setRowsSearch(response.data);
          });
          break;

        case 'console':
          console.log('SEARCH BY CONSOLE');
          setLoadingArticle(true);
          consolesApi.searchConsoleByKeyword(valueSearchKeyword).then((response) => {
            setLoadingArticle(false);
            console.log('console search', response.data);
            setRowsSearch(response.data);
          });
          break;

        case 'gamepad':
          console.log('SEARCH BY CONTROL');
          setLoadingGamepad(true);
          consolesApi.searchGamepadByKeyword(valueSearchKeyword).then((response) => {
            setLoadingGamepad(false);
            console.log('Gamepad search', response.data);
            setRowsSearch(response.data);
          });
          break;

        case 'accessory':
          console.log('SEARCH BY ACCESSORY');
          setLoadingAccessory(true);
          consolesApi.searchAccessoryByKeyword(valueSearchKeyword).then((response) => {
            setLoadingAccessory(false);
            console.log('Accessory search', response.data);
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
    // if (valueSearchClient) {

    // } else {
    //   setRowsSearch([]);
    // }
  }, [valueSearchKeyword]);

  //***********************************************************FUNCTIONS*****************************************************************

  const handleSearchClient = () => {
    if (codeClient) {
      setLoading(true);
      const code = Number(codeClient);
      clientAPI
        .getByIdClients(code)
        .then((response) => {
          setLoading(false);
          setcodeClient('');
          setValueClient(response.data);
        })
        .catch((error) => {
          setLoading(false);
          setcodeClient('');
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
  };

  const handleSearchArticle = () => {
    if (codeArticle && valueClient) {
      setLoadingArticle(true);
      consolesApi
        .searchConsoleBySerialNumber(codeArticle)
        .then((response) => {
          console.log('consoles', response.data);
          setcodeArticle('');

          addToCart({ productId: { id: response.data.id, articleType: 1 }, clientId: Number(valueClient.id), quantity: 1 });
          // setValueArticle(response.data);
        })
        .catch((error) => {
          setcodeArticle('');
          setLoadingArticle(false);
          console.log(error);
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
          console.log('SEARCH GAMEPADS', response);
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
    console.log(codeAccessory);
    if (codeAccessory && valueClient) {
      setLoadingAccessory(true);
      consolesApi
        .getByIdAccessories(Number(codeAccessory))
        .then((response) => {
          setLoadingAccessory(false);
          console.log('CURRENT CLIENT ID', valueClient.id);
          console.log('Accessory SEARCH', response.data);

          addToCart({ productId: { id: response.data.id, articleType: 3 }, clientId: Number(valueClient.id), quantity: 1 });
        })
        .catch((error) => {
          setcodeAccessory('');
          setLoadingAccessory(false);
          console.log(error);
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
      console.log('ADDTOCART', response);
      setLoadingArticle(false);
      setLoadingAccessory(false);
      setLoadingGamepad(false);
      getCartClient();
    });
  };

  const addToCartMultiple = (arrayId: number[], name: string) => {
    switch (name) {
      case 'client':
        //const id = arrayId[0];
        console.log('SET VALUE CLIENT', arrayId[0]);
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
        console.log('ADD TO CART MULTIPLE', arrayId);

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
            console.log('GET CART', response.data);

            const consoles = response.data.products.videoGames;
            const gamepads = response.data.products.gamepads;
            const accessories = response.data.products.accessories;

            const newRows: any = [];

            if (consoles.length > 0) {
              consoles.map((item: any) => {
                // console.log(item);
                const newConsoles = {
                  id: item.id + 'c',
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
                  id: item.id + 'g',
                  article: 'control',
                  name: item.name,
                  model: 'n/a',
                  serialNumber: item.serialNumber,
                  rentalPrice: 50,
                  characteristics: item.color + ' ' + item.connectionType
                };
                newRows.push(newGamePad);
              });

              if (accessories.length > 0) {
                accessories.map((item: any) => {
                  console.log(item);
                  const newAccessory = {
                    id: item.id + 'a',
                    article: 'accesorio',
                    name: item.name,
                    model: item.name,
                    serialNumber: item.serialNumber,
                    rentalPrice: 50,
                    characteristics: item.color + ' ' + item.characteristics
                  };
                  newRows.push(newAccessory);
                });
              }
            }

            setRows(newRows);
          }
        })
        .then((error) => {
          console.log(error);
        });
    }
  };

  const handleSearchByKeyboard = (name: string) => {
    setOpenModalSearch(true);
    console.log(`MODAL ${name}`);
    setFlag(name);
  };

  //***********************************************************COLUMNS*****************************************************************
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 1, maxWidth: 100 },
    { field: 'article', headerName: 'Articulo', flex: 1, minWidth: 130 },
    { field: 'name', headerName: 'Nombre', flex: 1, minWidth: 150 },
    { field: 'model', headerName: 'Modelo', flex: 1, minWidth: 130 },
    { field: 'serialNumber', headerName: 'No. de serie', flex: 1, minWidth: 130 },
    { field: 'characteristics', headerName: 'Caracteristicas', flex: 1, minWidth: 280 },
    { field: 'rentalPrice', headerName: 'Precio', flex: 1, minWidth: 70 }

    //  { field: 'status', headerName: 'Estatus', flex: 1, minWidth: 100 }
  ];

  return (
    <Grid sx={{ p: 3 }} container spacing={9}>
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
            disabled={valueClient ? false : true}
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
            disabled={valueClient ? false : true}
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
            disabled={valueClient ? false : true}
          />

          {/* /*********************DATES ******************/}
          <Paper component="div" sx={{ p: '4px 20px', display: 'flex', alignItems: 'center' }}>
            <Icon aria-label="menu" color="action">
              <PersonSearchIcon />
            </Icon>

            <Icon aria-label="search" color="action">
              <SearchIcon />
            </Icon>
          </Paper>

          <Paper component="div" sx={{ p: '4px 20px', display: 'flex', alignItems: 'center' }}>
            <Icon aria-label="menu" color="action">
              <PersonSearchIcon />
            </Icon>

            <Icon aria-label="search" color="action">
              <SearchIcon />
            </Icon>
          </Paper>
        </Stack>
      </Grid>

      <Grid item container columnSpacing={3} xs={12} md={8}>
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
          <Paper sx={{ px: 2, py: 2, mt: 2 }}>
            <CustomDataGrid
              sx={{
                //boxShadow: 2,
                border: 0,
                //borderColor: 'primary.light',
                '--DataGrid-overlayHeight': '200px'
              }}
              name="rent"
              columns={columns}
              rows={rows}
              loading={loadingArticle || loadingAccessory || loadingGamepad}
              // slotProps={{
              //   toolbar: {
              //     showQuickFilter: false
              //   }
              // }}
              // slotProps={{
              //   toolbar: {
              //     printOptions: { disableToolbarButton: false },
              //     csvOptions: { disableToolbarButton: false },
              //     showQuickFilter: false
              //   }
              // }}
              slots={{ toolbar: () => <GridToolbarContainer sx={{ mb: 2 }}></GridToolbarContainer> }}
              hideFooterPagination
              // disableColumnFilter
              // disableColumnSelector
              // disableDensitySelector
            />
          </Paper>
        </Grid>
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
    </Grid>
  );
};

export default Rent;
