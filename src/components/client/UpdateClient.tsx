'use client';
import React, { ChangeEvent, Fragment, useEffect, useState } from 'react';

//Material UI
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import { alpha, styled } from '@mui/material/styles';

//Material Icon
import SaveIcon from '@mui/icons-material/Save';
import { GiGameConsole } from 'react-icons/gi';
import ContactPageIcon from '@mui/icons-material/ContactPage';

//Share
import Loading from '@/components/shared/Loadin';

//Alert
import Swal from 'sweetalert2';

//Api
import { clientAPI } from '@/server';

//Interfaces
import { INewClient } from '@/interfaces/clients';

//Componenr
import CustomAvatar from '../shared/CustomAvatar';

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  getListClient: Function;
  id: number;
}

interface ISelectedImg {
  avatarUrl: undefined | File;
  docIneFront: undefined | File;
  docIneReverse: undefined | File;
}

export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark'
}

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3)
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    border: '1px solid',
    borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843',
    fontSize: 16,
    width: '100',
    padding: '8px 12px',
    textTransform: 'capitalize',
    transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow']),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(','),
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.light, 0.25)} 0 0 0 0.1rem`,
      borderColor: theme.palette.primary.light
    }
  }
}));

const UpdateClient = (props: Props) => {
  const { open, setOpen, getListClient, id } = props;

  //**********************************************************USE STATE***************************************************/

  const [loading, setLoading] = useState<boolean>(false);

  const [selectedImage, setSelectedImage] = useState<ISelectedImg>({
    avatarUrl: undefined,
    docIneFront: undefined,
    docIneReverse: undefined
  });
  const [avatar, setAvatar] = useState<string | undefined>();
  const [docFront, setDocFront] = useState<string | undefined>();
  const [docReverse, setDocReverse] = useState<string | undefined>();

  const [formData, setFormData] = useState<INewClient>({
    name: '',
    lastName: '',
    motherLastName: '',
    phone: '',
    email: '',
    socialNetworkId: '',
    linkSocialNetwork: '',
    street: '',
    numberInt: '',
    numberOut: '',
    colony: '',
    zipCode: '',
    city: '',
    municipality: '',
    state: '',
    avatarUrl: '',
    docIneFront: '',
    docIneReverse: ''
  });
  const [socialNetwork, setSocailNetwork] = useState([
    { id: 1, name: 'Facebook' },
    { id: 2, name: 'youtube' }
  ]);

  //**********************************************************USE EFFECT***************************************************/
  useEffect(() => {
    setLoading(true);
    if (id) {
      clientAPI.getByIdClients(id).then((response) => {
        setFormData(response.data);
        setAvatar(response.data.avatarUrl);
        setDocFront(response.data.documents[0].docIneFront);
        setDocReverse(response.data.documents[0].docIneReverse);
        setLoading(false);
      });
    }
  }, [id]);

  useEffect(() => {
    if (selectedImage.avatarUrl) {
      setAvatar(URL.createObjectURL(selectedImage.avatarUrl));
    }

    if (selectedImage.docIneFront) {
      setDocFront(URL.createObjectURL(selectedImage.docIneFront));
    }

    if (selectedImage.docIneReverse) {
      setDocReverse(URL.createObjectURL(selectedImage.docIneReverse));
    }
  }, [selectedImage]);

  //**********************************************************FUNCTIONS HANDLE***************************************************/

  const clean = () => {
    setFormData({
      name: '',
      lastName: '',
      motherLastName: '',
      phone: '',
      email: '',
      socialNetworkId: '',
      linkSocialNetwork: '',
      street: '',
      numberInt: '',
      numberOut: '',
      colony: '',
      zipCode: '',
      city: '',
      municipality: '',
      state: '',
      avatarUrl: '',
      docIneFront: '',
      docIneReverse: ''
    });
    setSelectedImage({ avatarUrl: undefined, docIneFront: undefined, docIneReverse: undefined });
    setAvatar('');
    setDocFront('');
    setDocReverse('');
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    const name = event.target.name;

    setFormData({ ...formData, [name]: value });
  };

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const name = e.target.name;
    if (file) {
      setSelectedImage({ ...selectedImage, [name]: file });
      setFormData({ ...formData, [name]: file });
    }
  };

  const handleChangeSelect = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    const name = event.target.name;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    const newFormData = new FormData();
    newFormData.append('name', formData.name);
    newFormData.append('lastName', formData.lastName);
    newFormData.append('motherLastName', formData.motherLastName);
    newFormData.append('phone', formData.phone);
    newFormData.append('email', formData.email);
    newFormData.append('socialNetworkId', formData.socialNetworkId);
    newFormData.append('linkSocialNetwork', formData.linkSocialNetwork);
    newFormData.append('street', formData.street);
    newFormData.append('numberInt', formData.numberInt);
    newFormData.append('numberOut', formData.numberOut);
    newFormData.append('colony', formData.colony);
    newFormData.append('zipCode', formData.zipCode);
    newFormData.append('city', formData.city);
    newFormData.append('municipality', formData.municipality);
    newFormData.append('state', formData.state);
    newFormData.append('avatarUrl', formData.avatarUrl);
    newFormData.append('docIneFront', formData.docIneFront);
    newFormData.append('docIneReverse', formData.docIneReverse);

    setLoading(true);

    clientAPI
      .updateByIdClient(id, newFormData)
      .then((response) => {
        if (response.status === 'success') {
          setLoading(false);

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Cliente actualizado correctamente.',
            showConfirmButton: false,
            timer: 2500
          });

          handleClose();
          getListClient();
        }
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'ocurrio un error',
          text: `${error.response.data.message}`,
          showConfirmButton: true
          //timer: 2500
        });
      });
  };

  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={'lg'}
        fullWidth
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
            <GiGameConsole fontSize="medium" />

            <Typography variant="subtitle2" textAlign={'center'} gutterBottom>
              Editar cliente
            </Typography>
          </Stack>
        </DialogTitle>

        <DialogContent>
          <Divider />

          <Grid container rowSpacing={1} columnSpacing={4} sx={{ mt: 2 }}>
            <Grid item xs={12} md={5} container justifyContent={'space-between'}>
              <Grid item xs={12}>
                <CustomAvatar
                  title="Foto de perfil"
                  name="avatarUrl"
                  shape="circular"
                  icon={<ContactPageIcon sx={{ fontSize: 140 }} />}
                  width={200}
                  height={200}
                  loading={loading}
                  handleChangeFile={handleChangeFile}
                  avatar={avatar}
                />
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={12} md={12} sx={{ mb: 0.5 }}>
                  <Typography variant="body1" gutterBottom>
                    Documentación
                  </Typography>
                  <Divider sx={{ mt: 3, opacity: 0.6 }} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomAvatar
                    title="INE Frente"
                    name="docIneFront"
                    shape="rounded"
                    icon={<ContactPageIcon sx={{ fontSize: 100 }} />}
                    width={150}
                    height={150}
                    loading={loading}
                    handleChangeFile={handleChangeFile}
                    avatar={docFront}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <CustomAvatar
                    title="INE Reverso"
                    name="docIneReverse"
                    shape="rounded"
                    icon={<ContactPageIcon sx={{ fontSize: 100 }} />}
                    width={150}
                    height={150}
                    loading={loading}
                    handleChangeFile={handleChangeFile}
                    avatar={docReverse}
                  />
                </Grid>
              </Grid>
            </Grid>
            {loading ? (
              <Grid container item xs={12} md={7} gap={1.5}>
                {[1, 2, 3, 4, 5].map(() => (
                  <Grid key={Math.random()} item xs={12} md={12}>
                    <FormControl fullWidth variant="standard">
                      <Skeleton variant="text" animation="wave" height={15} width={150} id="bootstrap-input" sx={{ mt: 2 }} />
                      <Skeleton variant="text" animation="wave" height={40} id="bootstrap-input" />
                    </FormControl>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Grid container item xs={12} md={7} columnSpacing={3} rowSpacing={2}>
                <Grid item xs={12} md={12} sx={{ mb: 0.5 }}>
                  <Typography variant="body1" gutterBottom>
                    Información personal
                  </Typography>
                  <Divider sx={{ mt: 3, opacity: 0.6 }} />
                </Grid>

                <Grid item xs={12} md={12}>
                  <FormControl fullWidth variant="standard">
                    <InputLabel shrink htmlFor="bootstrap-input">
                      Nombre(s)
                    </InputLabel>

                    <BootstrapInput defaultValue={formData?.name} id="bootstrap-input" name="name" onChange={handleChange} />
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth variant="standard">
                    <InputLabel shrink htmlFor="bootstrap-input">
                      Apellido paterno
                    </InputLabel>

                    <BootstrapInput defaultValue={formData?.lastName} id="bootstrap-input" name="lastName" onChange={handleChange} />
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth variant="standard">
                    <InputLabel shrink htmlFor="bootstrap-input">
                      Apellido materno
                    </InputLabel>

                    <BootstrapInput
                      defaultValue={formData?.motherLastName}
                      id="bootstrap-input"
                      name="motherLastName"
                      onChange={handleChange}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={4}>
                  <FormControl fullWidth variant="standard">
                    <InputLabel shrink htmlFor="bootstrap-input">
                      Telefono
                    </InputLabel>

                    <BootstrapInput defaultValue={formData?.phone} id="bootstrap-input" name="phone" onChange={handleChange} />
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={8}>
                  <FormControl fullWidth variant="standard">
                    <InputLabel shrink htmlFor="bootstrap-input">
                      Correo electronico
                    </InputLabel>

                    <BootstrapInput defaultValue={formData?.email} id="bootstrap-input" name="email" onChange={handleChange} />
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={4}>
                  <FormControl fullWidth variant="standard">
                    <Typography variant="caption" color={'GrayText'} gutterBottom>
                      Red social
                    </Typography>
                    <Select
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      size="small"
                      //multiple
                      value={formData?.socialNetworkId}
                      onChange={handleChangeSelect}
                      input={<OutlinedInput label="Name" />}
                      name="socialNetworkId"
                      //MenuProps={MenuProps}
                    >
                      {socialNetwork.map((item) => (
                        <MenuItem
                          key={item?.id}
                          value={item?.id}
                          //style={getStyles(name, personName, theme)}
                        >
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={8}>
                  <FormControl fullWidth variant="standard">
                    <Typography variant="caption" color={'GrayText'} gutterBottom>
                      Link
                    </Typography>
                    <BootstrapInput
                      defaultValue={formData?.linkSocialNetwork}
                      id="bootstrap-input"
                      name="linkSocialNetwork"
                      onChange={handleChange}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={12} sx={{ mt: 1, mb: 0.5 }}>
                  <Typography variant="body1" gutterBottom>
                    Dirección
                  </Typography>
                  <Divider sx={{ mt: 3, opacity: 0.6 }} />
                </Grid>

                <Grid container item xs={12} md={12} spacing={2}>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth variant="standard">
                      <InputLabel shrink htmlFor="bootstrap-input">
                        Calle
                      </InputLabel>
                      <BootstrapInput defaultValue={formData?.street} id="bootstrap-input" name="street" onChange={handleChange} />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth variant="standard">
                      <InputLabel shrink htmlFor="bootstrap-input">
                        No. Interior
                      </InputLabel>
                      <BootstrapInput defaultValue={formData?.numberInt} id="bootstrap-input" name="numberInt" onChange={handleChange} />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth variant="standard">
                      <InputLabel shrink htmlFor="bootstrap-input">
                        No. Exterior
                      </InputLabel>
                      <BootstrapInput defaultValue={formData?.numberOut} id="bootstrap-input" name="numberOut" onChange={handleChange} />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth variant="standard">
                      <InputLabel shrink htmlFor="bootstrap-input">
                        Colonia
                      </InputLabel>
                      <BootstrapInput defaultValue={formData?.colony} id="bootstrap-input" name="colony" onChange={handleChange} />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth variant="standard">
                      <InputLabel shrink htmlFor="bootstrap-input">
                        Codigo postal
                      </InputLabel>
                      <BootstrapInput defaultValue={formData?.zipCode} id="bootstrap-input" name="zipCode" onChange={handleChange} />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth variant="standard">
                      <InputLabel shrink htmlFor="bootstrap-input">
                        Ciudad
                      </InputLabel>
                      <BootstrapInput defaultValue={formData?.city} id="bootstrap-input" name="city" onChange={handleChange} />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth variant="standard">
                      <InputLabel shrink htmlFor="bootstrap-input">
                        Municipio
                      </InputLabel>
                      <BootstrapInput defaultValue={formData?.municipality} name="municipality" onChange={handleChange} />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth variant="standard">
                      <InputLabel shrink htmlFor="bootstrap-input">
                        Estado
                      </InputLabel>
                      <BootstrapInput defaultValue={formData?.state} name="state" onChange={handleChange} />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Grid>
        </DialogContent>

        <DialogActions sx={{ py: 2, px: 3 }}>
          {loading ? (
            <>
              <Skeleton variant="rounded" animation="wave" height={35} width={100} id="bootstrap-input" />
              <Skeleton variant="rounded" animation="wave" height={35} width={100} id="bootstrap-input" />
            </>
          ) : (
            <>
              <Button size="small" color="secondary" variant="contained" onClick={handleClose}>
                Cancelar
              </Button>

              <Button size="small" color="primary" variant="contained" startIcon={<SaveIcon />} onClick={handleSubmit} autoFocus>
                Guardar
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
      <Loading open={loading} />
    </Fragment>
  );
};

export default UpdateClient;
