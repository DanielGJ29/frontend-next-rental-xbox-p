import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

function Footer(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props} sx={{ mt: 'auto' }}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Cyber Play
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default Footer;
