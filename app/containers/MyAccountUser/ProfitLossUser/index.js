/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { LinearProgress } from '@mui/material';
import CustomNoRowsOverlay from '@/utils/styles';
import { Link, useParams } from 'react-router-dom';
import { getAuthData, isLoggedIn } from '@/utils/apiHandlers';
import dayjs from 'dayjs';
import { Loading } from '@/components';
import { numberWithCommas } from '@/utils/numberWithCommas';
function ProfitLossUser() {
  const { id } = useParams();
  const [userid, setUserid] = useState(null);

  useEffect(() => {
    const [userIdPart] = id.split('-').map((part) => parseInt(part));
    setUserid(userIdPart);
  }, [id]);
  const [downlineuserSportsList, setDownlineuserSportsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedToDate, setSelectedToDate] = useState(dayjs());
  const [selectedFromDate, setSelectedFromDate] = useState(dayjs());
  const [rowCountState, setRowCountState] = useState(0);
  const [userInfo, setUserInfo] = useState({});
  const [username, setUserName] = useState('');
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 8,
  });

  useEffect(() => {
    if (username) {
      getDownlineUserList();
    }
    setRowCountState((prevRowCountState) =>
      rowCountState !== undefined ? rowCountState : prevRowCountState,
    );
    getUserDetails();
  }, [rowCountState, paginationModel, userid, setPaginationModel, username]);

  const getUserDetails = async () => {
    const islogin = isLoggedIn();
    if (islogin && userid) {
      try {
        const response = await getAuthData(
          `/user/get-particuleruser-details?id=${userid}`,
        );
        if (response?.status === 201 || response?.status === 200) {
          setUserInfo(response?.data);
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
    if (islogin && userInfo) {
      try {
        const response = await getAuthData(
          `/user/user-sports?limit=8&offset=${
            paginationModel.page * 8
          }&userId=${userInfo?.username}&startDate=${dayjs(
            selectedFromDate,
          ).format('YYYY-MM-DD')}&endDate=${dayjs(selectedToDate)
            .add(1, 'day')
            .format('YYYY-MM-DD')}`,
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
          setDownlineuserSportsList(formattedData || []);
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
      minWidth: 240,
      width: 240,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Link
            to={`/user_account/${userid}-${
              params.row.game_id
            }/downline_profitlose_event/${dayjs(selectedFromDate).format(
              'YYYY-MM-DD',
            )}/${dayjs(selectedToDate).add(1, 'day').format('YYYY-MM-DD')}`}
          >
            <h6 className="text-blue-500">{params.row.event_type}</h6>
          </Link>
        </div>
      ),
    },
    {
      headerName: 'Profit & Loss',
      field: 'profitlose',
      flex: 1,
      minWidth: 240,
      width: 240,
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
    {
      headerName: 'Commission',
      field: 'commission',
      flex: 1,
      minWidth: 240,
      width: 240,
      renderCell: () => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <h6>0</h6>
        </div>
      ),
    },
    {
      headerName: 'Total P&L',
      field: 'totalpl',
      flex: 1,
      minWidth: 180,
      width: 180,
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
      <div className="items-center">
        <div className=" h-24 rounded-md border border-gray-700 bg-slate-100 text-gray-900 flex flex-row">
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
              className="p-1 font-semibold px-2 text-sm"
            >
              Get P&L
            </button>
          </div>
        </div>
        <div className=" mt-4 border border-gray-500 rounded-md h-full ">
          <div className="h-8 bg-[#071535] rounded-t-md text-sm font-semibold">
            <h3 className="p-1">Profit/Loss </h3>
          </div>

          {/* <div className="grid grid-cols-2 gap-4 text-slate-950 text-sm ">
            <div className="ml-4">
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
          <div className="card mx-4 mb-4 ">
            <div className="w-100% h-full font-semibold custom-table">
              <DataGrid
                autoHeight
                className="css-1yiktpq-MuiDataGrid-root"
                columns={columns}
                rows={downlineuserSportsList}
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

export default ProfitLossUser;
