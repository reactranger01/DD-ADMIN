/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { LinearProgress } from '@mui/material';
import CustomNoRowsOverlay from '@/utils/styles';
import { Link, useParams } from 'react-router-dom';
import { getAuthData, isLoggedIn } from '@/utils/apiHandlers';
import { Loading } from '@/components';
import { numberWithCommas } from '@/utils/numberWithCommas';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
const DownlineProfitLoseevent = () => {
  const { id, startDate, endDate } = useParams();
  const [downlineEventList, setDownlineEventList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [rowCountState, setRowCountState] = useState(0);
  const [username, setUserName] = useState('');
  const [selectedToDate, setSelectedToDate] = useState(dayjs());
  const [selectedFromDate, setSelectedFromDate] = useState(dayjs());
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 8,
  });
  const [userid, setUserid] = useState(null);
  const [gameId, setGameId] = useState(null);

  useEffect(() => {
    const [userid, gameId] = id.split('-').map((part) => parseInt(part));
    setUserid(userid);
    setGameId(gameId);
  }, [id]);

  useEffect(() => {
    if (username) {
      getDownlineUserList();
    }
    if (userid) {
      getUserDetails();
    }
    setRowCountState((prevRowCountState) =>
      rowCountState !== undefined ? rowCountState : prevRowCountState,
    );
  }, [
    rowCountState,
    paginationModel,
    setRowCountState,
    userid,
    gameId,
    username,
  ]);

  const getUserDetails = async () => {
    const islogin = isLoggedIn();
    if (islogin) {
      try {
        const response = await getAuthData(
          `/user/get-particuleruser-details?id=${userid}`,
        );
        if (response?.status === 201 || response?.status === 200) {
          setUserName(response?.data?.username);
        } else {
          console.error('error');
        }
      } catch (e) {
        console.error(e);
        return null;
      }
    }
  };

  const getDownlineUserList = async () => {
    const islogin = isLoggedIn();
    setIsLoading(true);
    if (islogin && username) {
      try {
        const response = await getAuthData(
          `/user/sport-event?userId=${username}&gameId=${gameId}&limit=8&offset=${
            paginationModel.page * 8
          }&startDate=${startDate}&endDate=${endDate}`,
        );
        if (response?.status === 201 || response?.status === 200) {
          setIsLoading(false);
          const formattedData = response.data.data.map((entry, index) => {
            const profit =
              entry.total_winning_amount - entry.total_lossing_amount;
            const amount = Math.abs(profit);
            const type = profit >= 0 ? 'profit' : 'loss';
            return {
              ...entry,
              type: type,
              amount: amount,
              id: index + 1,
            };
          });
          setDownlineEventList(formattedData || []);
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
      headerName: 'Sport Name',
      field: 'event_type',
      type: 'string',
      flex: 1,
      minWidth: 200,
      width: 200,
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
      headerName: 'Event Name',
      field: 'event',
      type: 'string',
      // width: '270',
      flex: 1,
      minWidth: 200,
      width: 200,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'start',
            justifyContent: 'start',
            textAlign: 'start',
          }}
        >
          <Link
            to={`/user_account/${userid}-${gameId}-${params.row.event_id}/downline_profitlose_market/${startDate}/${endDate}`}
          >
            <h6 className="text-blue-400">{params.row.event}</h6>
          </Link>
        </div>
      ),
    },
    {
      headerName: 'Profit & Loss',
      field: 'profitlose',
      // width: '150',
      flex: 1,
      minWidth: 200,
      width: 200,
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
    //   field: 'commission',
    //   // width: '150',
    //   flex: 1,
    //   minWidth: 150,
    //   width: 150,
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
    // {
    //   headerName: 'Total P&L',
    //   field: 'totalpl',
    //   // width: '150',
    //   flex: 1,
    //   minWidth: 150,
    //   width: 150,
    //   renderCell: (params) => (
    //     <div
    //       style={{
    //         display: 'flex',
    //         alignItems: 'center',
    //       }}
    //     >
    //       {params.row.type === 'profit' ? (
    //         <h6 className="text-green-700">
    //           {' '}
    //           {numberWithCommas(params.row.amount || 0)}
    //         </h6>
    //       ) : (
    //         <h6 className="text-red-700">
    //           {' '}
    //           {numberWithCommas(params.row.amount || 0)}
    //         </h6>
    //       )}
    //     </div>
    //   ),
    // },
  ];

  let sx = { border: 'solid-gray' };
  return (
    <>
      {isLoading && <Loading />}
      <div className="items-center">
        <div className=" h-24 rounded-md border border-gray-700 bg-slate-100 text-gray-900 hidden  flex-row">
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
              onClick={getDownlineUserList}
              className="p-1 font-semibol px-2 text-sm"
            >
              Get P&L
            </button>
          </div>
        </div>
        <div className="border border-gray-500 rounded-sm h-full ">
          <div className="h-8 bg-[#071535] rounded-t-sm text-sm font-semibold">
            <h3 className="p-1 px-2">Profit & Loss Events </h3>
          </div>

          <div className="grid grid-cols-2 gap-4 text-slate-950 text-sm "></div>
          <div className="card mx-4 mb-4 ">
            <div className="w-100% h-full font-semibold custom-table">
              <DataGrid
                autoHeight
                className="css-1yiktpq-MuiDataGrid-root"
                columns={columns}
                rows={downlineEventList}
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
};

export default DownlineProfitLoseevent;
