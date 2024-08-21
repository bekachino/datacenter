import React from 'react';
import {
  Autocomplete, Button, Dialog, DialogActions, DialogTitle, TextField
} from "@mui/material";
import Box from "@mui/material/Box";

const WorkFilters = ({
  open,
  handleClose,
  searchSquareValue,
  searchSquareOptions,
  onSearchSquareEdit,
  squaresLoading,
  getFilteredWorks,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        '& div[role=dialog]': {
          backgroundImage: 'linear-gradient(rgb(255 255 255 / 4%), rgb(255 255 255 / 6%))!important',
          p: '0 20px 10px',
          m: 2,
          width: '100%',
          maxWidth: '400px',
        }
      }}
    >
      <DialogTitle>Фильтр нарядов</DialogTitle>
      <Box sx={{p: 1}}>
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