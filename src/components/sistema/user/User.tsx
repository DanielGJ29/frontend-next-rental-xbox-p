'use client';

import { useEffect, useState } from 'react';

//Material UI
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { GridColDef, GridActionsCellItem, GridRenderCellParams } from '@mui/x-data-grid';

//Material icons
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';

//Share
import CustomDataGrid from '../../shared/CustomDataGrid';

//api
import { sistemaAPI } from '@/server';

//Component
import { NewUser } from './NewUser';
import { UpdateUser } from './UpdateUser';

//Interfaces
import { IUser } from '@/interfaces/sistema';

//Utils
import { formatDate } from '@/services/utils';

//Alert
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Typography } from '@mui/material';

const MySwal = withReactContent(Swal);

export default function User() {
  const [rows, setRows] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [openNewModal, setOpenNewModal] = useState<boolean>(false);
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  const [id, setId] = useState<number>();
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

  const handleEditClick = (id: number) => {
    setId(id);
    setOpenUpdateModal(true);
  };

  const handleDeleteClick = (user: any) => {
    Swal.fire({
      title: '¿Estas seguro?',

      html: `
      Esta eliminando el usuario: <b>${user.name}</b>,
      con ID: <b>${user.id}</b>,
      
    `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, ¡Eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        sistemaAPI.deleteUserById(user.id).then((response) => {
          setLoading(false);

          if (response.status === 'success') {
            getusers();
            Swal.fire({
              title: '¡Eliminado!',
              text: 'Usuario eliminado correctamente.',
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

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 1, maxWidth: 100 },
    { field: 'name', headerName: 'Nombre', flex: 1, minWidth: 180 },
    { field: 'lastName', headerName: 'A Paterno', flex: 1, minWidth: 150 },
    { field: 'motherLastName', headerName: 'A Materno', flex: 1, minWidth: 150 },
    {
      field: 'email',
      headerName: 'Correo',
      flex: 1,
      minWidth: 250,
      renderCell: (params) => (
        <Typography textTransform={'lowercase'} variant="inherit" gutterBottom>
          {params.value}
        </Typography>
      )
    },
    {
      field: 'role',
      headerName: 'Rol',
      flex: 1,
      minWidth: 100,
      maxWidth: 100,
      renderCell: (params: GridRenderCellParams) => {
        if (params.value === 'admin') {
          return 'Administrador';
        }

        if (params.value === 'guest') {
          return 'Invitado';
        }
      }
    },
    {
      field: 'createdAt',
      headerName: 'Creado',
      flex: 1,
      minWidth: 100,
      maxWidth: 150,
      valueFormatter: (value) => {
        if (!value) {
          return value;
        }
        return formatDate(value);
      }
    },
    {
      field: 'status',
      headerName: 'Estatus',
      flex: 1,
      minWidth: 100,
      renderCell: (params) =>
        params.value === 'active' ? (
          <Typography variant="inherit" gutterBottom>
            activo
          </Typography>
        ) : (
          <Typography variant="inherit" gutterBottom>
            bloqueado
          </Typography>
        )
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      flex: 1,
      minWidth: 100,
      maxWidth: 100,
      cellClassName: 'actions',
      getActions: (params) => {
        const isInEditMode = false;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key={Math.random()}
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main'
              }}
              //onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              key={Math.random()}
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              //onClick={handleCancelClick(id)}
              color="inherit"
            />
          ];
        }

        return [
          <GridActionsCellItem
            key={Math.random()}
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => handleEditClick(params.id as number)}
            color="inherit"
          />,
          <GridActionsCellItem
            key={Math.random()}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleDeleteClick(params.row)}
            color="inherit"
          />
        ];
      }
    }
  ];

  useEffect(() => {
    getusers();
  }, []);

  const getusers = async () => {
    setLoading(true);
    sistemaAPI
      .getUserList()
      .then((response) => {
        setLoading(false);
        setRows(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleNewClient = () => {
    setOpenNewModal(true);
  };
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" startIcon={<PersonAddAlt1Icon />} onClick={handleNewClient}>
          Nuevo usuario
        </Button>
      </Box>

      <Paper sx={{ px: 3, py: 2, mt: 2 }}>
        <CustomDataGrid
          name={'user'}
          columns={columns}
          rows={rows}
          loading={loading}
          initialState={{
            sorting: {
              sortModel: [{ field: 'id', sort: 'desc' }]
            }
          }}
        />
      </Paper>

      <NewUser open={openNewModal} setOpen={setOpenNewModal} getusers={getusers} />
      {id && <UpdateUser open={openUpdateModal} setOpen={setOpenUpdateModal} id={id} getusers={getusers} />}
    </>
  );
}
