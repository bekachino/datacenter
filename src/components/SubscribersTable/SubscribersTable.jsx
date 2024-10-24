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

const SubscribersTable = ({ searchWord }) => {
  const {
    subscribers,
    subscribersLoading,
    squares,
  } = useAppSelector(state => state.dataState);
  
  const subscribersBySearchWord = useCallback(() => {
    return subscribers?.filter(subscriber => subscriber?.name_abon?.toLowerCase()?.includes(searchWord?.toLowerCase()) || subscriber?.address?.toLowerCase()?.includes(searchWord?.toLowerCase()) || subscriber?.ls_abon?.toLowerCase()?.includes(searchWord?.toLowerCase()) || subscriber?.phone_abon?.toLowerCase()?.includes(searchWord?.toLowerCase()) || subscriber?.tariff?.toLowerCase()?.includes(searchWord?.toLowerCase()));
  }, [
    subscribers,
    searchWord
  ]);
  
  return (
    <Table
      sx={{
        minWidth: 650,
      }}
      aria-label='simple table'
    >
      <TableHead sx={{ position: 'relative' }}>
        {!!subscribersLoading && <LinearProgress
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
            sx={{ minWidth: '140px' }}
          >Стоимость ТП</TableCell>
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
        {subscribersBySearchWord()?.length ? (
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

export default SubscribersTable;