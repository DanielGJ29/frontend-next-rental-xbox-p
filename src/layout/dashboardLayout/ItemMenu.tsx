import React, { useContext, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

//Material UI
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Fullscreen from '@mui/icons-material/Fullscreen';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Collapse from '@mui/material/Collapse';

//Material Icons
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import { GiGameConsole } from 'react-icons/gi';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

//Context
import ConfigContext from '@/context/configContext';
import { GridExpandMoreIcon } from '@mui/x-data-grid';
import ChildrenItem from './ChildrenItem';

import { styled } from '@mui/material/styles';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import { colors } from '@mui/material';

// interface Props {
//   path?: string;
//   name?: string;
//   status?: boolean;
//   iconName?: string;
//   loading?: boolean;
// }

const ItemMenu = () => {
  // const { path, name, status, iconName } = props;
  const { loading, menuItems } = useContext(ConfigContext);
  const [open, setOpen] = React.useState(false);
  const [nameCollapse, setnameCollapse] = useState<string>('');

  const pathName = usePathname();

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
    GiGameConsole
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
      {menuItems.length > 0
        ? menuItems.map((item: any) => {
            let icon;
            if (item.icon in icons) {
              const IconMenu = icons[item.icon];
              icon = <IconMenu />;
            }

            if (item.children.length > 0) {
              // console.log('PATHNAME==>', pathName);
              // console.log('ITEM.URL==>', item.children);

              return (
                <div key={item.name}>
                  <ListItemButton key={item.name} onClick={(event) => handleClickCollapse(event, item.name)}>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText primary={item.name} />
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
        : [1, 2, 3, 4].map(() => (
            <Link key={Math.random()} href={''}>
              <ListItemButton>
                <Skeleton variant="rounded" width={20} height={25}>
                  <ListItemButton></ListItemButton>
                </Skeleton>

                <Skeleton variant="rounded" sx={{ marginLeft: 4 }} height={10} width={100}>
                  <ListItemText primary={'hola'} />
                </Skeleton>
              </ListItemButton>
            </Link>
          ))}
    </div>
  );
};

export default ItemMenu;
