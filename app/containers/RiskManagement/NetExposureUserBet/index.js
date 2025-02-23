/* eslint-disable react-hooks/exhaustive-deps */
import { reactIcons } from '@/utils/icons';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAuthData, isLoggedIn } from '@/utils/apiHandlers';
import { DataGrid } from '@mui/x-data-grid';
import { LinearProgress } from '@mui/material';
import CustomNoRowsOverlay from '@/utils/styles';
import moment from 'moment';

const NetExposureUserBet = () => {
  const naviagte = useNavigate();
  const [matchData] = useState(() => {
    const localData = localStorage.getItem('Net_Expossure_Match');
    return JSON.parse(localData);
  });
  const [isLoading, setIsLoading] = useState(false);
  const [betList, setBetList] = useState([]);
  const { userId } = useParams();
  useEffect(() => {
    handleGetEvents();
    setRowCountState((prevRowCountState) =>
      rowCountState !== undefined ? rowCountState : prevRowCountState,
    );
  }, [rowCountState, paginationModel, setRowCountState, matchData]);

  const handleGetEvents = async () => {
    const islogin = isLoggedIn();
    setIsLoading(true);
    if (islogin) {
      try {
        const response = await getAuthData(
          `/bet/user-particulermarketbet?id=${userId}&market=${
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

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 8,
  });
  const [rowCountState, setRowCountState] = useState(0);
  const columns = [
    {
      headerName: 'Member',
      field: 'usernames',
      type: 'string',
      headerAlign: 'start',
      align: 'start',
      flex: 1,
      width: 200,
      minWidth: 200,
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
      width: 120,
      minWidth: 120,
      renderCell: (params) => (
        <div className=" text-black">
          <h6> {params?.row?.selection}</h6>
        </div>
      ),
    },
    {
      headerName: 'Bet ID',
      field: 'selection',
      flex: 1,
      width: 220,
      minWidth: 220,
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
      width: 100,
      minWidth: 100,
      renderCell: () => (
        <div className="flex items-center justify-center text-black w-[120px]">
          Yes
        </div>
      ),
    },
    {
      headerName: 'Type',
      field: 'price',
      flex: 1,
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
      width: 130,
      minWidth: 130,
      renderCell: (params) => (
        <div className=" text-black">{params?.row?.stake}</div>
      ),
    },
    {
      headerName: '	Liability',
      field: 'created_at',
      flex: 1,
      Width: 200,
      minWidth: 200,
      renderCell: (params) => (
        <div className="flex items-center justify-start text-black">
          <h6>
            {' '}
            {params?.row?.bet_on == 'BACK'
              ? Math.floor(params?.row?.stake)
              : Math.floor((params?.row?.price - 1) * params?.row?.stake)}
          </h6>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white text-black p-8">
      <span className="text-2xl">Net Exposure</span>
      <div className="bg-[#CAE0E8] p-0.5"></div>
      <div className="flex items-center text-sm my-1">
        <span
          className="text-[#1BDDD4] cursor-pointer"
          onClick={() => naviagte(-1)}
        >
          Net Exposure
        </span>
        <span className="mx-1">{reactIcons.right}</span>
        <span className="mx-1">{matchData?.event}</span>
        <span className="mx-1">- {matchData?.market}</span>
      </div>
      <div>
        <DataGrid
          columns={columns}
          rows={betList}
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
          pageSizeOptions={[8, 20, 50, 70, 100]}
          paginationModel={paginationModel}
          paginationMode="server"
          onPaginationModelChange={setPaginationModel}
          slots={{
            loadingOverlay: LinearProgress,
            noRowsOverlay: CustomNoRowsOverlay,
          }}
          disableColumnMenu
          disableRowSelectionOnClick
        />
      </div>
    </div>
  );
};

export default NetExposureUserBet;
