/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { LinearProgress } from '@mui/material';
import CustomNoRowsOverlay from '@/utils/styles';
import { getAuthData, isLoggedIn } from '@/utils/apiHandlers';
import { Loading } from '@/components';
import moment from 'moment';
function ActivityLog() {
  const [activityList, setActivityList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [rowCountState, setRowCountState] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 8,
  });

  useEffect(() => {
    getActivityLogList();
    setRowCountState((prevRowCountState) =>
      rowCountState !== undefined ? rowCountState : prevRowCountState,
    );
  }, [getActivityLogList, paginationModel]);

  const getActivityLogList = useCallback(async () => {
    const islogin = isLoggedIn();
    setIsLoading(true);
    if (islogin) {
      try {
        const response = await getAuthData(
          `/user/activity-logs?limit=8&offset=${paginationModel.page * 8}`,
        );
        if (response?.status === 201 || response?.status === 200) {
          setIsLoading(false);
          setActivityList(response.data.activities);
          setRowCountState(response?.data?.count);
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
      headerName: 'Login Date & time',
      field: 'createdAt',
      flex: 1,
      minWidth: 306,
      width: 306,
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
    {
      headerName: 'Login Status',
      field: 'activity',
      flex: 1,
      minWidth: 306,
      width: 306,
    },
    {
      headerName: 'IP Address',
      field: 'ip',
      flex: 1,
      minWidth: 306,
      width: 306,
    },
  ];
  let sx = { border: 'solid-gray' };

  return (
    <>
      {isLoading && <Loading />}
      <div className=" border border-gray-500  h-full ">
        <div className="h-8 bg-[#071535]  text-sm font-semibold">
          <h3 className="p-1">Activity Log</h3>
        </div>
        <div className="card mx-4 my-4 ">
          <div className="w-100% h-full  font-semibold  custom-table">
            <DataGrid
              autoHeight
              className="css-1yiktpq-MuiDataGrid-root"
              columns={columns}
              rows={activityList}
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

export default ActivityLog;
