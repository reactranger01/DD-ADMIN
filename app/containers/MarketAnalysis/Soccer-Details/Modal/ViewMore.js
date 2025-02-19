import React, { useEffect, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import PropTypes from 'prop-types';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import ParentList from './ParentList';
import { LinearProgress } from '@mui/material';
import CustomNoRowsOverlay from '@/utils/styles';
import { getAuthData, isLoggedIn } from '@/utils/apiHandlers';
import { useParams } from 'react-router-dom';
import moment from 'moment';
const ViewMore = ({ isopenViewMore, handlecloseuserBooklist }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [betListData, setBetListData] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 8,
  });
  const { eventId } = useParams();
  const [rowCountState, setRowCountState] = useState(0);
  let columns = [
    {
      headerName: 'Username',
      field: 'username',
      type: 'string',
      flex: 1,
      minWidth: 150,
      width: 150,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
          }}
        >
          <h6
            className="text-blue-500"
            onClick={() => OpenParentList(params.row)}
          >
            {' '}
            {params.row?.username}
          </h6>
        </div>
      ),
    },
    {
      headerName: 'Market Name',
      field: 'game_type',
      flex: 1,
      minWidth: 150,
      width: 150,
    },
    {
      headerName: 'Selection',
      field: 'selection',
      flex: 1,
      minWidth: 250,
      width: 250,
    },
    {
      headerName: 'Type',
      field: 'bet_on',
      flex: 1,
      minWidth: 100,
      width: 10,
    },
    {
      headerName: 'Odds',
      field: 'price',
      flex: 1,
      minWidth: 100,
      width: 100,
    },
    {
      headerName: 'Stake',
      field: 'stake',
      flex: 1,
      minWidth: 100,
      width: 100,
    },
    {
      headerName: 'Place Date',
      field: 'created_at',
      flex: 1,
      minWidth: 200,
      width: 200,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
          }}
        >
          <h6 className="text-blue-500">
            {' '}
            {moment(params.row.created_at).format('MMMM Do YYYY, h:mm a')}
          </h6>
        </div>
      ),
    },
  ];
  // let rowss = [
  //   {
  //     id: 1,
  //     username: 'KALIKATEST',
  //     nation: 'Mumbai Indians',
  //     amount: 100,
  //     userate: '4.6',
  //     placeDate: '(Mar 19, 2024, 9:51:57 PM)',
  //     matchdate: 'Mar 19, 2024, 9:52:03 PM',
  //     gameType: 'MATCH_ODDS',
  //   },
  //   {
  //     id: 2,
  //     agentname: 'playerexch08',
  //     turnover: 0,
  //     commission: 0,
  //     action: '(0)',
  //   },
  // ];

  const getLiveListData = async () => {
    const islogin = isLoggedIn();
    setIsLoading(true);
    if (islogin) {
      try {
        const response = await getAuthData(
          `/bet/current-list?eventId=${eventId}&offset=${
            paginationModel.page * 8
          }&limit=8`,
        );
        if (response?.status === 201 || response?.status === 200) {
          setIsLoading(false);
          setBetListData(response?.data?.bets || []);
          setRowCountState(response?.data?.total_bets);
        } else {
          setIsLoading(false);
        }
      } catch (e) {
        console.error(e);
        return null;
      }
    }
  };
  useEffect(() => {
    getLiveListData();
    setRowCountState((prevRowCountState) =>
      rowCountState !== undefined ? rowCountState : prevRowCountState,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowCountState, paginationModel, setRowCountState]);
  const [isopenParentList, setParentListe] = useState(false);
  const [isuserName, SetUsername] = useState('');
  const OpenParentList = (userName) => {
    SetUsername(userName);
    setParentListe(true);
  };
  return (
    <div>
      <div
        className={
          isopenViewMore
            ? 'fixed inset-0 bg-gray-500 bg-opacity-75 overflow-y-auto px-4 py-6 sm:px-0 z-10'
            : 'hidden'
        }
      >
        <div className="text-sm text-white  text-center h-4 rounded-t-lg bg-[#040B1D] relative w-full max-w-6xl mx-auto shadow-md px-8 py-4 row flex">
          <h4 className="mt-[-0.5rem] grow text-left text-sm font-bold">
            View More Bet
          </h4>
          <button className=" flex-none">
            <RxCross2
              className="h-4 w-4 mt-[-0.5rem]   "
              onClick={handlecloseuserBooklist}
            />
          </button>
        </div>
        <div className="relative  w-full max-w-6xl mx-auto shadow-md rounded-b-lg bg-white px-8 py-4">
          <div className="grid grid-cols-2 gap-4 text-slate-950 text-sm ">
            {/* <div className="">
              Show
              <select className="border border-gray-300 rounded-sm shadow-sm mt-4 h-7  mx-1">
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="100">100</option>
              </select>
              entries
            </div> */}
            {/* <div className=" flex flex-row-reverse">
              <input className="border border-slate-300 rounded-md p-1 my-4" />
              <h4 className="my-4  text-slate-950">Search : </h4>
            </div> */}
          </div>
          <div className="card mx-4 py-5">
            <div className="w-100% h-full font-semibold ">
              <DataGrid
                autoHeight
                className="css-1yiktpq-MuiDataGrid-root"
                columns={columns}
                rows={betListData}
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
              />
            </div>
          </div>
        </div>
      </div>
      <ParentList
        isuserName={isuserName}
        isopenParentList={isopenParentList}
        handlecloseParentList={() => {
          setParentListe(false);
        }}
      />
    </div>
  );
};
ViewMore.propTypes = {
  isopenViewMore: PropTypes.bool.isRequired,
  handlecloseuserBooklist: PropTypes.func.isRequired,
};

export default ViewMore;
