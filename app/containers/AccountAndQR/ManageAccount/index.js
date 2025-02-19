/* eslint-disable react-hooks/exhaustive-deps */
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { LinearProgress } from '@mui/material';
import CustomNoRowsOverlay from '@/utils/styles';
import React, { useCallback, useEffect, useState } from 'react';
import AddAcccount from './Model/AddAcccount';
import {
  deleteAuthData,
  getAuthData,
  isLoggedIn,
  putAuthData,
} from '@/utils/apiHandlers';
import { Loading } from '@/components';
import { toast } from 'react-toastify';

const ManageAccount = () => {
  const owner_id = localStorage.getItem('owner_id');
  const [reftech, setReftech] = useState(false);
  const [allAccountList, setAllAccountList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [rowCountState, setRowCountState] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 8,
  });
  useEffect(() => {
    getAccountList();
    setRowCountState((prevRowCountState) =>
      rowCountState !== undefined ? rowCountState : prevRowCountState,
    );
  }, [getAccountList]);

  const getAccountList = useCallback(async () => {
    const islogin = isLoggedIn();
    setIsLoading(true);
    if (islogin) {
      try {
        const response = await getAuthData(
          `/user/all-bank-account?id=${owner_id}&limit=8&offset=${
            paginationModel.page * 8
          }`,
        );
        if (response?.status === 201 || response?.status === 200) {
          const formattedData = response.data.qr.map((entry, index) => {
            return {
              ...entry,
              serialNumber: index + 1,
            };
          });
          setIsLoading(false);
          setAllAccountList(formattedData || []);
          setRowCountState(response.data.totalCount);
        } else {
          setIsLoading(false);
        }
      } catch (e) {
        console.error(e);
        return null;
      }
    }
  }, [rowCountState, paginationModel, setRowCountState, reftech]);

  const handleCheckboxChange = async (id) => {
    const response = await putAuthData(`/user/upadate-account/${id}`, {
      id: id,
    });
    if (response?.status === 200 || response?.status === 201) {
      toast.success('Account Active Successfully');
      getAccountList();
    } else {
      toast.error(response?.data || 'Something went wrong');
    }
  };

  let columns = [
    {
      headerName: 'S.No.',
      field: 'serialNumber',
      width: 56,
      // maxWidth: 100,
    },
    {
      headerName: 'Bank Name',
      field: 'bankName',
      type: 'string',
      flex: 1,
      width: 150,
      minWidth: 150,
    },
    {
      headerName: 'Account Holder Name',
      field: 'acountholdername',
      type: 'string',
      flex: 1,
      width: 200,
      minWidth: 200,
    },
    {
      headerName: 'Account No.',
      field: 'accountNumber',
      flex: 1,
      width: 200,
      minWidth: 200,
    },
    {
      headerName: 'IFSC Code',
      field: 'ifscCode',
      flex: 1,
      width: 150,
      minWidth: 150,
    },
    {
      headerName: 'Account Type',
      field: 'accountType',
      flex: 1,
      width: 100,
      minWidth: 100,
    },
    {
      headerName: 'Default',
      field: 'default',
      flex: 1,
      width: 100,
      minWidth: 100,
      renderCell: (params) => (
        <div className="flex">
          <input
            type="checkbox"
            id="myCheckbox"
            checked={params.row.status}
            onChange={() => handleCheckboxChange(params.row.id)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
        </div>
      ),
    },
    {
      headerName: 'Action',
      field: 'actions',
      flex: 1,
      width: 200,
      minWidth: 200,
      renderCell: (params) => (
        <div className="flex text-white font-bold gap-2">
          {/* <button className="bg-sky-300 p-2 rounded-sm w-20 hover:bg-sky-600 ">
            Edit
          </button> */}
          <button
            disabled={params.row.status}
            onClick={() => handleDelete(params.row.id)}
            className={`${
              params.row.status ? 'bg-red-300' : 'bg-red-500 hover:bg-red-700'
            } p-2 rounded-sm w-20 `}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const [isOpenAddAccount, setOpenAddAccount] = useState(false);
  const HandleOpenAddAccount = () => {
    setOpenAddAccount(true);
  };

  const handleDelete = async (id) => {
    const response = await deleteAuthData(`/user/delete-account/${id}`);
    if (response?.status === 200 || response?.status === 201) {
      toast.success('Account Delete Successfully');
      getAccountList();
    } else {
      toast.error(response?.data || 'Something went wrong');
    }
  };

  let sx = { border: 'solid-gray' };

  return (
    <>
      {isLoading && <Loading />}
      <div className="mx-8 mt-4 border border-gray-500 rounded-md h-full ">
        <div className="h-8 bg-[#071535] rounded-t-md text-sm font-semibold">
          <h3 className="p-1"> Manage Account </h3>
        </div>

        <div className=" flex justify-start h-20 items-center mx-4">
          <button
            className="w-32 bg-[#071535] h-8 rounded-md"
            onClick={HandleOpenAddAccount}
          >
            + Add Account
          </button>
        </div>
        <div className="card mx-4 py-5">
          <div className="w-100% h-full font-semibold  custom-class">
            <DataGrid
              autoHeight
              className="css-1yiktpq-MuiDataGrid-root"
              columns={columns}
              rows={allAccountList}
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
        <AddAcccount
          isOpenAddAccount={isOpenAddAccount}
          CloseAddAccount={() => {
            setOpenAddAccount(false);
          }}
          setReftech={setReftech}
        />
      </div>
    </>
  );
};

export default ManageAccount;
