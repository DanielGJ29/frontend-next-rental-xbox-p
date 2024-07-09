'use client';
import React, { useEffect, useState } from 'react';

//Material UI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

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
import { IConsole } from '@/interfaces/consoles';

//Components
import NewConsole from './NewConsole';
import UpdateConsole from './UpdateConsole';

//utils
import { formatDate } from '@/services/utils';

//Alert
import Swal from 'sweetalert2';

const ListConsoles = () => {
  //***********************************************************USE STATE*****************************************************************
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [openNewModal, setOpenNewModal] = useState<boolean>(false);
  const [id, setId] = useState<number>();
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);

  //***********************************************************USE EFFECT*****************************************************************
  useEffect(() => {
    getListConsoles();
  }, []);

  //***********************************************************FUNCTIONS*****************************************************************
  const handleNewConsoleName = () => {
    setOpenNewModal(true);
  };

  const getListConsoles = () => {
    consolesApi.getAllConsoles().then((response) => {
      setRows(response.data);
      console.log('consoles', response.data);
    });
  };

  const handleEditClick = (id: number) => {
    console.log('EDIT', id);
    setId(id);
    setOpenUpdateModal(true);
  };

  const handleDeleteClick = (row: IConsole) => {
    console.log('DELETE ROW', row);

    Swal.fire({
      title: '¿Esta seguro?',

      html: `
        Se eliminara: <b>${row.videoGameName.name}</b>,
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
        consolesApi.deleteConsole(Number(row.id)).then((response) => {
          setLoading(false);
          console.log(response);
          if (response.status === 'success') {
            getListConsoles();
            Swal.fire({
              title: '¡Eliminado!',
              text: 'Consola eliminada correctamente.',
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
    { field: 'videoGameName', headerName: 'Nombre', flex: 1, minWidth: 180, valueGetter: (params: any) => params.name },
    { field: 'videoGameModel', headerName: 'Modelo', flex: 1, minWidth: 180, valueGetter: (params: any) => params.model },
    { field: 'color', headerName: 'Color', flex: 1, minWidth: 100 },
    { field: 'serialNumber', headerName: 'Numero de serie', flex: 1, minWidth: 150 },
    { field: 'hardHDD', headerName: 'Disco duro', flex: 1, minWidth: 100 },
    {
      field: 'status',
      headerName: 'Estatus',
      flex: 1,
      minWidth: 100,
      valueGetter: (params: any) => {
        if (params === 'active') {
          return 'activo';
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
      field: 'updatedAt',
      headerName: 'Modificado',
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
      {' '}
      <div>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" startIcon={<AddBoxIcon />} onClick={handleNewConsoleName}>
            Nuevo nombre
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

        <NewConsole open={openNewModal} setOpen={setOpenNewModal} getListConsoles={getListConsoles} />
        {id && <UpdateConsole open={openUpdateModal} setOpen={setOpenUpdateModal} id={id} getListConsoles={getListConsoles} />}
      </div>
    </div>
  );
};

export default ListConsoles;
