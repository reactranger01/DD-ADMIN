import React from 'react';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DataGrid } from '@mui/x-data-grid';
function BetHistory() {
  const rows = [
    {
      id: 1,
      username: '',
      sportname: '',
      event: '',
      market: '188,250',
      selection: '0',
      type: '',
      oddsreq: '',
      stack: '',
      placetime: '',
      settletime: '',
    },
  ];
  const columns = [
    { headerName: 'User Name', field: 'username', width: '90' },
    { headerName: 'Sport Name', field: 'sportname', width: '90' },
    {
      headerName: 'Event',
      field: 'event',
      width: '90',
    },
    { headerName: 'Market', field: 'market', width: '90' },
    { headerName: 'Selection', field: 'selection', width: '90' },
    { headerName: 'Type', field: 'type', width: '90' },
    { headerName: 'Odds Req.', field: 'oddsreq', width: '90' },
    { headerName: 'Stack', field: 'stack', width: '90' },
    { headerName: 'Place Time', field: 'placetime', width: '90' },
    // { headerName: 'Settle time  ', field: 'settletime', width: '90' },
  ];
  return (
    <div className="items-center">
      <div className=" h-24 rounded-md border border-gray-700 bg-slate-100 text-gray-900 flex flex-row text-sm">
        <div className="flex-initial min-w-20">
          <h4 className="text-black text text-sm">Choose Type</h4>
          <select className=" bg-white rounded-md shadow-sm mt-4 min-w-20 max-w-32 h-10 ">
            <option value="10">UnSettle</option>
            <option value="10">Settle</option>
            <option value="25">Void</option>
          </select>
        </div>
        <div className="flex-initial w-40">
          <h4 className="text-black text text-sm">Choose Sport </h4>
          <select className=" bg-white rounded-md shadow-sm mt-4  w-32 h-10 ">
            <option value="10">Cricket</option>
            <option value="10">Tennis</option>
            <option value="25">Casino</option>
            <option value="100">Soccer</option>
          </select>
        </div>
        <div className="flex-initial w-44">
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
        <div className="flex-initial w-44">
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
        <div className="flex-initial h-8  rounded-md bg-[#071535] ml-2 mt-10 text-white  content-center w-24">
          <button className="p-1 font-semibold">Get History</button>
        </div>
      </div>
      <div className=" mt-4 border border-gray-500 rounded-sm h-full ">
        <div className="h-8 bg-[#071535]  rounded-t-sm text-sm font-semibold">
          <h3 className="p-1">BetHistory</h3>
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

export default BetHistory;
