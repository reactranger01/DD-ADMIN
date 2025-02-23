/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { LinearProgress } from '@mui/material';
import CustomNoRowsOverlay from '@/utils/styles';
import {
  getAuthData,
  isLoggedIn,
  // postAuthData,
  putAuthData,
} from '@/utils/apiHandlers';
import moment from 'moment';
import { toast } from 'react-toastify';
import { numberWithCommas } from '@/utils/numberWithCommas';
import { RxCross2 } from 'react-icons/rx';
import { isYupError, parseYupError } from '@/utils/Yup';
import { withdrawAdminValidation } from '@/utils/validation';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { CiSearch } from 'react-icons/ci';

function usePasswordVisibility(initialState = false) {
  const [isVisible, setIsVisible] = useState(initialState);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  return [isVisible, toggleVisibility];
}
const Withdrawal = () => {
  const [withdrawReqList, setWithdrawReqList] = useState([]);
  const [showOldPassword, setShowOldPassword] = usePasswordVisibility(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rowCountState, setRowCountState] = useState(0);
  const [readOnly, setReadOnly] = useState(true);
  // const [requestId, setRequestID] = useState('');
  const [newLoading, setNewLoading] = useState(false);
  const [menuHoverActive, setMenuHoverActive] = useState(false);
  const [parentsData, setParentsData] = useState([]);
  const [searchData, setSearchData] = useState('');
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 8,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    withdrawAmount: '',
    transactionCode: '',
    newStatus: '',
  });
  const [formError, setFormError] = useState({});
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getWithdrawList();
    setRowCountState((prevRowCountState) =>
      rowCountState !== undefined ? rowCountState : prevRowCountState,
    );
  }, [getWithdrawList, searchData, paginationModel]);
  const handleUsernameShow = async (data, type) => {
    console.log('data', data);
    type != 'approve' && setMenuHoverActive(true);
    const response = await getAuthData(
      `/user/get-particuleruser-details?id=${Number(data.userId)}`,
    );
    if (response?.status === 201 || response?.status === 200) {
      setParentsData(response);
    } else {
      // console.log(response, 'get all error');
    }
  };
  const AvailableWithdrawa = Math.abs(
    Math.floor(parentsData?.data?.balance) +
      Math.floor(parentsData?.data?.exposureAmount) ||
      Math.floor(parentsData?.data?.balance) +
        Math.floor(parentsData?.data?.exposureAmount),
  );
  const handleUsernameShowClose = () => {
    setMenuHoverActive(false);
  };
  const handlePasswordOpen = (data, type) => {
    handleUsernameShow(data, 'approve');
    setIsOpen(!isOpen);
    setForm(
      type === 'Approve'
        ? {
            ...form,
            acountholdername: data.acountholdername,
            withdrawAmount: data.amount,
            from: data.userId,
            id: data.id,
            newStatus: 'Approved',
          }
        : {
            id: data.userId,
            newStatus: 'Rejected',
          },
    );
  };
  const getWithdrawList = useCallback(async () => {
    const islogin = isLoggedIn();
    setIsLoading(true);
    if (islogin) {
      try {
        const response = await getAuthData(
          `/user/getall-widrawReq?limit=8&offset=${
            paginationModel.page * 8
          }&search=${searchData}`,
        );
        if (response?.status === 201 || response?.status === 200) {
          setIsLoading(false);
          setWithdrawReqList(response.data.data || []);
          setRowCountState(response.data.totalCount);
        } else {
          setIsLoading(false);
        }
      } catch (e) {
        console.error(e);
        return null;
      }
    }
  }, [rowCountState, paginationModel, setRowCountState, searchData]);

  const handelRejected = async (id) => {
    const response = await putAuthData('/user/withdrawal/update-status', {
      id: id,
      newStatus: 'Rejected',
    });
    if (response?.status === 200 || response?.status === 201) {
      toast.success('Withdraw Request Rejected Successfully');
      getWithdrawList();
    } else {
      toast.error(response?.data || 'Something went wrong');
    }
  };

  let columns = [
    {
      headerName: 'User Name',
      field: 'userName',
      type: 'string',
      width: 200,
      minWidth: 200,
      flex: 1,
    },
    {
      headerName: 'Amount',
      field: 'amount',
      width: 130,
      minWidth: 100,
      flex: 1,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <h6 className=""> {numberWithCommas(params.row.amount) || 0}</h6>
        </div>
      ),
    },
    {
      headerName: 'Account Holder name',
      field: 'name',
      type: 'string',
      flex: 1,
      width: 200,
      minWidth: 200,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
          onClick={() => handleUsernameShow(params.row)}
        >
          <h6 className="underline text-blue-500 cursor-pointer">
            {' '}
            {params?.row?.acountholdername
              ? params?.row?.acountholdername
              : 'N/A'}
          </h6>
        </div>
      ),
    },
    {
      headerName: 'Account/Upi',
      field: 'accountNo',
      flex: 1,
      width: 200,
      minWidth: 200,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <h6 className="">{params.row.accountNo || '-'}</h6>
        </div>
      ),
    },
    {
      headerName: 'IFSC Code',
      field: 'ifscCode',
      flex: 1,
      width: 200,
      minWidth: 200,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <h6 className="">{params.row.ifscCode || '-'}</h6>
        </div>
      ),
    },
    {
      headerName: 'Status',
      field: 'status',
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
          <h6
            className={` font-semibold  ${
              params.row.status === 'Pending' || params.row.status === 'pending'
                ? 'text-yellow-700'
                : params.row.status === 'Rejected' ||
                  params.row.status === 'rejected'
                ? 'text-red-700'
                : 'text-green-700'
            }`}
          >
            {' '}
            {params.row.status}
          </h6>
        </div>
      ),
    },
    {
      headerName: 'Requested At',
      field: 'requestedat',
      flex: 1,
      width: 200,
      minWidth: 200,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <h6 className=""> {moment(params.row.createdAt).format('lll')}</h6>
        </div>
      ),
    },
    {
      headerName: 'Action',
      field: 'action',
      flex: 1,
      width: 200,
      minWidth: 200,
      renderCell: (params) => (
        <div className="flex text-white font-bold gap-2">
          <>
            <button
              disabled={
                params.row.status === 'Pending' ||
                params.row.status === 'pending'
                  ? false
                  : true
              }
              onClick={() => handlePasswordOpen(params.row, 'Approve')}
              className={` p-2 rounded-sm w-20  ${
                params.row.status === 'Pending' ||
                params.row.status === 'pending'
                  ? 'bg-green-600 hover:bg-green-800'
                  : 'bg-green-200'
              }`}
            >
              Approve
            </button>
            <button
              disabled={
                params.row.status === 'Pending' ||
                params.row.status === 'pending'
                  ? false
                  : true
              }
              onClick={() => handelRejected(params.row.id)}
              className={` p-2 rounded-sm w-20  ${
                params.row.status === 'Pending' ||
                params.row.status === 'pending'
                  ? 'bg-red-600 hover:bg-red-800'
                  : 'bg-red-200'
              }`}
            >
              Reject
            </button>
          </>
        </div>
      ),
    },
  ];

  const handleClose = () => {
    setIsOpen(false);
    setForm({ withdrawAmount: '', from: null, transactionCode: '' });
  };

  const handleWithdrawSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setNewLoading(true);
    try {
      setFormError({});
      await withdrawAdminValidation.validate(form, {
        abortEarly: false,
      });
      const response = await putAuthData(
        '/user/withdrawal/update-status',
        form,
      );
      if (response?.status === 200 || response?.status === 201) {
        toast.success('Withdraw Request Approved Successfully');
        getWithdrawList();
        setIsOpen(false);
        setNewLoading(false);
        setForm({
          withdrawAmount: '',
          from: null,
          transactionCode: '',
          id: '',
          newStatus: '',
        });
      } else {
        toast.error(response?.data?.message);
        toast.error(response?.data || 'Something went wrong');
        setNewLoading(false);
      }
    } catch (error) {
      if (isYupError(error)) {
        setFormError(parseYupError(error));
        setLoading(false);
        setNewLoading(false);
      } else {
        toast.error(error?.message || 'Unauthorised');
        setLoading(false);
        setNewLoading(false);
      }
    }
  };

  let sx = { border: 'solid-gray' };
  const handleSearch = (e) => {
    setSearchData(e.target.value.trim());
  };
  return (
    <>
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
            {parentsData?.data?.username}
          </h4>
          <button className="mt-[-0.5rem]">
            <RxCross2 className="" onClick={handleUsernameShowClose} />
          </button>
        </div>
        <div className="relative w-80 max-w-80 mx-auto shadow-md rounded-b-lg bg-white px-4 py-4 ">
          <div className=" grid grid-cols-1 text-slate-800">
            <div className=" flex gap-2">
              <div>Balance :- </div>
              <div>{parentsData?.data?.balance}</div>
            </div>
            <div className=" flex gap-2">
              <div>Bet Exposure :-</div>
              <div>{parentsData?.data?.exposureAmount}</div>
            </div>
            <div className=" flex gap-2">
              <div>Withdrawal Request Amount :- </div>
              <div>{AvailableWithdrawa}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="search-box  h-10 mx-2  md:mx-10 my-4 flex justify-end">
        <div className="relative w-[250px] md:w-[350px] mb-5 ">
          <input
            type="text"
            readOnly={readOnly}
            onFocus={() => setReadOnly(false)}
            onBlur={() => setReadOnly(true)}
            onChange={handleSearch}
            placeholder="Search by User Name, Amount or Account Holder Name"
            value={searchData}
            className="h-[40px] w-full pr-10 pl-3 border bg-lightPrimary text-14 text-gray-900  rounded-[6px] md:rounded-[20px] outline-none dark:!bg-navy-900  dark:text-white"
          />
          <span className="text-black ay-center mt-[10px] right-3 text-18 lg:text-[20px]">
            <CiSearch />
          </span>
        </div>
      </div>
      <div className="mx-8 mt-4 border border-gray-500 rounded-sm h-full z-0">
        <div className="h-8 bg-[#071535] rounded-t-sm text-sm font-semibold">
          <h3 className="ml-2 p-1">Withdrawal Requests</h3>
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
        <div className="card mx-4 ">
          <div className="w-100% h-full font-semibold ">
            <DataGrid
              autoHeight
              className="css-1yiktpq-MuiDataGrid-root"
              columns={columns}
              rows={withdrawReqList}
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
      <div
        className={
          isOpen
            ? 'fixed inset-0 bg-gray-500 bg-opacity-75 overflow-y-auto px-4 py-6 sm:px-0'
            : 'hidden'
        }
      >
        <div className="text-sm text-center h-4 rounded-t-md bg-[#071535] relative w-full max-w-lg mx-auto shadow-md px-8 py-4 row  flex justify-between  text-white">
          <h4 className="mt-[-0.5rem] text-sm font-bold">
            Approve Withdraw Request - {form?.acountholdername}
          </h4>
          <button className=" flex-none">
            <RxCross2
              className="h-4 w-4 mt-[-0.5rem]   "
              onClick={handleClose}
            />
          </button>
        </div>
        <div className="relative w-full max-w-lg mx-auto shadow-md rounded-b-lg bg-white px-4 py-4 ">
          <div className="relative  mx-auto  rounded-b-lg bg-white px-4 py-4 ">
            <div className=" grid grid-cols-1 text-slate-800">
              <div className=" flex gap-2">
                <div>Balance :- </div>
                <div>{parentsData?.data?.balance}</div>
              </div>
              <div className=" flex gap-2">
                <div>Bet Exposure :-</div>
                <div>{parentsData?.data?.exposureAmount}</div>
              </div>
              <div className=" flex gap-2">
                <div>Withdrawal Request Amount :- </div>
                <div>{AvailableWithdrawa}</div>
              </div>
            </div>
          </div>
          <div className=" grid grid-cols-2 gap-1 text-slate-800">
            <div>
              <label className="mx-2 mt-2 text-sm">Amount</label>
              <input
                name="oldPassword"
                // onChange={handleChange}
                disabled
                value={form.withdrawAmount || 0}
                className="rounded-sm border border-gray-300 h-8 p-2 mx-2 mt-2"
              />
            </div>
            <div>
              <label className="mx-2 mt-2  text-sm">Master Password</label>
              <div className="relative">
                <input
                  type={showOldPassword ? 'text' : 'password'}
                  placeholder="Master Password"
                  name="transactionCode"
                  onChange={(event) =>
                    setForm({ ...form, transactionCode: event.target.value })
                  }
                  value={form?.transactionCode}
                  className="rounded-sm border border-gray-300 h-8 p-2 mx-2 mt-2"
                />
                <button
                  type="button"
                  onClick={setShowOldPassword}
                  className="absolute inset-y-0 right-0 px-3 py-2 mt-2 bg-transparent border-none text-gray-500"
                >
                  {showOldPassword ? (
                    <FiEye className="btn-blu" />
                  ) : (
                    <FiEyeOff className="btn-blu" />
                  )}
                </button>
              </div>

              {formError?.transactionCode && (
                <div className="text-12 px-2 font-normal  text-red-700">
                  {formError?.transactionCode}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-row-reverse gap-2 mt-4">
            <button
              onClick={handleClose}
              className="bg-red-600 p-2 px-5 rounded-md"
            >
              {' '}
              Cancel
            </button>
            {newLoading ? (
              <button className="bg-green-700 p-2 rounded-md">
                Loading...
              </button>
            ) : (
              <button
                onClick={handleWithdrawSubmit}
                className="bg-green-700 p-2  px-5 rounded-md"
              >
                Approve
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Withdrawal;
