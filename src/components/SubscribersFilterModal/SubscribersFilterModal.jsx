import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField
} from "@mui/material";
import './subscribersFilterModal.css';
import { Autocomplete, LoadingButton } from "@mui/lab";
import { useAppSelector } from "../../app/hooks";

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
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}
      >
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
          renderInput={(params) => <TextField {...params} label='Квадрат'/>}
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
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          variant='outlined'
          color='warning'
        >Отмена</Button>
        <LoadingButton
          onClick={getSubscribersByFilters}
          variant='contained'
          color='success'
          loading={subscribersLoading}
        >
          Поиск
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default SubscribersFilterModal;