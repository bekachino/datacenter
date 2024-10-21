import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  Button,
  LinearProgress,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from "@mui/material";
import {
  getLocations,
  getRegions,
  getResolutions,
  getServiceEngineers,
  getSquares,
  getSubscribers
} from "../../features/dataThunk";
import { formatDate } from "../../constants";
import Box from "@mui/material/Box";
import SubscribersFooter
  from "../../components/SubscribersFooter/SubscribersFooter";
import SubscribersFilterModal
  from "../../components/SubscribersFilterModal/SubscribersFilterModal";
import './subscribers.css';
import Typography from "@mui/material/Typography";
import SubscribersTable
  from "../../components/SubscribersTable/SubscribersTable";

const Subscribers = () => {
  const dispatch = useAppDispatch();
  const {
    subscribers,
    subscribersLoading,
    subscribersErrorMessage,
    squares,
    filterDataErrorMessage,
  } = useAppSelector(state => state.dataState);
  const [searchWord, setSearchWord] = useState('');
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [paginationData, setPaginationData] = useState({
    skip: 1,
    limit: 100,
  });
  const [filterData, setFilterData] = useState({
    abonType: 'active',
  });
  
  useEffect(() => {
    dispatch(getRegions());
    dispatch(getServiceEngineers());
  }, [dispatch]);
  
  useEffect(() => {
    if (!!subscribersErrorMessage || !!filterDataErrorMessage) setSnackBarOpen(true);
  }, [
    filterDataErrorMessage,
    subscribersErrorMessage
  ]);
  
  const handleSnackBarClose = () => {
    setSnackBarOpen(false);
  };
  
  const handleFilterModalOpen = () => {
    setFilterModalOpen(true);
  };
  
  const handleFilterModalClose = () => {
    setFilterModalOpen(false);
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
      dispatch(getSquares(value?.map(square => square?.id)));
    } else if (name === 'squares') {
      setFilterData(prevState => (
        {
          ...prevState,
          locations: [],
        }
      ));
      dispatch(getLocations(value?.map(location => location?.id)));
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
      await dispatch(getSubscribers({
        ...paginationData, ...filterData,
        start_date: 'startEndRange' in filterData ? filterData.startEndRange[0] : null,
        end_date: 'startEndRange' in filterData ? filterData.startEndRange[1] : null,
      }));
    }
    setFilterModalOpen(false);
  };
  
  return (
    <div className='subscribers'>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          m: '10px 0 15px'
        }}
      >
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
        <Button
          onClick={handleFilterModalOpen}
          variant='outlined'
          color='secondary'
        >Фильтр...</Button>
      </Box>
      <TableContainer
        component={Paper}
        className='table-container'
      >
        <SubscribersTable searchWord={searchWord}/>
        {!!subscribers?.length && <SubscribersFooter
          paginationData={paginationData}
          handlePaginationDataChange={handlePaginationDataChange}
        />}
      </TableContainer>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        open={snackBarOpen}
        onClose={handleSnackBarClose}
        message={subscribersErrorMessage || filterDataErrorMessage}
        sx={{
          '.MuiSnackbarContent-root': {
            backgroundColor: '#121212',
            color: 'white',
          },
        }}
      />
      <SubscribersFilterModal
        open={filterModalOpen}
        handleClose={handleFilterModalClose}
        handleFilterDataChange={handleFilterDataChange}
        getSubscribersByFilters={getSubscribersByFilters}
        filterData={filterData}
      ></SubscribersFilterModal>
    </div>
  );
};

export default Subscribers;