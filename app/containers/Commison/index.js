import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DataGrid } from '@mui/x-data-grid';

function Commisson() {
  const rows = [
    {
      id: 1,
      agentname: 'mumka15',
      turnover: 0,
      commission: 0,
      action: '(0)',
    },
    {
      id: 2,
      agentname: 'playerexch08',
      turnover: 0,
      commission: 0,
      action: '(0)',
    },
    {
      id: 3,
      agentname: 'rahulking34',
      turnover: 0,
      commission: 0,
      action: '(0)',
    },
  ];
  // test comment
  const columns = [
    {
      headerName: 'Agent Name',
      field: 'agentname',
      type: 'string',
      flex: 1,
      minWidth: 200,
      width: 250,
    },
    {
      headerName: 'Turn Over',
      field: 'turnover',
      minWidth: 200,
      width: 200,
      flex: 1,
    },
    {
      headerName: 'Commission',
      field: 'commission',
      flex: 1,
      minWidth: 200,
      width: 200,
    },
    {
      headerName: 'Action',
      field: 'action',
      flex: 1,
      width: 350,
      minWidth: 350,
      renderCell: () => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <button className="h-8 w-20 bg-slate-700  items-center text-sm text-white rounded-sm">
            Settle
          </button>
          <button className="h-8 w-20  bg-red-400    items-center text-sm text-white rounded-sm">
            Reject
          </button>
        </div>
      ),
    },
  ];

  const [selectedButton, setSelectedButton] = useState(1);

  const handleButtonClick = (buttonId) => {
    setSelectedButton(buttonId);
  };
  return (
    <div className="w-full content-center">
      <div className="mt-4 h-20 mx-8 bg-slate-50 border-solid border border-slate-950 rounded-md flex items-center gap-5">
        <div className="m-1 date-picker ">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              className="mt-2"
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
        <div className="w-20 content-center">
          <h3 className="text-sm  text-slate-950 my-8 ml-8">TO </h3>
        </div>
        <div className="m-1 date-picker ">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              className="mt-2"
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
        <div className=" ">
          <button className="bg-[#071535] text-slate-100 p-1.5 mx-8 my-6 rounded-md text-sm font-bold ">
            <h5 className="">Get commission</h5>
          </button>
        </div>
      </div>

      <div className="mx-8 mt-4 rounded-md h-full  border border-gray-300  ">
        <div className="h-10 bg-[#071535] rounded-t-md">
          <h3 className="ml-4 pt-2 text-sm font-bold">Agent Commisson</h3>
        </div>
        <div className="w-full bg-slate-50 h-40 ">
          <div className="">
            <ul className="mx-4 bg-slate-200 h-10 mt-4 font-bold text-sm text-slate-500  flex">
              <button
                className={`p-1 w-20 rounded-t-lg ${
                  selectedButton === 1
                    ? 'bg-white text-slate-800 border-2 border-t-black'
                    : ''
                }`}
                onClick={() => handleButtonClick(1)}
              >
                Fancy
              </button>
              <button
                className={`p-1 w-20 rounded-t-lg ${
                  selectedButton === 2 ? 'bg-white border-2 border-t-black' : ''
                }`}
                onClick={() => handleButtonClick(2)}
              >
                Matka
              </button>
              <button
                className={`p-1 w-20 rounded-t-lg ${
                  selectedButton === 3 ? 'bg-white border-2 border-t-black' : ''
                }`}
                onClick={() => handleButtonClick(3)}
              >
                Casino
              </button>
              <button
                className={`p-1 w-20 rounded-t-lg  ${
                  selectedButton === 4 ? 'bg-white border-2 border-t-black' : ''
                }`}
                onClick={() => handleButtonClick(4)}
              >
                Binary
              </button>
              <button
                className={`p-1 w-24 rounded-t-lg ${
                  selectedButton === 5 ? 'bg-white border-2 border-t-black' : ''
                }`}
                onClick={() => handleButtonClick(5)}
              >
                Sportbook
              </button>
              <button
                className={`p-1 w-28 rounded-t-lg ${
                  selectedButton === 6 ? 'bg-white border-2 border-t-black' : ''
                }`}
                onClick={() => handleButtonClick(6)}
              >
                Bookmarker
              </button>
            </ul>
            {/* <div className="grid grid-cols-2 gap-4 mt-10 text-slate-950 text-sm ">
              <div className="ml-10">
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
          </div>
        </div>
        <div className="card mx-4 my-2">
          <div className="w-auto h-full custom-table">
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

export default Commisson;
