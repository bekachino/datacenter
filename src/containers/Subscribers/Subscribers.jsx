import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import './subscribers.css';
import {
  Autocomplete,
  LinearProgress,
  Paper,
  Snackbar,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField
} from "@mui/material";
import { getSquares, getSubscribers } from "../../features/dataThunk";
import { formatDate } from "../../constants";
import Box from "@mui/material/Box";
import SubscribersFooter
  from "../../components/SubscribersFooter/SubscribersFooter";

const Subscribers = () => {
  const dispatch = useAppDispatch();
  const {
    subscribers,
    subscribersLoading,
    subscribersErrorMessage,
    squares,
    squaresLoading,
  } = useAppSelector(state => state.dataState);
  const [currentTab, setCurrentTab] = useState('total');
  const [searchWord, setSearchWord] = useState('');
  const [searchSquare, setSearchSquare] = useState('');
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [paginationData, setPaginationData] = useState({
    pageSize: 100,
    pageNumber: 1,
  });
  
  console.log(paginationData);
  
  useEffect(() => {
    dispatch(getSquares());
  }, [dispatch]);
  
  useEffect(() => {
    dispatch(getSubscribers({
      type: currentTab,
      square: searchSquare,
      skip: paginationData?.pageNumber,
      limit: paginationData?.pageSize,
    }));
  }, [dispatch, currentTab, searchSquare, paginationData?.pageSize, paginationData?.pageNumber]);
  
  useEffect(() => {
    if (!!subscribersErrorMessage) setSnackBarOpen(true);
  }, [subscribersErrorMessage]);
  
  const onTabChange = value => setCurrentTab(value);
  
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
  };
  
  const subscribersBySearchWord = useCallback(() => {
    return subscribers?.filter(subscriber => subscriber?.name_abon?.toLowerCase()?.includes(searchWord?.toLowerCase()) || subscriber?.address?.toLowerCase()?.includes(searchWord?.toLowerCase()) || subscriber?.ls_abon?.toLowerCase()?.includes(searchWord?.toLowerCase()) || subscriber?.phone_abon?.toLowerCase()?.includes(searchWord?.toLowerCase()) || subscriber?.tariff?.toLowerCase()?.includes(searchWord?.toLowerCase()));
  }, [
    subscribers,
    searchWord
  ]);
  
  const handleSnackBarClose = () => {
    setSnackBarOpen(false);
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
        <Autocomplete
          value={squares?.find(square => square?.id === searchSquare)?.squares || ''}
          onChange={(_, value) => setSearchSquare(squares?.find(square => square?.squares === value)?.id)}
          options={squares?.map(square => square?.squares) || []}
          loading={squaresLoading}
          loadingText='Загрузка...'
          renderInput={(params) =>
            <TextField {...params} label='Фильтр по квадрату'
              size='small'
              required
            />}
        />
      </Box>
      <Tabs
        className='subscribers-tabs'
        value={currentTab}
        onChange={(_, value) => onTabChange(value)}
      >
        <Tab
          value='total'
          label='ОАБ'
        />
        <Tab
          value='active'
          label='ААБ'
        />
        <Tab
          value='nonactive'
          label='НАБ'
        />
      </Tabs>
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
        <SubscribersFooter
          paginationData={paginationData}
          handlePaginationDataChange={handlePaginationDataChange}
        />
      </TableContainer>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        open={snackBarOpen}
        onClose={handleSnackBarClose}
        message={subscribersErrorMessage}
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