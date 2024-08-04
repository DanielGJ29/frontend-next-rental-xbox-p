import { useState, Fragment, ChangeEvent, useEffect, use, ChangeEventHandler } from 'react';

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
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { useTheme } from '@mui/material/styles';

//Material Icon
import SaveIcon from '@mui/icons-material/Save';
import PhotoIcon from '@mui/icons-material/Photo';
import { CameraOutlined } from '@mui/icons-material';
import LocalSeeIcon from '@mui/icons-material/LocalSee';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import EditIcon from '@mui/icons-material/Edit';

import thumb from '@/assets/img/logocyberplay.png';
import { GridRowId } from '@mui/x-data-grid';

//api
import { sistemaAPI } from '@/server';

//INTERFACES
import { INewUser, IUser } from '@/interfaces/sistema';

//Alert
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Loading from '../../shared/Loadin';

const MySwal = withReactContent(Swal);

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  getusers: Function;
  id: number;
}

export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark'
}

interface IRoles {
  id: number;
  role: string;
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
    },
    '&:hover': {
      //boxShadow: `${alpha(theme.palette.primary.light, 0.25)} 0 0 0 0.1rem`,
      borderColor: theme.palette.primary.light
    }
  }
}));

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
});

export const UpdateUser = (props: Props) => {
  const theme = useTheme();
  const { open, setOpen, id, getusers } = props;

  //**********************************************************USE STATE***************************************************/
  const [formData, setFormData] = useState<IUser>({
    id: 0,
    name: '',
    lastName: '',
    motherLastName: '',
    email: '',
    userName: '',
    avatarUrl: '',
    role: '',
    status: '',
    createdAt: '',
    updatedAt: ''
  });
  const [loading, setLoading] = useState<boolean>(false);

  const [selectedImage, setSelectedImage] = useState<File | undefined>(undefined);
  const [avatar, setAvatar] = useState<string | undefined>();
  const [roles, setRoles] = useState<IRoles[]>([]);

  //**********************************************************USE EFFECT***************************************************/
  useEffect(() => {
    setLoading(true);
    sistemaAPI.getUserById(id).then((response) => {
      setLoading(false);
      setFormData({
        id: response.data.id,
        name: response.data.name,
        lastName: response.data.lastName,
        motherLastName: response.data.motherLastName,
        email: response.data.email,
        userName: response.data.userName,
        avatarUrl: response.data.avatarUrl,
        role: response.data.role,
        status: response.data.status,
        createdAt: response.data.createdAt,
        updatedAt: response.data.updatedAt
      });
      setAvatar(response.data.avatarUrl);
    });
  }, [id]);

  useEffect(() => {
    sistemaAPI.getAllRoles().then((response) => {
      setRoles(response.data);
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
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = event.target.name;
    const value = event.target.value as string;
    setFormData({ ...formData, [name]: value });
  };

  const handleChangeRole = (event: any) => {
    const name = event.target.name;
    setFormData({ ...formData, [name]: event.target.value });
  };

  const handleChangeFile = (file: File | undefined) => {
    setSelectedImage(file);
    if (file) {
      setFormData({ ...formData, ['avatarUrl']: file });
    }
  };

  const handleSubmit = () => {
    const newFormData = new FormData();
    newFormData.append('name', formData.name);
    newFormData.append('lastName', formData.lastName);
    newFormData.append('motherLastName', formData.motherLastName);
    newFormData.append('email', formData.email);
    newFormData.append('avatarUrl', formData.avatarUrl);
    newFormData.append('role', formData.role);
    newFormData.append('userName', formData.userName);

    setLoading(true);
    sistemaAPI.editUser(id, newFormData).then((response) => {
      console.log('newFormData', newFormData);
      setLoading(false);
      getusers();

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Usuario editado correctamente',
        showConfirmButton: false,
        timer: 2500
      });
      handleClose();
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
            <EditIcon fontSize="medium" />

            <Typography variant="subtitle2" textAlign={'center'} gutterBottom>
              Editar Usuario
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
                    Avatar
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
                    <InputLabel shrink htmlFor="bootstrap-input">
                      Nombre
                    </InputLabel>
                    <BootstrapInput defaultValue={formData?.name} id="bootstrap-input" name="name" onChange={handleChange} />
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={12}>
                  <FormControl fullWidth variant="standard">
                    <InputLabel shrink htmlFor="bootstrap-input">
                      Apellido Paterno
                    </InputLabel>

                    <BootstrapInput defaultValue={formData?.lastName} id="bootstrap-input" name="lastName" onChange={handleChange} />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={12}>
                  <FormControl fullWidth variant="standard">
                    <InputLabel shrink htmlFor="bootstrap-input">
                      Apellido Materno
                    </InputLabel>

                    <BootstrapInput
                      defaultValue={formData?.motherLastName}
                      id="bootstrap-input"
                      name="motherLastName"
                      onChange={handleChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={12}>
                  <FormControl fullWidth variant="standard">
                    {/* <InputLabel shrink htmlFor="bootstrap-input">
                      Correo Electronico
                    </InputLabel>
                    <BootstrapInput
                      defaultValue={formData?.email}
                      sx={{ textTransform: 'lowercase' }}
                      name="email"
                      onChange={handleChange}
                    /> */}
                    <Typography variant="caption" color={'GrayText'} gutterBottom>
                      Correo Electronico
                    </Typography>
                    <TextField
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderColor: theme.palette.primary.light,
                          '&:hover': {
                            //border: `5px solid`,
                            borderColor: theme.palette.primary.light
                          }
                        },
                        // '& .MuiInputBase-root': {
                        //   //borderColor: theme.palette.primary.light,
                        //   '&:hover': {
                        //     border: `5px solid`,
                        //     borderColor: theme.palette.primary.light
                        //   }
                        // },
                        '& .MuiInputBase-input': {
                          // borderRadius: 2,
                          // border: '1px solid',
                          // border: `5px solid`
                          // borderColor: theme.palette.primary.light
                          '&:hover': {
                            //border: `5px solid`,
                            borderColor: theme.palette.primary.light
                          }
                        }
                        // '& .MuiOutlinedInput-root': {
                        //   borderColor: theme.palette.primary.light,
                        //   '&:hover': {
                        //     //boxShadow: `${alpha(theme.palette.primary.light, 0.25)} 0 0 0 0.1rem`,
                        //     borderColor: theme.palette.primary.light
                        //   }
                        // }
                        //border: 'none',
                        // '& .MuiOutlinedInput-input': {
                        //   borderColor: theme.palette.primary.light,
                        //   '&:hover': {
                        //     //boxShadow: `${alpha(theme.palette.primary.light, 0.25)} 0 0 0 0.1rem`,
                        //     // borderColor: theme.palette.primary.light,
                        //     borderColor: 'green'
                        //   }
                        // }
                        // '& .MuiOutlinedInput-notchedOutline': {
                        //   border: `5px solid green`
                        // }
                      }}
                      size="small"
                      name="email"
                      id="outlined-basic"
                      defaultValue={formData?.email}
                      variant="outlined"
                      onChange={handleChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={12}>
                  <FormControl fullWidth variant="standard">
                    <InputLabel shrink htmlFor="bootstrap-input">
                      Nombre de Usuario
                    </InputLabel>
                    <BootstrapInput defaultValue={formData?.userName} id="bootstrap-input" name="userName" onChange={handleChange} />
                  </FormControl>
                </Grid>

                {/* <Grid item xs={12} md={12}>
                    <FormControl fullWidth variant="standard">
                      <InputLabel shrink htmlFor="bootstrap-input">
                        Contraseña
                      </InputLabel>
                      <BootstrapInput defaultValue="" id="bootstrap-input" name="password" onChange={handleChange} />
                    </FormControl>
                  </Grid> */}

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth variant="standard">
                    <Typography variant="caption" color={'GrayText'} gutterBottom>
                      Rol
                    </Typography>
                    <Select
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      size="small"
                      // multiple
                      value={formData?.role}
                      onChange={handleChangeRole}
                      input={<OutlinedInput label="Name" />}
                      name="role"
                      //MenuProps={MenuProps}
                    >
                      {roles.map((role) => (
                        <MenuItem
                          key={role?.id}
                          value={role?.role}
                          //style={getStyles(name, personName, theme)}
                        >
                          {role.role === 'admin' ? 'Administrador' : role.role === 'guest' ? 'Invitado' : ''}
                        </MenuItem>
                      ))}
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
                Guardar Cambios
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
      <Loading open={loading} />
    </Fragment>
  );
};
