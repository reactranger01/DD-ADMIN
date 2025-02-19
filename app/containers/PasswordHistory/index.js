/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { LinearProgress } from '@mui/material';
import CustomNoRowsOverlay from '@/utils/styles';
import { getAuthData, isLoggedIn } from '@/utils/apiHandlers';
import { Loading } from '@/components';
import moment from 'moment';
function PasswordHistory() {
  const [passwordHistoryData, setPasswordHistoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [rowCountState, setRowCountState] = useState(0);

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 8,
  });

  useEffect(() => {
    handleGetBets();
    setRowCountState((prevRowCountState) =>
      rowCountState !== undefined ? rowCountState : prevRowCountState,
    );
  }, [rowCountState, paginationModel, setRowCountState]);

  const handleGetBets = async () => {
    const islogin = isLoggedIn();
    setIsLoading(true);
    if (islogin) {
      try {
        const response = await getAuthData(
          `/user/password-history?offset=${paginationModel.page * 8}&limit=8`,
        );

        if (response?.status === 201 || response?.status === 200) {
          setIsLoading(false);
          setPasswordHistoryData(response?.data?.data || []);
          setRowCountState(response?.data?.pagination?.totalCount);
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
      headerName: 'Username',
      field: 'username',
      type: 'string',
      flex: 1,
      minWidth: 250,
      width: 250,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
          }}
        >
          <h6> {params?.row?.user?.username}</h6>
        </div>
      ),
    },
    {
      headerName: 'Remarks',
      field: 'remarks',
      flex: 1,
      width: 200,
      minWidth: 200,
    },
    {
      headerName: 'Date & Time',
      field: 'createdAt',
      flex: 1,
      width: 250,
      minWidth: 250,
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
  ];
  let sx = { border: 'solid-gray' };

  return (
    <>
      {isLoading && <Loading />}
      <div className="mx-8 mt-4 border border-gray-500 rounded-md h-full ">
        <div className="h-8 bg-[#071535] rounded-t-md text-sm font-semibold">
          <h3 className="p-1">Password Change History</h3>
        </div>

        <div className="grid grid-cols-2 gap-4 text-slate-950 text-sm "></div>
        <div className="card mx-4 py-5">
          <div className="w-100% h-full font-semibold ">
            <DataGrid
              autoHeight
              className="css-1yiktpq-MuiDataGrid-root"
              columns={columns}
              rows={passwordHistoryData}
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
    </>
  );
}

export default PasswordHistory;
