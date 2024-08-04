import React, { ChangeEvent, ChangeEventHandler, Fragment, useEffect, useState } from 'react';

//Material UI
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {
  Avatar,
  Box,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  SelectChangeEvent,
  Skeleton,
  Stack,
  TextField,
  Typography,
  capitalize,
  formControlClasses
} from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { useTheme } from '@mui/material/styles';
import LocalSeeIcon from '@mui/icons-material/LocalSee';

//Material Icon
import AddBoxIcon from '@mui/icons-material/AddBox';
import SaveIcon from '@mui/icons-material/Save';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

//Share
import Loading from '@/components/shared/Loadin';

//Alert
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

//Api
import { consolesApi } from '@/server';

//Interfaces
import { INewNameconsoles, INewConsole, INameConsoles, IModels } from '@/interfaces/consoles';

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  getListConsoles: Function;
  id: number;
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
    // backgroundColor: theme.palette.mode === 'light' ? '#F3F6F9' : '#1A2027',
    border: '1px solid',
    borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843',
    fontSize: 16,
    width: '100',
    padding: '8px 12px',
    textTransform: 'capitalize',
    transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
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

const UpdateConsole = (props: Props) => {
  const theme = useTheme();
  const { open, setOpen, getListConsoles, id } = props;

  //**********************************************************USE STATE***************************************************/
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<File | undefined>(undefined);
  const [avatar, setAvatar] = useState<string | undefined>();
  const [formData, setFormData] = useState<INewConsole>({ nameId: '', modelId: '', color: '', serialNumber: '', hardHDD: '', img: '' });
  const [names, setNames] = useState<INameConsoles[]>([]);
  const [models, setModels] = useState<IModels[]>([]);

  //**********************************************************USE EFFECT***************************************************/
  //Get console by Id
  useEffect(() => {
    setLoading(true);
    consolesApi.getByIdConsole(id).then((response) => {
      console.log('response.data', response.data);
      setFormData(response.data);
      setAvatar(response.data.imgUrl);
      setLoading(false);
    });
  }, [id]);

  //Get names consoles
  useEffect(() => {
    consolesApi.getAllConsolesNames().then((response) => {
      console.log('names', response.data);
      setNames(response.data);
    });
  }, []);

  //Get models consoles
  useEffect(() => {
    consolesApi.getAllModels().then((response) => {
      setModels(response.data);
    });
  }, []);

  //Load imgage
  useEffect(() => {
    if (selectedImage) {
      setAvatar(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  //**********************************************************FUNCTIONS***************************************************/

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    const name = event.target.name;
    setFormData({ ...formData, [name]: value });
  };

  const handleChangeFile = (file: File | undefined) => {
    setSelectedImage(file);
    if (file) {
      setFormData({ ...formData, ['img']: file });
    }
  };

  const handleChangeSelect = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    const name = event.target.name;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    setLoading(true);

    const newFormData = new FormData();
    newFormData.append('nameId', formData.nameId);
    newFormData.append('modelId', formData.modelId);
    newFormData.append('color', formData.color);
    newFormData.append('serialNumber', formData.serialNumber);
    newFormData.append('hardHDD', formData.hardHDD);
    newFormData.append('img', formData.img);
    consolesApi
      .updateConsole(id, newFormData)
      .then((response) => {
        if (response.status === 'success') {
          setLoading(false);

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Consola actualizada correctamente.',
            showConfirmButton: false,
            timer: 2500
          });

          handleClose();
          getListConsoles();
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log('el error', error.response.data.message);
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
        maxWidth={'md'}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
            <ModeEditIcon fontSize="medium" />

            <Typography variant="subtitle2" textAlign={'center'} gutterBottom>
              Editar consola
            </Typography>
          </Stack>
        </DialogTitle>

        <DialogContent>
          <Divider />

          <Grid container spacing={2} sx={{ mt: 2, py: 4 }}>
            <Grid item xs={12} md={5} alignContent={'center'}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <FormLabel
                  htmlFor="change-avtar"
                  sx={{
                    position: 'relative',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    '&:hover .MuiBox-root': { opacity: 1 },
                    cursor: 'pointer'
                  }}
                >
                  {loading ? (
                    <Skeleton variant="circular" animation="wave" height={200} width={200} id="bootstrap-input" />
                  ) : (
                    <Avatar alt="Remy Sharp" src={avatar} sx={{ width: 200, height: 200, border: '1px dashed' }} />
                  )}

                  {!loading && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        backgroundColor: theme.palette.mode === ThemeMode.DARK ? 'rgba(255, 255, 255, .75)' : 'rgba(0,0,0,.65)',
                        width: '100%',
                        height: '100%',
                        opacity: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Stack spacing={0.5} alignItems="center">
                        <LocalSeeIcon style={{ color: theme.palette.secondary.light, fontSize: '2rem' }} />
                        <Typography sx={{ color: 'secondary.lighter' }}>Upload</Typography>
                      </Stack>
                    </Box>
                  )}
                </FormLabel>

                {!loading && (
                  <TextField
                    type="file"
                    id="change-avtar"
                    placeholder="Outlined"
                    variant="outlined"
                    sx={{ display: 'none' }}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeFile(e.target.files?.[0])}
                  />
                )}

                {loading ? (
                  <Skeleton variant="text" sx={{ mt: 2 }} animation="wave" height={15} width={100} id="bootstrap-input" />
                ) : (
                  <Typography sx={{ mt: 2 }} variant="subtitle1" gutterBottom>
                    Imagen
                  </Typography>
                )}
              </Box>
            </Grid>
            {loading ? (
              <Grid container item xs={12} md={7} gap={1.5}>
                <Grid item xs={12} md={12}>
                  <FormControl fullWidth variant="standard">
                    <Skeleton animation="wave">
                      <Typography variant="caption" color={'GrayText'} gutterBottom>
                        Nombre
                      </Typography>
                    </Skeleton>
                    <Skeleton animation="wave">
                      <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        size="small"
                        value={formData?.nameId}
                        onChange={handleChangeSelect}
                        input={<OutlinedInput label="Name" />}
                        name="nameId"
                      >
                        {names.map((name) => (
                          <MenuItem key={name?.id} value={name?.id}>
                            {name.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </Skeleton>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={12}>
                  <FormControl fullWidth variant="standard">
                    <Skeleton animation="wave">
                      <Typography variant="caption" color={'GrayText'} gutterBottom>
                        Modelo
                      </Typography>
                    </Skeleton>
                    <Skeleton animation="wave">
                      <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        size="small"
                        value={formData?.modelId}
                        onChange={handleChangeSelect}
                        input={<OutlinedInput label="Model" />}
                        name="modelId"
                      >
                        {models.map((name) => (
                          <MenuItem key={name?.id} value={name?.id}>
                            {name.model}
                          </MenuItem>
                        ))}
                      </Select>
                    </Skeleton>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={12}>
                  <FormControl fullWidth variant="standard">
                    <Skeleton animation="wave">
                      <InputLabel shrink htmlFor="bootstrap-input">
                        Color
                      </InputLabel>
                    </Skeleton>
                    <Skeleton animation="wave">
                      <BootstrapInput defaultValue={formData?.color} id="bootstrap-input" name="color" onChange={handleChange} />
                    </Skeleton>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={12}>
                  <FormControl fullWidth variant="standard">
                    <Skeleton animation="wave">
                      <Typography variant="caption" color={'GrayText'} gutterBottom>
                        Numero de serie
                      </Typography>
                    </Skeleton>
                    <Skeleton animation="wave">
                      <BootstrapInput
                        defaultValue={formData?.serialNumber}
                        id="bootstrap-input"
                        name="serialNumber"
                        onChange={handleChange}
                      />
                    </Skeleton>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={12}>
                  <FormControl fullWidth variant="standard">
                    <Skeleton animation="wave">
                      <InputLabel shrink htmlFor="bootstrap-input">
                        Capacidad HDD
                      </InputLabel>
                    </Skeleton>
                    <Skeleton animation="wave">
                      <BootstrapInput defaultValue={formData?.hardHDD} id="bootstrap-input" name="hardHDD" onChange={handleChange} />
                    </Skeleton>
                  </FormControl>
                </Grid>
              </Grid>
            ) : (
              <Grid container item xs={12} md={7} gap={1.5}>
                <Grid item xs={12} md={12}>
                  <FormControl fullWidth variant="standard">
                    <Typography variant="caption" color={'GrayText'} gutterBottom>
                      Nombre
                    </Typography>
                    <Select
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      size="small"
                      value={formData?.nameId}
                      onChange={handleChangeSelect}
                      input={<OutlinedInput label="Name" />}
                      name="nameId"
                    >
                      {names.map((name) => (
                        <MenuItem key={name?.id} value={name?.id}>
                          {name.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={12}>
                  <FormControl fullWidth variant="standard">
                    <Typography variant="caption" color={'GrayText'} gutterBottom>
                      Modelo
                    </Typography>
                    <Select
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      size="small"
                      value={formData?.modelId}
                      onChange={handleChangeSelect}
                      input={<OutlinedInput label="Model" />}
                      name="modelId"
                    >
                      {models.map((name) => (
                        <MenuItem key={name?.id} value={name?.id}>
                          {name.model}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={12}>
                  <FormControl fullWidth variant="standard">
                    <InputLabel shrink htmlFor="bootstrap-input">
                      Color
                    </InputLabel>

                    <BootstrapInput defaultValue={formData?.color} id="bootstrap-input" name="color" onChange={handleChange} />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={12}>
                  <FormControl fullWidth variant="standard">
                    <Typography variant="caption" color={'GrayText'} gutterBottom>
                      Numero de serie
                    </Typography>
                    <BootstrapInput
                      sx={{ '& .MuiInputBase-input': { textTransform: 'uppercase' } }}
                      defaultValue={formData?.serialNumber}
                      id="bootstrap-input"
                      name="serialNumber"
                      onChange={handleChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={12}>
                  <FormControl fullWidth variant="standard">
                    <InputLabel shrink htmlFor="bootstrap-input">
                      Capacidad HDD
                    </InputLabel>
                    <BootstrapInput defaultValue={formData?.hardHDD} id="bootstrap-input" name="hardHDD" onChange={handleChange} />
                  </FormControl>
                </Grid>
              </Grid>
            )}
          </Grid>
        </DialogContent>

        <DialogActions>
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

export default UpdateConsole;
