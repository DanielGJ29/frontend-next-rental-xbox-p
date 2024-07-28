import React, { ChangeEvent, ReactNode } from 'react';

//Material UI
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { useTheme } from '@mui/material/styles';

//Material Icons
import LocalSeeIcon from '@mui/icons-material/LocalSee';

interface Props {
  title: string;
  name: string;
  shape: 'square' | 'rounded' | 'circular';
  icon: ReactNode;
  width: number;
  height: number;
  loading: boolean;
  handleChangeFile: Function;
  avatar: string | undefined;
}

export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark'
}

const CustomAvatar = (props: Props) => {
  const { title, name, shape, icon, width, height, loading, handleChangeFile, avatar } = props;
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <FormLabel
        htmlFor={name}
        sx={{
          position: 'relative',
          borderRadius: shape === 'rounded' ? '10%' : shape === 'circular' ? '50%' : '0',
          overflow: 'hidden',
          '&:hover .MuiBox-root': { opacity: 1 },
          cursor: 'pointer'
        }}
      >
        {loading ? (
          <Skeleton variant="circular" animation="wave" height={200} width={200} id="bootstrap-input" />
        ) : (
          <Avatar alt={title} variant={shape} src={avatar} sx={{ width: width, height: height, border: '1px dashed' }}>
            {icon}
          </Avatar>
        )}

        {!loading && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              backgroundColor: theme.palette.mode === ThemeMode.DARK ? 'rgba(255, 255, 255, .75)' : 'rgba(0,0,0,.65)',
              width: '100%',
              height: '100%',
              opacity: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Stack spacing={0.5} alignItems="center">
              <LocalSeeIcon style={{ color: theme.palette.secondary.light, fontSize: '2rem' }} />
              <Typography sx={{ color: 'secondary.lighter' }}>Subir</Typography>
            </Stack>
          </Box>
        )}
      </FormLabel>

      {!loading && (
        <TextField
          type="file"
          id={name}
          placeholder="Outlined"
          variant="outlined"
          name={name}
          sx={{ display: 'none' }}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeFile(e)}
        />
      )}

      {loading ? (
        <Skeleton variant="text" sx={{ mt: 2 }} animation="wave" height={15} width={100} id="bootstrap-input" />
      ) : (
        <Typography sx={{ mt: 2 }} variant="subtitle1" gutterBottom>
          {title}
        </Typography>
      )}
    </Box>
  );
};

export default CustomAvatar;
