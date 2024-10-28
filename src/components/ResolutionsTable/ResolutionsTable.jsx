import React, { useCallback } from 'react';
import { useAppSelector } from "../../app/hooks";
import {
  LinearProgress, Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@mui/material";
import { formatDate } from "../../constants";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const ResolutionsTable = ({ searchWord }) => {
  const {
    resolutions,
    resolutionsLoading,
  } = useAppSelector(state => state.dataState);
  
  const subscribersBySearchWord = useCallback(() => {
    return resolutions?.filter(resolution => resolution?.user_name?.toLowerCase()?.includes(searchWord?.toLowerCase()) || resolution?.ls?.toLowerCase()?.includes(searchWord?.toLowerCase()) || resolution?.service_engineer?.toLowerCase()?.includes(searchWord?.toLowerCase()) || resolution?.address?.toLowerCase()?.includes(searchWord?.toLowerCase()) || resolution?.square?.toLowerCase()?.includes(searchWord?.toLowerCase()));
  }, [
    resolutions,
    searchWord
  ]);
  
  return (
    <Table
      stickyHeader
      sx={{
        minWidth: 650,
      }}
      aria-label='sticky table'
    >
      <TableHead sx={{ position: 'relative' }}>
        {!!resolutionsLoading && <LinearProgress
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
            sx={{ minWidth: '120px' }}
          >ЛС</TableCell>
          <TableCell
            align='center'
            sx={{ minWidth: '250px' }}
          >СИ</TableCell>
          <TableCell
            align='center'
            sx={{ minWidth: '250px' }}
          >Адрес</TableCell>
          <TableCell
            align='center'
            sx={{ minWidth: '180px' }}
          >Квадат</TableCell>
          <TableCell
            align='center'
            sx={{ minWidth: '105px' }}
          >Дата закрытия</TableCell>
          <TableCell
            align='center'
            sx={{ minWidth: '130px' }}
          >Роутер</TableCell>
          <TableCell
            align='center'
            sx={{ minWidth: '130px' }}
          >ONU</TableCell>
          <TableCell
            align='center'
            sx={{ minWidth: '130px' }}
          >Приставка</TableCell>
          <TableCell
            align='center'
            sx={{ minWidth: '130px' }}
          >Блок питания</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {subscribersBySearchWord()?.length ? (
          subscribersBySearchWord() || []
        )?.map((row) => (
          <TableRow
            key={row.id}
          >
            <TableCell align='center'>{row?.user_name || '-'}</TableCell>
            <TableCell align='center'>{row?.ls || '-'}</TableCell>
            <TableCell align='center'>{row?.service_engineer || '-'}</TableCell>
            <TableCell align='center'>{row?.address || '-'}</TableCell>
            <TableCell align='center'>{row?.square || '-'}</TableCell>
            <TableCell align='center'>{row?.closed_date ? formatDate(row?.closed_date) : '-'}</TableCell>
            <TableCell align='center'>{row?.router || '-'}</TableCell>
            <TableCell align='center'>{row?.onu || '-'}</TableCell>
            <TableCell align='center'>{row?.set_top_box || '-'}</TableCell>
            <TableCell align='center'>{row?.power_block || '-'}</TableCell>
          </TableRow>
        )) : <TableRow>
          <TableCell colSpan={10}>
            <Box
              display='flex'
              justifyContent='center'
              alignItems='center'
              height='50px'
            >
              <Typography
                variant='h6'
                color='textSecondary'
              >
                Нет данных
              </Typography>
            </Box>
          </TableCell>
        </TableRow>}
      </TableBody>
    </Table>
  );
};

export default ResolutionsTable;