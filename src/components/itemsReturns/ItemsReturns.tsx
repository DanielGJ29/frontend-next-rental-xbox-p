'use client';
import React, { useEffect, useState } from 'react';

//Components
import SearchByCode from '../rent/SearchByCode';
import ModalSearchByKeyword from './ModalSearchByKeyword';

//Material Ui
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { GridColDef, GridToolbarContainer } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

//Material Icons
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import MailIcon from '@mui/icons-material/Mail';
import FacebookIcon from '@mui/icons-material/Facebook';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import HandshakeIcon from '@mui/icons-material/Handshake';

//Apis
import { clientAPI, rentApi } from '@/server';
import Loading from '../shared/Loadin';

//Alert
import Swal from 'sweetalert2';

//Interfaces
import { IClient } from '@/interfaces/clients';

//SHARE
import CustomDataGrid from '../shared/CustomDataGrid';

//UTILS
import { formatCurrency } from '@/utils/utils';

const ItemsReturns = () => {
  //***********************************************************USE STATE*****************************************************************

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingSearchByKeyboard, setLoadingSearchByKeyboard] = useState<boolean>(false);
  const [codeClient, setCodeClient] = useState<string>('');
  const [client, setClient] = useState<IClient>();
  const [rows, setRows] = useState([]);

  const [openModalSearchByKeyboard, setOpenModalSearchByKeyboard] = useState<boolean>(false);
  const [valueSearchKeyboard, setValueSearchKeyboard] = useState('');
  const [rowsSearch, setRowsSearch] = useState<[]>([]);

  //***********************************************************USE EFFECT*****************************************************************

  useEffect(() => {
    if (client) {
      getCartClient(client.id);
    }
  }, [client]);

  useEffect(() => {
    if (valueSearchKeyboard) {
      setLoadingSearchByKeyboard(true);
      clientAPI
        .searchClientByKeyword(valueSearchKeyboard)
        .then((response) => {
          setLoadingSearchByKeyboard(false);
          setRowsSearch(response.data);
        })
        .catch((error) => {
          setLoadingSearchByKeyboard(false);
          console.log(error);
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: `${error.response.data.message}`,
            showConfirmButton: false,
            timer: 2500
          });
        });
    } else {
      setRowsSearch([]);
    }
  }, [valueSearchKeyboard]);

  //***********************************************************FUNCTIONS*****************************************************************

  const handleSearchClient = () => {
    if (codeClient) {
      const id = Number(codeClient);
      getClientById(id);
    }
  };

  const getClientById = (id: number) => {
    setLoading(true);
    clientAPI
      .getByIdClients(id)
      .then((response) => {
        setLoading(false);
        setClient(response.data);
        setCodeClient('');
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: `${error.response.data.message}`,
          showConfirmButton: false,
          timer: 2500
        });
      });
  };

  const getCartClient = (id: string) => {
    rentApi.getClientCart(id).then((response) => {
      if (response.data) {
        if (response.data.cart.status === 'active') {
          setClient(undefined);
          Swal.fire({
            position: 'center',
            icon: 'info',
            title: `Cliente no cuenta con renta pendiente de entrega.`,
            showConfirmButton: false,
            timer: 2500
          });
        }
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
        // setTotales(response.data.totales);
        // setStatusCart(response.data.cart.status);
      } else {
        setRows([]);
        setClient(undefined);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: `${response.message}`,
          showConfirmButton: false,
          timer: 2500
        });
      }
    });
  };

  const handleSearchByKeyboard = () => {
    setOpenModalSearchByKeyboard(true);
  };

  const addToCartMultiple = (arrayId: number[], name: string) => {
    if (arrayId.length > 0) {
      const id = arrayId[0];
      getClientById(id);
    }
  };

  const handleItemsReturn = () => {
    if (client) {
      setLoading(true);
      const id = Number(client.id);
      rentApi.itemReturns(id).then((response) => {
        setLoading(false);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `Productos recepcionados correctamente.`,
          showConfirmButton: false,
          timer: 2500
        });

        setCodeClient('');
        setClient(undefined);
        setRows([]);
      });
    }
  };

  //***********************************************************COLUMNS*****************************************************************

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'article', headerName: 'Articulo', width: 130, flex: 1 },
    { field: 'name', headerName: 'Nombre', width: 130, flex: 1 },
    {
      field: 'model',
      headerName: 'Modelo',
      width: 90,
      flex: 1
    },
    {
      field: 'serialNumber',
      headerName: 'No de Serie',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      flex: 1
    },
    {
      field: 'rentalPrice',
      headerName: 'Precio',
      type: 'number',
      width: 90,
      valueFormatter: (value, row) => {
        if (!value) {
          return;
        }

        return formatCurrency(value);
      }
    }
  ];

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        {/* <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector slotProps={{ tooltip: { title: 'Change density' } }} />
        <Box sx={{ flexGrow: 1 }} />
        <GridToolbarExport
          slotProps={{
            tooltip: { title: 'Export data' },
            button: { variant: 'outlined' }
          }}
        /> */}
      </GridToolbarContainer>
    );
  }

  return (
    <div>
      <SearchByCode
        icon={<PersonSearchIcon color="action" />}
        title="Código Cliente"
        name="client"
        value={codeClient}
        setValueInput={setCodeClient}
        handleSearch={handleSearchClient}
        handleSearchByKeyboard={handleSearchByKeyboard}
      />

      {client && (
        <Paper sx={{ p: 4, mt: 4 }}>
          <Grid container columnSpacing={2}>
            <Grid item xs={12} md={3}>
              <Box sx={{ border: 1, borderRadius: 1, borderColor: 'text.secondary', padding: 4 }}>
                <Stack alignItems="center">
                  <Avatar alt="Remy Sharp" src={client && client.avatarUrl} sx={{ width: 80, height: 80 }} />
                  <Typography variant="h6" pt={2} textTransform={'capitalize'} gutterBottom>
                    {`${client.name} ${client.lastName} ${client.motherLastName}`}
                  </Typography>
                </Stack>

                <Divider sx={{ my: 4 }} />

                <Grid container flexDirection={'row'}>
                  <Grid item xs={12} justifyContent={'center'}>
                    <Stack flexDirection={'row'} justifyContent={'space-between'}>
                      <PhoneIphoneIcon />
                      <Typography variant="body1" textAlign={'right'} textTransform={'capitalize'} gutterBottom>
                        {client.phone}
                      </Typography>
                    </Stack>

                    <Stack flexDirection={'row'} justifyContent={'space-between'}>
                      <MailIcon />
                      <Typography variant="body1" textAlign={'right'} textTransform={'capitalize'} gutterBottom>
                        {client.email}
                      </Typography>
                    </Stack>

                    <Stack flexDirection={'row'} justifyContent={'space-between'}>
                      <FmdGoodIcon />
                      <Typography variant="body1" textAlign={'right'} textTransform={'capitalize'} gutterBottom>
                        {`${client.street}, ${client.numberOut}, ${client.colony}`}
                      </Typography>
                    </Stack>

                    <Stack flexDirection={'row'} justifyContent={'space-between'}>
                      <FacebookIcon />
                      <Typography variant="body1" textAlign={'right'} textTransform={'capitalize'} gutterBottom>
                        {client.linkSocialNetwork}
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12} md={9}>
              <Box border={1} sx={{ borderRadius: 1, borderColor: 'text.primary', paddingX: 4, paddingY: 4 }}>
                <Typography variant="inherit" textTransform={'capitalize'} gutterBottom>
                  Productos
                </Typography>
                <Divider sx={{ my: 4 }} />

                <CustomDataGrid
                  name="return"
                  rows={rows}
                  columns={columns}
                  // initialState={{
                  //   pagination: {
                  //     paginationModel: { page: 0, pageSize: 5 }
                  //   }
                  // }}
                  //pageSizeOptions={[5, 10]}
                  hideFooter
                  //checkboxSelection
                  slots={{
                    toolbar: CustomToolbar
                  }}
                />
              </Box>
            </Grid>

            <Grid item container xs={12} md={12} justifyContent={'flex-end'}>
              <Button variant="contained" startIcon={<HandshakeIcon />} onClick={handleItemsReturn}>
                Recibir
              </Button>
            </Grid>
          </Grid>
        </Paper>
      )}

      <Loading open={loading} />

      <ModalSearchByKeyword
        open={openModalSearchByKeyboard}
        setOpen={setOpenModalSearchByKeyboard}
        setValueSearch={setValueSearchKeyboard}
        valueSearch={valueSearchKeyboard}
        rowsGrid={rowsSearch}
        flag={'client'}
        loading={loadingSearchByKeyboard}
        addToCartMultiple={addToCartMultiple}
      />
    </div>
  );
};

export default ItemsReturns;
