/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { LinearProgress } from '@mui/material';
import CustomNoRowsOverlay from '@/utils/styles';
import { getAuthData, isLoggedIn } from '@/utils/apiHandlers';
import { Loading } from '@/components';
import moment from 'moment';
import { useParams } from 'react-router-dom';
function ActivityLogUserAviator() {
  const { id } = useParams();
  const [activityList, setActivityList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [rowCountState, setRowCountState] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 8,
  });
  const [userid, setUserid] = useState(null);

  useEffect(() => {
    const [userIdPart] = id.split('-').map((part) => parseInt(part));
    setUserid(userIdPart);
  }, [id]);

  useEffect(() => {
    if (userid) {
      getActivityLogList();
    }
    setRowCountState((prevRowCountState) =>
      rowCountState !== undefined ? rowCountState : prevRowCountState,
    );
  }, [rowCountState, paginationModel, setRowCountState, userid]);

  const getActivityLogList = async () => {
    const islogin = isLoggedIn();
    setIsLoading(true);
    if (islogin) {
      try {
        const response = await getAuthData(
          `/user/particuler-activity-logs?id=${userid}&limit=8&offset=${
            paginationModel.page * 8
          }`,
        );
        if (response?.status === 201 || response?.status === 200) {
          setIsLoading(false);
          setActivityList(response.data.activities || []);
          setRowCountState(response?.data?.count);
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
      headerName: 'Login Date & time',
      field: 'createdAt',
      width: 300,
      minWidth: 300,
      flex: 1,
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
      width: 300,
      minWidth: 300,
      flex: 1,
    },
    {
      headerName: 'IP Address',
      field: 'ip',
      width: 300,
      minWidth: 300,
      flex: 1,
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

export default ActivityLogUserAviator;
