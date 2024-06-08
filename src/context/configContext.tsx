import React, { ReactNode, createContext, useEffect, useLayoutEffect, useState } from 'react';

import { sistemaAPI } from '@/server';

//Initial State
const initialState = {
  // mode: ThemeMode.LIGHT,
  mode: 'dark',
  menuItems: [],
  loading: false,
  loginStatus: false,
  onChangeMode: (mode: any) => {},
  onChangeLogin: (loginStatus: boolean) => {}
};

//CreateContext
const ConfigContext = createContext(initialState);

type ConfigProviderProps = {
  children: ReactNode;
};
//Provider
const ConfigProvider = ({ children }: ConfigProviderProps) => {
  const [state, setState] = useState(initialState);

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
