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
import GroupAddIcon from '@mui/icons-material/GroupAdd';

//apis
import { clientAPI } from '@/server';

//Share
import CustomDataGrid from '@/components/shared/CustomDataGrid';
import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid';

//Interfaces
import { IClient } from '@/interfaces/clients';

//Components
import NewClient from './NewClient';

//utils
import { formatDate } from '@/services/utils';

//Alert
import Swal from 'sweetalert2';
import UpdateClient from './UpdateClient';

const ListClient = () => {
  //**********************************************************USE STATE***************************************************/

  const [rows, setRows] = useState<IClient[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [openNewModal, setOpenNewModal] = useState<boolean>(false);
  const [id, setId] = useState<number>();
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);

  //**********************************************************USE EFFECT***************************************************/

  useEffect(() => {
    getListClient();
  }, []);

  //**********************************************************FUNCTIONS HANDLE***************************************************/

  const handleNewConsoleName = () => {
    setOpenNewModal(true);
  };

  const getListClient = () => {
    clientAPI.getClients().then((response) => {
      setRows(response.data);
    });
  };

  const handleEditClick = (id: number) => {
    setId(id);
    setOpenUpdateModal(true);
  };

  const handleDeleteClick = (row: IClient) => {
    Swal.fire({
      title: '¿Esta seguro?',

      html: `
        Se eliminara: <b>${row.name}</b>,
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
        clientAPI.deleteByIdClient(Number(row.id)).then((response) => {
          setLoading(false);
          if (response.status === 'success') {
            getListClient();
            Swal.fire({
              title: '¡Eliminado!',
              text: 'Cliente eliminado correctamente.',
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
    { field: 'id', headerName: 'ID', flex: 1, maxWidth: 50 },
    {
      field: 'name',
      headerName: 'Nombre',
      flex: 1,
      minWidth: 140,
      valueGetter: (value: any) => {
        return value.charAt(0).toUpperCase() + value.slice(1);
      }
    },
    {
      field: 'lastName',
      headerName: 'A Paterno',
      flex: 1,
      minWidth: 100,
      valueGetter: (value: any) => {
        return value.charAt(0).toUpperCase() + value.slice(1);
      }
    },
    {
      field: 'motherLastName',
      headerName: 'A Materno',
      flex: 1,
      minWidth: 100,
      valueGetter: (value: any) => {
        return value.charAt(0).toUpperCase() + value.slice(1);
      }
    },
    { field: 'email', headerName: 'email', flex: 1, minWidth: 150 },
    { field: 'phone', headerName: 'Telefono', flex: 1, minWidth: 100 },
    {
      field: 'street',
      headerName: 'Dirección',
      flex: 1,
      minWidth: 300,
      valueGetter: (value, row) => {
        return `Calle ${row.street || ''}, No.${row.numberOut || ''},  ${row.colony || ''},  ${row.city || ''}, ${row.municipality || ''}`;
      }
    },
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
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" startIcon={<GroupAddIcon />} onClick={handleNewConsoleName}>
          Registrar cliente
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

      <NewClient open={openNewModal} setOpen={setOpenNewModal} getListClient={getListClient} />
      {id && <UpdateClient open={openUpdateModal} setOpen={setOpenUpdateModal} id={id} getListClient={getListClient} />}
    </div>
  );
};

export default ListClient;
