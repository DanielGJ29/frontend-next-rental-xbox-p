import React from 'react';
import { useRouter } from 'next/navigation';

//Material Ui
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import type { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { alpha } from '@mui/material';

//icons
import { ArrowDown as ArrowDownIcon } from '@phosphor-icons/react/dist/ssr/ArrowDown';
import { ArrowUp as ArrowUpIcon } from '@phosphor-icons/react/dist/ssr/ArrowUp';

export interface Props {
  path: string;
  sx?: SxProps;
  icon: any;
  title: string;
}

const Cart = ({ title, path, icon }: Props) => {
  const router = useRouter();
  const theme = useTheme();

  const handleClick = () => {
    router.push(path);
  };

  return (
    <Button variant="outlined" fullWidth sx={{ borderRadius: 5, py: 2, bgcolor: 'secondary' }} onClick={handleClick}>
      <Stack direction="column" sx={{ alignItems: 'center', alignContent: 'space-between' }} spacing={3}>
        <Typography variant="h6">{title}</Typography>
        <Avatar sx={{ backgroundColor: 'secondary.main', height: '76px', width: '76px' }}>{icon}</Avatar>
      </Stack>
    </Button>
  );
};

export default Cart;
