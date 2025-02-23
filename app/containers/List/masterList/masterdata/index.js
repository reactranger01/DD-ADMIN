/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { LinearProgress, Tooltip } from '@mui/material';
import CustomNoRowsOverlay from '@/utils/styles';
import { Link, useParams } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { RiArrowUpDownLine } from 'react-icons/ri';
import { CgProfile } from 'react-icons/cg';
import { TbCalendarTime } from 'react-icons/tb';
import { getAuthData, isLoggedIn } from '@/utils/apiHandlers';
import { numberWithCommas } from '@/utils/numberWithCommas';
import { BiSolidEdit } from 'react-icons/bi';
import EditCredit from '../../userList/Models/EditCredit';
function MasterData() {
  const [userListData, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id, path } = useParams();
  const newPath = path.replace(/-/g, '.');
  const [rowCountState, setRowCountState] = useState(0);
  const [singleRowData, setSingleRowData] = useState({});
  const [editCredit, setEditCredit] = useState(false);
  const [reftech, setReftech] = useState(true);
  const userType = localStorage.getItem('owner_type');
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 8,
  });
  useEffect(() => {
    getUserList(id, newPath);
    setRowCountState((prevRowCountState) =>
      rowCountState !== undefined ? rowCountState : prevRowCountState,
    );
  }, [getUserList, paginationModel]);

  const getUserList = useCallback(
    async (id, newPath) => {
      const islogin = isLoggedIn();
      setIsLoading(true);
      if (islogin) {
        try {
          const response = await getAuthData(
            `/user/get-master-subusers?id=${id}&path=${newPath}&limit=8&offset=${
              paginationModel.page * 8
            }`,
          );
          if (response?.status === 201 || response?.status === 200) {
            setIsLoading(false);
            setUserList(
              response?.data?.response.data.map((item, index) => {
                return {
                  ...item,
                  index: index + 1,
                  exposureLimit: item?.exposureAmount,
                  profitLoss: item?.balance,
                  availableBalance: item?.balance,
                };
              }),
            );
            setRowCountState(response?.data?.response.count?.totalcount);
          } else {
            setIsLoading(false);
          }
        } catch (e) {
          console.error(e);
          return null;
        }
      }
    },
    [rowCountState, paginationModel, setRowCountState, id, newPath],
  );
  useEffect(() => {
    getUserList(id, newPath);
  }, [reftech]);
  const hanadleEditCredit = (row) => {
    setSingleRowData(row);
    setEditCredit(true);
  };

  const columns = [
    {
      headerName: 'Username',
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
          <span className="p-[2px] font-semibold flex justify-center items-center text-10 rounded bg-green-700 text-white">
            {params.row.userType}
          </span>
          &nbsp;
          {params.row.userType === 'MASTER' ? (
            <h6 className="text-sky-600 font-semibold cursor-pointer">
              {' '}
              {params.row.username}
            </h6>
          ) : (
            <h6> {params.row.username}</h6>
          )}
        </div>
      ),
    },
    {
      headerName: 'Take (INR)',
      field: 'availableBalance1',
      type: 'number',
      headerAlign: 'start',
      align: 'start',
      width: 100,
      minWidth: 100,
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <div className="flex items-center text-white">
          <h6
            className={`cursor-pointer ${
              params.row.settlementPoints > 0 ? 'text-green-500' : 'text-white'
            } `}
          >
            {params.row.settlementPoints > 0
              ? numberWithCommas(params.row.settlementPoints || 0)
              : '-'}
          </h6>
        </div>
      ),
    },
    {
      headerName: 'Give (INR)',
      field: 'availableBalance2',
      type: 'number',
      headerAlign: 'start',
      align: 'start',
      width: 100,
      minWidth: 100,
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <div className="flex items-center text-white">
          <h6
            className={`cursor-pointer ${
              params.row.settlementPoints < 0 ? 'text-red-600' : 'text-white'
            } `}
          >
            {params.row.settlementPoints < 0
              ? numberWithCommas(params.row.settlementPoints || 0)
              : '-'}
          </h6>
        </div>
      ),
    },

    {
      headerName: 'Credit',
      field: 'creditAmount',
      type: 'number',
      headerAlign: 'start',
      align: 'start',
      width: 120,
      minWidth: 120,
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
          <h6>{numberWithCommas(params.row.creditAmount)}</h6>
          {userType != 'OWNER' && (
            <BiSolidEdit
              className="h-4 w-4 btn-blu"
              onClick={() => hanadleEditCredit(params.row)}
            />
          )}
        </div>
      ),
    },
    {
      headerName: 'Balance',
      field: 'balance',
      type: 'number',
      headerAlign: 'start',
      align: 'start',
      width: 120,
      minWidth: 120,
      flex: 1,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <h6 className="">{numberWithCommas(params.row.balance)}</h6>
        </div>
      ),
    },
    {
      headerName: 'Exposure',
      field: 'exposureAmount',
      type: 'number',
      headerAlign: 'start',
      align: 'start',
      width: 100,
      minWidth: 100,
      flex: 1,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <h6 className="cursor-pointer text-red-600">
            {numberWithCommas(params.row.exposureAmount || 0)}
          </h6>
        </div>
      ),
    },

    {
      headerName: 'Avail. Bal.',
      field: 'availableBalance',
      type: 'number',
      headerAlign: 'start',
      align: 'start',
      width: 150,
      minWidth: 150,
      flex: 1,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <h6 className="">{params.row.balance + params.row.exposureAmount}</h6>
        </div>
      ),
    },
    {
      headerName: 'Profit/Loss',
      field: 'userPoints',
      type: 'number',
      headerAlign: 'start',
      align: 'start',
      width: 90,
      minWidth: 90,
      flex: 1,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {params.row.userPoints < 0 ? (
            <h6 className="text-green-700">
              {Math.abs((params.row.userPoints * params.row.ap) / 100)}
            </h6>
          ) : (
            <h6 className="text-red-700">
              {Math.abs((params.row.userPoints * params.row.ap) / 100)}
            </h6>
          )}
        </div>
      ),
    },
    {
      headerName: 'Partnership',
      field: 'ap',
      type: 'number',
      headerAlign: 'start',
      align: 'start',
      width: 120,
      minWidth: 120,
      flex: 1,
    },
    {
      headerName: 'Status',
      field: 'status',
      type: 'number',
      headerAlign: 'start',
      align: 'start',
      width: 130,
      minWidth: 130,
      flex: 1,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <button
            className={`px-1 ${
              params.row?.lock === false && params.row?.betLock === false
                ? 'bg-green-100 text-green-700'
                : (params.row?.lock === true &&
                    params.row?.betLock === false) ||
                  (params.row?.lock === true && params.row?.betLock === true)
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-red-100 text-red-700'
            }  rounded-md col-start-6 col-end-7 `}
          >
            {params.row?.lock === false && params.row?.betLock === false
              ? 'Active'
              : (params.row?.lock === true && params.row?.betLock === false) ||
                (params.row?.lock === true && params.row?.betLock === true)
              ? 'Locked'
              : 'Suspended'}
          </button>
        </div>
      ),
    },
    {
      headerName: 'Action',
      field: 'action',
      width: 200,
      minWidth: 200,
      flex: 1,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Tooltip
            title={<div className="">Profit/Loss</div>}
            enterTouchDelay={0}
          >
            <IconButton>
              <Link to={`/master_user_account/${params.row.id}/profit_lose`}>
                <RiArrowUpDownLine />
              </Link>
            </IconButton>
          </Tooltip>

          <Tooltip
            title={<div className="">BetHistory</div>}
            enterTouchDelay={0}
          >
            <IconButton>
              <Link to={`/master_user_account/${params.row.id}/bet_history`}>
                {' '}
                <TbCalendarTime />
              </Link>
            </IconButton>
          </Tooltip>
          <Tooltip title={<div className="">Profile</div>} enterTouchDelay={0}>
            <IconButton>
              {' '}
              <Link to={`/master_user_account/${params.row.id}`}>
                <CgProfile />
              </Link>{' '}
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];
  let sx = { border: 'solid-gray' };
  return (
    <>
      <div className="mx-2  md:mx-10 my-4  bg-white  border-gray-500 rounded-sm h-full border-solid borderflex  text-sm text-slate-950 ">
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
          {/* <button className="bg-green-200" onClick={handleClickmaster}>
    Addmaster
  </button> */}
          {/* <div className=" flex flex-row-reverse">
          <input className="border border-slate-300 rounded-md mx-4 p-1 my-4" />
          <h4 className="my-4  text-slate-950">Search : </h4>
        </div> */}
        </div>
        <div className="card mx-4 ">
          <div className="w-100% h-full custom-table text-black text-sm flex">
            <DataGrid
              autoHeight
              className="css-1yiktpq-MuiDataGrid-root"
              columns={columns}
              rows={userListData}
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

      <EditCredit
        changeMobileno={editCredit}
        UpdatemobileClose={() => {
          setEditCredit(false);
        }}
        setReftech={setReftech}
        userCredit={singleRowData}
      />
    </>
  );
}

export default MasterData;
