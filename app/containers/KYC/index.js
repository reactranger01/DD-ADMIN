/* eslint-disable react-hooks/exhaustive-deps */
import { DataGrid } from '@mui/x-data-grid';
import { LinearProgress } from '@mui/material';
import CustomNoRowsOverlay from '@/utils/styles';
import React, { useEffect, useState } from 'react';
import UserDetails from './Model/UserDetails';
import { FiEye } from 'react-icons/fi';
import { getAuthData, isLoggedIn } from '@/utils/apiHandlers';
import { Loading } from '@/components';
import moment from 'moment';

const KycDetails = () => {
  const owner_id = localStorage.getItem('owner_id');
  const [kycReqList, setKycReqList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [singleRowData, setSingleRowData] = useState({});
  const [rowCountState, setRowCountState] = useState(0);
  const [reftech, setReftech] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 8,
  });
  useEffect(() => {
    getQRList();
    setRowCountState((prevRowCountState) =>
      rowCountState !== undefined ? rowCountState : prevRowCountState,
    );
  }, [rowCountState, paginationModel, setRowCountState, reftech]);

  const getQRList = async () => {
    const islogin = isLoggedIn();
    setIsLoading(true);
    if (islogin) {
      try {
        const response = await getAuthData(
          `/user/all-pending-kyc?id=${owner_id}&limit=8&offset=${
            paginationModel.page * 8
          }`,
        );
        if (response?.status === 201 || response?.status === 200) {
          const formattedData = response.data.data.map((entry, index) => {
            return {
              ...entry,
              serialNumber: index + 1,
            };
          });
          setIsLoading(false);
          setKycReqList(formattedData || []);
          setRowCountState(response.data.total_count);
        } else {
          setIsLoading(false);
        }
      } catch (e) {
        console.error(e);
        return null;
      }
    }
  };
  let columns = [
    {
      headerName: 'S.No.',
      field: 'serialNumber',
      minWidth: 30,
      maxWidth: 50,
    },
    {
      headerName: 'UserName',
      field: 'username',
      type: 'string',
      flex: 1,
      minWidth: 200,
      maxWidth: 300,
    },
    {
      headerName: 'Email ID',
      field: 'emailid',
      type: 'string',
      flex: 1,
      minWidth: 200,
      maxWidth: 270,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
          }}
        >
          <h6> {params.row.email ? params.row.email : '-'} </h6>
        </div>
      ),
    },
    {
      headerName: 'Requested Date',
      field: 'requested',
      flex: 1,
      minWidth: 100,
      maxWidth: 200,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
          }}
        >
          <h6> {moment(params.row.createdat).format('L')}</h6>
        </div>
      ),
    },
    {
      headerName: 'Time',
      field: 'time',
      flex: 1,
      minWidth: 100,
      maxWidth: 150,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
          }}
        >
          <h6> {moment(params.row.createdat).format('LT')}</h6>
        </div>
      ),
    },
    {
      headerName: 'Status',
      field: 'satus',
      flex: 1,
      minWidth: 100,
      maxWidth: 150,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
          }}
        >
          <h6
            className={
              params.row.isapproved === 'pending'
                ? 'text-yellow-700'
                : 'text-green-700'
            }
          >
            {' '}
            {params.row.isapproved}
          </h6>
        </div>
      ),
    },
    {
      headerName: 'Action',
      field: 'actions',
      flex: 1,
      minWidth: 70,
      maxWidth: 100,
      renderCell: (params) => (
        <div className="flex ">
          <FiEye
            className="btn-blu w-4 h-4"
            onClick={() => userDetailsHandelar(params.row.id)}
          />
        </div>
      ),
    },
  ];

  const [userDetails, setUserDetails] = useState(false);
  const userDetailsHandelar = async (id) => {
    setUserDetails(true);
    const filteredObject = kycReqList.find((entry) => entry.id === id);
    setSingleRowData(filteredObject);
  };

  let sx = { border: 'solid-gray' };

  return (
    <>
      {isLoading && <Loading />}
      <div className="md:mx-8 mx-2 mt-4 border border-gray-500 rounded-md h-full  bg-slate-100  ">
        <div className="h-8 bg-[#071535] rounded-t-md text-sm font-semibold">
          <h3 className="p-1"> KYC Details </h3>
        </div>

        <div className="card mx-4 py-5">
          <div className="w-100% h-full font-semibold  custom-class">
            <DataGrid
              autoHeight
              className="css-1yiktpq-MuiDataGrid-root"
              columns={columns}
              rows={kycReqList}
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
        <UserDetails
          userDetails={userDetails}
          ClosedUserDetails={() => {
            setUserDetails(false);
          }}
          data={singleRowData}
          setReftech={setReftech}
        />
      </div>
    </>
  );
};

export default KycDetails;
