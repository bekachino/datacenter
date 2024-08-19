import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  Autocomplete,
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
  getResolutions, getSquares, getTemplates, getWorks, getWorkStatuses
} from "../../features/dataThunk";
import { formatDate } from "../../constants";
import Box from "@mui/material/Box";
import SubscribersFooter
  from "../../components/SubscribersFooter/SubscribersFooter";
import '../Subscribers/subscribers.css';

const Works = () => {
  const dispatch = useAppDispatch();
  const {
    works,
    worksLoading,
    worksErrorMessage,
    squares,
    squaresLoading,
    squaresErrorMessage,
    templates,
    templatesErrorMessage,
    resolutions,
    resolutionsErrorMessage,
    statuses,
    statusesErrorMessage,
  } = useAppSelector(state => state.dataState);
  const [searchWord, setSearchWord] = useState('');
  const [searchSquare, setSearchSquare] = useState('');
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [paginationData, setPaginationData] = useState({
    pageSize: 100,
    pageNumber: 1,
  });
  
  useEffect(() => {
    dispatch(getSquares());
    dispatch(getTemplates());
    dispatch(getResolutions());
    dispatch(getWorkStatuses());
  }, [dispatch]);
  
  useEffect(() => {
    dispatch(getWorks({
      square: searchSquare,
      skip: paginationData?.pageNumber,
      limit: paginationData?.pageSize,
    }));
  }, [
    dispatch,
    searchSquare,
    paginationData?.pageSize,
    paginationData?.pageNumber
  ]);
  
  useEffect(() => {
    if (!!worksErrorMessage || !!squaresErrorMessage || !!templatesErrorMessage || !!resolutionsErrorMessage || !!statusesErrorMessage) setSnackBarOpen(true);
  }, [
    squaresErrorMessage,
    templatesErrorMessage,
    worksErrorMessage,
    resolutionsErrorMessage,
    statusesErrorMessage,
  ]);
  
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
  
  const worksBySearchWord = useCallback(() => {
    return works?.filter(subscriber => subscriber?.created_at?.toLowerCase()?.includes(searchWord?.toLowerCase()));
  }, [
    works,
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
            />}
        />
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
            {worksLoading && <LinearProgress
              color='inherit'
              className='subscribers-progress-bar'
            />}
            <TableRow>
              <TableCell
                align='center'
                sx={{ minWidth: '180px' }}
              >Шаблон</TableCell>
              <TableCell
                align='center'
                sx={{ minWidth: '150px' }}
              >Резолюция</TableCell>
              <TableCell
                align='center'
                sx={{ minWidth: '250px' }}
              >Статус работы</TableCell>
              <TableCell
                align='center'
                sx={{ minWidth: '130px' }}
              >Наряд</TableCell>
              <TableCell
                align='center'
                sx={{ minWidth: '180px' }}
              >Создан</TableCell>
              <TableCell
                align='center'
                sx={{ minWidth: '105px' }}
              >Закрыт</TableCell>
              <TableCell
                align='center'
                sx={{ minWidth: '150px' }}
              >Квадрат</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(
              worksBySearchWord() || []
            )?.map((row) => (
              <TableRow
                key={row.id}
              >
                <TableCell align='center'>{templates?.find(template => template?.id === row?.templates_tip_id)?.name || '-'}</TableCell>
                <TableCell align='center'>{resolutions?.find(resolution => resolution?.id === row?.resolution_work_id)?.name || '-'}</TableCell>
                <TableCell align='center'>{statuses?.find(status => status?.id === row?.status_work_id)?.name || '-'}</TableCell>
                <TableCell align='center'>{row?.worker_id || '-'}</TableCell>
                <TableCell align='center'>{row?.created_at ? formatDate(row?.created_at) : '-'}</TableCell>
                <TableCell align='center'>{row?.closed_at ? formatDate(row?.closed_at) : '-'}</TableCell>
                <TableCell align='center'>{squares?.find(square => square?.id === row?.squares)?.squares || '-'}</TableCell>
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
        message={worksErrorMessage || squaresErrorMessage || templatesErrorMessage || resolutionsErrorMessage || statusesErrorMessage}
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

export default Works;