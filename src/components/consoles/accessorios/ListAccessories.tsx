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
import { INewAccessories, IAccessories } from '@/interfaces/consoles';

//Components
import NewAccesories from './NewAccessories';
import UpdateAccesories from './UpdateAccessories';

//utils
import { formatDate } from '@/services/utils';

//Alert
import Swal from 'sweetalert2';

const ListAccessories = () => {
  //***********************************************************USE STATE*****************************************************************
  const [rows, setRows] = useState<INewAccessories[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [openNewModal, setOpenNewModal] = useState<boolean>(false);
  const [id, setId] = useState<number>();
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);

  //***********************************************************USE EFFECT*****************************************************************
  useEffect(() => {
    getListAccessories();
  }, []);

  //***********************************************************FUNCTIONS*****************************************************************
  const getListAccessories = () => {
    setLoading(true);
    consolesApi.getAccessories().then((response) => {
      setRows(response.data);
    });

    setLoading(false);
  };

  const handleNewConsoleName = () => {
    setOpenNewModal(true);
  };

  const handleEditClick = (id: number) => {
    setId(id);
    setOpenUpdateModal(true);
  };

  const handleDeleteClick = (row: IAccessories) => {
    Swal.fire({
      title: '¿Esta seguro?',

      html: `
        Eliminar control: <b>${row.name}</b>,
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
        consolesApi.deleteByIdAccessories(Number(row.id)).then((response) => {
          setLoading(false);

          if (response.status === 'success') {
            getListAccessories();
            Swal.fire({
              title: '¡Eliminado!',
              text: 'Accesorio eliminado correctamente.',
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
    { field: 'name', headerName: 'Nombre', flex: 1, minWidth: 180 },
    { field: 'model', headerName: 'Modelo', flex: 1, minWidth: 180 },
    { field: 'serialNumber', headerName: 'Numero de serie', flex: 1, minWidth: 180 },
    { field: 'color', headerName: 'Color', flex: 1, minWidth: 180 },
    { field: 'rentalPrice', headerName: 'Precio de renta', flex: 1, minWidth: 180 },
    { field: 'characteristics', headerName: 'Caracteristicas', flex: 1, minWidth: 180 },
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
          Registrar Accesorio
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

      <NewAccesories open={openNewModal} setOpen={setOpenNewModal} getListAccessories={getListAccessories} />
      {id && <UpdateAccesories open={openUpdateModal} setOpen={setOpenUpdateModal} id={id} getListAccessories={getListAccessories} />}
    </div>
  );
};

export default ListAccessories;
