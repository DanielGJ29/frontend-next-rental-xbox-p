import axios from 'axios';

//Alert
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

// next
import { getSession, signOut, signIn, useSession } from 'next-auth/react';

const axiosServices = axios.create({
  //swithCredentials: true,
  baseURL: process.env.NEXT_APP_API_URL || 'http://localhost:4000/api/v1',
  timeout: 90000
});

export const axiosDefault = axios.create({
  baseURL: process.env.NEXT_APP_API_URL || 'http://localhost:4000/api/v1'
});

axiosServices.interceptors.request.use(
  async (config) => {
    const session: any = await getSession();
    // const { data: session2, status } = useSession();

    if (!session) {
      await signOut();
      // window.location.pathname = '/login';
      // return Promise.reject('Session Expired');
    }

    if (session) {
      if (session?.user?.accessToken) {
        config.headers = config.headers ?? {};
        config.headers['Authorization'] = `Bearer ${session?.user?.accessToken.token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosServices.interceptors.response.use(
  function (response) {
    // Cualquier código de estado que este dentro del rango de 2xx causa la ejecución de esta función
    // Haz algo con los datos de la respuesta
    return response;
  },
  async function (error) {
    // Cualquier código de estado que este fuera del rango de 2xx causa la ejecución de esta función
    // Haz algo con el error
    const originalRequest = error.config;

    if (error.response.data.status === 'fail' && error.response.data.message === 'jwt expired') {
      return new Promise(async function (resolve, reject) {
        let session: any = await getSession();

        // if (!session) {
        //   await signOut();
        // } else {
        let timerInterval: any;
        MySwal.fire({
          title: 'La session a caducado.',
          text: '¿Desea continuar?',
          icon: 'info',
          html: `Cerrar sesion en <b></b> segundos.`,
          showCancelButton: true,
          allowOutsideClick: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Continuar',
          cancelButtonText: 'Cerrar session',
          timer: 10000,
          timerProgressBar: true,
          didOpen: () => {
            // MySwal.showLoading();
            const timer = MySwal.getPopup()?.querySelector('b');
            timerInterval = setInterval(() => {
              if (timer) {
                const time = MySwal.getTimerLeft();
                if (time) {
                  timer.textContent = `${Math.floor(time / 1000)}`;
                }
              }
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          }
        }).then(async (result) => {
          if (result.isConfirmed) {
            //let session: any = await getSession();

            if (!session) {
              await signOut();
            } else {
              await signIn('refreshtoken', {
                redirect: false,
                token: session.user.refreshToken,
                callbackUrl: '/'
              })
                .then(async (res) => {
                  if (!res?.ok) {
                    await signOut();
                  }
                })
                .catch((error) => {
                  console.log('refreshCatch', error);
                });

              //UPDATE TOKEN
              session = await getSession();

              originalRequest.headers['Authorization'] = `Bearer ${session.user.accessToken.token}`;
              resolve(axiosServices(originalRequest));
            }
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel ||
            result.dismiss === Swal.DismissReason.timer
          ) {
            await signOut();
          }
        });
        // }
      }).catch((err) => {
        return Promise.reject(err);
      });
    }

    return Promise.reject(error);
  }
);

export default axiosServices;
