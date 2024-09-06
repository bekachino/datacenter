import React from 'react';
import {
  Button,
  createTheme,
  Dialog,
  DialogActions,
  DialogContent,
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
import Typography from "@mui/material/Typography";
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
    locations,
    locationsLoading,
    serviceEngineers,
    serviceEngineersLoading,
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
            <Box>
              <Typography variant='subtitle1'>
                по периоду
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  components={[
                    'SingleInputDateRangeField',
                  ]}
                >
                  <SingleInputDateRangeField
                    label='Выберите период'
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
            </Box>
            <Box>
              <Typography variant='subtitle1'>
                по статусу
              </Typography>
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
            </Box>
            <Box>
              <Typography
                variant='subtitle1'
                gutterBottom
              >
                по объекту
              </Typography>
              <Autocomplete
                disablePortal
                options={squares?.map(square => square?.squares) || []}
                renderInput={(params) =>
                  <TextField {...params} label='Квадрат'/>}
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
              <Autocomplete
                disablePortal
                options={locations?.map(location => location?.locations) || []}
                renderInput={(params) =>
                  <TextField {...params} label='Локация'/>}
                size='small'
                loading={locationsLoading}
                value={locations?.find(location => location?.id === filterData?.location_id)?.locations}
                onChange={(_, value) => handleFilterDataChange({
                  target: {
                    name: 'location_id',
                    value: locations?.find(location => location?.locations === value)?.id,
                  }
                })}
                sx={{ pt: 1 }}
              />
            </Box>
            <Box>
              <Typography
                variant='subtitle1'
                gutterBottom
              >
                по субъекту
              </Typography>
              <Autocomplete
                disablePortal
                options={serviceEngineers?.map(serviceEngineer => serviceEngineer?.service_engineers_id) || []}
                renderInput={(params) => <TextField {...params} label='СИ'/>}
                size='small'
                loading={serviceEngineersLoading}
                value={serviceEngineers?.find(serviceEngineer => serviceEngineer?.id === filterData?.service_engineers_id)?.service_engineers_id}
                onChange={(_, value) => handleFilterDataChange({
                  target: {
                    name: 'service_engineers_id',
                    value: serviceEngineers?.find(serviceEngineer => serviceEngineer?.service_engineers_id === value)?.service_engineers_id,
                  }
                })}
              />
            </Box>
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