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
  capitalize
} from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { useTheme } from '@mui/material/styles';
import LocalSeeIcon from '@mui/icons-material/LocalSee';

//Material Icon
import AddBoxIcon from '@mui/icons-material/AddBox';
import SaveIcon from '@mui/icons-material/Save';
import { GiGameConsole } from 'react-icons/gi';

//Share
import Loading from '@/components/shared/Loadin';

//Alert
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

//Api
import { consolesApi } from '@/server';

//Interfaces
import { INameConsoles, INewConsole, IModels } from '@/interfaces/consoles';

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  getListConsoles: Function;
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

const NewConsole = (props: Props) => {
  const { open, setOpen, getListConsoles } = props;
  const theme = useTheme();

  //**********************************************************USE STATE***************************************************/

  const [loading, setLoading] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<File | undefined>(undefined);
  const [avatar, setAvatar] = useState<string | undefined>();
  const [formData, setFormData] = useState<INewConsole>({ nameId: '', modelId: '', color: '', serialNumber: '', hardHDD: '', img: '' });
  const [names, setNames] = useState<INameConsoles[]>([]);
  const [models, setModels] = useState<IModels[]>([]);
  //const [inputSelected, setInputSelected] = useState({ nameId: '', modelId: '' });

  //**********************************************************USE EFFECT***************************************************/
  useEffect(() => {
    consolesApi.getAllConsolesNames().then((response) => {
      setNames(response.data);
    });
  }, []);

  useEffect(() => {
    consolesApi.getAllModels().then((response) => {
      console.log('response setModels', response.data);
      setModels(response.data);
    });
  }, []);

  useEffect(() => {
    if (selectedImage) {
      setAvatar(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  //**********************************************************FUNCTIONS HANDLE***************************************************/

  const handleClose = () => {
    setOpen(false);
    setFormData({ nameId: '', modelId: '', color: '', serialNumber: '', hardHDD: '', img: '' });
    setSelectedImage(undefined);
    setAvatar('');
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
    const newFormData = new FormData();
    newFormData.append('nameId', formData.nameId);
    newFormData.append('modelId', formData.modelId);
    newFormData.append('color', formData.color);
    newFormData.append('serialNumber', formData.serialNumber);
    newFormData.append('hardHDD', formData.hardHDD);
    newFormData.append('img', formData.img);

    console.log('formData to send', formData);

    setLoading(true);

    consolesApi
      .NewConsole(newFormData)
      .then((response) => {
        console.log('response', response);
        if (response.status === 'success') {
          setLoading(false);

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Consola guardada correctamente.',
            showConfirmButton: false,
            timer: 2500
          });

          handleClose();
          getListConsoles();
          setFormData({ nameId: '', modelId: '', color: '', serialNumber: '', hardHDD: '', img: '' });
          setSelectedImage(undefined);
          setAvatar('');
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
        fullWidth
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
            <GiGameConsole fontSize="medium" />

            <Typography variant="subtitle2" textAlign={'center'} gutterBottom>
              Registrar consola
            </Typography>
          </Stack>
        </DialogTitle>

        <DialogContent>
          <Divider />

          <Grid container spacing={2} sx={{ mt: 2 }}>
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
                      //multiple
                      value={formData?.nameId}
                      onChange={handleChangeSelect}
                      input={<OutlinedInput label="Name" />}
                      name="nameId"
                      //MenuProps={MenuProps}
                    >
                      {names.map((name) => (
                        <MenuItem
                          key={name?.id}
                          value={name?.id}
                          //style={getStyles(name, personName, theme)}
                        >
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
                      // multiple
                      value={formData?.modelId}
                      onChange={handleChangeSelect}
                      input={<OutlinedInput label="Model" />}
                      name="modelId"
                      //MenuProps={MenuProps}
                    >
                      {models.map((name) => (
                        <MenuItem
                          key={name?.id}
                          value={name?.id}
                          //style={getStyles(name, personName, theme)}
                        >
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

export default NewConsole;
