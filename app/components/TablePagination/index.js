import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';

const TablePagination = ({ onChange, page, count }) => {
  return (
    <div className="pagination flex items-center justify-end py-3">
      <Stack spacing={2}>
        <Pagination
          disableElevation
          disableRipple
          page={page + 1} // MUI pagination is 1-based, so adjust from 0-based
          count={count}
          variant="outlined"
          shape="rounded"
          onChange={onChange}
          sx={{
            '.MuiPaginationItem-rounded.Mui-selected': {
              background: '#00D3CA',
            },
          }}
        />
      </Stack>
    </div>
  );
};

TablePagination.propTypes = {
  page: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
};

export default TablePagination;
