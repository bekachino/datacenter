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

const SubscribersGroupDataTable = () => {
  const {
    groupedSubscribersData,
    groupedSubscribersDataLoading,
  } = useAppSelector(state => state.dataState);
  
  return (
    <Table
      stickyHeader
      sx={{
        minWidth: 650,
      }}
      aria-label='sticky table'
    >
      <TableHead sx={{ position: 'relative' }}>
        {!!groupedSubscribersDataLoading && <LinearProgress
          color='inherit'
          className='subscribers-progress-bar'
        />}
        <TableRow>
          <TableCell
            align='center'
            sx={{ minWidth: '150px' }}
          >Дата</TableCell>
          <TableCell
            align='center'
            sx={{ minWidth: '120px' }}
          >Promo</TableCell>
          <TableCell
            align='center'
            sx={{ minWidth: '120px' }}
          >Ultra</TableCell>
          <TableCell
            align='center'
            sx={{ minWidth: '120px' }}
          >Корпоративный</TableCell>
          <TableCell
            align='center'
            sx={{ minWidth: '120px' }}
          >ААБ</TableCell>
          <TableCell
            align='center'
            sx={{ minWidth: '120px' }}
          >НАБ</TableCell>
          <TableCell
            align='center'
            sx={{ minWidth: '120px' }}
          >ОАБ</TableCell>
          <TableCell
            align='center'
            sx={{ minWidth: '150px' }}
          >Средняя дата платежа</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {groupedSubscribersData?.length ? (
          groupedSubscribersData || []
        )?.map((row) => (
          <TableRow
            key={row.id}
          >
            <TableCell align='center'>{row?.['Дата'] || '-'}</TableCell>
            <TableCell align='center'>{row?.Promo || '-'}</TableCell>
            <TableCell align='center'>{row?.Ultra || '-'}</TableCell>
            <TableCell align='center'>{row?.Corporate || '-'}</TableCell>
            <TableCell align='center'>{row?.['Активный'] || '-'}</TableCell>
            <TableCell align='center'>{row?.['Неактивный'] || '-'}</TableCell>
            <TableCell align='center'>{row?.['всего'] || '-'}</TableCell>
            <TableCell align='center'>{row?.['Средняя дата платежа'] || '-'}</TableCell>
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

export default SubscribersGroupDataTable;