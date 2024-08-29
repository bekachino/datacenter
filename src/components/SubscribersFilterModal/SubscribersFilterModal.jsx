import React from 'react';
import {
  Button,
  createTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  ThemeProvider
} from "@mui/material";
import { Autocomplete, LoadingButton } from "@mui/lab";
import { useAppSelector } from "../../app/hooks";
import Box from "@mui/material/Box";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  SingleInputDateRangeField
} from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import { ruRU } from '@mui/x-date-pickers/locales';
import './subscribersFilterModal.css';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
}, ruRU,);

const SubscribersFilterModal = ({
  open,
  handleClose,
  handleFilterDataChange,
  getSubscribersByFilters,
  filterData,
}) => {
  const {
    subscribersLoading,
    squares,
    squaresLoading,
  } = useAppSelector(state => state.dataState);
  
  return (
    <ThemeProvider theme={theme}>
      <Dialog
        className='subscribers-filter-modal'
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          Поиск по фильтрам
        </DialogTitle>
        <DialogContent
        >
          <Box
            component='form'
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}
            onSubmit={getSubscribersByFilters}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={[
                  'SingleInputDateRangeField',
                ]}
              >
                <SingleInputDateRangeField
                  label='Controlled field'
                  value={filterData?.startEndRange}
                  onChange={(value) => handleFilterDataChange({
                    target: {
                      name: 'startEndRange',
                      value
                    }
                  })}
                  format='DD.MM.YYYY'
                  size='small'
                  required
                />
              </DemoContainer>
            </LocalizationProvider>
            <RadioGroup
              className='abon-type-radio-group'
              row
              aria-labelledby='demo-row-radio-buttons-group-label'
              name='row-radio-buttons-group'
              onChange={(_, value) => handleFilterDataChange({
                target: {
                  name: 'abonType',
                  value
                }
              })}
              value={filterData.abonType}
            >
              <FormControlLabel
                value='active'
                control={<Radio color='success'/>}
                label='ААБ'
              />
              <FormControlLabel
                value='nonactive'
                control={<Radio color='error'/>}
                label='НАБ'
              />
              <FormControlLabel
                value='total'
                control={<Radio color='secondary'/>}
                label='ОАБ'
              />
            </RadioGroup>
            <Autocomplete
              disablePortal
              options={squares?.map(square => square?.squares) || []}
              renderInput={(params) => <TextField {...params} label='Квадрат'
                required
              />}
              size='small'
              loading={squaresLoading}
              value={squares?.find(square => square?.id === filterData?.squares_id)?.squares}
              onChange={(_, value) => handleFilterDataChange({
                target: {
                  name: 'squares_id',
                  value: squares?.find(square => square?.squares === value)?.id,
                }
              })}
            />
            <DialogActions>
              <Button
                onClick={handleClose}
                variant='outlined'
                color='warning'
              >Отмена</Button>
              <LoadingButton
                type='submit'
                variant='contained'
                color='success'
                loading={subscribersLoading}
              >
                Поиск
              </LoadingButton>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
};

export default SubscribersFilterModal;