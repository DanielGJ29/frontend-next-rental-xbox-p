import * as React from 'react';

//Material Ui
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

//Material Icons
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';

//Alert
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

//Utils
import { formatCurrency } from '@/utils/utils';

//Api
import { rentApi } from '@/server';

//Share
import Loading from '../shared/Loadin';

const MySwal = withReactContent(Swal);

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  cart: any;
}

const Pay = (props: Props) => {
  const { open, setOpen, cart } = props;

  //***********************************************************USE STATE*****************************************************************

  const [pay, setPay] = React.useState('');
  const [change, setChange] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  //***********************************************************FUNCTIONS*****************************************************************

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickCharge = () => {
    const body = { clientId: cart.client.id, startDate: cart.startDate, endDate: cart.dataReturn, pay: Number(pay), change: change };
    setLoading(true);
    rentApi
      .rented(body)
      .then((response) => {
        setLoading(false);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Pago registrado correctamente',
          showConfirmButton: false,
          timer: 2500
        });
        handleClose();
        setPay('');
        setChange(0);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  return (
    <Dialog
      //fullWidth={true}
      maxWidth={'md'}
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      disableRestoreFocus
    >
      <DialogTitle id="alert-dialog-title" textAlign={'center'}>
        COBRAR
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Stack rowGap={4} px={2} pb={6}>
          <Typography variant="h3" textAlign="center" color="primary" fontWeight={'bold'} gutterBottom>
            {formatCurrency(cart.totales.total)}
          </Typography>

          <Stack flexDirection={'row'} justifyContent={'center'} columnGap={2}>
            <Box>
              <PointOfSaleIcon sx={{ fontSize: 70 }} />

              <Typography textAlign="center" gutterBottom>
                Efectivo
              </Typography>
            </Box>
            {/* <Box>
              <CreditCardIcon />
              <Typography gutterBottom>Tarjeta</Typography>
            </Box> */}
          </Stack>
          <Stack rowGap={2}>
            <Grid container flexDirection={'row'} justifyContent="center" alignItems="center" spacing={2}>
              <Grid item xs={3}>
                <Typography variant="body1" textAlign="right" color="action" fontWeight={'bold'} gutterBottom>
                  Pago cón:
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <OutlinedInput
                  sx={{ color: 'primary' }}
                  id="outlined-adornment-amount"
                  startAdornment={<InputAdornment position="start">$</InputAdornment>}
                  endAdornment={<InputAdornment position="end">MXN</InputAdornment>}
                  color="primary"
                  autoFocus
                  onChange={(e) => {
                    setPay(e.target.value);
                    if (Number(e.target.value) > 0) {
                      const pay = Number(e.target.value);
                      const total = cart.totales.total;

                      const change = pay < total ? 0 : pay - total;
                      setChange(change);
                    } else {
                      setChange(0);
                    }
                  }}
                />
              </Grid>
            </Grid>

            <Grid container flexDirection={'row'} justifyContent="center" alignItems="center" spacing={2}>
              <Grid item xs={3}>
                <Typography variant="body1" textAlign="right" color="ButtonText" fontWeight={'bold'} gutterBottom>
                  Su cambio:
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <InputBase
                  sx={{ px: 2, color: 'text.primary' }}
                  id="outlined-adornment-amount"
                  startAdornment={<InputAdornment position="start">$</InputAdornment>}
                  endAdornment={<InputAdornment position="end">MXN</InputAdornment>}
                  color="primary"
                  fullWidth
                  readOnly
                  value={change}
                />
              </Grid>
            </Grid>
          </Stack>
        </Stack>

        <Loading open={loading} />
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleClose} color="secondary" variant="contained" startIcon={<IndeterminateCheckBoxIcon />}>
          Cancelar
        </Button>
        <Button
          onClick={handleClickCharge}
          disabled={pay && pay > cart.totales.total ? false : true}
          color="primary"
          variant="contained"
          startIcon={<PointOfSaleIcon />}
          autoFocus
        >
          Cobrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Pay;
