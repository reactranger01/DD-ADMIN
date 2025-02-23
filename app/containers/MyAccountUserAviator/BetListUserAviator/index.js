/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { LinearProgress } from '@mui/material';
import CustomNoRowsOverlay from '@/utils/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { RxCross2 } from 'react-icons/rx';
import dayjs from 'dayjs';
import { getAuthData, isLoggedIn } from '@/utils/apiHandlers';
import { Loading } from '@/components';
import moment from 'moment';
import { useParams } from 'react-router-dom';
function BetListUserAviator() {
  const { id } = useParams();
  const [type, setType] = useState(1);
  const [gameType, setGameType] = useState(4);
  const [betsData, setBetsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const username_owner = localStorage.getItem('owner_username');
  const [rowCountState, setRowCountState] = useState(0);
  const [singleRowData, setSingleRowData] = useState({});
  const [menuHoverActive, setMenuHoverActive] = useState(false);
  const [selectedToDate, setSelectedToDate] = useState(dayjs());
  const [selectedFromDate, setSelectedFromDate] = useState(dayjs());
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 8,
  });

  const [userid, setUserid] = useState(null);

  useEffect(() => {
    const [userIdPart] = id.split('-').map((part) => parseInt(part));
    setUserid(userIdPart);
  }, [id]);

  useEffect(() => {
    if (userid) {
      handleGetBets();
    }
    setRowCountState((prevRowCountState) =>
      rowCountState !== undefined ? rowCountState : prevRowCountState,
    );
  }, [rowCountState, paginationModel, setRowCountState, userid]);

  const handleGetBets = async () => {
    const islogin = isLoggedIn();
    setIsLoading(true);
    if (islogin) {
      try {
        if (gameType == 0) {
          const response = await getAuthData(
            `/user/bet-history-casino/${id}?offset=${
              paginationModel.page * 8
            }&limit=8&sports=${gameType}&startDate=${dayjs(
              selectedFromDate,
            ).format('YYYY-MM-DD')}&endDate=${dayjs(selectedToDate)
              .add(1, 'day')
              .format('YYYY-MM-DD')}`,
          );
          if (response?.status === 201 || response?.status === 200) {
            setIsLoading(false);
            setBetsData(response?.data.data || []);
            setRowCountState(response?.data?.totalCount?.[0].totalcount);
          } else {
            setIsLoading(false);
          }
        } else {
          const response = await getAuthData(
            `/bet/user-particulerbets?offset=${
              paginationModel.page * 8
            }&limit=8&sports=${gameType}&startdate=${dayjs(
              selectedFromDate,
            ).format('YYYY-MM-DD')}&enddate=${dayjs(selectedToDate)
              .add(1, 'day')
              .format('YYYY-MM-DD')}&status=${type}&id=${userid}`,
          );
          if (response?.status === 201 || response?.status === 200) {
            setIsLoading(false);
            setBetsData(response?.data?.bets || []);
            setRowCountState(response?.data?.total_bets);
          } else {
            setIsLoading(false);
          }
        }
      } catch (e) {
        console.error(e);
        return null;
      }
    }
  };

  const columns = [
    {
      headerName: 'User Name',
      field: 'username',
      type: 'string',
      headerAlign: 'start',
      align: 'start',
      width: 200,
      minWidth: 200,
      flex: 1,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
          }}
          className="w-[120px]"
        >
          <h6> {params.row.username}</h6>
        </div>
      ),
    },
    {
      headerName: 'SportName',
      field: 'event_type',
      width: 100,
      minWidth: 100,
      flex: 1,
    },
    { headerName: 'Event', field: 'event', width: 300, minWidth: 300, flex: 1 },
    {
      headerName: 'Market',
      field: 'market',
      width: 100,
      minWidth: 100,
      flex: 1,
    },
    {
      headerName: 'Selection',
      field: 'selection',
      width: 220,
      minWidth: 220,
      flex: 1,
    },
    {
      headerName: 'Type',
      field: 'bet_on',
      width: 100,
      minWidth: 100,
      flex: 1,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
          }}
          className="w-[120px]"
        >
          <h6
            className={`${
              params.row.bet_on === 'BACK' ? 'text-blue-500' : 'text-pink-500'
            } font-bold`}
          >
            {' '}
            {params.row.bet_on}
          </h6>
        </div>
      ),
    },
    {
      headerName: 'Odds Req',
      field: 'price',
      width: 100,
      minWidth: 100,
      flex: 1,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <h6>
            {' '}
            {params.row.market === 'session'
              ? params.row.price
              : params.row.price}
          </h6>
        </div>
      ),
    },
    { headerName: 'Stake', field: 'stake', width: 100, minWidth: 100, flex: 1 },
    {
      headerName: 'Win/Loss',
      field: 'status',
      width: 100,
      minWidth: 100,
      flex: 1,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          className="w-[120px]"
        >
          <h6
            className={`${
              params.row.status === 1 ? 'text-green-700' : 'text-red-700'
            } font-bold`}
          >
            {' '}
            {params.row.status === 1
              ? 'Win'
              : params.row.status === 10
              ? 'Loss'
              : '-'}
          </h6>
        </div>
      ),
    },
    {
      headerName: 'Place Time',
      field: 'created_at',
      width: 200,
      minWidth: 200,
      flex: 1,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
          }}
        >
          <h6>
            {' '}
            {moment(params.row.created_at).format('MMMM Do YYYY, h:mm a')}
          </h6>
        </div>
      ),
    },
    // {
    //   headerName: 'Settle Time',
    //   field: 'updated_at',
    //   width: 200,
    //   minWidth: 200,
    //   flex: 1,
    //   renderCell: (params) => (
    //     <div
    //       style={{
    //         display: 'flex',
    //         alignItems: 'center',
    //         justifyContent: 'start',
    //       }}
    //     >
    //       <h6>
    //         {' '}
    //         {moment(params.row.updated_at).format('MMMM Do YYYY, h:mm a')}
    //       </h6>
    //     </div>
    //   ),
    // },
  ];
  const CasinoAviatorcolumns = [
    {
      headerName: 'User Name',
      field: 'username',
      type: 'number',
      headerAlign: 'start',
      align: 'start',
      // width: 150,
      flex: 1,
      width: 200,
      minWidth: 200,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
          }}
          className="w-[120px]"
        >
          <h6

          // onClick={() => handleUsernameShow(params.row)}
          >
            {' '}
            {params.row.username}
          </h6>
        </div>
      ),
    },
    {
      headerName: 'Sport Name',
      field: 'game_code',
      flex: 1,
      width: 115,
      minWidth: 115,
    },
    {
      headerName: 'Remark',
      field: 'remark',
      flex: 1,
      width: 250,
      minWidth: 250,
      renderCell: (params) => (
        <div>
          <h6> {params.row.remark}</h6>
        </div>
      ),
    },
    {
      headerName: 'Game Type',
      field: 'game_type',
      flex: 1,
      width: 120,
      minWidth: 120,
    },

    {
      headerName: 'Stake',
      field: 'amount',
      flex: 1,
      width: 100,
      minWidth: 100,
    },
    // {
    //   headerName: 'Win/Loss',
    //   field: 'status',
    //   flex: 1,
    //   width: 120,
    //   minWidth: 120,
    //   renderCell: (params) => (
    //     <div
    //       style={{
    //         display: 'flex',
    //         alignItems: 'center',
    //         justifyContent: 'center',
    //       }}
    //       className="w-[120px]"
    //     >
    //       <h6
    //         className={`${
    //           params.row.status === 1 ? 'text-green-700' : 'text-red-700'
    //         } font-bold`}
    //       >
    //         {' '}
    //         {params.row.status === 1
    //           ? 'Win'
    //           : params.row.status === 10
    //           ? 'Loss'
    //           : '-'}
    //       </h6>
    //     </div>
    //   ),
    // },
    {
      headerName: 'Place Time',
      field: 'created_at',
      flex: 1,
      Width: 180,
      minWidth: 180,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
          }}
        >
          <h6>
            {' '}
            {moment(params.row.created_at).format('MMMM Do YYYY, h:mm a')}
          </h6>
        </div>
      ),
    },
    // {
    //   headerName: 'Settle Time',
    //   field: 'updated_at',
    //   flex: 1,
    //   minWidth: 170,
    //   width: 170,
    //   wrap: true,
    //   renderCell: (params) => (
    //     <div
    //       style={{
    //         display: 'flex',
    //         alignItems: 'center',
    //         justifyContent: 'start',
    //       }}
    //     >
    //       <h6>
    //         {' '}
    //         {moment(params.row.updated_at).format('MMMM Do YYYY, h:mm a')}
    //       </h6>
    //     </div>
    //   ),
    // },
  ];

  const handleUsernameShowClose = () => {
    setMenuHoverActive(false);
    setSingleRowData({});
  };
  let sx = { border: 'solid-gray' };
  const isGameType2or4 = gameType == 4 || gameType == 2;
  return (
    <>
      {isLoading && <Loading />}
      <div>
        <div
          className={
            menuHoverActive
              ? 'fixed inset-0 bg-gray-500 bg-opacity-75 z-10 overflow-y-auto px-4 py-6 sm:px-0'
              : 'hidden'
          }
        >
          <div className="text-sm text-center h-4 rounded-t-md  bg-blue-400 relative w-80 max-w-sm mx-auto shadow-md px-8 py-4 row  flex justify-between ">
            <h4 className="mt-[-0.5rem]">Parent List</h4>
            <button className="mt-[-0.5rem]">
              <RxCross2 className="" onClick={handleUsernameShowClose} />
            </button>
          </div>
          <div className="relative w-80 max-w-80 mx-auto shadow-md rounded-b-lg bg-white px-4 py-4 ">
            <div className=" grid grid-cols-1 text-slate-800">
              <div className="grid border border-gray-300 h-10 rounded-t-md  items-center justify-center">
                {' '}
                {username_owner} (SUPER)
              </div>

              <div className="grid border border-gray-300 h-10 rounded-b-md  items-center justify-center">
                {singleRowData?.username} (USER)
              </div>
            </div>
          </div>
        </div>
        <div className=" h-24 mx-4  border-solid border border-slate-950 rounded-md flex bg-slate-100  text-sm text-slate-950 ">
          <div className=" w-36 m-2 ">
            <h4 className="text-black  text-xs">Choose Type</h4>
            <select
              value={type}
              onChange={(event) => {
                setType(event.target.value);
              }}
              className=" bg-white rounded-md shadow-sm mt-2 w-36   h-10 "
            >
              <option value="0">UnSettle</option>
              <option value="1">Settle</option>
            </select>
          </div>
          <div className="w-36 m-2">
            <h4 className="text-black text-xs">Choose Sport </h4>
            <select
              value={gameType}
              onChange={(event) => {
                setGameType(event.target.value);
              }}
              className=" bg-white rounded-md shadow-sm mt-2 w-36 h-10 "
            >
              <option value={4}>Cricket</option>
              <option value={2}>Tennis</option>
              <option value={1}>Soccer</option>
              <option value={0}>Casino & Aviator</option>
              {/* <option value={0}>Aviator</option> */}
            </select>
          </div>
          <div className=" m-2 text-xs">
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
                    '& .MuiInputBase-input': {
                      height: '5px',
                      fontSize: '15px',
                      width: '5rem',
                    },
                  }}
                />
              </LocalizationProvider>
            </div>
          </div>
          <div className="w-44 m-2 text-xs">
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
                    '& .MuiInputBase-input': {
                      height: '5px',
                      fontSize: '15px',
                      width: '5rem',
                    },
                  }}
                />
              </LocalizationProvider>
            </div>
          </div>
          <div className="flex-initial h-8 flex justify-center items-center  rounded-md  bg-[#071535] ml-2 mt-9 text-white  content-center w-24">
            <button onClick={handleGetBets} className="p-1  font-semibold">
              Get History
            </button>
          </div>
        </div>

        <div className="mx-4 mt-4 border border-gray-500 rounded-sm h-full ">
          <div className="h-8  bg-[#071535]  rounded-t-sm text-sm font-semibold">
            <h3 className="p-1">Bet History</h3>
          </div>

          <div className="grid grid-cols-2 gap-4 text-slate-950 text-sm ">
            {/* <div className="ml-10">
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
          {isGameType2or4 || gameType == 1 ? (
            <div className="card mx-4 mb-4 ">
              <div className="w-100% h-full font-semibold custom-table">
                <DataGrid
                  autoHeight
                  className="css-1yiktpq-MuiDataGrid-root"
                  columns={columns}
                  rows={betsData}
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
                  columns={CasinoAviatorcolumns}
                  rows={betsData}
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

export default BetListUserAviator;
