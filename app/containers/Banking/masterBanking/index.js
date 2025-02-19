/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { LinearProgress } from '@mui/material';
import CustomNoRowsOverlay from '@/utils/styles';
import { getAuthData, isLoggedIn, postAuthData } from '@/utils/apiHandlers';
import { Loading } from '@/components';
import { toast } from 'react-toastify';
import { isYupError, parseYupError } from '@/utils/Yup';
import {
  depositAdminValidation,
  withdrawAdminValidation,
} from '@/utils/validation';
import EditMasterCreditRef from './Model/EditMasterCreditRef';
import { numberWithCommas } from '@/utils/numberWithCommas';
import { FiEye, FiEyeOff } from 'react-icons/fi';
function Banking() {
  const [selectedId, setSelectedId] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [userListData, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [zero, setZero] = useState(false);
  const [rowCountState, setRowCountState] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 8,
  });
  // const [singleRowData, setSingleRowData] = useState({});

  const [form, setForm] = useState({});
  const [defaultmessage, setDefault] = useState('');
  const [formDepositError, setFormDepositError] = useState({
    creditAmount: '',
    to: null,
    transactionCode: '',
    userPoint: null,
    username: '',
  });
  const [formWithdrawError, setFormWithdrawError] = useState({
    from: null,
    remark: '',
    transactionCode: '',
    withdrawAmount: '',
  });

  const handleDepositSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      setFormDepositError({});
      await depositAdminValidation.validate(form, {
        abortEarly: false,
      });
      const response = await postAuthData('/user/transfer-credit-amount', form);
      if (response?.status === 200 || response?.status === 201) {
        toast.success('Amount Deposit Successfully');
        getUserList();
        setForm({});
        setSelectedId(null);
        setSelectedType(null);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error(response?.data || 'Something went wrong');
      }
    } catch (error) {
      setIsLoading(false);
      if (isYupError(error)) {
        setFormDepositError(parseYupError(error));
      } else {
        setIsLoading(false);
        toast.error(error?.message || 'Unauthorised');
      }
    }
  };

  const handleWithdrawSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      setFormWithdrawError({});
      await withdrawAdminValidation.validate(form, {
        abortEarly: false,
      });
      const response = await postAuthData('/user/withdraw-credit-amount', form);
      if (response?.status === 200 || response?.status === 201) {
        toast.success('Amount Withdraw Successfully');
        getUserList();
        setForm({});
        setSelectedId(null);
        setSelectedType(null);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error(response?.data || 'Something went wrong');
      }
    } catch (error) {
      setIsLoading(false);
      if (isYupError(error)) {
        setFormWithdrawError(parseYupError(error));
      } else {
        setIsLoading(false);
        toast.error(error?.message || 'Unauthorised');
      }
    }
  };
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
          `/user/get-masters?limit=8&offset=${paginationModel.page * 8}`,
        );
        if (response?.status === 201 || response?.status === 200) {
          setIsLoading(false);
          const data = response.data.data.filter(
            (item) =>
              item.userType === 'MASTER' || item.userType === 'SUPER_MASTER',
          );
          setUserList(data);
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
          setRowCountState(response.data.totalCount?.[0].count);
        } else {
          setIsLoading(false);
        }
      } catch (e) {
        console.error(e);
        return null;
      }
    }
  }, [rowCountState, paginationModel, setRowCountState]);

  const handleButtonClick = (data, type) => {
    setDefault('');
    setSelectedId(data?.id);
    setSelectedType(type);
    setForm(
      type === 'deposit'
        ? {
            ...form,
            to: data?.id,
            username: data?.username,
            userPoint: data?.balance,
          }
        : {
            ...form,
            from: data?.id,
          },
    );
  };
  const handleClear = () => {
    setSelectedId(null);
    setSelectedType(null);
    setForm({});
  };

  const columns = [
    {
      headerName: 'UID',
      field: 'username',
      type: 'string',
      flex: 1,
      width: 115,
      minWidth: 115,
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
          <h6> {numberWithCommas(params.row.creditAmount) || 0}</h6>
        </div>
      ),
      flex: 1,
      width: 115,
      minWidth: 115,
    },

    {
      headerName: 'Profit/Loss',
      field: 'profitLoss',
      flex: 1,
      width: 115,
      minWidth: 115,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <h6
            className={
              params.row.userPoints > 0
                ? 'text-red-700'
                : params.row.userPoints === 0
                ? 'text-black'
                : 'text-green-700'
            }
          >
            {numberWithCommas(Math.abs(params.row.userPoints) || 0)}
          </h6>
        </div>
      ),
    },
    {
      headerName: 'Balance',
      field: 'balance',
      flex: 1,
      width: 115,
      minWidth: 115,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <h6 className="cursor-pointer">
            {numberWithCommas(
              params.row.creditAmount - params.row.userPoints,
            ) || 0}
          </h6>
        </div>
      ),
    },
    {
      headerName: 'Exposure',
      field: 'exposureAmount',
      flex: 1,
      width: 115,
      minWidth: 115,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <h6 className="cursor-pointer text-red-600">
            {numberWithCommas(params.row.userExposure) || 0}
          </h6>
        </div>
      ),
    },
    {
      headerName: 'Available D/W',
      field: 'availableBalance',
      flex: 1,
      width: 115,
      minWidth: 115,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <h6 className="cursor-pointer">
            {numberWithCommas(
              params.row.creditAmount -
                params.row.userPoints +
                params.row.userExposure,
            ) || 0}
          </h6>
        </div>
      ),
    },

    {
      headerName: 'Deposit/Withdraw',
      field: 'Deposit',
      flex: 1,
      minWidth: 270,
      // maxWidth: 400,
      width: 270,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <button
            className={`h-8 w-8  items-center  text-sm text-white rounded-sm ${
              selectedId === params.row.id && selectedType === 'deposit'
                ? 'bg-green-600'
                : 'bg-slate-400'
            }`}
            onClick={() => handleButtonClick(params.row, 'deposit')}
          >
            D
          </button>
          <button
            onClick={() => handleButtonClick(params.row, 'withdraw')}
            className={`h-8 w-8  items-center text-sm text-white rounded-sm ${
              selectedId === params.row.id && selectedType === 'withdraw'
                ? 'bg-red-600'
                : 'bg-slate-400'
            }`}
          >
            W
          </button>
          <input
            type="number"
            value={
              selectedId === params.row.id
                ? selectedType === 'withdraw'
                  ? form?.withdrawAmount
                  : selectedType === 'deposit'
                  ? form?.creditAmount
                  : null
                : 0
            }
            disabled={selectedId === params.row.id ? false : true}
            placeholder="o"
            onChange={(e) => {
              setForm(
                selectedType === 'withdraw'
                  ? { ...form, withdrawAmount: e.target.value }
                  : { ...form, creditAmount: e.target.value },
              );
            }}
            className="w-32 h-8 px-1 border border-gray-200  rounded-sm"
          />
          <button
            onClick={() => {
              setForm({ ...form, withdrawAmount: params.row.balance });
            }}
            disabled={
              selectedId === params.row.id && selectedType === 'withdraw'
                ? false
                : true
            }
            className={`h-8 w-11  items-center text-sm text-white rounded-sm ${
              selectedId === params.row.id && selectedType === 'withdraw'
                ? 'bg-[#334155]'
                : 'bg-slate-400'
            }`}
          >
            Full
          </button>
        </div>
      ),
    },
    {
      headerName: 'Remark',
      field: 'remark',
      width: 200,
      flex: 1,
      minWidth: 200,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <input
            disabled={selectedId === params.row.id ? false : true}
            value={(selectedId === params.row.id && form.remark) || ''}
            onChange={(e) => {
              const value = e.target.value;
              setForm({ ...form, remark: value });
            }}
            placeholder="Remark"
            className="w-40 h-8 px-1 border border-gray-300 rounded-sm"
          />
        </div>
      ),
    },
  ];
  let sx = { border: 'solid-gray' };
  const [showPassword, setShowPassword] = useState(false);
  const toggleVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [isOpenMasterCreditref, setIsOpenMasterCreditref] = useState(false);
  return (
    <>
      {isLoading && <Loading />}
      <div className="mx-2 md:mx-2 md:mx-10 my-4 border border-gray-300 rounded-lg   h-full border-solid borderflex  text-sm text-slate-950">
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
        <div>
          {formDepositError.creditAmount && (
            <div className="text-14 text-center text-red-700">
              {formDepositError.creditAmount}
            </div>
          )}
          {formDepositError.transactionCode && (
            <div className="text-14 text-center text-red-700">
              {formDepositError.transactionCode}
            </div>
          )}
          {formWithdrawError.withdrawAmount && (
            <div className="text-14 text-center text-red-700">
              {formWithdrawError.withdrawAmount}
            </div>
          )}
          {formWithdrawError.transactionCode && (
            <div className="text-14 text-center text-red-700">
              {formWithdrawError.transactionCode}
            </div>
          )}
          {defaultmessage && (
            <div className="text-14 text-center text-red-700">
              {defaultmessage}
            </div>
          )}
        </div>
        <div className=" w-auto flex items-center my-6">
          <div className="lg:w-64 md:w-40 bg-red-400  rounded-md lg:mx-6 md:mx-2 content-center h-9">
            {' '}
            <button
              onClick={handleClear}
              className="lg:w-64 md:w-40 p-2 text-sm font-bold text-white"
            >
              Clear All
            </button>
          </div>
          <div className="lg:w-64 md:w-40 rounded-md lg:mx-6 md:mx-2 content-center h-9 border border-gray-200 relative">
            {' '}
            <input
              onChange={(e) => {
                setForm({ ...form, transactionCode: e.target.value });
              }}
              placeholder=" Password"
              type={showPassword ? 'text' : 'password'}
              value={form.transactionCode || ''}
              className="lg:w-64 md:w-40 p-2 border border-gray-200"
            />
            <button
              type="button"
              onClick={toggleVisibility}
              className="absolute inset-y-0 right-0 px-3 py-2 bg-transparent border-none text-gray-500"
            >
              {showPassword ? (
                <FiEye className="btn-blu" />
              ) : (
                <FiEyeOff className="btn-blu" />
              )}
            </button>
          </div>
          <div className="lg:w-64 md:w-40 bg-slate-700  rounded-md lg:mx-6 md:mx-2 content-center h-9">
            {isLoading ? (
              <button className="lg:w-64 md:w-40 p-2 text-sm font-bold text-white">
                Loading...
              </button>
            ) : (
              <button
                onClick={
                  selectedType === 'withdraw'
                    ? handleWithdrawSubmit
                    : selectedType === 'deposit'
                    ? handleDepositSubmit
                    : () => setDefault('No withdraw & deposit select')
                }
                className="lg:w-64 md:w-40 p-2 text-sm font-bold text-white"
              >
                Submit Payment
              </button>
            )}
          </div>
        </div>
        {/* <div className="w-64 rounded-md mx-6 content-center h-8 border border-gray-200">
          {' '}
          <input
            placeholder="Password"
            className="w-64 p-2 border border-gray-200"
          />
        </div>
        <div className="w-64 bg-slate-700  rounded-md mx-6 content-center h-8">
          <button className="w-64 p-2">Submit Payment</button>
        </div> */}
      </div>
      <EditMasterCreditRef
        isOpenMasterCreditref={isOpenMasterCreditref}
        handleCloseMaster={() => {
          setIsOpenMasterCreditref(false);
        }}
      />
    </>
  );
}

export default Banking;
