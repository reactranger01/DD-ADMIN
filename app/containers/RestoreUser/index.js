/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { LinearProgress, Tooltip } from '@mui/material';
import CustomNoRowsOverlay from '@/utils/styles';
import { getAuthData, isLoggedIn, putAuthData } from '@/utils/apiHandlers';
import { Loading } from '@/components';
import moment from 'moment';
import { MdOutlineRestoreFromTrash } from 'react-icons/md';
import { toast } from 'react-toastify';
function RestoreUser() {
  const [userListData, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [rowCountState, setRowCountState] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 8,
  });
  useEffect(() => {
    getDeleteUserList();
    setRowCountState((prevRowCountState) =>
      rowCountState !== undefined ? rowCountState : prevRowCountState,
    );
  }, [getDeleteUserList, paginationModel]);

  const getDeleteUserList = useCallback(async () => {
    const islogin = isLoggedIn();
    setIsLoading(true);
    if (islogin) {
      try {
        const response = await getAuthData(
          `/user/deleted-user?limit=8&offset=${paginationModel.page * 8}`,
        );
        if (response?.status === 201 || response?.status === 200) {
          setIsLoading(false);
          setUserList(response?.data?.data);
          setRowCountState(response?.data?.pagination?.totalCount);
        } else {
          setIsLoading(false);
        }
      } catch (e) {
        console.error(e);
        return null;
      }
    }
  }, [rowCountState, paginationModel, setRowCountState]);

  const columns = [
    {
      headerName: 'User Name',
      field: 'username',
      type: 'string',
      headerAlign: 'start',
      align: 'start',
      flex: 1,
      width: 350,
      minWidth: 350,
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
      headerName: 'Date & Time',
      field: 'Datetime',
      flex: 1,
      width: 350,
      minWidth: 350,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
          }}
        >
          <h6 className="justify-center">
            {moment(params.row.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}
          </h6>
        </div>
      ),
    },
    {
      headerName: 'Action',
      field: 'action',
      flex: 1,
      width: 350,
      minWidth: 350,
      renderCell: (params) => (
        <Tooltip
          title={<div className="">Restore User</div>}
          enterTouchDelay={0}
        >
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            className="text-center border border-slate-400 flex w-36 h-8 relative pt-2 mr-4 pb-2 rounded bg-gray-700 text-white text-xs hover:bg-slate-300 font-semibold   "
            onClick={() => handleRestoreClick(params?.row?.id)}
          >
            <div>
              <MdOutlineRestoreFromTrash size={18} />
            </div>{' '}
            <div className="ml-3">
              {' '}
              <span>Restore</span>
            </div>
          </button>
        </Tooltip>
      ),
    },
  ];
  const handleRestoreClick = async (id) => {
    const response = await putAuthData('/user/restore-user', {
      userId: id,
    });
    if (response?.status === 200 || response?.status === 201) {
      toast.success('User Restored Successfully');
      getDeleteUserList();
    } else {
      toast.error(response?.data || 'Something went wrong');
    }
  };
  let sx = { border: 'solid-gray' };
  return (
    <>
      {isLoading && <Loading />}
      <div className="mx-8 mt-4 border border-gray-500 rounded-sm h-full ">
        <div className="h-8 bg-[#071535] rounded-t-sm text-sm font-semibold">
          <h3 className="p-1">Restore User</h3>
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
    </>
  );
}

export default RestoreUser;
