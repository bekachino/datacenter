import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Radio,
  RadioGroup
} from "@mui/material";
import './subscribersFilterModal.css';
import { LoadingButton } from "@mui/lab";
import { useAppSelector } from "../../app/hooks";

const SubscribersFilterModal = ({
  open,
  handleClose,
  handleFilterDataChange,
  getSubscribersByFilters,
  abonType,
}) => {
  const {
    subscribersLoading,
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
      <DialogContent>
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
          value={abonType}
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