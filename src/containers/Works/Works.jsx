import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  Autocomplete,
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
  getResolutions, getSquares, getTemplates, getWorks, getWorkStatuses
} from "../../features/dataThunk";
import { formatDate } from "../../constants";
import Box from "@mui/material/Box";
import SubscribersFooter
  from "../../components/SubscribersFooter/SubscribersFooter";
import '../Subscribers/subscribers.css';
import WorkFilters from "../../components/WorkFilters/WorkFilters";

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
  const [workFiltersOpen, setWorkFiltersOpen] = useState(false);
  const [paginationData, setPaginationData] = useState({
    pageSize: 100,
    pageNumber: 1,
  });
  const [reformattedWorks, setReformattedWorks] = useState([]);
  const [filterWorksDates, setFilterWorksDates] = useState(null);
  
  useEffect(() => {
    dispatch(getSquares());
    dispatch(getTemplates());
    dispatch(getResolutions());
    dispatch(getWorkStatuses());
  }, [dispatch]);
  
  useEffect(() => {
    dispatch(getWorks({
      skip: paginationData?.pageNumber,
      limit: paginationData?.pageSize,
    }));
  }, [
    dispatch,
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
  
  useEffect(() => {
    const reformattedWorks = works?.map(work => (
      {
        ...work,
        templates_tip: templates?.find(template => template?.id === work?.templates_tip_id),
        resolution_work: resolutions?.find(resolution => resolution?.id === work?.resolution_work_id),
        status_work: statuses?.find(status => status?.id === work?.status_work_id),
        square: squares?.find(square => square?.id === work?.squares),
        created_at: formatDate(work?.created_at),
        closed_at: formatDate(work?.closed_at),
      }
    ));
    setReformattedWorks(reformattedWorks);
  }, [
    resolutions,
    squares,
    statuses,
    templates,
    works,
  ]);
  
  const getFilteredWorks = () => {
    handleWorkFiltersClose();
    dispatch(getWorks({
      created_at_from: filterWorksDates?.created_at_from,
      created_at_to: filterWorksDates?.created_at_to || formatDate(new Date(), true),
      closed_at_from: filterWorksDates?.closed_at_from,
      closed_at_to: filterWorksDates?.closed_at_to || formatDate(new Date(), true),
      square: searchSquare,
      skip: paginationData?.pageNumber,
      limit: paginationData?.pageSize,
    }));
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
  };
  
  const handleFilterWorksDatesChange = (e) => {
    const {
      name,
      value
    } = e.target;
    if (!value) return;
    setFilterWorksDates(prevState => (
      {
        ...prevState,
        [name]: formatDate(value, true),
      }
    ));
  };
  
  const worksBySearchWord = useCallback(() => {
    return reformattedWorks?.filter(subscriber => subscriber?.created_at?.toLowerCase()?.includes(searchWord?.toLowerCase()) || subscriber?.closed_at?.toLowerCase()?.includes(searchWord?.toLowerCase()) || subscriber?.templates_tip?.name?.toLowerCase()?.includes(searchWord?.toLowerCase()) || subscriber?.resolution_work?.name?.toLowerCase()?.includes(searchWord?.toLowerCase()) || subscriber?.status_work?.name?.toLowerCase()?.includes(searchWord?.toLowerCase()) || subscriber?.square?.squares?.toLowerCase()?.includes(searchWord?.toLowerCase()));
  }, [
    reformattedWorks,
    searchWord
  ]);
  
  const handleSnackBarClose = () => {
    setSnackBarOpen(false);
  };
  
  const handleWorkFiltersClose = () => {
    setWorkFiltersOpen(false);
  };
  
  const onSearchSquareEdit = (value) => setSearchSquare(squares?.find(square => square?.squares === value)?.id);
  
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
          color='secondary'
          sx={{
            ml: 'auto',
            minWidth: '250px'
          }}
          variant='outlined'
          onClick={() => setWorkFiltersOpen(true)}
          size='small'
        >Фильтры...</Button>
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
                sx={{ minWidth: '150px' }}
              >Сервис инженер</TableCell>
              <TableCell
                align='center'
                sx={{ minWidth: '160px' }}
              >Создан</TableCell>
              <TableCell
                align='center'
                sx={{ minWidth: '160px' }}
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
                <TableCell align='center'>{row?.templates_tip?.name || '-'}</TableCell>
                <TableCell align='center'>{row?.resolution_work?.name || '-'}</TableCell>
                <TableCell align='center'>{row?.status_work?.name || '-'}</TableCell>
                <TableCell align='center'>{row?.worker_id || '-'}</TableCell>
                <TableCell align='center'>{row?.created_at || '-'}</TableCell>
                <TableCell align='center'>{row?.closed_at || '-'}</TableCell>
                <TableCell align='center'>{row?.square?.squares || '-'}</TableCell>
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
      <WorkFilters
        open={workFiltersOpen}
        handleClose={handleWorkFiltersClose}
        searchSquareValue={squares?.find(square => square?.id === searchSquare)?.squares || ''}
        searchSquareOptions={squares?.map(square => square?.squares) || []}
        onSearchSquareEdit={onSearchSquareEdit}
        squaresLoading={squaresLoading}
        getFilteredWorks={getFilteredWorks}
        handleFilterWorksDatesChange={handleFilterWorksDatesChange}
        filterWorksDates={filterWorksDates}
      />
    </div>
  );
};

export default Works;