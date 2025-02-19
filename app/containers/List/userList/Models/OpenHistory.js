import React from 'react';
import { RxCross2 } from 'react-icons/rx';
import PropTypes from 'prop-types';
import { DataGrid } from '@mui/x-data-grid';

const OpenHistory = ({
  isOpenHistory,
  handleClosehistory,
  data,
  setReftech,
}) => {
  console.log(data, setReftech, 'OpenHistory');

  const row = [
    {
      id: 1,
      formname: '',
      username: '',
      oldcreditref: '',
      newcreditref: '',
      date: '',
    },
  ];
  const col = [
    { headerName: 'Form Name', field: 'formname', width: '216' },
    { headerName: 'User Name', field: 'username', width: '150' },
    {
      headerName: 'Old Credit refrence',
      field: 'oldcreditref',
      width: '260',
    },
    { headerName: 'New Credit refrence', field: 'newcreditref', width: '260' },
    { headerName: 'Date', field: 'date', width: '200' },
  ];
  return (
    <div
      className={
        isOpenHistory
          ? 'fixed inset-0 bg-gray-500 bg-opacity-75 overflow-y-auto px-4 py-6 sm:px-0 z-10'
          : 'hidden'
      }
    >
      <div className="text-sm text-white font-bold text-center h-4 rounded-t-lg bg-[#071535] relative w-full max-w-6xl mx-auto shadow-md px-8 py-4 row flex">
        <h4 className="mt-[-0.5rem] grow text-left">
          Credit Reference Log - aakashkishan
        </h4>
        <button className=" flex-none">
          <RxCross2
            className="h-4 w-4 mt-[-0.5rem]   "
            onClick={handleClosehistory}
          />
        </button>
      </div>
      <div className="relative  w-full max-w-6xl mx-auto shadow-md rounded-b-lg bg-white px-8 py-4">
        {/* <div className="grid grid-cols-2 gap-4 text-slate-950 text-sm ">
          <div className="">
            Show
            <select className="border border-gray-300 rounded-sm shadow-sm mt-4 h-7  mx-1">
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="100">100</option>
            </select>
            entries
          </div>
          <div className=" flex flex-row-reverse">
            <input className="border border-slate-300 rounded-md mx-4 p-1 my-4" />
            <h4 className="my-4  text-slate-950">Search : </h4>
          </div>
        </div> */}
        <div className="card mb-4 ">
          <div className="w-100% h-full font-semibold custom-table">
            <DataGrid
              autoHeight
              className="css-1yiktpq-MuiDataGrid-root"
              columns={col}
              rows={row}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

OpenHistory.propTypes = {
  isOpenHistory: PropTypes.bool.isRequired,
  handleClosehistory: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  setReftech: PropTypes.func.isRequired,
};
export default OpenHistory;
