import React, { ChangeEvent, ChangeEventHandler, Fragment, useEffect, useState } from 'react';

//Material UI
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

//Material Icon
import SaveIcon from '@mui/icons-material/Save';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

//Share
import Loading from '@/components/shared/Loadin';

//Alert
import Swal from 'sweetalert2';

//Api
import { consolesApi } from '@/server';

//Interfaces
import { INewGamepad, INameConsoles } from '@/interfaces/consoles';

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  getListGamepads: Function;
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

const UpdateGamePad = (props: Props) => {
  const { open, setOpen, getListGamepads, id } = props;
  //***********************************************************USE STATE*****************************************************************

  const [loading, setLoading] = useState<boolean>(false);
  const [names, setNames] = useState<INameConsoles[]>([]);
  const [formData, setFormData] = useState<INewGamepad>({
    videoGameNameId: '',
    color: '',
    serialNumber: '',
    connectionType: ''
  });

  //***********************************************************USE EFFECT*****************************************************************
  useEffect(() => {
    if (id) {
      setLoading(true);
      consolesApi.getByIdGamepads(id).then((response) => {
        setFormData(response.data);
        setLoading(false);
      });
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      consolesApi.getAllConsolesNames().then((response) => {
        setNames(response.data);
      });
    }
  }, []);

  //***********************************************************FUNCTIONS*****************************************************************
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    const name = event.target.name;
    setFormData({ ...formData, [name]: value });
  };

  const handleChangeSelect = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    const name = event.target.name;
    setFormData({ ...formData, [name]: value as string });
  };

  const handleSubmit = () => {
    setLoading(true);

    consolesApi
      .updateGamepad(id, formData)
      .then((response) => {
        if (response.status === 'success') {
          setLoading(false);

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Control actualizado correctamente.',
            showConfirmButton: false,
            timer: 2500
          });

          handleClose();
          getListGamepads();
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
            <SportsEsportsIcon fontSize="medium" />

            <Typography variant="subtitle2" textAlign={'center'} gutterBottom>
              Editar control
            </Typography>
          </Stack>
        </DialogTitle>

        <DialogContent>
          <Divider />

          <Grid container spacing={2} sx={{ mt: 0, py: 4 }}>
            {loading ? (
              <Grid container item xs={12} md={12} spacing={2}>
                <Grid item xs={12} md={12}>
                  <FormControl fullWidth variant="standard">
                    <Skeleton animation="wave">
                      <Typography variant="caption" color={'GrayText'} gutterBottom>
                        Control de:
                      </Typography>
                    </Skeleton>
                    <Skeleton animation="wave">
                      <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        size="small"
                        value={formData.videoGameNameId}
                        onChange={handleChangeSelect}
                        input={<OutlinedInput label="Name" />}
                        defaultValue={formData.videoGameNameId}
                        name="videoGameNameId"
                      >
                        {names.map((name) => (
                          <MenuItem
                            key={name.id}
                            value={name.id}
                            //style={getStyles(name, personName, theme)}
                          >
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
                      <InputLabel shrink htmlFor="bootstrap-input">
                        Numero de serie
                      </InputLabel>
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
                  <FormControl fullWidth variant="outlined">
                    <Skeleton animation="wave">
                      <Typography variant="caption" color={'GrayText'} gutterBottom>
                        Tipo de conexión:
                      </Typography>
                    </Skeleton>
                    <Skeleton animation="wave">
                      <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        size="small"
                        value={formData?.connectionType}
                        onChange={handleChangeSelect}
                        input={<OutlinedInput label="Name" />}
                        name="connectionType"
                      >
                        <MenuItem value="alambrico">{'Alambrico'}</MenuItem>
                        <MenuItem value="inalambrico">{'Inalambrico'}</MenuItem>
                      </Select>
                    </Skeleton>
                  </FormControl>
                </Grid>
              </Grid>
            ) : (
              <Grid container item xs={12} md={12} spacing={2}>
                <Grid item xs={12} md={12}>
                  <FormControl fullWidth variant="standard">
                    <Typography variant="caption" color={'GrayText'} gutterBottom>
                      Control de:
                    </Typography>
                    <Select
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      size="small"
                      value={formData?.videoGameNameId}
                      onChange={handleChangeSelect}
                      input={<OutlinedInput label="Name" />}
                      name="videoGameNameId"
                    >
                      {names.map((name) => (
                        <MenuItem
                          key={name.id}
                          value={name.id}
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
                    <InputLabel shrink htmlFor="bootstrap-input">
                      Color
                    </InputLabel>
                    <BootstrapInput defaultValue={formData?.color} id="bootstrap-input" name="color" onChange={handleChange} />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={12}>
                  <FormControl fullWidth variant="standard">
                    <InputLabel shrink htmlFor="bootstrap-input">
                      Numero de serie
                    </InputLabel>
                    <BootstrapInput
                      defaultValue={formData?.serialNumber}
                      id="bootstrap-input"
                      name="serialNumber"
                      onChange={handleChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={12}>
                  <FormControl fullWidth variant="outlined">
                    <Typography variant="caption" color={'GrayText'} gutterBottom>
                      Tipo de conexión:
                    </Typography>
                    <Select
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      size="small"
                      value={formData?.connectionType}
                      onChange={handleChangeSelect}
                      input={<OutlinedInput label="Name" />}
                      name="connectionType"
                    >
                      <MenuItem value="alambrico">{'Alambrico'}</MenuItem>
                      <MenuItem value="inalambrico">{'Inalambrico'}</MenuItem>
                    </Select>
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

export default UpdateGamePad;
