import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Paper, Snackbar, TableContainer, TextField } from "@mui/material";
import {
  getLocations,
  getRegions,
  getResolutions,
  getServiceEngineers,
  getSquares,
  getSubscribers,
  getSubscribersStatistics
} from "../../features/dataThunk";
import Box from "@mui/material/Box";
import {
  clearErrorMessages, clearLocations, clearSquares
} from "../../features/dataSlice";
import './subscribers.css';
import Typography from "@mui/material/Typography";

const SubscribersFilters = lazy(() => import('../../components/SubscribersFilters/SubscribersFilters'));
const SubscribersStatisticsTable = lazy(() => import('../../components/SubscribersStatisticsTable/SubscribersStatisticsTable'));
const SubscribersTable = lazy(() => import('../../components/SubscribersTable/SubscribersTable'));
const ResolutionsTable = lazy(() => import('../../components/ResolutionsTable/ResolutionsTable'));
const SubscribersFooter = lazy(() => import('../../components/SubscribersFooter/SubscribersFooter'));

const Subscribers = () => {
  const dispatch = useAppDispatch();
  const {
    subscribers,
    subscribersErrorMessage,
    resolutionsErrorMessage,
    filterDataErrorMessage,
  } = useAppSelector(state => state.dataState);
  const [searchWord, setSearchWord] = useState('');
  const [paginationData, setPaginationData] = useState({
    skip: 1,
    limit: 100,
  });
  const [filterData, setFilterData] = useState({
    abonType: 'active',
    dataType: 'personal',
  });
  
  useEffect(() => {
    dispatch(getRegions());
    dispatch(getServiceEngineers());
  }, [dispatch]);
  
  const handleSnackBarClose = () => {
    dispatch(clearErrorMessages());
  };
  
  const handlePaginationDataChange = (e) => {
    const {
      name,
      value
    } = e.target;
    setPaginationData(prevState => (
      {
        ...prevState,
        [name]: value,
      }
    ));
    dispatch(getSubscribers({
      ...paginationData,
      [name]: value, ...filterData,
      start_date: 'startEndRange' in filterData ? filterData.startEndRange[0] : null,
      end_date: 'startEndRange' in filterData ? filterData.startEndRange[1] : null,
    }));
  };
  
  const handleFilterDataChange = (e) => {
    const {
      name,
      value
    } = e.target;
    setFilterData(prevState => (
      {
        ...prevState,
        [name]: value,
      }
    ));
    
    if (name === 'regions') {
      setFilterData(prevState => (
        {
          ...prevState,
          squares: [],
          locations: [],
        }
      ));
      
      dispatch(clearSquares());
      dispatch(clearLocations());
      
      if (value && value.length) dispatch(getSquares(value?.map(square => square?.id)));
    } else if (name === 'squares') {
      setFilterData(prevState => (
        {
          ...prevState,
          locations: [],
        }
      ));
      
      dispatch(clearLocations());
      
      if (value && value.length) dispatch(getLocations(value?.map(location => location?.id)));
    }
  };
  
  const getSubscribersByFilters = async (e) => {
    e?.preventDefault();
    if (filterData?.abonType === 'resolution') {
      await dispatch(getResolutions({
        ...paginationData, ...filterData,
        start_date: 'startEndRange' in filterData ? filterData.startEndRange[0] : null,
        end_date: 'startEndRange' in filterData ? filterData.startEndRange[1] : null,
      }));
    } else {
      dispatch(getSubscribers({
        ...paginationData, ...filterData,
        start_date: 'startEndRange' in filterData ? filterData.startEndRange[0] : null,
        end_date: 'startEndRange' in filterData ? filterData.startEndRange[1] : null,
      }));
      if (filterData?.abonType !== 'resolution') {
        dispatch(getSubscribersStatistics({
          ...filterData,
          start_date: 'startEndRange' in filterData ? filterData.startEndRange[0] : null,
          end_date: 'startEndRange' in filterData ? filterData.startEndRange[1] : null,
        }));
      }
    }
  };
  
  return (
    <div className='subscribers'>
      <Box className='subscribers-table-wrapper'>
        <TextField
          label='Поиск...'
          variant='outlined'
          className='search-application'
          value={searchWord}
          onChange={e => setSearchWord(e.target.value)}
          size='small'
          sx={{
            flexGrow: 1,
          }}
        />
        <Suspense fallback={<></>}>
          <SubscribersFilters
            handleFilterDataChange={handleFilterDataChange}
            getSubscribersByFilters={getSubscribersByFilters}
            filterData={filterData}
          />
        </Suspense>
        <Box className='statistics-table-container-wrapper'>
          <Typography
            className='table-container-title'
            variant='h5'
            component='h5'
          >Аналитика персональных данных</Typography>
          <TableContainer
            component={Paper}
            className='statistics-table-container'
          >
            <Suspense fallback={<></>}><SubscribersStatisticsTable/></Suspense>
          </TableContainer>
        </Box>
        <Box className='table-container-wrapper'>
          <TableContainer
            component={Paper}
            className='table-container'
          >
            {filterData?.abonType === 'resolution' ?
              <Suspense fallback={<></>}><ResolutionsTable searchWord={searchWord}/></Suspense> :
              <Suspense fallback={<></>}><SubscribersTable searchWord={searchWord}/></Suspense>}
            {!!subscribers?.length && <Suspense fallback={<></>}>
              <SubscribersFooter
                paginationData={paginationData}
                handlePaginationDataChange={handlePaginationDataChange}
              />
            </Suspense>}
          </TableContainer>
        </Box>
      </Box>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        open={!!subscribersErrorMessage || !!resolutionsErrorMessage || !!filterDataErrorMessage}
        onClose={handleSnackBarClose}
        message={subscribersErrorMessage || resolutionsErrorMessage || filterDataErrorMessage || 'ㅤ'}
        sx={{
          '.MuiSnackbarContent-root': {
            backgroundColor: '#121212',
            color: 'white',
          },
        }}
      />
    </div>
  );
};

export default Subscribers;