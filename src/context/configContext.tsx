import React, { ReactNode, createContext, useEffect, useLayoutEffect, useState } from 'react';

import { sistemaAPI } from '@/server';

import { PaletteMode } from '@mui/material';

interface Istate {
  mode: PaletteMode;
  menuItems: [];
  loading: boolean;
  loginStatus: boolean;
  onChangeMode: (mode: PaletteMode) => void;
  onChangeLogin: (loginStatus: boolean) => void;
}

//Initial State
const initialState: Istate = {
  // mode: ThemeMode.LIGHT,
  mode: 'light',
  menuItems: [],
  loading: false,
  loginStatus: false,
  onChangeMode: (mode: PaletteMode) => {},
  onChangeLogin: (loginStatus: boolean) => {}
};

//CreateContext
const ConfigContext = createContext(initialState);

type ConfigProviderProps = {
  children: ReactNode;
};
//Provider
const ConfigProvider = ({ children }: ConfigProviderProps) => {
  const [state, setState] = useState<Istate>(initialState);

  useLayoutEffect(() => {
    if (!state.loginStatus) {
      return;
    }

    onChangeLoading(true);
    sistemaAPI.getAllMenu().then((response) => {
      setState({ ...state, menuItems: response.data });
    });
    onChangeLoading(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.loginStatus]);

  useLayoutEffect(() => {
    if (!state.loginStatus) {
      return;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.loginStatus]);

  const onChangeMode = (mode: any) => {
    setState({
      ...state,
      mode
    });
  };

  const onChangeLogin = (status: boolean) => {
    setState({
      ...state,
      loginStatus: status
    });
  };

  const onChangeLoading = (loading: boolean) => {
    setState({
      ...state,
      loading
    });
  };

  return <ConfigContext.Provider value={{ ...state, onChangeMode, onChangeLogin }}>{children}</ConfigContext.Provider>;
};

export { ConfigProvider };
export default ConfigContext;
