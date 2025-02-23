/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DataGrid } from '@mui/x-data-grid';
import { LinearProgress } from '@mui/material';
import CustomNoRowsOverlay from '@/utils/styles';
import { getAuthData, isLoggedIn } from '@/utils/apiHandlers';
import { Loading } from '@/components';
import dayjs from 'dayjs';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { numberWithCommas } from '@/utils/numberWithCommas';
function AccountStatementUserAviator() {
  const { id } = useParams();
  const [accountStatementList, setAccountStatementList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedToDate, setSelectedToDate] = useState(dayjs());
  const [selectedFromDate, setSelectedFromDate] = useState(dayjs());
  const [rowCountState, setRowCountState] = useState(0);
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
      getActivityLogList();
    }
    setRowCountState((prevRowCountState) =>
      rowCountState !== undefined ? rowCountState : prevRowCountState,
    );
  }, [rowCountState, paginationModel, setRowCountState, userid]);

  const getActivityLogList = async () => {
    const islogin = isLoggedIn();
    setIsLoading(true);
    if (islogin) {
      try {
        const response = await getAuthData(
          `/user/get-transactions?filterUserId=${userid}&limit=8&offset=${
            paginationModel.page * 8
          }&startdate=${dayjs(selectedFromDate).format(
            'YYYY-MM-DD',
          )}&enddate=${dayjs(selectedToDate)
            .add(1, 'day')
            .format('YYYY-MM-DD')}`,
        );
        if (response?.status === 201 || response?.status === 200) {
          setIsLoading(false);
          setAccountStatementList(response.data.statements || []);
          setRowCountState(response?.data?.count);
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
      headerName: 'Date/Time',
      field: 'createdAt',
      width: 220,
      minWidth: 220,
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
            {moment(params.row.createdAt).format('MMMM Do YYYY, h:mm a')}
          </h6>
        </div>
      ),
    },
    {
      headerName: 'Deposit',
      field: 'deposit',
      width: 110,
      minWidth: 110,
      flex: 1,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
          }}
        >
          {' '}
          <h6>
            {' '}
            {params.row.type === 'CREDIT'
              ? numberWithCommas(params.row.amount || 0)
              : '-'}
          </h6>
        </div>
      ),
    },
    {
      headerName: 'Withdraw',
      field: 'withdraw',
      width: 110,
      minWidth: 110,
      flex: 1,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
          }}
        >
          <h6 className="text-red-700">
            {' '}
            {params.row.type !== 'CREDIT'
              ? numberWithCommas(params.row.amount || 0)
              : '-'}
          </h6>
        </div>
      ),
    },
    {
      headerName: 'Balance',
      field: 'balance',
      width: 150,
      minWidth: 150,
      flex: 1,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
          }}
        >
          <h6> {params.row.receiverBalance}</h6>
        </div>
      ),
    },
    {
      headerName: 'Remark   ',
      field: 'remark',
      minWidth: 300,
      wdth: 300,
      flex: 1,
    },
    {
      headerName: 'From/To',
      field: 'fromto',
      width: 170,
      minWidth: 170,
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
            {params.row.sender?.username}&#8594;{params.row.receiver?.username}
          </h6>
        </div>
      ),
    },
  ];
  let sx = { border: 'solid-gray' };

  return (
    <>
      {isLoading && <Loading />}
      <div>
        <div className=" h-full md:h-24 rounded-md border border-gray-700 bg-gray-100 text-gray-900 flex flex-col md:flex-row">
          <div className="flex-initial w-44 m-2">
            <h3>From</h3>
            <div className="mt-2">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={selectedFromDate}
                  onChange={(newDate) => {
                    setSelectedFromDate(newDate?.$d);
                  }}
                  className="mt-4"
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
                  value={selectedToDate}
                  onChange={(newDate) => {
                    setSelectedToDate(newDate?.$d);
                  }}
                  className="mt-4"
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
          <div className="flex-initial h-8  rounded-md bg-[#071535] ml-2  my-2 md:mt-10 text-white  content-center w-55 text-sm">
            <button
              onClick={getActivityLogList}
              className="p-1.5 font-semibold"
            >
              <h4> Get Statement</h4>
            </button>
          </div>
        </div>
        <div className=" mt-4 border border-gray-500 rounded-md h-full ">
          <div className="h-8 bg-[#071535] rounded-t-md text-sm font-semibold">
            <h3 className="p-1">Account Statement</h3>
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
              <h4 className="my-4  text-slate-950">search : </h4>
            </div> */}
          </div>
          <div className="card mx-4 mb-4 ">
            <div className="w-100% h-full font-semibold  custom-table">
              <DataGrid
                autoHeight
                className="css-1yiktpq-MuiDataGrid-root"
                columns={columns}
                rows={accountStatementList}
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
      </div>
    </>
  );
}

export default AccountStatementUserAviator;
