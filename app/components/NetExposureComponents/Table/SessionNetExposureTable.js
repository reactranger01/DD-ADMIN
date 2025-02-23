/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { LinearProgress } from '@mui/material';
import { getAuthData, isLoggedIn } from '@/utils/apiHandlers';
import moment from 'moment';
import PropTypes from 'prop-types';
import { numberWithCommas } from '@/utils/numberWithCommas';
import RowsPerPageSelector from '@/components/RowsPerPageSelector';

const SessionNetExposureTable = ({ isTimerActive }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [ontimeLoader, setOneTimeLoader] = useState(true);
  const [matchData] = useState(() => {
    const localData = localStorage.getItem('Net_Expossure_Match');
    return JSON.parse(localData);
  });
  const [betList, setBetList] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [rowCountState, setRowCountState] = useState(0);
  useEffect(() => {
    if (matchData) {
      handleGetEvents();
    }
    setRowCountState((prevRowCountState) =>
      rowCountState !== undefined ? rowCountState : prevRowCountState,
    );
  }, [
    rowCountState,
    paginationModel,
    setRowCountState,
    matchData?.matchId,
    matchData?.market,
    matchData?.selectionId,
    matchData?.sportsId,
    isTimerActive,
  ]);

  const handleGetEvents = async () => {
    const islogin = isLoggedIn();
    setIsLoading(true);
    if (islogin) {
      try {
        const response = await getAuthData(
          `/bet/current-listadmin?market=${
            matchData?.market == 'Match Odds' ? 'matchodds' : matchData?.market
          }&eventId=${matchData?.matchId}&sportId=${
            matchData?.sportsId
          }&limit=8&offset=${paginationModel.page * 8}${
            matchData?.market == 'session'
              ? `&selectionId=${matchData?.selectionId}`
              : ''
          }`,
        );
        const { status, data } = response;
        if (status === 201 || status === 200) {
          setIsLoading(false);
          setBetList(data?.bets);
          setRowCountState(data?.total_bets);
          setOneTimeLoader(false);
        } else {
          setIsLoading(false);
        }
      } catch (e) {
        setIsLoading(false);
        console.error(e);
        return null;
      }
    }
  };

  const columns = [
    {
      headerName: 'Member',
      field: 'usernames',
      type: 'string',
      headerAlign: 'start',
      align: 'start',
      flex: 1,
      sortable: false,
      width: 170,
      minWidth: 170,
      renderCell: (params) => (
        <div className="flex items-center justify-center text-black w-[120px]">
          {params?.row?.username}
        </div>
      ),
    },

    {
      headerName: 'Placed',
      field: 'event',
      flex: 1,
      sortable: false,
      width: 200,
      minWidth: 200,
      renderCell: (params) => (
        <div className=" text-black">
          <h6>
            {' '}
            {moment(params.row.created_at).format('MMMM Do YYYY, h:mm:ss a')}
          </h6>
        </div>
      ),
    },
    {
      headerName: 'selection',
      field: 'market',
      flex: 1,
      sortable: false,
      width: 300,
      minWidth: 300,
      renderCell: (params) => (
        <div
          className={`border-l-4 text-black px-1 ${
            params?.row?.bet_on == 'BACK'
              ? 'border-blue-500'
              : 'border-pink-500'
          } `}
        >
          <h6> {params?.row?.selection}</h6>
        </div>
      ),
    },
    {
      headerName: 'Bet ID',
      field: 'selection',
      flex: 1,
      sortable: false,
      width: 100,
      minWidth: 100,
      wrap: true,
      renderCell: (params) => (
        <div className=" text-black">
          <h6>{params?.row?.id}</h6>
        </div>
      ),
    },
    {
      headerName: 'InPlay',
      field: 'bet_on',
      flex: 1,
      sortable: false,
      width: 100,
      minWidth: 100,
      renderCell: () => (
        <div className="flex items-center justify-center text-black">Yes</div>
      ),
    },
    {
      headerName: 'Type',
      field: 'price',
      flex: 1,
      sortable: false,
      width: 100,
      minWidth: 100,
      renderCell: (params) => (
        <div className="flex items-center justify-center text-black">
          {params?.row?.bet_on}
        </div>
      ),
    },
    {
      headerName: 'Odds',
      field: 'stake',
      flex: 1,
      sortable: false,
      width: 100,
      minWidth: 100,
      renderCell: (params) => (
        <div className=" text-black">{params?.row?.price}</div>
      ),
    },
    {
      headerName: 'Stake',
      field: 'profitLoss',
      flex: 1,
      sortable: false,
      width: 130,
      minWidth: 130,
      renderCell: (params) => (
        <div className=" text-black">{params?.row?.stake}</div>
      ),
    },
    {
      headerName: 'Profit/Liability',
      field: 'created_at',
      flex: 1,
      sortable: false,
      Width: 200,
      minWidth: 200,
      renderCell: (params) => (
        <div className="flex items-center justify-start text-black">
          <h6 className="text-red-500">
            {' '}
            {numberWithCommas(
              ((params?.row?.percent / 100) * params?.row?.stake || 0).toFixed(
                2,
              ),
            )}{' '}
          </h6>
        </div>
      ),
    },
  ];
  return (
    <div>
      <DataGrid
        columns={columns}
        rows={betList}
        loading={isLoading && ontimeLoader}
        getEstimatedRowHeight={() => 52}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        rowCount={rowCountState}
        pageSizeOptions={[10, 20, 50, 70, 100]}
        paginationModel={paginationModel}
        paginationMode="server"
        onPaginationModelChange={setPaginationModel}
        slots={{
          loadingOverlay: LinearProgress,
          pagination: () => (
            <RowsPerPageSelector
              paginationModel={paginationModel}
              setPaginationModel={setPaginationModel}
              pageCount={Math.ceil(rowCountState / paginationModel.pageSize)}
            />
          ),
        }}
        disableColumnMenu
        disableRowSelectionOnClick
        sx={{
          '& .MuiDataGrid-footerContainer': {
            backgroundColor: '#453547',
            color: 'white',
          },
        }}
      />
    </div>
  );
};
SessionNetExposureTable.propTypes = {
  matchData: PropTypes.object.isRequired,
  isTimerActive: PropTypes.bool,
};

export default SessionNetExposureTable;
