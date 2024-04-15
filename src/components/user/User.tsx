'use client';

import { useEffect, useState } from 'react';

//Material UI
import { DataGrid, GridColDef, GridRowsProp, GridToolbar } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

//Shasre
import CustomDataGrid from '../shared/CustomDataGrid';

interface IUsers {
  avatarUrl: string;
  createdAt: string;
  email: string;
  id: number;
  lastName: string;
  motherLastName: string;
  name: string;
  role: string;
  status: string;
  updatedAt: string;
  userName: string;
}

export default function User() {
  const [rows, setRows] = useState<IUsers[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 1, maxWidth: 100 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'lastName', headerName: 'A Paterno', flex: 1, maxWidth: 150 },
    { field: 'motherLastName', headerName: 'A Materno', flex: 1, maxWidth: 150 },
    { field: 'email', headerName: 'Correo', flex: 1, maxWidth: 450 },
    { field: 'role', headerName: 'Rol', flex: 1, maxWidth: 100 },
    { field: 'createdAt', headerName: 'Fecha de registro', flex: 1, maxWidth: 100 },
    { field: 'status', headerName: 'Estatus', flex: 1, maxWidth: 100 }
  ];

  useEffect(() => {
    const getusers = async () => {
      setLoading(true);
      // const requestOptions: any = {
      //   method: 'GET',
      //   redirect: 'follow',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization:
      //       'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImlhdCI6MTcxMTc1NjM1NSwiZXhwIjoxNzExNzU5OTU1fQ.TDwgiG1vORIFe8F7DIyLTSimEC2isbIIFigp8FcY-Dg'
      //   }
      // };
      // const response = await fetch(`${process.env.NEXT_APP_API_URL}/users`, requestOptions);
      // const result = await response.json();
      // setLoading(false);
      // console.log('result', result);
      // setRows(result?.data);
    };

    getusers();
  }, []);
  return (
    <Paper sx={{ px: 2, py: 4 }}>
      <CustomDataGrid name={'user'} columns={columns} rows={rows} loading={loading} />
    </Paper>
  );
}
