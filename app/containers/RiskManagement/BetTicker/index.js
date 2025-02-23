import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
const BetTicker = () => {
  const [selectedToDate, setSelectedToDate] = useState(dayjs());
  const [selectedFromDate, setSelectedFromDate] = useState(dayjs());
  const data = [
    {
      id: 1,
      user: '',
      market: '',
      type: '',
      run: '',
      rate: '',
      stake: '',
      pl: '',
      inr: '',
      settle: '',
    },
  ];
  return (
    <div className="p-4 bg-primary-800 text-[14px]">
      <div className="flex gap-10 flex-wrap items-center">
        <h1>Bet Ticker</h1>

        <div className="flex gap-2 w-32 my-2 ml-2 text-xs items-center">
          <h3>From</h3>
          <div className="mt-2">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={selectedFromDate}
                onChange={(newDate) => {
                  setSelectedFromDate(newDate?.$d);
                }}
                className="mt-2"
                sx={{
                  bgcolor: 'white',
                  '& .MuiInputBase-input': {
                    height: '4px',
                    fontSize: '12px',
                    width: '4rem',
                  },
                }}
              />
            </LocalizationProvider>
          </div>
        </div>
        <div className="flex gap-2 w-32 my-2  text-xs items-center">
          <h3>To</h3>
          <div className="mt-2">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={selectedToDate}
                onChange={(newDate) => {
                  setSelectedToDate(newDate?.$d);
                }}
                className="mt-2"
                sx={{
                  bgcolor: 'white',
                  '& .MuiInputBase-input': {
                    height: '4px',
                    fontSize: '12px',
                    width: '4rem',
                  },
                }}
              />
            </LocalizationProvider>
          </div>
        </div>
        <button className="p-1 bg-primary-btn2 my-2 ">search</button>
      </div>
      <div className="overflow-x-auto max-h-[calc(100vh-200px)]">
        <table className="w-full text-left text-white table-auto p-4 bg-primary-700 text-[14px]">
          <thead>
            <tr className="text-[14px]">
              <th className="px-4 py-2">User</th>
              <th className="px-4 py-2"> Market</th>
              <th className="px-4 py-2"> Type</th>
              <th className="px-4 py-2 text-left"> Run </th>
              <th className="px-4 py-2 text-left"> Rate </th>
              <th className="px-4 py-2 text-left">Stake</th>
              <th className="px-4 py-2 text-left"> P/L</th>
              <th className="px-4 py-2 text-left"> INR</th>
              <th className="px-4 py-2 text-left"> Settled/Unsettled</th>
            </tr>
          </thead>
          <tbody className="">
            {data.map((item, index) => (
              <tr
                key={item.id}
                className={` text-[14px] hover:bg-primary-hover ${
                  index % 2 === 1 ? 'bg-[#F5F5F51A]' : ''
                }`}
              >
                <td className="px-4 py-2">{item.user}</td>
                <td className="px-4 py-2">{item.market}</td>
                <td className="px-4 py-2">{item.type}</td>
                <td className="px-4 py-2 text-green-500 text-left">
                  {item.run}
                </td>
                <td className="px-4 py-2  text-left ">
                  <div className="flex justify-center items-center">
                    No Data Avaliable
                  </div>
                </td>
                <td className="px-4 py-2  text-green-500 text-left">
                  {item.stake}
                </td>
                <td className="px-4 py-2">{item.pl}</td>
                <td className="px-4 py-2">{item.inr}</td>
                <td className="px-4 py-2">{item.settle}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination and Close Button */}
      <div className="flex justify-between items-center mt-4 bg-[#F5F5F51A] p-2 rounded-b-md">
        {/* Pagination */}

        <select className="bg-white text-black px-3 py-1 rounded-lg">
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        <div className="flex space-x-2 text-white">
          <button>&laquo;</button>
          <button>1</button>
          <button>&raquo;</button>
        </div>
      </div>
    </div>
  );
};

export default BetTicker;
