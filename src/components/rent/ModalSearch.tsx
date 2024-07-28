import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CustomDataGrid from '../shared/CustomDataGrid';
import { GridColDef, GridRowParams, GridToolbarContainer, GridRowSelectionModel } from '@mui/x-data-grid';

//Material Ui
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';

//Material Icons
import SearchIcon from '@mui/icons-material/Search';
import KeyboardIcon from '@mui/icons-material/Keyboard';

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  setValueSearch: React.Dispatch<React.SetStateAction<string>>;
  valueSearch: string;
  rowsGrid: [];
  flag: string;
  loading: boolean;
  addToCartMultiple: Function;
}
const ModalSearch = (props: Props) => {
  const { open, setOpen, setValueSearch, valueSearch, rowsGrid, flag, loading, addToCartMultiple } = props;

  //***********************************************************USE STATE*****************************************************************

  const [rows, setRows] = React.useState(rowsGrid);
  const [selectedRows, setSelectedRows] = React.useState<GridRowSelectionModel>([]);

  //***********************************************************USE EFFECT*****************************************************************
  React.useEffect(() => {
    if (rowsGrid) {
      setRows(rowsGrid);
    }
  }, [rowsGrid]);

  //***********************************************************FUNCTIONS*****************************************************************

  const handleClose = () => {
    setOpen(false);
    setRows([]);
    setValueSearch('');
    setSelectedRows([]);
  };

  const handleClickAddRows = () => {
    addToCartMultiple(selectedRows, flag);
    handleClose();
  };

  //***********************************************************COLUMNS*****************************************************************

  const columnsClient: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 1, maxWidth: 100 },
    { field: 'name', headerName: 'Nombre', flex: 1, minWidth: 150 },
    { field: 'lastName', headerName: 'A. Paterno', flex: 1, minWidth: 110 },
    { field: 'motherLastName', headerName: 'A. Materno', flex: 1, minWidth: 110 },
    { field: 'email', headerName: 'Correo Electronico', flex: 1, minWidth: 200 },
    { field: 'phone', headerName: 'Telefono', flex: 1, minWidth: 130 },
    {
      field: 'street',
      headerName: 'Dirección',
      flex: 1,
      minWidth: 450,
      valueGetter: (value, row) => {
        return `Calle ${row.street || ''},  No. ${row.numberOut || ''}, ${row.numberOut || ''}, ${row.colony || ''}, ${
          row.municipality || ''
        }, ${row.city || ''}, ${row.state || ''} `;
      }
    }
  ];

  const columnsConsole: GridColDef[] = [
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
    {
      field: 'name',
      headerName: 'Nombre',
      flex: 1,
      minWidth: 150,
      valueGetter: (value, row) => {
        return `${row.videoGameName.name || ''} `;
      }
    },
    {
      field: 'model',
      headerName: 'Modelo',
      flex: 1,
      minWidth: 140,
      valueGetter: (value, row) => {
        return `${row.videoGameModel.model || ''} `;
      }
    },
    { field: 'serialNumber', headerName: 'Numero Serie', flex: 1, minWidth: 180 },
    { field: 'color', headerName: 'Color', flex: 1, minWidth: 130 },
    { field: 'hardHDD', headerName: 'Disco Duro', flex: 1, minWidth: 130 },
    { field: 'rentalPrice', headerName: 'Precio', flex: 1, minWidth: 100 }
  ];

  const columnsGamepad: GridColDef[] = [
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
    { field: 'serialNumber', headerName: 'Numero de serie', flex: 1, minWidth: 180 },
    { field: 'color', headerName: 'Color', flex: 1, minWidth: 130 },
    { field: 'connectionType', headerName: 'Tipo de conexión', flex: 1, minWidth: 130 },
    { field: 'rentalPrice', headerName: 'Precio', flex: 1, minWidth: 100 }
  ];

  const columnsAccessory: GridColDef[] = [
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
    { field: 'name', headerName: 'Nombre', flex: 1, minWidth: 180 },
    { field: 'model', headerName: 'Modelo', flex: 1, minWidth: 150 },
    { field: 'serialNumber', headerName: 'Numero de serie', flex: 1, minWidth: 180 },
    { field: 'color', headerName: 'Color', flex: 1, minWidth: 130 },
    { field: 'characteristics', headerName: 'Caracteristicas', flex: 1, minWidth: 280 },
    { field: 'rentalPrice', headerName: 'Precio', flex: 1, minWidth: 100 }
  ];

  return (
    <React.Fragment>
      <Dialog
        //fullWidth={true}
        maxWidth={'lg'}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        disableRestoreFocus
      >
        <DialogTitle id="alert-dialog-title">
          <Paper sx={{ p: '4px 20px', display: 'flex', alignItems: 'center', width: '80%', mx: 'auto' }}>
            <Box sx={{ p: '10px', display: 'flex' }} aria-label="menu">
              <KeyboardIcon color="primary" />
            </Box>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder={'Buscar'}
              autoFocus
              // inputProps={{ 'aria-label': 'search google maps' }}
              //   value={value}
              // disabled={disabled}
              onChange={(e) => setValueSearch(e.target.value)}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <Box sx={{ p: '10px', display: 'flex' }} aria-label="search">
              <SearchIcon color="action" />
            </Box>
          </Paper>
        </DialogTitle>
        <DialogContent sx={{ height: 400, md: { width: 1200 } }}>
          <CustomDataGrid
            name={'aa'}
            columns={
              flag === 'client'
                ? columnsClient
                : flag === 'console'
                ? columnsConsole
                : flag === 'gamepad'
                ? columnsGamepad
                : columnsAccessory
            }
            rows={rows}
            loading={loading}
            slots={{ toolbar: () => <GridToolbarContainer sx={{ mb: 2 }}></GridToolbarContainer> }}
            hideFooterPagination
            checkboxSelection
            disableMultipleRowSelection={flag === 'client' ? true : false}
            isRowSelectable={(params: GridRowParams) => (flag === 'client' ? true : params.row.available)}
            onRowSelectionModelChange={(newRowSelectionModel) => {
              //setRowSelectionModel(newRowSelectionModel);
              if (flag === 'client') {
                addToCartMultiple(newRowSelectionModel, flag);
                handleClose();
              } else {
                setSelectedRows(newRowSelectionModel);
              }
            }}
          />
        </DialogContent>
        {flag !== 'client' && (
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={handleClose} color="secondary" variant="contained" startIcon={<IndeterminateCheckBoxIcon />}>
              Cancelar
            </Button>
            <Button onClick={handleClickAddRows} color="primary" variant="contained" startIcon={<LibraryAddCheckIcon />} autoFocus>
              Agregar
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </React.Fragment>
  );
};

export default ModalSearch;
