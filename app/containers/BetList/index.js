/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
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
function BetList() {
  const [type, setType] = useState(1);
  const [gameType, setGameType] = useState(4);
  const [betsData, setBetsData] = useState([]);
  const [parentsData, setParentsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [rowCountState, setRowCountState] = useState(0);
  const [menuHoverActive, setMenuHoverActive] = useState(false);
  const [selectedToDate, setSelectedToDate] = useState(dayjs());
  const [selectedFromDate, setSelectedFromDate] = useState(dayjs());
  const [tableOne, seTableOne] = useState(true);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 8,
  });

  useEffect(() => {
    handleGetBets();
    setRowCountState((prevRowCountState) =>
      rowCountState !== undefined ? rowCountState : prevRowCountState,
    );
  }, [rowCountState, paginationModel, setRowCountState]);
  const handleGetBets = async () => {
    const islogin = isLoggedIn();
    setIsLoading(true);
    if (islogin) {
      try {
        if (isGameType2or4) {
          seTableOne(true);
          const response = await getAuthData(
            `/bet/all-userbet?offset=${
              paginationModel.page * 8
            }&limit=8&sports=${gameType}&startdate=${dayjs(
              selectedFromDate,
            ).format('YYYY-MM-DD')}&enddate=${dayjs(selectedToDate)
              .add(1, 'day')
              .format('YYYY-MM-DD')}&status=${type}`,
          );
          if (response?.status === 201 || response?.status === 200) {
            setIsLoading(false);
            setBetsData(response?.data?.bets || []);
            setRowCountState(response?.data?.total_bets);
          } else {
            setIsLoading(false);
          }
        } else {
          seTableOne(false);
          const response = await getAuthData(
            `/user/get-casino-aviator-history?offset=${
              paginationModel.page * 8
            }&limit=8&search=${
              gameType == 3 ? 'casino' : 'aviator'
            }&startdate=${dayjs(selectedFromDate).format(
              'YYYY-MM-DD',
            )}&enddate=${dayjs(selectedToDate)
              .add(1, 'day')
              .format('YYYY-MM-DD')}`,
          );
          if (response?.status === 201 || response?.status === 200) {
            setIsLoading(false);
            setBetsData(response?.data?.response?.users || []);
            setRowCountState(response?.data?.response?.totalCount[0][0].count);
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
            className="text-blue-500 cursor-pointer"
            //  onMouseEnter={handleHoverOnMouseEnter}
            onClick={() => handleUsernameShow(params.row)}
          >
            {' '}
            {params.row.username}
          </h6>
        </div>
      ),
    },
    {
      headerName: 'Sport Name',
      field: 'event_type',
      flex: 1,
      width: 130,
      minWidth: 130,
    },
    {
      headerName: 'Event',
      field: 'event',
      flex: 1,
      width: 300,
      minWidth: 300,
      renderCell: (params) => (
        <div>
          <h6> {params.row.event}</h6>
        </div>
      ),
    },
    {
      headerName: 'Market',
      field: 'market',
      flex: 1,
      width: 120,
      minWidth: 120,
    },
    {
      headerName: 'Selection',
      field: 'selection',
      flex: 1,
      width: 220,
      minWidth: 220,
      wrap: true,
    },
    {
      headerName: 'Type',
      field: 'bet_on',
      // width: 70,
      flex: 1,
      width: 100,
      minWidth: 100,
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
            //  onMouseEnter={handleHoverOnMouseEnter}
          >
            {params.row.market === 'session'
              ? params.row.bet_on === 'BACK'
                ? 'Yes'
                : 'No'
              : params.row.bet_on}
          </h6>
        </div>
      ),
    },
    {
      headerName: 'Odds Req',
      field: 'price',
      flex: 1,
      width: 100,
      minWidth: 100,
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
    {
      headerName: 'Stake',
      field: 'stake',
      flex: 1,
      width: 90,
      minWidth: 90,
    },
    {
      headerName: 'Win/Loss',
      field: 'status',
      flex: 1,
      width: 120,
      minWidth: 120,
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
              params.row.status === 1
                ? 'text-green-700'
                : params.row.status === 10
                ? 'text-red-700'
                : 'text-gray-700'
            } font-bold`}
            //  onMouseEnter={handleHoverOnMouseEnter}
          >
            {' '}
            {params.row.status === 1
              ? 'Win'
              : params.row.status === 10
              ? 'Loss'
              : params.row.status === -2
              ? 'Removed'
              : params.row.status === 0
              ? 'Unsettle'
              : '-'}
          </h6>
        </div>
      ),
    },
    {
      headerName: 'Place Time',
      field: 'created_at',
      // width: 200,
      flex: 1,
      Width: 200,
      minWidth: 200,
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
    {
      headerName: 'Settle Time',
      field: 'updated_at',
      // width: 200,
      flex: 1,
      minWidth: 200,
      width: 200,
      wrap: true,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            // flex-wrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'start',
          }}
        >
          <h6>
            {' '}
            {moment(params.row.updated_at).format('MMMM Do YYYY, h:mm a')}
          </h6>
        </div>
      ),
    },
  ];

  const CasinoAviatorcolumns = [
    {
      headerName: 'User Name',
      field: 'username',
      type: 'string',
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
            className="text-blue-500 cursor-pointer"
            //  onMouseEnter={handleHoverOnMouseEnter}
            onClick={() => handleUsernameShow(params.row)}
          >
            {' '}
            {params.row.username}
          </h6>
        </div>
      ),
    },
    {
      headerName: 'Sport Name',
      field: 'event_type',
      flex: 1,
      width: 115,
      minWidth: 115,
      renderCell: () => (
        <div>
          <h6> {gameType == 3 ? 'Casino' : 'Aviator'}</h6>
        </div>
      ),
    },
    {
      headerName: 'Provider',
      field: 'gameType',
      flex: 1,
      width: 250,
      minWidth: 250,
      renderCell: (params) => (
        <div>
          <h6> {params.row.gameType}</h6>
        </div>
      ),
    },
    {
      headerName: 'Game Type',
      field: 'gameCode',
      flex: 1,
      width: 120,
      minWidth: 120,
      renderCell: (params) => (
        <div>
          <h6> {params.row.gameCode !== null ? params.row.gameCode : 'N/A'}</h6>
        </div>
      ),
    },

    {
      headerName: 'Stake',
      field: 'amount',
      flex: 1,
      width: 60,
      minWidth: 60,
      renderCell: (params) => (
        <div>
          <h6> {params.row.amount}</h6>
        </div>
      ),
    },
    {
      headerName: 'Win/Loss',
      field: 'status',
      flex: 1,
      width: 120,
      minWidth: 120,
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
              params.row.remark?.includes('bet on')
                ? 'text-red-700'
                : 'text-green-700'
            } font-bold`}
            //  onMouseEnter={handleHoverOnMouseEnter}
          >
            {' '}
            {params.row.remark?.includes('bet on') ? 'Loss' : 'Win'}
          </h6>
        </div>
      ),
    },
    {
      headerName: 'Place Time',
      field: 'createdAt',
      // width: 200,
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
            {moment(params.row.createdAt).format('MMMM DD, YYYY h:mm A')}
          </h6>
        </div>
      ),
    },
    {
      headerName: 'Settle Time',
      field: 'updatedAt',
      // width: 200,
      flex: 1,
      minWidth: 170,
      width: 170,
      wrap: true,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            // flex-wrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'start',
          }}
        >
          <h6>
            {' '}
            {moment(params.row.updatedAt).format('MMMM DD YYYY, h:mm a')}
          </h6>
        </div>
      ),
    },
  ];
  const handleUsernameShow = async (data) => {
    setMenuHoverActive(true);
    const response = await getAuthData(
      `/user/get-upline-user?username=${data.username}`,
    );
    if (response?.status === 201 || response?.status === 200) {
      setParentsData(response.data);
    } else {
      // console.log(response, 'get all error');
    }
  };
  const handleUsernameShowClose = () => {
    setMenuHoverActive(false);
  };
  const columnunUnsettle = columns.filter(
    (col) => col.field !== 'updated_at' && col.field !== 'status',
  );
  let sx = { border: 'solid-gray' };
  const isGameType2or4 = gameType == 4 || gameType == 2 || gameType == 1;
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
          <div className="text-sm text-center h-4 rounded-t-md  bg-[#071535] relative w-80 max-w-sm mx-auto shadow-md px-8 py-4 row  flex justify-between ">
            <h4 className="mt-[-0.5rem]">
              {/* mt-[-0.5rem] w-16 */}
              Parent List
            </h4>
            <button className="mt-[-0.5rem]">
              <RxCross2 className="" onClick={handleUsernameShowClose} />
            </button>
          </div>
          <div className="relative w-80 max-w-80 mx-auto shadow-md rounded-b-lg bg-white px-4 py-4 ">
            <div className=" grid grid-cols-1 text-slate-800">
              {parentsData &&
                [...parentsData].reverse().map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="grid border border-gray-300 h-10  items-center justify-center"
                    >
                      {' '}
                      {item.username} ({item.userType})
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <div className="mt-4 h-24 mx-8  border-solid border border-slate-950 rounded-md flex bg-slate-100  text-sm text-slate-950 ">
          {/* {selectedValue === 'unsettle' ? null : (
          <div className="flex-initial w-40 m-2 ">
            <h4 className="text-black text text-sm">Data Source</h4>
            <select className=" bg-white rounded-md shadow-sm mt-2  w-40 h-10 ">
              <option value="10">Live Data</option>
              <option value="20">Backup Data</option>
              <option value="30">Old Data</option>
            </select>
          </div>
        )} */}

          <div className="flex-initial w-40 m-2">
            <h4 className="text-black text-xs">Choose Sport </h4>
            <select
              value={gameType}
              onChange={(event) => {
                setGameType(event.target.value);
              }}
              className=" bg-white rounded-md shadow-sm mt-2  w-40 h-10 "
            >
              <option value={4}>Cricket</option>
              {/* <option value={2}>Tennis</option> */}
              <option value={1}>Soccer</option>
              <option value={3}>Casino</option>
              <option value={5}>Aviator</option>
            </select>
          </div>
          {isGameType2or4 ? (
            <div className="flex-initial w-40 m-2 ">
              <h4 className="text-black  text-xs">Choose Type</h4>
              <select
                value={type}
                onChange={(event) => {
                  setType(event.target.value);
                }}
                className=" bg-white rounded-md shadow-sm mt-2  w-40 h-10 "
              >
                <option value="0">UnSettle</option>
                <option value="1">Settle</option>
              </select>
            </div>
          ) : (
            ''
          )}
          <div className="flex-initial w-44 m-2 text-xs">
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
                  value={selectedToDate}
                  onChange={(newDate) => {
                    setSelectedToDate(newDate?.$d);
                  }}
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
          </div>
          <div className="flex-initial h-8 flex justify-center items-center  rounded-md  bg-[#071535] ml-2 mt-9 text-white  content-center w-24">
            <button onClick={handleGetBets} className="p-1  font-semibold">
              Get History
            </button>
          </div>
        </div>

        <div className="mx-8 mt-4 border border-gray-500 rounded-sm h-full ">
          <div className="h-8  bg-[#071535]  rounded-t-sm text-sm font-semibold">
            <h3 className="p-1">Bet History</h3>
          </div>

          <div className="grid grid-cols-2 gap-4 text-slate-950 text-sm "></div>

          {tableOne ? (
            <div className="card mx-4 mb-4 ">
              <div className="w-100% h-full font-semibold custom-table">
                <DataGrid
                  autoHeight
                  className="css-1yiktpq-MuiDataGrid-root"
                  columns={type == 1 ? columns : columnunUnsettle}
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
                    toolbar: GridToolbar,
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
                    toolbar: GridToolbar,
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

export default BetList;
