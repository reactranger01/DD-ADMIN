import React from 'react';
import { Pagination, Select, MenuItem } from '@mui/material';
import { PropTypes } from 'prop-types';

const RowsPerPageSelector = ({
  paginationModel,
  setPaginationModel,
  pageCount,
}) => {
  const handlePageChange = (event, newPage) => {
    setPaginationModel((prevModel) => ({ ...prevModel, page: newPage - 1 }));
  };

  const handlePageSizeChange = (event) => {
    const newPageSize = parseInt(event.target.value, 10);
    setPaginationModel((prevModel) => ({
      ...prevModel,
      pageSize: newPageSize,
    }));
  };
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between items-center px-4 py-2 text-white gap-3 sm:gap-0">
      <div className="flex items-center">
        <Select
          className="bg-white text-black px-2 py-1 rounded-lg ml-2"
          value={paginationModel.pageSize}
          onChange={handlePageSizeChange}
          sx={{
            '& .MuiSelect-select': {
              padding: '4px 8px',
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
            },
            minWidth: { xs: 60, sm: 80 },
          }}
          size="small"
        >
          {' '}
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={70}>70</MenuItem>
          <MenuItem value={100}>100</MenuItem>
        </Select>
      </div>

      <Pagination
        count={pageCount}
        page={paginationModel.page + 1}
        onChange={handlePageChange}
        color="primary"
        sx={{
          '& .MuiPaginationItem-root': {
            color: 'white',
            fontSize: { xs: '0.75rem', sm: '0.875rem' },
          },
          '& .Mui-selected': {
            backgroundColor: '#00D3CA',
            color: 'white',
          },
          '& .MuiPaginationItem-ellipsis': {
            fontSize: { xs: '0.75rem', sm: '0.875rem' },
          },
        }}
        className="mt-2 sm:mt-0"
      />
    </div>
  );
};
RowsPerPageSelector.propTypes = {
  pageCount: PropTypes.any,
  setPaginationModel: PropTypes.func,
  paginationModel: PropTypes.any,
};
export default RowsPerPageSelector;
