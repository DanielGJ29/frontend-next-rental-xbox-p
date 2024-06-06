import axios from 'axios';

// next
import { getSession, signOut, signIn } from 'next-auth/react';

const axiosServices = axios.create({
  //withCredentials: true,
  baseURL: process.env.NEXT_APP_API_URL || 'http://localhost:4000/',
  timeout: 90000
});

axiosServices.interceptors.request.use(
  async (config) => {
    const session: any = await getSession();
    console.log('session desde axios', session);

    if (!session) {
      await signOut();
      window.location.pathname = '/login';

      return Promise.reject('Session Expired');
    }

    if (session) {
      if (session?.user?.accessToken) {
        config.headers = config.headers ?? {};
        config.headers['Authorization'] = `Bearer ${session?.user?.accessToken}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosServices;
