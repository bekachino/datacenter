import React from 'react';
import { useAppSelector } from "../../app/hooks";
import {
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@mui/material";

const SubscribersStatisticsTable = () => {
  const {
    subscribersStatistics,
    subscribersStatisticsLoading,
  } = useAppSelector(state => state.dataState);
  
  return (
    <Table
      stickyHeader
      aria-label='sticky table'
    >
      <TableHead sx={{ position: 'relative' }}>
        {!!subscribersStatisticsLoading && <LinearProgress
          color='inherit'
          className='subscribers-progress-bar'
        />}
        <TableRow>
          <TableCell
            align='center'
            sx={{ minWidth: '100px' }}
          >АБ / Тарифы</TableCell>
          <TableCell
            align='center'
            sx={{ minWidth: '100px' }}
          >Количесвто</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell align='center'><strong>ОАБ</strong></TableCell>
          <TableCell align='center'>{!!subscribersStatistics && subscribersStatistics.total_subscribers}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell align='center'><strong>ААБ</strong></TableCell>
          <TableCell align='center'>{(
            !!subscribersStatistics && subscribersStatistics?.subscribers_by_state?.['Актив']
          ) || '-'}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell align='center'><strong>НАБ</strong></TableCell>
          <TableCell align='center'>{(
            !!subscribersStatistics && subscribersStatistics?.subscribers_by_state?.['Неактив']
          ) || '-'}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell align='center'><strong>Физ. лица</strong></TableCell>
          <TableCell align='center'>{(
            !!subscribersStatistics && subscribersStatistics?.subscribers_by_type_abon?.['ФЛ']
          ) || '-'}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell align='center'><strong>Юр. лица</strong></TableCell>
          <TableCell align='center'>{(
            !!subscribersStatistics && subscribersStatistics?.subscribers_by_type_abon?.['ЮЛ']
          ) || '-'}</TableCell>
        </TableRow>
        {(!!subscribersStatistics?.subscribers_by_tariff ? Object.keys(subscribersStatistics.subscribers_by_tariff) : []).map(tariffName => (
          <TableRow>
            <TableCell align='center'>{tariffName}</TableCell>
            <TableCell align='center'>{subscribersStatistics?.subscribers_by_tariff?.[tariffName]}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SubscribersStatisticsTable;