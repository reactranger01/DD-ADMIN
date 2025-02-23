/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { LinearProgress } from '@mui/material';
import { getAuthData, isLoggedIn } from '@/utils/apiHandlers';
import moment from 'moment';
import PropTypes from 'prop-types';
import { numberWithCommas } from '@/utils/numberWithCommas';
import RowsPerPageSelector from '@/components/RowsPerPageSelector';

const NetExposureTbale = ({ isTimerActive }) => {
  const [matchData] = useState(() => {
    const localData = localStorage.getItem('Net_Expossure_Match');
    return JSON.parse(localData);
  });
  const [isLoading, setIsLoading] = useState(false);
  const [betList, setBetList] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [rowCountState, setRowCountState] = useState(0);
  useEffect(() => {
    handleGetEvents();
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
            matchData?.market == 'fancy' || matchData?.market == 'session'
              ? `&selectionId=${matchData?.selectionId}`
              : ''
          }`,
        );
        const { status, data } = response;
        if (status === 201 || status === 200) {
          setIsLoading(false);
          setBetList(data?.bets);
          setRowCountState(data?.total_bets);
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
      headerName: 'Bet ID',
      field: 'id',
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
      headerName: 'Market',
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
          <h6> {params?.row?.market}</h6>
        </div>
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
      headerName: 'Odds req.',
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
      headerName: 'Selection',
      field: 'selection',
      flex: 1,
      sortable: false,
      width: 130,
      minWidth: 130,
      renderCell: (params) => (
        <div className=" text-black">{params?.row?.selection}</div>
      ),
    },
    {
      headerName: '	Profit/Liability',
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
              (params?.row?.price - 1) * params?.row?.stake || 0,
            )}
          </h6>
        </div>
      ),
    },
    {
      headerName: 'Last updated',
      field: 'event',
      flex: 1,
      sortable: false,
      width: 200,
      minWidth: 200,
      renderCell: (params) => (
        <div className=" text-black">
          <h6>
            {moment(params.row.created_at).format('MMMM Do YYYY, h:mm:ss a')}
          </h6>
        </div>
      ),
    },
  ];
  return (
    <div>
      <DataGrid
        autoHeight
        className="css-1yiktpq-MuiDataGrid-root data-grid"
        columns={columns}
        rows={betList}
        loading={isLoading}
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
NetExposureTbale.propTypes = {
  matchData: PropTypes.object.isRequired,
  isTimerActive: PropTypes.any,
};

export default NetExposureTbale;
