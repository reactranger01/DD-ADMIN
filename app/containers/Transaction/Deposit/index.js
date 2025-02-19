/* eslint-disable react-hooks/exhaustive-deps */
import {
  getAuthData,
  isLoggedIn,
  // postAuthData,
  putAuthData,
} from '@/utils/apiHandlers';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { LinearProgress } from '@mui/material';
import CustomNoRowsOverlay from '@/utils/styles';
import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { numberWithCommas } from '@/utils/numberWithCommas';
import { RxCross2 } from 'react-icons/rx';
import { isYupError, parseYupError } from '@/utils/Yup';
import { depositAdminValidation } from '@/utils/validation';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { CiSearch } from 'react-icons/ci';
function usePasswordVisibility(initialState = false) {
  const [isVisible, setIsVisible] = useState(initialState);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  return [isVisible, toggleVisibility];
}
const Deposit = () => {
  const [dpositReqList, setDepositReqList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [rowCountState, setRowCountState] = useState(0);
  const [searchData, setSearchData] = useState('');
  const [readOnly, setReadOnly] = useState(true);
  // const [requestId, setRequestID] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    creditAmount: '',
    to: null,
    transactionCode: '',
    username: '',
  });
  const handleSearch = (e) => {
    setSearchData(e.target.value.trim());
  };
  const [showOldPassword, setShowOldPassword] = usePasswordVisibility(false);
  const [formError, setFormError] = useState({});
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 8,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getDepositList();
    setRowCountState((prevRowCountState) =>
      rowCountState !== undefined ? rowCountState : prevRowCountState,
    );
  }, [getDepositList, paginationModel, searchData]);

  const handlePasswordOpen = (data, type) => {
    setIsOpen(!isOpen);
    setForm(
      type === 'Approve'
        ? {
            ...form,
            acountholdername: data.username,
            id: data.id,
            creditAmount: data.amount,
            to: data.userId,
            // username: data.username,
            newStatus: 'Approved',
          }
        : {
            id: data.userId,
            newStatus: 'Rejected',
          },
    );
  };

  const getDepositList = useCallback(async () => {
    const islogin = isLoggedIn();
    setIsLoading(true);
    if (islogin) {
      try {
        const response = await getAuthData(
          `/user/get-all-deposits?limit=8&offset=${
            paginationModel.page * 8
          }&search=${searchData}`,
        );
        if (response?.status === 201 || response?.status === 200) {
          setIsLoading(false);
          setDepositReqList(response.data.data || []);
          setRowCountState(response.data.totalCount);
        } else {
          setIsLoading(false);
        }
      } catch (e) {
        console.error(e);
        return null;
      }
    }
  }, [rowCountState, paginationModel, searchData, setRowCountState]);

  const handleDepositSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      setFormError({});
      await depositAdminValidation.validate(form, {
        abortEarly: false,
      });
      const response = await putAuthData('/user/deposit/update-status', form);
      // if (response?.status === 200 || response?.status === 201) {
      //   const response = await putAuthData('/user/deposit/update-status', {
      //     id: requestId,
      //     newStatus: 'Approved',
      //   });

      if (response?.status === 200 || response?.status === 201) {
        toast.success('Deposit Request Approved Successfully');
        getDepositList();
        setIsOpen(false);
        setForm({
          id: '',
          creditAmount: '',
          to: null,
          transactionCode: '',
          // username: '',
          newStatus: '',
        });
        setIsLoading(false);
      } else {
        toast.error(response?.data || 'Something went wrong');
        setLoading(false);
      }
      // } else {
      //   toast.error(response?.data || 'Something went wrong');
      //   setLoading(false);
      // }
    } catch (error) {
      if (isYupError(error)) {
        setFormError(parseYupError(error));
        setLoading(false);
      } else {
        toast.error(error?.message || 'Unauthorised');
        setLoading(false);
      }
    }
  };

  const handelRejected = async (id) => {
    const response = await putAuthData('/user/deposit/update-status', {
      id: id,
      newStatus: 'Rejected',
    });
    if (response?.status === 200 || response?.status === 201) {
      toast.success('Deposit Request Rejected Successfully');
      getDepositList();
    } else {
      toast.error(response?.data || 'Something went wrong');
    }
  };

  let columns = [
    {
      headerName: 'User Name',
      field: 'username',
      type: 'string',
      flex: 1,
      width: 132,
      minWidth: 132,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <h6 className="">{params.row.username}</h6>
        </div>
      ),
    },
    {
      headerName: 'UTR No.',
      field: 'utr',
      type: 'string',
      width: 160,
      flex: 1,
      minWidth: 160,
    },
    {
      headerName: 'Amount',
      field: 'amount',
      width: 200,
      flex: 1,
      minWidth: 200,
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
      headerName: 'Payment Mode',
      field: 'paymentMethod',
      flex: 1,
      width: 120,
      minWidth: 120,
    },
    {
      headerName: 'Screenshot',
      field: 'img',
      flex: 1,
      width: 120,
      minWidth: 120,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Link to={params.row.img} target="_blank">
            <h6 className="text-blue-500 cursor-pointer"> View</h6>
          </Link>
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
            className={`capitalize font-semibold  ${
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
      width: 180,
      minWidth: 180,
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
    setForm({ creditAmount: '', to: null, transactionCode: '', username: '' });
  };

  let sx = { border: 'solid-gray' };

  return (
    <>
      <div className="search-box  h-10 mx-2 md:mx-2 md:mx-10 my-4 flex justify-end">
        <div className="relative w-[250px] md:w-[350px] mb-5 ">
          <input
            type="text"
            readOnly={readOnly}
            onFocus={() => setReadOnly(false)}
            onBlur={() => setReadOnly(true)}
            onChange={handleSearch}
            placeholder="Search by User Name or Amount"
            value={searchData}
            className="h-[40px] w-full pl-10 border bg-lightPrimary text-14 text-gray-900  rounded-[6px] md:rounded-[20px] outline-none dark:!bg-navy-900  dark:text-white"
          />
          <span className="text-black ay-center mt-[10px] right-3 text-18 lg:text-[20px]">
            <CiSearch />
          </span>
        </div>
      </div>
      <div className="mx-8 mt-4 border border-gray-500 rounded-sm h-full z-0">
        <div className="h-8 bg-[#071535] rounded-t-sm text-sm font-semibold">
          <h3 className="p-1 ml-2">Deposit Requests</h3>
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
          <div className="w-100% h-full font-semibold custom-table">
            <DataGrid
              autoHeight
              className="css-1yiktpq-MuiDataGrid-root"
              columns={columns}
              rows={dpositReqList}
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
      <div
        className={
          isOpen
            ? 'fixed inset-0 bg-gray-500 bg-opacity-75 overflow-y-auto px-4 py-6 sm:px-0'
            : 'hidden'
        }
      >
        <div className="text-sm text-center h-4 rounded-t-md bg-[#071535] relative w-full max-w-lg mx-auto shadow-md px-8 py-4 row  flex justify-between  text-white">
          <h4 className="mt-[-0.5rem] text-sm font-bold">
            Approve Deposit Request - {form?.acountholdername}
          </h4>
          <button className=" flex-none">
            <RxCross2
              className="h-4 w-4 mt-[-0.5rem]   "
              onClick={handleClose}
            />
          </button>
        </div>
        <div className="relative w-full max-w-lg mx-auto shadow-md rounded-b-lg bg-white px-4 py-4 ">
          <div className=" grid grid-cols-2 gap-1 text-slate-800">
            <div>
              <label className="mx-2 mt-2 text-sm">Amount</label>
              <input
                name="oldPassword"
                disabled
                value={form.creditAmount || 0}
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
              className="bg-red-600 p-2 px-5 rounded-md"
              onClick={handleClose}
            >
              {' '}
              Cancel
            </button>
            {loading ? (
              <button className="bg-green-700 p-2 px-5 rounded-md">
                Loading...
              </button>
            ) : (
              <button
                onClick={handleDepositSubmit}
                className="bg-green-700 p-2 px-5 rounded-md"
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

export default Deposit;
