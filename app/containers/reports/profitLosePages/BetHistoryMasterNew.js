/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { LinearProgress } from '@mui/material';
import CustomNoRowsOverlay from '@/utils/styles';
import { useParams } from 'react-router-dom';
import { getAuthData, isLoggedIn } from '@/utils/apiHandlers';
// import moment from 'moment';
import { Loading } from '@/components';
import { numberWithCommas } from '@/utils/numberWithCommas';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
function BetHistoryMasterNew() {
  const { username, market, eventid, startDate, endDate } = useParams();
  const [BetHistoryList, setBetHistoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [rowCountState, setRowCountState] = useState(0);
  const [selectedToDate, setSelectedToDate] = useState(dayjs());
  const [selectedFromDate, setSelectedFromDate] = useState(dayjs());
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 8,
  });
  useEffect(() => {
    getBetHistory();
    setRowCountState((prevRowCountState) =>
      rowCountState !== undefined ? rowCountState : prevRowCountState,
    );
  }, [
    rowCountState,
    paginationModel,
    setRowCountState,
    eventid,
    market,
    username,
  ]);

  const getBetHistory = async () => {
    const islogin = isLoggedIn();
    setIsLoading(true);
    if (islogin) {
      try {
        const response = await getAuthData(
          `/user/bet-history/${username}/${market}/${eventid}?limit=8&offset=${
            paginationModel.page * 8
          }&startDate=${startDate}&endDate=${endDate}`,
        );
        if (response?.status === 201 || response?.status === 200) {
          setIsLoading(false);
          const formattedData = response.data.data.map((entry, index) => {
            return {
              ...entry,
              id: index + 1,
            };
          });
          setBetHistoryList(formattedData || []);
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

  const CasinoAviatorcolumns = [
    {
      headerName: 'Sport Name',
      field: 'event_type',
      type: 'string',
      flex: 1,
      minWidth: 100,
      width: 100,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <h6>{params.row.event_type}</h6>
        </div>
      ),
    },
    {
      headerName: 'Provider',
      field: 'provider',
      type: 'string',
      flex: 1,
      minWidth: 220,
      width: 220,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <h6>{params.row.event}</h6>
        </div>
      ),
    },
    {
      headerName: 'Game Type',
      field: 'gametype',
      flex: 1,
      minWidth: 100,
      width: 100,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <h6>{params.row.gametype}</h6>
        </div>
      ),
    },
    {
      headerName: 'Amount',
      field: 'selection',
      flex: 1,
      minWidth: 220,
      width: 220,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <h6>{params.row.remark}</h6>
        </div>
      ),
    },

    {
      headerName: 'P/L',
      field: 'pl',
      flex: 1,
      minWidth: 120,
      width: 120,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <h6
            className={
              Number(params.row.all_user_winning_amount) <
              Number(params.row.all_user_lossing_amount)
                ? 'text-red-700'
                : 'text-green-700'
            }
          >
            {' '}
            {numberWithCommas(
              Number(params.row.all_user_winning_amount) -
                Number(params.row.all_user_lossing_amount),
            )}
          </h6>
        </div>
      ),
    },

    // {
    //   headerName: 'Settle Time',
    //   field: 'settlement_time',
    //   flex: 1,
    //   minWidth: 230,
    //   width: 230,
    //   renderCell: (params) => (
    //     <div
    //       style={{
    //         display: 'flex',
    //         alignItems: 'center',
    //       }}
    //     >
    //       <h6>
    //         {moment(params.row.settlement_time).format(
    //           'MMMM Do YYYY, h:mm:ss a',
    //         )}
    //       </h6>
    //     </div>
    //   ),
    // },
  ];

  let sx = { border: 'solid-gray' };

  const getRowClassName = (params) => {
    return params.row.bet_on === 'BACK' ? 'custom-row-blue' : 'custom-row-pink';
  };

  return (
    <>
      {' '}
      {isLoading && <Loading />}
      <div className="items-center">
        <div className="mx-8 mt-4 h-24 rounded-md border border-gray-700 bg-slate-100 text-gray-900 hidden flex-row">
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
          <div className="flex-initial h-8 items-center flex justify-center  rounded-md bg-slate-800 ml-2 mt-9 text-white  content-center ">
            <button
              onClick={getBetHistory}
              className="p-1 font-semibol px-2 text-sm"
            >
              Get P&L
            </button>
          </div>
        </div>
        <div className="mx-8 mt-4 border border-gray-500 rounded-md h-full ">
          <div className="h-8 bg-[#071535] rounded-t-md text-sm font-semibold">
            <h3 className="p-1">Bet History</h3>
          </div>

          <div className="card mb-4 ">
            <div className=" h-full font-semibold custom-table">
              <DataGrid
                autoHeight
                className="css-1yiktpq-MuiDataGrid-root"
                columns={CasinoAviatorcolumns}
                rows={BetHistoryList}
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
                getRowClassName={getRowClassName}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default BetHistoryMasterNew;
