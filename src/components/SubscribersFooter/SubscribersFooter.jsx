import React from 'react';
import {
  Box, FormControl, InputLabel, MenuItem, Pagination, Select
} from "@mui/material";
import './subscribersFooter.css';
import { useLocation } from "react-router-dom";

const SubscribersFooter = ({
  paginationData,
  handlePaginationDataChange
}) => {
  const location = useLocation().pathname;
  //const { goodsPagesAmount } = useAppSelector(state => state.dataState);
  //const { tradesPagesAmount } = useAppSelector(state => state.tradeState);
  //const pagesArray = useCallback(() => {
  //  return Array.from({ length: location.includes('goods') ? goodsPagesAmount
  // : tradesPagesAmount || 0 }, (_, index) => index); }, [ goodsPagesAmount,
  // location, tradesPagesAmount ]);
  
  return (
    <Box className='subscribers-footer'>
      <Pagination
        count={10}
        variant='outlined'
        sx={{ m: '0 auto' }}
        onChange={(_, value) => handlePaginationDataChange({
          target: {
            name: 'pageNumber',
            value: value,
          }
        })}
      />
      <FormControl className='subscribers-footer-page-size'>
        <InputLabel
          id='demo-simple-select-label'
          variant='standard'
        >товаров на страницу</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          name='pageSize'
          value={paginationData?.pageSize}
          label='товаров на страницу'
          onChange={handlePaginationDataChange}
          variant='standard'
          sx={{ minWidth: '200px' }}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SubscribersFooter;