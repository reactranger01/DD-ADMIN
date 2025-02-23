/* eslint-disable react-hooks/exhaustive-deps */
// import { Loading } from '@/components';
import { DataGrid } from '@mui/x-data-grid';
import { LinearProgress } from '@mui/material';
import CustomNoRowsOverlay from '@/utils/styles';
import React, { useCallback, useEffect, useState } from 'react';
// import AddQr from './Model/AddQr';
// import UpdateQR from './Model/UpdateQR';
import {
  deleteAuthData,
  getAuthData,
  isLoggedIn,
  putAuthData,
} from '@/utils/apiHandlers';
import { toast } from 'react-toastify';
import { Loading } from '@/components';

import AddMobile from '@/components/AddMobile';

const ManageMobile = () => {
  const [addMobileNumber, setAddMobileNumber] = useState(false);
  const [qrList, setQrList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [rowCountState, setRowCountState] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 8,
  });
  const handleAddMobile = () => {
    setAddMobileNumber(!addMobileNumber);
  };
  const handleCheckboxChange = async (id) => {
    const response = await putAuthData(`/user/mobileNo/${id}`, { id: id });
    if (response?.status === 200 || response?.status === 201) {
      toast.success('Mobile Number Active Successfully');
      getQRList();
    } else {
      toast.error(response?.data || 'Something went wrong');
    }
  };

  useEffect(() => {
    getQRList();
    setRowCountState((prevRowCountState) =>
      rowCountState !== undefined ? rowCountState : prevRowCountState,
    );
  }, [getQRList]);

  const getQRList = useCallback(async () => {
    const islogin = isLoggedIn();
    setIsLoading(true);
    if (islogin) {
      try {
        const response = await getAuthData('/user/get-all-mobileNo');
        if (response?.status === 201 || response?.status === 200) {
          setIsLoading(false);
          setQrList(response?.data?.MobileNo);
          setRowCountState(response.data.totalCount);
        } else {
          setIsLoading(false);
        }
      } catch (e) {
        console.error(e);
        return null;
      }
    }
  }, [rowCountState, paginationModel, setRowCountState]);

  const handleDelete = async (id) => {
    const response = await deleteAuthData(`/user/delete-mobileNo/${id}`);
    if (response?.status === 200 || response?.status === 201) {
      toast.success('Mobile Deleted Successfully');
      getQRList();
    } else {
      toast.error(response?.data || 'Something went wrong');
    }
  };
  let columns = [
    {
      headerName: 'ID',
      field: 'id',
      width: 100,
    },

    {
      headerName: 'Mobile',
      field: 'mobileNo',
      width: 400,
      minWidth: 400,
    },
    {
      headerName: 'Activate Number',
      field: 'status',
      width: 400,
      minWidth: 400,
      renderCell: (params) => (
        <div className="flex items-center justify-center text-white font-bold gap-2">
          <input
            type="checkbox"
            onChange={() => handleCheckboxChange(params.row.id)}
            checked={params.row.status}
          />
        </div>
      ),
    },
    {
      headerName: 'Action',
      field: 'actions',
      width: 400,
      minWidth: 400,
      renderCell: (params) => (
        <div className="flex text-white font-bold gap-2">
          {/* <button
            className="bg-sky-500 p-2 rounded-sm w-20 hover:bg-sky-700 "
            onClick={() => UpdateOpenQR(params.row)}
          >
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

  let sx = { border: 'solid-gray' };

  return (
    <>
      {isLoading && <Loading />}
      <div className="md:mx-8 mx-2 mt-4 border border-gray-500 rounded-md h-full ">
        <div className="h-8 bg-[#071535] rounded-t-md text-sm font-semibold">
          <h3 className="p-1">Support</h3>
        </div>

        <div className=" flex justify-start h-20 items-center mx-4">
          <button
            className="w-28 bg-[#071535] h-8 rounded-md"
            onClick={handleAddMobile}
          >
            + Add Mobile
          </button>
        </div>
        <div className="card mx-4 py-5">
          <div className="w-100% h-full font-semibold  custom-class">
            <DataGrid
              autoHeight
              className="css-1yiktpq-MuiDataGrid-root"
              columns={columns}
              rows={qrList}
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
        <AddMobile
          isOpenAddQR={addMobileNumber}
          CloseAddQR={() => {
            setAddMobileNumber(false);
          }}
          getQRList={getQRList}
        />
      </div>
    </>
  );
};

export default ManageMobile;
