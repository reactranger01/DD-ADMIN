/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { LinearProgress } from '@mui/material';
import CustomNoRowsOverlay from '@/utils/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Link, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { getAuthData, isLoggedIn } from '@/utils/apiHandlers';
import { Loading } from '@/components';
import { numberWithCommas } from '@/utils/numberWithCommas';
function DownlineProfitCasinoAviatorUser() {
  const [downlineProfitLossList, setDownlineProfitLossList] = useState([]);
  const loginUsername = localStorage.getItem('owner_username');
  const loginPath = localStorage.getItem('owner_path');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedToDate, setSelectedToDate] = useState(dayjs());
  const [selectedFromDate, setSelectedFromDate] = useState(dayjs());
  const [rowCountState, setRowCountState] = useState(0);
  const [gameType, setGameType] = useState(0);
  const { path, usetype } = useParams();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 8,
  });

  useEffect(() => {
    getDownlineList();
    setRowCountState((prevRowCountState) =>
      rowCountState !== undefined ? rowCountState : prevRowCountState,
    );
  }, [
    rowCountState,
    paginationModel,
    setRowCountState,
    loginUsername,
    loginPath,
  ]);
  const getDownlineList = async () => {
    const islogin = isLoggedIn();
    setIsLoading(true);
    if (islogin) {
      try {
        const response = await getAuthData(
          `/user/downline-user-casino?path=${path}&username=${usetype}&limit=8&offset=${
            paginationModel.page * 8
          }&startDate=${dayjs(selectedFromDate).format(
            'YYYY-MM-DD',
          )}&endDate=${dayjs(selectedToDate)
            .add(1, 'day')
            .format('YYYY-MM-DD')}`,
        );
        if (response?.status === 201 || response?.status === 200) {
          setIsLoading(false);
          const formattedData = response.data.data.map((entry) => {
            const profit = entry.total_user_profit - entry.total_user_loss;
            const amount = Math.abs(profit);
            const type = profit >= 0 ? 'profit' : 'loss';
            return {
              ...entry,
              type: type,
              amount: amount,
            };
          });
          setDownlineProfitLossList(formattedData || []);
          setRowCountState(response?.data?.totalCount);
        } else {
          setIsLoading(false);
        }
      } catch (e) {
        console.error(e);
        return null;
      }
    }
  };

  const columns = [
    {
      headerName: 'Username',
      field: 'username',
      type: 'string',
      // width: '319',
      flex: 1,
      minWidth: 310,
      width: 310,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Link to={`/user_account_aviator/${params.row.id}/profit_lose`}>
            <h6 className="text-blue-400 flex gap-1">
              {params.row.user_type && (
                <span className="p-[2px] font-semibold flex justify-center items-center text-10 rounded bg-green-700 text-white">
                  {params.row.user_type}
                </span>
              )}
              {params.row.username}{' '}
            </h6>
          </Link>
        </div>
      ),
    },
    {
      headerName: 'Profit/Loss',
      field: 'uplineprofit',
      // width: '350',
      flex: 1,
      minWidth: 310,
      width: 310,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {params.row.type === 'profit' ? (
            <h6 className="text-red-700">
              {' '}
              {numberWithCommas(params.row.amount || 0)}
            </h6>
          ) : (
            <h6 className="text-green-700">
              {' '}
              {numberWithCommas(params.row.amount || 0)}
            </h6>
          )}
        </div>
      ),
    },
    {
      headerName: 'Downline Profit/Loss',
      field: 'downlineprofit',
      // width: '350',
      flex: 1,
      minWidth: 320,
      width: 320,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {params.row.type === 'profit' ? (
            <h6 className="text-green-700">
              {' '}
              {numberWithCommas(params.row.amount || 0)}
            </h6>
          ) : (
            <h6 className="text-red-700">
              {' '}
              {numberWithCommas(params.row.amount || 0)}
            </h6>
          )}
        </div>
      ),
    },
    // {
    //   headerName: 'Commission',
    //   field: 'commison',
    //   // width: '250',
    //   flex: 1,
    //   minWidth: 260,
    //   width: 260,
    //   renderCell: () => (
    //     <div
    //       style={{
    //         display: 'flex',
    //         alignItems: 'center',
    //       }}
    //     >
    //       <h6>0</h6>
    //     </div>
    //   ),
    // },
  ];
  let sx = { border: 'solid-gray' };

  return (
    <>
      {' '}
      {isLoading && <Loading />}
      <div>
        <div className="mt-4 h-24 mx-8  border-solid border border-slate-950 rounded-md flex bg-slate-100  text-sm text-slate-950 ">
          {/* <div className="flex-initial w-40 m-2 ">
          <h4 className="text-black text text-sm">Data Source</h4>
          <select className=" bg-white rounded-md shadow-sm mt-2  w-32 h-10 ">
            <option value="10">Data Source</option>
            <option value="10">LIVE DATA</option>
            <option value="25">BACKUP DATA</option>
            <option value="25">OLD DATA</option>
          </select>
        </div> */}
          <div className="flex-initial w-40 m-2 hidden">
            <h4 className="text-black text-xs">Choose Sport </h4>
            <select
              value={gameType}
              onChange={(event) => {
                setGameType(event.target.value);
              }}
              className=" bg-white rounded-md shadow-sm mt-2  w-40 h-10 "
            >
              <option value={0}>Sports</option>
              <option value={1}>Casino & Aviator</option>
            </select>
          </div>
          <div className="flex-initial w-44 m-2 text-xs">
            <h3>From</h3>
            <div className="mt-2">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className="mt-2"
                  value={selectedFromDate}
                  onChange={(newDate) => {
                    setSelectedFromDate(newDate?.$d);
                  }}
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
            <div className="mt-2">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className="mt-2"
                  value={selectedToDate}
                  onChange={(newDate) => {
                    setSelectedToDate(newDate?.$d);
                  }}
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
          <div className="flex-initial h-8 flex items-center justify-center rounded-md bg-[#071535] ml-2 mt-9 text-white  content-center px-2">
            <button onClick={getDownlineList} className="p-1 font-semibold">
              Get P&L
            </button>
          </div>
          {/* <div className="flex-initial h-8  rounded-md bg-[#071535] ml-16 mt-10 text-white  content-center px-2">
          <button className="p-1 font-semibold">Reset</button>
        </div> */}
        </div>
        <div className="md:mx-8 mx-2 mt-4 border border-gray-500 rounded-md h-full ">
          <div className="h-8 bg-[#071535] rounded-t-md text-sm font-semibold">
            <h3 className="p-1 px-2">Profit Loss</h3>
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
            </div>
            <div className=" flex flex-row-reverse">
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
                rows={downlineProfitLossList}
                sx={sx}
                loading={isLoading}
                getEstimatedRowHeight={() => 52}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 8,
                    },
                  },
                }}
                rowCount={rowCountState}
                pageSizeOptions={[8]}
                paginationModel={paginationModel}
                paginationMode="server"
                onPaginationModelChange={setPaginationModel}
                slots={{
                  // toolbar: GridToolbar,
                  loadingOverlay: LinearProgress,
                  noRowsOverlay: CustomNoRowsOverlay,
                }}
                disableColumnMenu
                disableRowSelectionOnClick
              />
            </div>
          </div>
        </div>
      </div>{' '}
    </>
  );
}

export default DownlineProfitCasinoAviatorUser;
