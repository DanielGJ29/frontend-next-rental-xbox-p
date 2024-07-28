import React, { ChangeEvent, ChangeEventHandler, Fragment, useState } from 'react';

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
  Skeleton,
  Stack,
  TextField,
  Typography,
  capitalize
} from '@mui/material';

//Material Icon
import AddBoxIcon from '@mui/icons-material/AddBox';
import SaveIcon from '@mui/icons-material/Save';

//Share
import Loading from '@/components/shared/Loadin';

//Alert
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

//Api
import { consolesApi } from '@/server';

//Interfaces
import { INewModel } from '@/interfaces/consoles';

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  getListModels: Function;
}

const NewModels = (props: Props) => {
  const { open, setOpen, getListModels } = props;

  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<INewModel>({ model: '', rentalPrice: 0 });

  const handleClose = () => {
    setOpen(false);
    setFormData({ model: '', rentalPrice: 0 });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log(event.target.value);
    const value = event.target.value;
    const name = event.target.name;
    console.log('name', name);

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (formData.model === '') {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Nombre requerido',
        showConfirmButton: false,
        timer: 2500
      });

      return;
    }

    if (formData.rentalPrice <= 0) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Precio de renta requerido',
        showConfirmButton: false,
        timer: 2500
      });

      return;
    }

    setLoading(true);

    consolesApi
      .newModels(formData)
      .then((response) => {
        console.log('response', response);
        if (response.status === 'success') {
          setLoading(false);

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Nuevo modelo guardado correctamente.',
            showConfirmButton: false,
            timer: 2500
          });

          handleClose();
          getListModels();
          setFormData({ model: '', rentalPrice: 0 });
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
        // maxWidth={'lg'}
        fullWidth
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
            <AddBoxIcon fontSize="medium" />

            <Typography variant="subtitle2" textAlign={'center'} gutterBottom>
              Nuevo Modelo de consola
            </Typography>
          </Stack>
        </DialogTitle>

        <DialogContent>
          <Divider />

          <Grid container spacing={2} sx={{ mt: 2, py: 4 }}>
            {loading ? (
              <Grid container item xs={12} md={12} justifyContent={'center'}>
                <Grid item xs={12} md={7}>
                  <FormControl fullWidth>
                    <Skeleton variant="text" animation="wave">
                      <TextField id="filled-basic" label="Modelo" variant="outlined" size="small" onChange={handleChange} />
                    </Skeleton>
                  </FormControl>
                </Grid>
              </Grid>
            ) : (
              <Grid container item xs={12} md={12} spacing={2}>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <TextField id="filled-basic" label="Modelo" variant="outlined" size="small" name="model" onChange={handleChange} />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <TextField
                      id="filled-basic"
                      label="Precio de renta"
                      variant="outlined"
                      size="small"
                      name="rentalPrice"
                      onChange={handleChange}
                    />
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

export default NewModels;
