import React, { lazy, Suspense } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useAppDispatch } from "../../app/hooks";
import { IconButton } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import { setDrawer } from "../../features/dataSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { RU_PATHNAMES } from "../../constants";

const RightDrawer = lazy(() => import("../RightDrawer/RightDrawer"));

const UserToolbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Typography
            variant='h6'
            component='div'
            sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}
          >
            {location.pathname !== '/subscribers' && <IconButton
              size='large'
              edge='start'
              color='inherit'
              aria-label='menu'
              onClick={() => navigate('/subscribers')}
              sx={{ mr: '10px' }}
            >
              <HomeIcon/>
            </IconButton>}
            {RU_PATHNAMES[location.pathname.split('/')[1]]}
          </Typography>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            onClick={() => dispatch(setDrawer('right'))}
          >
            <MenuIcon/>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Suspense fallback={<></>}>
        <RightDrawer/>
      </Suspense>
    </Box>
  );
};

export default UserToolbar;