/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { LinearProgress, Tooltip } from '@mui/material';
import { IconButton } from '@mui/material';
import { MdDelete } from 'react-icons/md';
import { IoSettingsSharp } from 'react-icons/io5';
import { RiArrowUpDownLine } from 'react-icons/ri';
import { BiSolidDollarCircle, BiSolidEdit } from 'react-icons/bi';
import { TbCalendarTime } from 'react-icons/tb';
// import { TbSportBillard } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { getAuthData, isLoggedIn, putAuthData } from '@/utils/apiHandlers';
import { Loading } from '@/components';
import { toast } from 'react-toastify';
import Banking from './Models/Banking';
import OpenHistory from './Models/OpenHistory';
import Setting from './Models/Setting';
import SportSetting from './Models/SportSetting';
import { CgProfile } from 'react-icons/cg';
import CustomNoRowsOverlay from '@/utils/styles';
import { numberWithCommas } from '@/utils/numberWithCommas';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBetDetailsAction } from '@/redux/actions';
import EditCredit from './Models/EditCredit';

function UserList() {
  let Update = useSelector((state) => state.Adduser.status);
  const dispatch = useDispatch();
  const [userListData, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line
  const [reftech, setReftech] = useState(true);
  const [rowCountState, setRowCountState] = useState(0);
  const [singleRowData, setSingleRowData] = useState({});
  const [changeMobileno, setChangeMobileno] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 8,
  });
  useEffect(() => {
    getUserList();
    setRowCountState((prevRowCountState) =>
      rowCountState !== undefined ? rowCountState : prevRowCountState,
    );
  }, [getUserList, paginationModel]);

  const getUserList = useCallback(async () => {
    const islogin = isLoggedIn();
    setIsLoading(true);
    if (islogin) {
      try {
        const response = await getAuthData(
          `/user/get-sub-users?limit=8&offset=${paginationModel.page * 8}`,
        );
        if (response?.status === 201 || response?.status === 200) {
          setIsLoading(false);
          const data = response.data.data.filter(
            (item) => item.userType === 'USER',
          );
          setUserList(
            data.map((item, index) => {
              return {
                ...item,
                index: index + 1,
                exposureLimit: item?.exposureAmount,
                profitLoss: item?.balance,
                availableBalance: item?.balance,
              };
            }),
          );
          dispatch(fetchBetDetailsAction(false));
          setRowCountState(response.data.totalCount?.[0]?.count);
        } else {
          setIsLoading(false);
        }
      } catch (e) {
        console.error(e);
        return null;
      }
    }
  }, [rowCountState, paginationModel, setRowCountState]);

  useEffect(() => {
    getUserList();
  }, [reftech]);

  const handleDelete = async (id) => {
    const response = await putAuthData('/user/delete-user', {
      userId: id,
    });
    if (response?.status === 200 || response?.status === 201) {
      toast.success('User Delete Successfully');
      getUserList();
    } else {
      toast.error(response?.data || 'Something went wrong');
    }
  };

  useEffect(() => {
    if (Update) {
      getUserList();
    }
  }, [Update]);
  const hanadleChangeMobileNo = (row) => {
    setSingleRowData(row);
    setChangeMobileno(true);
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
          <h6> {params.row.username}</h6>
        </div>
      ),
    },
    {
      headerName: 'Credit',
      type: 'number',
      headerAlign: 'start',
      align: 'start',
      field: 'creditAmount',
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
          <BiSolidEdit
            className="h-4 w-4 btn-blu"
            onClick={() => hanadleChangeMobileNo(params.row)}
          />
        </div>
      ),
      width: 100,
      minWidth: 100,
      flex: 1,
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
              params.row.creditAmount > params.row.balance
                ? 'text-green-500'
                : 'text-white'
            } `}
          >
            {params.row.creditAmount > params.row.balance
              ? numberWithCommas(
                  params.row.creditAmount - params.row.balance || 0,
                )
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
              params.row.creditAmount < params.row.balance
                ? 'text-red-600'
                : 'text-white'
            } `}
          >
            {params.row.creditAmount < params.row.balance
              ? numberWithCommas(
                  params.row.balance - params.row.creditAmount || 0,
                )
              : '-'}
          </h6>
        </div>
      ),
    },
    {
      headerName: 'Balance',
      field: 'availableBalance',
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
          <h6 className="cursor-pointer">
            {numberWithCommas(
              params.row.creditAmount + params.row.userPoints,
            ) || 0}
          </h6>
        </div>
      ),
    },

    // {
    //   headerName: 'Downline P/L',
    //   field: 'userPoints',
    //   width: 120,
    //   minWidth: 120,
    //   flex: 1,
    //   renderCell: (params) => (
    //     <div
    //       style={{
    //         display: 'flex',
    //         alignItems: 'center',
    //       }}
    //     >
    //       <h6
    //         className={
    //           params.row.userPoints > 0
    //             ? 'text-green-700'
    //             : params.row.userPoints === 0
    //             ? 'text-black'
    //             : 'text-red-700'
    //         }
    //       >
    //         {numberWithCommas(Math.abs(parseInt(params.row.userPoints)))}
    //       </h6>
    //     </div>
    //   ),
    // },
    // {
    //   headerName: 'Client (P/L) %',
    //   field: 'parentApfdsds',
    //   width: 113,
    //   minWidth: 113,
    //   flex: 1,
    //   renderCell: (params) => (
    //     <div
    //       style={{
    //         display: 'flex',
    //         alignItems: 'center',
    //       }}
    //     >
    //       <h6
    //         className={
    //           params.row.userPoints < 0
    //             ? 'text-green-700'
    //             : params.row.userPoints === 0
    //             ? 'text-black'
    //             : 'text-red-700'
    //         }
    //       >
    //         {numberWithCommas(
    //           Number(
    //             Math.abs(
    //               (params.row.userPoints *
    //                 (params.row.ap + (owner_ap > 0 ? owner_ap - 100 : 0))) /
    //                 100,
    //             ),
    //           )?.toFixed(2),
    //         )}
    //       </h6>
    //     </div>
    //   ),
    // },

    {
      headerName: 'Exposure',
      field: 'exposureAmount',
      type: 'number',
      headerAlign: 'start',
      align: 'start',
      width: 85,
      minWidth: 85,
      flex: 1,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <h6 className="cursor-pointer text-red-600">
            {numberWithCommas(params.row.exposureAmount)}
          </h6>
        </div>
      ),
    },
    {
      headerName: 'Avail. Bal.',
      field: 'balance',
      width: 113,
      minWidth: 113,
      flex: 1,

      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <h6>
            {' '}
            {numberWithCommas(params.row.balance + params.row.exposureAmount) ||
              0}
          </h6>
        </div>
      ),
    },
    {
      headerName: 'Partnership',
      field: 'partner',
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
          <h6>{params.row.ap}</h6>
        </div>
      ),
    },
    {
      headerName: 'Status',
      field: 'status',
      type: 'number',
      headerAlign: 'start',
      align: 'start',
      flex: 1,
      width: 100,
      minWidth: 100,
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
      field: 'action',
      headerName: 'Actions',
      width: 300,
      minWidth: 300,
      flex: 1,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          <Tooltip title={<div className="">Banking</div>} enterTouchDelay={0}>
            <IconButton>
              <BiSolidDollarCircle
                size={18}
                onClick={() => handleClick(params.row)}
              />
            </IconButton>
          </Tooltip>
          <Tooltip
            title={<div className="">Profit/Loss</div>}
            enterTouchDelay={0}
          >
            <IconButton>
              <Link to={`/user_account/${params.row.id}/profit_lose`}>
                <RiArrowUpDownLine size={18} />
              </Link>
            </IconButton>
          </Tooltip>

          <Tooltip
            title={<div className="">BetHistory</div>}
            enterTouchDelay={0}
          >
            <IconButton>
              <Link to={`/user_account/${params.row.id}/bet_history`}>
                <TbCalendarTime size={18} />
              </Link>
            </IconButton>
          </Tooltip>
          <Tooltip title={<div className="">Setting</div>} enterTouchDelay={0}>
            <IconButton>
              <IoSettingsSharp
                size={18}
                onClick={() => handleClicksetting(params.row)}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title={<div className="">Profile</div>} enterTouchDelay={0}>
            <IconButton>
              <Link to={`/user_account/${params.row.id}`}>
                <CgProfile size={18} />
              </Link>
            </IconButton>
          </Tooltip>
          {/* <Tooltip
            title={<div className="">Sport Setting</div>}
            enterTouchDelay={0}
          >
            <IconButton>
              <TbSportBillard
                size={18}
                onClick={() => handleClickSportsetting(params.row)}
              />
            </IconButton>
          </Tooltip> */}
          <Tooltip title={<div className="">Delete</div>} enterTouchDelay={0}>
            <IconButton>
              <MdDelete onClick={() => handleDelete(params.row.id)} size={18} />
            </IconButton>
          </Tooltip>
        </div>
      ),
      type: 'number',
      headerAlign: 'start',
      align: 'start',
    },
  ];

  let sx = { border: 'solid-gray' };
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = (data) => {
    setIsOpen(true);
    setSingleRowData(data);
  };

  const [isOpenHistory, setIsOpenHistory] = useState(false);

  const [isOpensetting, setIsOpensetting] = useState(false);
  const handleClicksetting = (data) => {
    setIsOpensetting(true);
    setSingleRowData(data);
  };

  const [isOpenSportsetting, setIsOpenSportsetting] = useState(false);
  // const handleClickSportsetting = (data) => {
  //   setIsOpenSportsetting(true);
  //   setSingleRowData(data);
  // };

  return (
    <>
      {isLoading && <Loading />}
      <div className="md:mx-2 md:mx-10 mx-2 my-4 bg-white  border-gray-500 rounded-sm h-full border-solid borderflex  text-sm text-slate-950">
        <div className="grid grid-cols-2 gap-4 text-slate-950 text-sm mb-2">
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
        <div className="card mx-4">
          <div className="w-auto h-full custom-table">
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
                toolbar: GridToolbar,
                loadingOverlay: LinearProgress,
                noRowsOverlay: CustomNoRowsOverlay,
              }}
              disableColumnMenu
              disableRowSelectionOnClick
            />
          </div>
        </div>
        <SportSetting
          isOpenSportsetting={isOpenSportsetting}
          data={singleRowData}
          setReftech={setReftech}
          handleCloseSportsetting={() => {
            setIsOpenSportsetting(false);
          }}
        />
        <EditCredit
          changeMobileno={changeMobileno}
          UpdatemobileClose={() => {
            setChangeMobileno(false);
          }}
          setReftech={setReftech}
          userCredit={singleRowData}
        />
        <Setting
          isOpensetting={isOpensetting}
          data={singleRowData}
          setReftech={setReftech}
          handleClosesetting={() => {
            setIsOpensetting(false);
          }}
        />

        <OpenHistory
          isOpenHistory={isOpenHistory}
          data={singleRowData}
          setReftech={setReftech}
          handleClosehistory={() => {
            setIsOpenHistory(false);
          }}
        />

        <Banking
          isOpen={isOpen}
          data={singleRowData}
          setReftech={setReftech}
          handleClose={() => {
            setIsOpen(false);
          }}
        />
      </div>
    </>
  );
}

export default UserList;
