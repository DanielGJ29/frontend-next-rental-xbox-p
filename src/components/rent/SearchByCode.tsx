import React, { FormEvent } from 'react';

//Material Ui
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';

//Material Icons
import SearchIcon from '@mui/icons-material/Search';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import CircularProgress from '@mui/material/CircularProgress';

interface Props {
  icon: any;
  title: string;
  name: string;
  value: string;
  setValueInput: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: any;
  handleSearchByKeyboard: any;
  disabled?: boolean;
  loading: boolean;
}

const SearchByCode = (props: Props) => {
  const { icon, title, name, value, setValueInput, handleSearch, handleSearchByKeyboard, disabled, loading } = props;

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <Paper component="form" sx={{ p: '4px 20px', display: 'flex', alignItems: 'center' }} onSubmit={handleSubmit}>
      <Box sx={{ p: '10px', display: 'flex' }} aria-label="menu">
        {/* <PersonSearchIcon color="action" /> */}
        {icon}
      </Box>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={title}
        inputProps={{ 'aria-label': 'search google maps' }}
        value={value}
        disabled={disabled}
        onChange={(e) => setValueInput(e.target.value)}
      />

      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search" disabled={disabled} onClick={handleSearch}>
        {loading ? <CircularProgress size={20} /> : <SearchIcon />}
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton
        color="primary"
        sx={{ p: '10px' }}
        aria-label="directions"
        disabled={disabled}
        onClick={() => handleSearchByKeyboard(name)}
      >
        <KeyboardIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchByCode;
