import React, { memo } from 'react';
import {
  Button, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setDrawer } from "../../features/dataSlice";
import { logout } from "../../features/usersSlice";
import SwapVertIcon from '@mui/icons-material/SwapVert';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useNavigate } from "react-router-dom";
import GroupsIcon from '@mui/icons-material/Groups';
import EngineeringIcon from '@mui/icons-material/Engineering';
import './rightDrawer.css';

const RightDrawer = memo(() => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentDrawer } = useAppSelector(state => state.dataState);
  const { user } = useAppSelector(state => state.userState);
  
  const onNavItemClick = (tabName) => {
    dispatch(setDrawer(''));
    navigate(tabName);
  };
  
  return (
    <Drawer
      className='right-drawer'
      anchor='right'
      open={currentDrawer === 'right'}
      onClose={() => dispatch(setDrawer(''))}
    >
      <List className='right-drawer-list'>
        <ListItem
          disablePadding
          onClick={() => onNavItemClick('/subscribers')}
        >
          <ListItemButton>
            <ListItemIcon style={{ minWidth: '45px' }}>
              <GroupsIcon/>
            </ListItemIcon>
            <ListItemText primary='Абоненты'/>
          </ListItemButton>
        </ListItem>
        <ListItem
          disablePadding
          onClick={() => onNavItemClick('/works')}
        >
          <ListItemButton>
            <ListItemIcon style={{ minWidth: '45px' }}>
              <EngineeringIcon/>
            </ListItemIcon>
            <ListItemText primary='Наряды'/>
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
});

export default RightDrawer;