/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { LinearProgress } from '@mui/material';
import CustomNoRowsOverlay from '@/utils/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Link } from 'react-router-dom';
import { getAuthData, isLoggedIn } from '@/utils/apiHandlers';
import dayjs from 'dayjs';
import { Loading } from '@/components';
import { numberWithCommas } from '@/utils/numberWithCommas';
function EventProfitlist() {
  const [gameProfitLossList, setGameProfitLossList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedToDate, setSelectedToDate] = useState(dayjs());
  const [selectedFromDate, setSelectedFromDate] = useState(dayjs());
  const [rowCountState, setRowCountState] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 8,
  });

  useEffect(() => {
    getActivityLogList();
    setRowCountState((prevRowCountState) =>
      rowCountState !== undefined ? rowCountState : prevRowCountState,
    );
  }, [getActivityLogList, paginationModel]);
  const getActivityLogList = useCallback(async () => {
    const islogin = isLoggedIn();
    setIsLoading(true);
    if (islogin) {
      try {
        const response = await getAuthData(
          `/user/sport-filter?limit=8&offset=${
            paginationModel.page * 8
          }&startDate=${dayjs(selectedFromDate).format(
            'YYYY-MM-DD',
          )}&endDate=${dayjs(selectedToDate)
            .add(1, 'day')
            .format('YYYY-MM-DD')}`,
        );

        if (response?.status === 201 || response?.status === 200) {
          setIsLoading(false);
          const formattedData = response.data.data.map((entry, index) => {
            const profit =
              entry.all_user_winning_amount - entry.all_user_lossing_amount;
            const amount = Math.abs(profit);
            const type = profit >= 0 ? 'profit' : 'loss';
            return {
              ...entry,
              type: type,
              amount: amount,
              id: index + 1,
            };
          });
          setGameProfitLossList(formattedData || []);
          setRowCountState(response?.data?.totalCount);
        } else {
          setIsLoading(false);
        }
      } catch (e) {
        console.error(e);
        return null;
      }
    }
  }, [rowCountState, paginationModel, setRowCountState]);

  const columns = [
    {
      headerName: 'Sport Name',
      field: 'event_type',
      flex: 1,
      type: 'string',
      width: 300,
      minWidth: 300,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Link
            to={`/plEvent/${
              params.row.event_type === 'Cricket'
                ? 4
                : params.row.event_type === 'Soccer'
                ? 1
                : params.row.event_type === 'casino'
                ? 3
                : params.row.event_type === 'Aviator'
                ? 5
                : 4
            }/LIVE/master/${dayjs(selectedFromDate).format(
              'YYYY-MM-DD',
            )}/${dayjs(selectedToDate).add(1, 'day').format('YYYY-MM-DD')}`}
          >
            <h6 className="text-blue-400">{params.row.event_type}</h6>
          </Link>
        </div>
      ),
    },
    {
      headerName: 'Upline Profit/Loss',
      field: 'uplineprofit',
      flex: 1,
      width: 300,
      minWidth: 300,
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
      flex: 1,
      width: 320,
      minWidth: 320,
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
  ];

  let sx = { border: 'solid-gray' };

  return (
    <>
      {' '}
      {isLoading && <Loading />}
      <div>
        <div className="mt-4 h-24 mx-8  border-solid border border-slate-950 rounded-md flex bg-slate-100  text-sm text-slate-950 ">
          <div className="flex-initial w-44 m-2">
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
          <div className="flex-initial w-44 m-2">
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
          <div className="flex-initial h-8  rounded-md bg-[#071535] ml-2 mt-10 text-white  content-center px-2">
            <button onClick={getActivityLogList} className="p-1 font-semibold">
              Get P&L
            </button>
          </div>
        </div>
        <div className="mx-8 mt-4 border border-gray-500 rounded-sm h-full ">
          <div className="h-8 bg-[#071535] rounded-t-sm text-sm font-semibold">
            <h3 className="p-1">Profit Loss </h3>
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
                rows={gameProfitLossList}
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
                  toolbar: GridToolbar,
                  loadingOverlay: LinearProgress,
                  noRowsOverlay: CustomNoRowsOverlay,
                }}
                disableColumnMenu
                disableRowSelectionOnClick
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EventProfitlist;
