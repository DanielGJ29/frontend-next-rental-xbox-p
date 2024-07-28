import React, { useContext, useMemo, useState } from 'react';
import Link from 'next/link';

//Material UI
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';
import List from '@mui/material/List';
import Collapse from '@mui/material/Collapse';

//Material Icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { FaUsers } from 'react-icons/fa';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import HandshakeIcon from '@mui/icons-material/Handshake';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import BallotIcon from '@mui/icons-material/Ballot';

//Context
import ConfigContext from '@/context/configContext';
import ChildrenItem from './ChildrenItem';

import { styled } from '@mui/material/styles';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';

const ItemMenu = () => {
  const { menuItems } = useContext(ConfigContext);
  const [open, setOpen] = React.useState(false);
  const [nameCollapse, setnameCollapse] = useState<string>('');

  const handleClickCollapse = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, name: string) => {
    if (nameCollapse === '') {
      setOpen(!open);
      setnameCollapse(name);
      return;
    }

    if (nameCollapse !== name) {
      setOpen(true);
      setnameCollapse(name);
      return;
    }

    setOpen(!open);
    setnameCollapse(name);
  };

  const icons: any = {
    DashboardIcon,
    PeopleIcon,
    SettingsSuggestIcon,
    VideogameAssetIcon,
    FaUsers,
    AssignmentReturnIcon,
    HandshakeIcon,
    PeopleAltIcon,
    BallotIcon
  };

  const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)(({ theme }) => ({
    border: 'none',
    // '&:hover': { bgColor: 'gray' },
    '& .MuiAccordion-root': {
      '&:hove': {
        bgColor: 'gray'
      }
    },
    //  border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0
    },
    '&::before': {
      display: 'none'
    }
  }));

  return (
    <div>
      {
        menuItems.length > 0
          ? menuItems.map((item: any) => {
              let icon;
              if (item.icon in icons) {
                const IconMenu = icons[item.icon];
                icon = <IconMenu color="secondary.contrastText" />;
              }

              if (item.children.length > 0) {
                return (
                  <div key={item.name}>
                    <ListItemButton key={item.name} onClick={(event) => handleClickCollapse(event, item.name)}>
                      <ListItemIcon>{icon}</ListItemIcon>
                      <ListItemText sx={{ textTransform: 'capitalize', color: 'primary.contrastText' }} primary={item.name} />
                      {item.name === nameCollapse && open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={item.name === nameCollapse && open} timeout="auto" unmountOnExit>
                      {/* <List component="div" disablePadding> */}
                      <List component="div" disablePadding>
                        {item.children.map((item: any) => {
                          let icon;
                          if (item.icon in icons) {
                            const IconMenu = icons[item.icon];
                            icon = <IconMenu />;
                          }
                          return <ChildrenItem key={item.name} name={item.name} url={item.url} icon={icon} status={false} />;
                        })}
                      </List>
                    </Collapse>
                  </div>
                );
              }

              return <ChildrenItem key={item.name} name={item.name} url={item.url} icon={icon} status={false} />;
            })
          : ''
        // [1, 2, 3, 4].map(() => (
        //     <Link key={Math.random()} href={''}>
        //       <ListItemButton>
        //         <Skeleton variant="rounded" width={20} height={25}>
        //           <ListItemButton></ListItemButton>
        //         </Skeleton>

        //         <Skeleton variant="rounded" sx={{ marginLeft: 4 }} height={10} width={100}>
        //           <ListItemText primary={'hola'} />
        //         </Skeleton>
        //       </ListItemButton>
        //     </Link>
        //   )
        //  )
      }
    </div>
  );
};

export default ItemMenu;
