'use client';
import React, { useEffect, useState } from 'react';

//Material UI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

//Material Icon
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';

//apis
import { consolesApi } from '@/server';

//Share
import CustomDataGrid from '@/components/shared/CustomDataGrid';
import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid';

//Interfaces
import { IGamepad } from '@/interfaces/consoles';

//Components
import NewGamePad from './NewGamePad';
import UpdateGamePad from './UpdateGamePad';

//utils
import { formatDate } from '@/services/utils';

//Alert
import Swal from 'sweetalert2';

const ListControles = () => {
  //***********************************************************USE STATE*****************************************************************
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [openNewModal, setOpenNewModal] = useState<boolean>(false);
  const [id, setId] = useState<number>();
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);

  //***********************************************************USE EFFECT*****************************************************************
  useEffect(() => {
    getListGamepads();
  }, []);

  //***********************************************************FUNCTIONS*****************************************************************
  const getListGamepads = () => {
    setLoading(true);
    consolesApi.getGamepads().then((response) => {
      setLoading(false);
      setRows(response.data);
    });
  };

  const handleNewConsoleName = () => {
    setOpenNewModal(true);
  };

  const handleEditClick = (id: number) => {
    setId(id);
    setOpenUpdateModal(true);
  };

  const handleDeleteClick = (row: IGamepad) => {
    Swal.fire({
      title: '¿Esta seguro?',

      html: `
        Eliminar control: <b>${row.videoGameName.name}</b>,
        con ID: <b>${row.id}</b>,
        
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
        consolesApi.deleteByIdGamepad(Number(row.id)).then((response) => {
          setLoading(false);

          if (response.status === 'success') {
            getListGamepads();
            Swal.fire({
              title: '¡Eliminado!',
              text: 'Control eliminado correctamente.',
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

  //***********************************************************COLUMNS*****************************************************************
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 1, maxWidth: 100 },
    {
      field: 'available',
      headerName: 'Disponibilidad',
      flex: 1,
      minWidth: 110,
      valueGetter: (value, row) => {
        if (!value) {
          return 'Rentado';
        }

        return 'Disponible';
      }
    },
    { field: 'videoGameName', headerName: 'Consola', flex: 1, minWidth: 180, valueGetter: (params: any) => params.name },
    {
      field: 'serialNumber',
      headerName: 'Numero de serie',
      flex: 1,
      minWidth: 180,
      renderCell: (params) => (
        <Typography textTransform={'uppercase'} variant="inherit" gutterBottom>
          {params.value}
        </Typography>
      )
    },
    { field: 'color', headerName: 'Color', flex: 1, minWidth: 180 },
    { field: 'connectionType', headerName: 'Tipo de conexión', flex: 1, minWidth: 180 },
    { field: 'status', headerName: 'Estatus', flex: 1, minWidth: 100 },
    {
      field: 'createdAt',
      headerName: 'Fecha de creación',
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
      field: 'updatedAt',
      headerName: 'Fecha de actualización',
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
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      flex: 1,
      minWidth: 100,
      maxWidth: 100,
      cellClassName: 'actions',
      getActions: (params) => {
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

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" startIcon={<AddBoxIcon />} onClick={handleNewConsoleName}>
          Registrar Control
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

      <NewGamePad open={openNewModal} setOpen={setOpenNewModal} getListGamepads={getListGamepads} />
      {id && <UpdateGamePad open={openUpdateModal} setOpen={setOpenUpdateModal} id={id} getListGamepads={getListGamepads} />}
    </div>
  );
};

export default ListControles;
