import React from 'react';
import { RxCross2 } from 'react-icons/rx';
import PropTypes from 'prop-types';
import { DataGrid } from '@mui/x-data-grid';

const Exposure = ({
  isOpenexposure,
  handleCloseexposure,
  data,
  setReftech,
}) => {
  const ro = [];
  const colms = [
    { headerName: 'Sport Name', field: 'sportname', width: '250' },
    { headerName: 'Event Name', field: 'eventname', width: '285' },
    {
      headerName: 'Market Name ',
      field: 'marketname',
      width: '300',
    },
    { headerName: 'Bet Count', field: 'betcount', width: '250' },
  ];
  return (
    <div
      className={
        isOpenexposure
          ? 'fixed inset-0 bg-gray-500 bg-opacity-75 overflow-y-auto px-4 py-6 sm:px-0 z-10'
          : 'hidden'
      }
    >
      <div className="text-sm text-white font-bold text-center h-4 rounded-t-lg bg-[#071535] relative w-full max-w-6xl mx-auto shadow-md px-8 py-4 row flex">
        <h4 className="mt-[-0.5rem] grow text-left">
          Exposure Details- aakashkishan
        </h4>
        <button className=" flex-none">
          <RxCross2
            className="h-4 w-4 mt-[-0.5rem]   "
            onClick={handleCloseexposure}
          />
        </button>
      </div>
      <div className="relative  w-full max-w-6xl mx-auto shadow-md rounded-b-lg bg-white px-8 py-4">
        <div className="card mb-4 ">
          <div className="w-100% h-full font-semibold">
            <DataGrid
              autoHeight
              className="css-1yiktpq-MuiDataGrid-root"
              columns={colms}
              rows={ro}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
Exposure.propTypes = {
  isOpenexposure: PropTypes.bool.isRequired,
  handleCloseexposure: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  setReftech: PropTypes.func.isRequired,
};
export default Exposure;
