import React from 'react';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
function ProfitandLose() {
  const rows = [
    {
      id: 1,
      sportname: 'CRICKET',
      profitlose: 'C188,250',
      commission: '188,250',
      totalpl: '0',
    },
    {
      id: 2,
      sportname: 'CRICKET',
      profitlose: 'C188,250',
      commission: '188,250',
      totalpl: '0',
    },
  ];
  const columns = [
    {
      headerName: 'Sport Name',
      field: 'sportname',
      type: 'string',
      flex: 1,
      minWidth: 250,
      width: 250,
      renderCell: () => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Link to="/myaccount/downline_profitlose_event">
            <h6 className="text-blue-400">Cricket</h6>
          </Link>
        </div>
      ),
    },
    {
      headerName: 'Profit & Loss',
      field: 'profitlose',
      flex: 1,
      minWidth: 250,
      width: 250,
    },
    {
      headerName: 'Commission',
      field: 'commission',
      flex: 1,
      minWidth: 250,
      width: 250,
    },
    {
      headerName: 'Total P&L',
      field: 'totalpl',
      flex: 1,
      minWidth: 200,
      width: 200,
    },
  ];
  return (
    <div className="items-center">
      <div className=" h-24 rounded-md border border-gray-700 bg-slate-100 text-gray-900 flex flex-row">
        <div className="flex-initial w-44 m-2 text-xs">
          <h3>From</h3>
          <div className="mt-4">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                className="mt-4"
                sx={{
                  '& .MuiInputBase-input': {
                    height: '5px',
                    fontSize: '15px',
                    width: '6rem',
                  },
                }}
              />
            </LocalizationProvider>
          </div>
        </div>
        <div className="flex-initial w-44 m-2 text-xs">
          <h3>To</h3>
          <div className="mt-4">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                className="mt-4"
                sx={{
                  '& .MuiInputBase-input': {
                    height: '5px',
                    fontSize: '15px',
                    width: '6rem',
                  },
                }}
              />
            </LocalizationProvider>
          </div>
        </div>
        <div className="flex-initial h-8  rounded-md bg-slate-800 ml-2 mt-12 text-white  content-center ">
          <button className="p-1 font-semibol px-2 text-sm">Get P&L</button>
        </div>
      </div>
      <div className=" mt-4 border border-gray-500 rounded-sm h-full ">
        <div className="h-8 bg-[#071535] rounded-t-sm text-sm font-semibold">
          <h3 className="p-1">Profit/Loss</h3>
        </div>

        <div className="grid grid-cols-2 gap-4 text-slate-950 text-sm ">
          {/* <div className="ml-4">
            Show
            <select className="border border-gray-300 rounded-sm shadow-sm mt-4 h-7  mx-1">
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="100">100</option>
            </select>
            entries
          </div> */}
          {/* <div className=" flex flex-row-reverse">
            <input className="border border-slate-300 rounded-md mx-4 p-1 my-4" />
            <h4 className="my-4  text-slate-950">Search : </h4>
          </div> */}
        </div>
        <div className="card mx-4 mb-4 ">
          <div className="w-100% h-full font-semibold custom-table">
            <DataGrid
              autoHeight
              className="css-1yiktpq-MuiDataGrid-root"
              columns={columns}
              rows={rows}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfitandLose;
