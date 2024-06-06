import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { usePathname, useRouter } from 'next/navigation';

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
}

export default function BasicBreadcrumbs(props: any) {
  const pathName = usePathname();
  const router = useRouter();

  const paths = pathName.split('/').filter((item) => item);

  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs separator="›" aria-label="breadcrumb" sx={{ mb: 4 }}>
        {paths.length > 0 ? (
          <Link onClick={() => router.push('/')} underline="hover" color="inherit">
            Inicio
          </Link>
        ) : (
          <Typography textTransform="capitalize" color="text.primary">
            Inicio
          </Typography>
        )}

        {paths.map((path, index) => {
          const routeTo = paths.slice(0, index + 1).join('/');

          const isLast = index === paths.length - 1;

          return isLast ? (
            <Typography key={index} textTransform="capitalize" color="text.primary">
              {path}
            </Typography>
          ) : (
            <Link
              sx={{ textTransform: 'capitalize' }}
              key={index}
              onClick={() => router.push(`/${routeTo}`)}
              underline="hover"
              color="inherit"
            >
              {path}
            </Link>
          );
        })}
      </Breadcrumbs>
    </div>
  );
}
