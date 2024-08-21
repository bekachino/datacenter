import React from 'react';
import {
  Autocomplete, Button, Dialog, DialogActions, DialogTitle, TextField
} from "@mui/material";
import Box from "@mui/material/Box";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ruRU } from '@mui/x-date-pickers/locales';
import dayjs from "dayjs";

const WorkFilters = ({
  open,
  handleClose,
  searchSquareValue,
  searchSquareOptions,
  onSearchSquareEdit,
  squaresLoading,
  getFilteredWorks,
  handleFilterWorksDatesChange,
  filterWorksDates,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        '& div[role=dialog]': {
          backgroundImage: 'linear-gradient(rgb(255 255 255 / 4%), rgb(255 255 255 / 6%))!important',
          p: '0 10px 15px',
          m: 2,
          width: '100%',
          maxWidth: '400px',
        },
      }}
    >
      <DialogTitle>Фильтр нарядов</DialogTitle>
      <Box sx={{ p: 1 }}>
        <Autocomplete
          value={searchSquareValue}
          onChange={(_, value) => onSearchSquareEdit(value)}
          options={searchSquareOptions}
          loading={squaresLoading}
          loadingText='Загрузка...'
          renderInput={(params) =>
            <TextField {...params} label='Фильтр по квадрату'
              size='small'
            />}
        />
        <Box sx={{ mt: 2 }}>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText}
          >
            <DemoContainer components={['DatePicker']}>
              <DatePicker
                label='Создан (начало даты)'
                format='DD/MM/YYYY'
                sx={{ flexGrow: 1 }}
                value={!!filterWorksDates?.created_at_from ? dayjs(filterWorksDates?.created_at_from) : null}
                onChange={value => handleFilterWorksDatesChange({
                  target: {
                    name: 'created_at_from',
                    value: value?.$d
                  }
                })}
              />
              <DatePicker
                label='Создан (конец даты)'
                format='DD/MM/YYYY'
                sx={{
                  flexGrow: 1,
                  mt: '10px!important'
                }}
                value={!!filterWorksDates?.created_at_to ? dayjs(filterWorksDates?.created_at_to) : null}
                onChange={value => handleFilterWorksDatesChange({
                  target: {
                    name: 'created_at_to',
                    value: value?.$d
                  }
                })}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Box>
        <Box sx={{ mt: 2 }}>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText}
          >
            <DemoContainer components={['DatePicker']}>
              <DatePicker
                label='Закрыт (начало даты)'
                format='DD/MM/YYYY'
                sx={{ flexGrow: 1 }}
                value={!!filterWorksDates?.closed_at_from ? dayjs(filterWorksDates?.closed_at_from) : null}
                onChange={value => handleFilterWorksDatesChange({
                  target: {
                    name: 'closed_at_from',
                    value: value?.$d
                  }
                })}
              />
              <DatePicker
                label='Закрыт (конец даты)'
                format='DD/MM/YYYY'
                sx={{
                  flexGrow: 1,
                  mt: '10px!important'
                }}
                value={!!filterWorksDates?.closed_at_to ? dayjs(filterWorksDates?.closed_at_to) : null}
                onChange={value => handleFilterWorksDatesChange({
                  target: {
                    name: 'closed_at_to',
                    value: value?.$d
                  }
                })}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Box>
      </Box>
      <DialogActions>
        <Button
          variant='outlined'
          sx={{ flexGrow: 1 }}
          onClick={getFilteredWorks}
        >Subscribe</Button>
      </DialogActions>
    </Dialog>
  );
};

export default WorkFilters;