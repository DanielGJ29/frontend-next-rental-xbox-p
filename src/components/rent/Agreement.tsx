import * as React from 'react';

//Material Ui
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

//Material Icons
import StartIcon from '@mui/icons-material/Start';

//API
import { formatCurrency } from '@/utils/utils';
import { formatISO } from 'date-fns';

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  setOpenPay: React.Dispatch<React.SetStateAction<boolean>>;
  cart: any;
}

const Agreement = (props: Props) => {
  const { open, setOpen, setOpenPay, cart } = props;

  //***********************************************************USE STATE*****************************************************************

  const [rows, setRows] = React.useState(cart.products);
  const [checked, setChecked] = React.useState(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  //***********************************************************USE EFFECT*****************************************************************

  //***********************************************************FUNCTIONS*****************************************************************

  const handleClose = () => {
    setOpen(false);
    setChecked(false);
  };

  const handleClickContinue = () => {
    setOpen(false);
    setOpenPay(true);
  };

  const handleChange = (event: React.SyntheticEvent<Element, Event>, checked: boolean) => {
    setChecked(checked);
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
        CONTRATO DE ACUERDO.
      </DialogTitle>

      {loading ? (
        <DialogContent>
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text">
            <Typography sx={{ mt: 2, fontWeight: 'bold' }} gutterBottom variant="body1">
              DECLARACIONES:
            </Typography>
          </Skeleton>

          <List sx={{ listStyleType: 'none', pl: 2 }}>
            <ListItem disablePadding sx={{ display: 'list-item', mb: 2 }}>
              <Skeleton variant="text">
                <ListItemText
                  primaryTypographyProps={{
                    //fontSize: 20,
                    fontWeight: 'medium',
                    letterSpacing: 0
                  }}
                  primary="Declara “LA ARRENDADORA” lo siguiente:"
                />
              </Skeleton>

              <List sx={{ listStyleType: 'none' }}>
                <ListItem disablePadding sx={{ display: 'list-item', mb: 2 }}>
                  <Skeleton variant="text" />
                </ListItem>

                <ListItem disablePadding sx={{ display: 'list-item', mb: 2 }}>
                  <Skeleton variant="text">
                    <ListItemText primary="Mauris magna diam, consectetur sollicitudin magna vitae. " />
                  </Skeleton>

                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <Skeleton variant="text" />
                        </TableCell>
                        <TableCell align="right">
                          <Skeleton variant="text" />
                        </TableCell>
                        <TableCell align="right">
                          <Skeleton variant="text" />
                        </TableCell>
                        <TableCell align="right">
                          <Skeleton variant="text" />
                        </TableCell>
                        <TableCell align="right">
                          <Skeleton variant="text" />
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {/* {rows.map((row: any) => (
                        <TableRow key={Math.random()}>
                          <TableCell style={{ minWidth: 100, textTransform: 'capitalize' }} align="left">
                            {row.article}
                          </TableCell>
                          <TableCell style={{ minWidth: 160, textTransform: 'capitalize' }} align="left">
                            {row.name}
                          </TableCell>
                          <TableCell style={{ minWidth: 160, textTransform: 'capitalize' }} align="left">
                            {row.model}
                          </TableCell>
                          <TableCell style={{ minWidth: 160, textTransform: 'uppercase' }} align="left">
                            {row.serialNumber}
                          </TableCell>

                          <TableCell align="right">{formatCurrency(row.rentalPrice)}</TableCell>
                        </TableRow>
                      ))} */}
                    </TableBody>
                  </Table>
                </ListItem>

                <ListItem disablePadding sx={{ display: 'list-item', mb: 2 }}>
                  <Skeleton variant="text">
                    <ListItemText primary="Curabitur vel est viverra, fringilla lacus eu, facilisis purus. Vivamus at erat non augue mattis bibendum placerat et dolor. Curabitur mollis nisl non purus dignissim lacinia. Vestibulum nec metus quam. " />
                  </Skeleton>
                </ListItem>
              </List>
            </ListItem>

            <ListItem disablePadding sx={{ display: 'list-item', mb: 2 }}>
              <Skeleton variant="text">
                <ListItemText
                  primaryTypographyProps={{
                    //fontSize: 20,
                    fontWeight: 'medium',
                    letterSpacing: 0
                  }}
                  primary="Declara “LA ARRENDATARIA”, lo siguiente:"
                />
              </Skeleton>
              <Skeleton variant="text" />
              <Skeleton variant="text" />
              <Skeleton variant="text" />
            </ListItem>
          </List>
        </DialogContent>
      ) : (
        <DialogContent>
          <Typography gutterBottom align="justify" mb={2}>
            {`En el municipio/delegación/ciudad de ________,  el día ____ de ______________ del año 2018 comparecen a celebrar contrato de arrendamiento de nombre articulo,
            por una parte, el (la) señor(a) Daniel Felipe Gonzalez Jimenez, a quien en lo sucesivo se le denominará “LA ARRENDADORA”, 
            y por la otra parte el (la) señor(a) ${cart.client.name} ${cart.client.lastName} ${cart.client.motherLastName}, 
            a quien para los efectos del presente contrato se le conocerá como “EL ARRENDATARIO”, y al efecto se realizan las siguientes`}
          </Typography>

          <Typography sx={{ mt: 2, fontWeight: 'bold' }} gutterBottom variant="body1">
            DECLARACIONES:
          </Typography>

          <List sx={{ listStyleType: 'upper-roman', pl: 2 }}>
            <ListItem disablePadding sx={{ display: 'list-item', mb: 2 }}>
              <ListItemText
                primaryTypographyProps={{
                  //fontSize: 20,
                  fontWeight: 'medium',
                  letterSpacing: 0
                }}
                primary="Declara “LA ARRENDADORA” lo siguiente:"
              />

              <List sx={{ listStyleType: 'decimal' }}>
                <ListItem disablePadding sx={{ display: 'list-item', mb: 2 }}>
                  <ListItemText
                    primary={`Lorem ${formatISO(
                      cart?.dataReturn
                    )} dolor sit amet, consectetur adipiscing elit. Vestibulum sed orci ac sem semper lobortis commodo vitae enim. Fusce a leo velit. Ut ac justo a felis imperdiet sodales eu sed leo.`}
                  />
                </ListItem>

                <ListItem disablePadding sx={{ display: 'list-item', mb: 2 }}>
                  <ListItemText primary="Mauris magna diam, consectetur sollicitudin magna vitae. " />
                  <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Articulo</TableCell>
                        <TableCell align="right">Nombre</TableCell>
                        <TableCell align="right">Modelo</TableCell>
                        <TableCell align="right">Numero de serie</TableCell>
                        <TableCell align="right">Precio de renta</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row: any) => (
                        <TableRow key={Math.random()}>
                          <TableCell style={{ minWidth: 100, textTransform: 'capitalize' }} align="left">
                            {row.article}
                          </TableCell>
                          <TableCell style={{ minWidth: 160, textTransform: 'capitalize' }} align="left">
                            {row.name}
                          </TableCell>
                          <TableCell style={{ minWidth: 160, textTransform: 'capitalize' }} align="left">
                            {row.model}
                          </TableCell>
                          <TableCell style={{ minWidth: 160, textTransform: 'uppercase' }} align="left">
                            {row.serialNumber}
                          </TableCell>

                          <TableCell align="right">{formatCurrency(row.rentalPrice)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ListItem>

                <ListItem disablePadding sx={{ display: 'list-item', mb: 2 }}>
                  <ListItemText primary="Curabitur vel est viverra, fringilla lacus eu, facilisis purus. Vivamus at erat non augue mattis bibendum placerat et dolor. Curabitur mollis nisl non purus dignissim lacinia. Vestibulum nec metus quam. " />
                </ListItem>
              </List>
            </ListItem>

            <ListItem disablePadding sx={{ display: 'list-item', mb: 2 }}>
              <ListItemText
                primaryTypographyProps={{
                  //fontSize: 20,
                  fontWeight: 'medium',
                  letterSpacing: 0
                }}
                primary="Declara “LA ARRENDATARIA”, lo siguiente:"
              />
              <List sx={{ listStyleType: 'decimal' }}>
                <ListItem disablePadding sx={{ display: 'list-item', mb: 2 }}>
                  <ListItemText primary="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sed orci ac sem semper lobortis commodo vitae enim. Fusce a leo velit. Ut ac justo a felis imperdiet sodales eu sed leo. " />
                </ListItem>

                <ListItem disablePadding sx={{ display: 'list-item', mb: 2 }}>
                  <ListItemText primary="Curabitur vel est viverra, fringilla lacus eu, facilisis purus. Vivamus at erat non augue mattis bibendum placerat et dolor. Curabitur mollis nisl non purus dignissim lacinia. Vestibulum nec metus quam. " />
                </ListItem>
              </List>
            </ListItem>
          </List>

          <Typography sx={{ fontWeight: 'bold' }} gutterBottom variant="body1">
            C L Á U S U L A S:
          </Typography>

          <List sx={{ listStyleType: 'none', pl: 0 }}>
            <ListItem disablePadding disableGutters sx={{ display: 'list-item', mb: 2 }}>
              <ListItemText
                primaryTypographyProps={{
                  //fontSize: 20,
                  fontWeight: 'medium',
                  letterSpacing: 0
                }}
                primary="PRIMERA. OBJETO DEL CONTRATO"
              />
              <Typography gutterBottom align="justify" mb={2}>
                Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed
                odio dui. Donec ullamcorper nulla non metus auctor fringilla.
              </Typography>
            </ListItem>

            <ListItem disablePadding sx={{ display: 'list-item', mb: 2 }}>
              <ListItemText
                primaryTypographyProps={{
                  //fontSize: 20,
                  fontWeight: 'medium',
                  letterSpacing: 0
                }}
                primary="SEGUNDA. TÉRMINO DEL CONTRATO"
              />
              <Typography gutterBottom align="justify" mb={2}>
                Mauris magna diam, consectetur sollicitudin magna vitae, vestibulum imperdiet tortor. Maecenas ut sem neque. Donec
                condimentum arcu erat, a rutrum elit mollis vitae. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere
                cubilia curae; Proin tincidunt eros at elit elementum, eget rutrum justo porttitor.
              </Typography>
            </ListItem>

            <ListItem disablePadding sx={{ display: 'list-item', mb: 2 }}>
              <ListItemText
                primaryTypographyProps={{
                  //fontSize: 20,
                  fontWeight: 'medium',
                  letterSpacing: 0
                }}
                primary="TERCERA.- PAGO DE RENTAS Y ACCESORIOS"
              />
              <Typography gutterBottom align="justify" mb={2}>
                Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed
                odio dui. Donec ullamcorper nulla non metus auctor fringilla.
              </Typography>
            </ListItem>

            <ListItem disablePadding sx={{ display: 'list-item', mb: 2 }}>
              <ListItemText
                primaryTypographyProps={{
                  //fontSize: 20,
                  fontWeight: 'medium',
                  letterSpacing: 0
                }}
                primary="CUARTA.- DEVOLUCIÓN BIEN ARRENDADO"
              />
              <Typography gutterBottom align="justify" mb={2}>
                Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed
                odio dui. Donec ullamcorper nulla non metus auctor fringilla.
              </Typography>
            </ListItem>
          </List>

          <FormControlLabel
            required
            checked={checked}
            onChange={handleChange}
            control={<Checkbox />}
            label="Acepto terminos y condiciones"
          />

          {/* <Typography gutterBottom>{checked ? 'aceptado' : 'rechazado'}</Typography> */}
        </DialogContent>
      )}

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleClose} color="secondary" variant="contained" startIcon={<IndeterminateCheckBoxIcon />}>
          Cancelar
        </Button>
        <Button
          onClick={handleClickContinue}
          disabled={checked ? false : true}
          color="primary"
          variant="contained"
          startIcon={<StartIcon />}
          autoFocus
        >
          Continuar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Agreement;
