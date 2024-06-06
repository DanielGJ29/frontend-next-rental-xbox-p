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

  console.log('soy el provider');

  useLayoutEffect(() => {
    console.log('se lanzo el useLayout desde context');
    // const fetchData = async () => {
    // const res = await fetch('/api/auth/protected');
    // const json = await res?.json();
    if (!state.loginStatus) {
      console.log('no esta logeado no traemos el menu');
      return;
    }
    console.log('logeado traemos el menu');
    onChangeLoading(true);
    sistemaAPI.getAllMenu().then((response) => {
      setState({ ...state, menuItems: response.data });
    });
    onChangeLoading(false);

    // };
    //fetchData();
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
