/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { LinearProgress } from '@mui/material';
import CustomNoRowsOverlay from '@/utils/styles';
import { Link, useParams } from 'react-router-dom';
import { getAuthData, isLoggedIn } from '@/utils/apiHandlers';
// import moment from 'moment';
import { Loading } from '@/components';
import { numberWithCommas } from '@/utils/numberWithCommas';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
function ProfitLoseMarket() {
  const { gameid, eventid, startDate, endDate } = useParams();
  const [profitlossMarketList, setProfitlossMarketList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [rowCountState, setRowCountState] = useState(0);
  const [selectedToDate, setSelectedToDate] = useState(dayjs());
  const [selectedFromDate, setSelectedFromDate] = useState(dayjs());
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 8,
  });

  useEffect(() => {
    getProfitLossEvent();
    setRowCountState((prevRowCountState) =>
      rowCountState !== undefined ? rowCountState : prevRowCountState,
    );
  }, [rowCountState, paginationModel, setRowCountState, eventid]);
  const getProfitLossEvent = async () => {
    const islogin = isLoggedIn();
    setIsLoading(true);
    if (islogin) {
      try {
        const response = await getAuthData(
          `/user/market/${eventid}?limit=8&offset=${
            paginationModel.page * 8
          }&startDate=${dayjs(startDate).format('YYYY-MM-DD')}&endDate=${dayjs(
            endDate,
          )
            .add(1, 'day')
            .format('YYYY-MM-DD')}`,
        );

        if (response?.status === 201 || response?.status === 200) {
          setIsLoading(false);
          const formattedData = response.data.data.map((entry, index) => {
            const profit =
              Number(entry.all_user_winning_amount) -
              Number(entry.all_user_lossing_amount);
            const amount = Math.abs(profit);
            const type = profit >= 0 ? 'profit' : 'loss';
            return {
              ...entry,
              type: type,
              amount: amount,
              id: index + 1,
            };
          });
          setProfitlossMarketList(formattedData || []);
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

  let sx = { border: 'solid-gray' };

  const columns = [
    {
      headerName: 'Sport Name',
      field: 'event_type',
      type: 'string',
      flex: 1,
      minWidth: 200,
      width: 150,
    },
    {
      headerName: 'Event Name',
      field: 'event',
      type: 'string',
      flex: 1,
      minWidth: 400,
      width: 400,
    },
    {
      headerName: 'Market Name ',
      field: 'market',
      flex: 1,
      minWidth: 150,
      width: 150,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Link
            to={`/report_plUser/${params.row.event_id}/${
              params.row.market === 'Match Odds' ||
              params.row.market === 'Match_Odds' ||
              params.row.market === 'MATCH_ODDS' ||
              params.row.market === 'Odds' ||
              params.row.market === 'ODDS'
                ? 'MATCH_ODDS'
                : params.row.market === 'Over/Under 3.5 Goals' //soccer markets
                ? 'over_under_35'
                : params.row.market === 'Over/Under 2.5 Goals'
                ? 'over_under_25'
                : params.row.market === 'Over/Under 1.5 Goals'
                ? 'over_under_15'
                : params.row.market === 'Set 1 Winner' //tennis markets
                ? 'winner-1'
                : params.row.market === 'Set 2 Winner'
                ? 'winner-2'
                : params.row.market
            }/${startDate}/${endDate}`}
          >
            <h6 className="text-blue-400">{params.row.market}</h6>
          </Link>
        </div>
      ),
    },

    {
      headerName: 'Profit & Loss',
      field: 'profitlose',
      flex: 1,
      minWidth: 150,
      width: 150,
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
    //   headerName: 'Settle Time',
    //   field: 'settletime',
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
  const CasinoAviatorcolumns = [
    {
      headerName: 'Sport Name',
      field: 'event_type',
      flex: 1,
      minWidth: 200,
      width: 200,
    },
    {
      headerName: 'Provider',
      field: 'event',
      flex: 1,
      minWidth: 400,
      width: 400,
    },
    {
      headerName: 'Game Type',
      field: 'gametype',
      flex: 1,
      minWidth: 150,
      width: 150,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Link
            to={`/report_plUsers/${eventid}/${params.row.gametype.replace(
              /\s/g,
              '-',
            )}/${startDate}/${endDate}`}
          >
            <h6 className="text-blue-400">{params.row.gametype}</h6>
          </Link>
        </div>
      ),
    },

    {
      headerName: 'Profit & Loss',
      field: 'profitlose',
      flex: 1,
      minWidth: 150,
      width: 150,
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
    //   headerName: 'Settle Time',
    //   field: 'settletime',
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
              onClick={getProfitLossEvent}
              className="p-1 font-semibol px-2 text-sm"
            >
              Get P&L
            </button>
          </div>
        </div>
        <div className="mx-8 my-4 border border-gray-500 rounded-md h-full ">
          <div className="h-8 bg-[#071535] rounded-t-md text-sm font-semibold">
            <h3 className="p-1">Profit & Loss Markets</h3>
          </div>

          {gameid == 'casino' ? (
            <div className="card mx-4 mb-4 ">
              <div className="w-100% h-full font-semibold custom-table">
                <DataGrid
                  autoHeight
                  className="css-1yiktpq-MuiDataGrid-root"
                  columns={CasinoAviatorcolumns}
                  rows={profitlossMarketList}
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
          ) : (
            <div className="card mx-4 mb-4 ">
              <div className="w-100% h-full font-semibold custom-table">
                <DataGrid
                  autoHeight
                  className="css-1yiktpq-MuiDataGrid-root"
                  columns={columns}
                  rows={profitlossMarketList}
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
          )}
        </div>
      </div>
    </>
  );
}

export default ProfitLoseMarket;
