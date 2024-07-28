'use client';

import { useEffect } from 'react';

// next
import { useRouter } from 'next/navigation';
import { useSession, signIn, signOut } from 'next-auth/react';

// project-import
import Loader from '@/components/Loader';

// types
import { GuardProps } from '@/types/auth';

//Alert
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

// ==============================|| AUTH GUARD ||============================== //

const AuthGuard = ({ children }: GuardProps) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/auth/protected');
      const json = await res?.json();
      console.log('session de AuthGuard', session);
      if (!json?.protected) {
        console.log('session de auth expirada', session);
        console.log('se vencio la session refrescamos nueva session');

        if (!session) {
          router.push('/login');
        } else {
          let timerInterval: any;
          MySwal.fire({
            title: 'La session NEXTAuth a caducado.',
            text: '¿Desea continuar?',
            icon: 'info',
            html: `Cerrar sesion en <b></b> segundos.`,
            allowOutsideClick: false,
            showCancelButton: true,
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
                  const currentTime = MySwal.getTimerLeft();
                  if (currentTime) {
                    timer.textContent = `${Math.floor(currentTime / 1000)}`;
                  }
                }
              }, 100);
            },
            willClose: () => {
              clearInterval(timerInterval);
              console.log('pasaron 10 seguntdos');
            }
          }).then(async (result) => {
            if (result.isConfirmed) {
              //let session: any = await getSession();

              console.log('current session', session);
              console.log('resfreshToken a enviar', session?.user.refreshToken);

              await signIn('refreshtoken', {
                redirect: false,
                token: session?.user.refreshToken,
                callbackUrl: '/'
              })
                .then(async (res) => {
                  if (!res?.ok) {
                    console.log('res.ok fallo');
                    await signOut();
                  }
                })
                .catch((error) => {
                  console.log('refreshCatch', error);
                });
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel ||
              result.dismiss === Swal.DismissReason.timer
            ) {
              await signOut();
            }
          });
        }
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, [session]);

  if (status === 'loading' || !session?.user) return <Loader />;

  return children;
};

export default AuthGuard;
