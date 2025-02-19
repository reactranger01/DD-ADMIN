/* eslint-disable react-hooks/exhaustive-deps */
// import { Loading } from '@/components';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { LinearProgress } from '@mui/material';
import CustomNoRowsOverlay from '@/utils/styles';
import React, { useCallback, useEffect, useState } from 'react';
import AddQr from './Model/AddQr';
import UpdateQR from './Model/UpdateQR';
import { deleteAuthData, getAuthData, isLoggedIn } from '@/utils/apiHandlers';
import { toast } from 'react-toastify';
import { Loading } from '@/components';
import { Link } from 'react-router-dom';

const ManageQR = () => {
  const owner_id = localStorage.getItem('owner_id');
  const [reftech, setReftech] = useState(false);
  const [qrList, setQrList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [editData, setEditData] = useState({});
  const [rowCountState, setRowCountState] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 8,
  });
  // const handleCheckboxChange = async (id) => {
  //   const response = await putAuthData(`/user/qr/${id}`, { id: id });
  //   if (response?.status === 200 || response?.status === 201) {
  //     toast.success('Qr Active Successfully');
  //     getQRList();
  //   } else {
  //     toast.error(response?.data || 'Something went wrong');
  //   }
  // };

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
        const response = await getAuthData(
          `/user/get-all-qr?id=${owner_id}&limit=8&offset=${
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
          setQrList(formattedData || []);
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

  const handleDelete = async (id) => {
    const response = await deleteAuthData(`/user/delete-qr/${id}`);
    if (response?.status === 200 || response?.status === 201) {
      toast.success('Qr Delete Successfully');
      getQRList();
    } else {
      toast.error(response?.data || 'Something went wrong');
    }
  };
  let columns = [
    {
      headerName: 'S.No.',
      field: 'serialNumber',
      width: 56,
    },
    {
      headerName: 'Image',
      field: 'image',
      flex: 1,
      width: 200,
      minWidth: 200,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          className="flex"
        >
          <Link to={params.row.image} target="_blank">
            <img src={params.row.image} alt="image" className="w-10 h-10" />
          </Link>
        </div>
      ),
    },
    {
      headerName: 'UPI ID',
      field: 'upi',
      type: 'string',
      flex: 1,
      width: 250,
      minWidth: 250,
    },
    {
      headerName: 'QR Type',
      field: 'qrtype',
      flex: 1,
      width: 250,
      minWidth: 250,
    },
    // {
    //   headerName: 'Default',
    //   field: 'default',
    //   flex: 1,
    //   width: 150,
    //   minWidth: 150,
    //   renderCell: (params) => (
    //     <div className="flex">
    //       <input
    //         type="checkbox"
    //         id="myCheckbox"
    //         checked={params.row.status}
    //         onChange={() => handleCheckboxChange(params.row.id)}
    //         className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
    //       />
    //     </div>
    //   ),
    // },
    {
      headerName: 'Action',
      field: 'actions',
      flex: 1,
      width: 250,
      minWidth: 250,
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

  const [isOpenAddQR, setOpenAddQR] = useState(false);
  const HandleOpenAddQR = () => {
    setOpenAddQR(true);
  };
  const [isOpenUpdateQR, setUpdateQR] = useState(false);
  // const UpdateOpenQR = (data) => {
  //   setUpdateQR(true);
  //   setEditData(data);
  // };
  let sx = { border: 'solid-gray' };

  return (
    <>
      {isLoading && <Loading />}
      <div className="mx-8 mt-4 border border-gray-500 rounded-md h-full ">
        <div className="h-8 bg-[#071535] rounded-t-md text-sm font-semibold">
          <h3 className="p-1"> Manage QR</h3>
        </div>

        <div className=" flex justify-start h-20 items-center mx-4">
          <button
            className="w-28 bg-[#071535] h-8 rounded-md"
            onClick={HandleOpenAddQR}
          >
            + Add QR
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
                toolbar: GridToolbar,
                loadingOverlay: LinearProgress,
                noRowsOverlay: CustomNoRowsOverlay,
              }}
              disableColumnMenu
              disableRowSelectionOnClick
            />
          </div>
        </div>
        <AddQr
          isOpenAddQR={isOpenAddQR}
          CloseAddQR={() => {
            setOpenAddQR(false);
          }}
          setReftech={setReftech}
        />
        <UpdateQR
          isOpenUpdateQR={isOpenUpdateQR}
          CloseUpdateQR={() => {
            setUpdateQR(false);
          }}
          setReftech={setReftech}
        />
      </div>
    </>
  );
};

export default ManageQR;
