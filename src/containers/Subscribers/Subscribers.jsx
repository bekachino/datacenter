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
  getLocations, getRegions, getServiceEngineers, getSquares, getSubscribers
} from "../../features/dataThunk";
import { formatDate } from "../../constants";
import Box from "@mui/material/Box";
import SubscribersFooter
  from "../../components/SubscribersFooter/SubscribersFooter";
import SubscribersFilterModal
  from "../../components/SubscribersFilterModal/SubscribersFilterModal";
import './subscribers.css';

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
      [name]: value, ...paginationData, ...filterData,
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
    
    if (name === 'regions_ids') {
      setFilterData(prevState => (
        {
          ...prevState,
          squares_ids: [],
          location_ids: [],
        }
      ));
      dispatch(getSquares(value));
    } else if (name === 'squares_ids') {
      setFilterData(prevState => (
        {
          ...prevState,
          location_ids: [],
        }
      ));
      dispatch(getLocations(value));
    }
  };
  
  const subscribersBySearchWord = useCallback(() => {
    return subscribers?.filter(subscriber => subscriber?.name_abon?.toLowerCase()?.includes(searchWord?.toLowerCase()) || subscriber?.address?.toLowerCase()?.includes(searchWord?.toLowerCase()) || subscriber?.ls_abon?.toLowerCase()?.includes(searchWord?.toLowerCase()) || subscriber?.phone_abon?.toLowerCase()?.includes(searchWord?.toLowerCase()) || subscriber?.tariff?.toLowerCase()?.includes(searchWord?.toLowerCase()));
  }, [
    subscribers,
    searchWord
  ]);
  
  const getSubscribersByFilters = async (e) => {
    e?.preventDefault();
    await dispatch(getSubscribers({
      ...paginationData, ...filterData,
      start_date: 'startEndRange' in filterData ? filterData.startEndRange[0] : null,
      end_date: 'startEndRange' in filterData ? filterData.startEndRange[1] : null,
    }));
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
        <Table
          sx={{
            minWidth: 650,
          }}
          aria-label='simple table'
        >
          <TableHead sx={{ position: 'relative' }}>
            {subscribersLoading && <LinearProgress
              color='inherit'
              className='subscribers-progress-bar'
            />}
            <TableRow>
              <TableCell
                align='center'
                sx={{ minWidth: '180px' }}
              >ФИО абонента</TableCell>
              <TableCell
                align='center'
                sx={{ minWidth: '150px' }}
              >Номер телефона</TableCell>
              <TableCell
                align='center'
                sx={{ minWidth: '250px' }}
              >Адрес</TableCell>
              <TableCell
                align='center'
                sx={{ minWidth: '130px' }}
              >ЛС абонента</TableCell>
              <TableCell
                align='center'
                sx={{ minWidth: '180px' }}
              >Квадат</TableCell>
              <TableCell
                align='center'
                sx={{ minWidth: '105px' }}
              >Создан</TableCell>
              <TableCell
                align='center'
                sx={{ minWidth: '150px' }}
              >Тариф</TableCell>
              <TableCell
                align='center'
                sx={{ minWidth: '110px' }}
              >Баланс</TableCell>
              <TableCell
                align='center'
                sx={{ minWidth: '170px' }}
              >Последний платёж</TableCell>
              <TableCell
                align='center'
                sx={{ minWidth: '150px' }}
              >IP адрес</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(
              subscribersBySearchWord() || []
            )?.map((row) => (
              <TableRow
                key={row.id}
              >
                <TableCell align='center'>{row?.name_abon || '-'}</TableCell>
                <TableCell align='center'>{row?.phone_abon || '-'}</TableCell>
                <TableCell align='center'>{row?.address || '-'}</TableCell>
                <TableCell align='center'>{row?.ls_abon || '-'}</TableCell>
                <TableCell align='center'>{squares?.find(square => square?.id === row?.squares_id)?.squares || '-'}</TableCell>
                <TableCell align='center'>{row?.created_at ? formatDate(row?.created_at) : '-'}</TableCell>
                <TableCell align='center'>{row?.tariff || '-'}</TableCell>
                <TableCell align='center'>
                  {row?.balance ? <>{row?.balance}
                    <strong
                      style={{
                        textDecoration: 'underline',
                        marginLeft: '4px'
                      }}
                    >c</strong></> : '-'}
                </TableCell>
                <TableCell align='center'>{row?.last_pay || '-'}</TableCell>
                <TableCell align='center'>{row?.ip_address || '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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