import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Link from 'next/link';
import React from 'react';

import { usePathname } from 'next/navigation';

interface Props {
  name: string;
  url: string;
  icon: any;
  status: boolean;
}

const ChildrenItem = (props: Props) => {
  const { name, url, icon, status } = props;
  const pathName = usePathname();

  return (
    <div>
      <Link key={name} style={{ textDecoration: 'none' }} href={url}>
        <ListItemButton selected={pathName === url}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText sx={{ textTransform: 'capitalize', color: 'primary.contrastText' }} primary={name} />
        </ListItemButton>
      </Link>
    </div>
  );
};

export default ChildrenItem;
