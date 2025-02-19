import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import LeftSideTables from './LeftSideTables';
import MasterBook from './Modal/MasterBook';
import UserBook from './Modal/UserBook';
import UserBookList from './Modal/UserBookList';
import ViewMore from './Modal/ViewMore';
import { useParams } from 'react-router-dom';
import { getAuthData, isLoggedIn } from '@/utils/apiHandlers';

const Market_Details = () => {
  const [istoggleopen, setoggleOpen] = useState(false);
  const toggleclickRoll = () => {
    setoggleOpen(!istoggleopen);
  };

  // const [istoggleopenagent, setoggleOpenagent] = useState(false);
  // const toggleButtonagent = () => {
  //   setoggleOpenagent(!istoggleopenagent);
  // };
  // const [islivestreamopen, setlivestreamopen] = useState(false);
  // const togglelivestreamOpen = () => {
  //   setlivestreamopen(!islivestreamopen);
  // };
  const [isLoading, setIsLoading] = useState(false);
  const [betListData, setBetListData] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 8,
  });
  const [rowCountState, setRowCountState] = useState(0);
  let columns = [
    {
      headerName: 'Selection',
      field: 'selection',
      width: 200,
      minWidth: 200,
      flex: 1,
    },
    {
      headerName: 'Odds',
      field: 'price',
      width: 100,
      //   minWidth: 200,
      flex: 1,
    },
    {
      headerName: 'Stake',
      field: 'stake',
      width: 100,
      //   minWidth: 200,
      flex: 1,
    },
    {
      headerName: 'UserName',
      field: 'username',
      width: 100,
      type: 'string',
      //   minWidth: 200,
      flex: 1,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <h6
            className="cursor-pointer text-blue-500"
            onClick={() => handleUserBookList(params.row)}
          >
            {params.row?.username}
          </h6>
        </div>
      ),
    },
  ];
  // let livebet = [
  //   {
  //     id: 1,
  //     marketName: 'Mumbai Indians',
  //     odds: 4.6,
  //     stake: 100,
  //     username: 'kalikatest',
  //   },
  // ];
  const [isopenMasterBook, setMasterBook] = useState(false);
  const handleMasterBook = () => {
    setMasterBook(true);
  };
  const [isopenUserBook, setUserBook] = useState(false);
  const handleUserBook = () => {
    setUserBook(true);
  };
  const [isopenUserBookList, setUserBookList] = useState(false);
  const [isuserName, SetUsername] = useState('');
  const handleUserBookList = (userName) => {
    SetUsername(userName);
    setUserBookList(true);
  };
  const [isopenViewMore, setUserViewMore] = useState(false);
  const handleViewMore = () => {
    setUserViewMore(true);
  };
  const [isClickedLive, setClickLive] = useState(false);
  const liveCricketClicked = () => {
    setClickLive(!isClickedLive);
  };
  const { eventId } = useParams();
  const getLiveListData = async () => {
    const islogin = isLoggedIn();
    setIsLoading(true);
    if (islogin) {
      try {
        const response = await getAuthData(
          `/bet/current-list?eventId=${eventId}&offset=0&limit=100`,
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
  return (
    <div className="grid grid-cols-12 gap-1 m-4 ">
      <div className="left-side col-start-1 col-end-8">
        <LeftSideTables />
      </div>
      <div className="right-side col-start-8 col-end-13  text-sm font-bold">
        {/* <div className="rounded-t">
          <div
            className="bg-[#040B1D] p-1.5 rounded-t "
            onClick={togglelivestreamOpen}
          >
            Live Streaming
          </div>
          {islivestreamopen ? <div className="h-64 bg-slate-800"></div> : ''}
        </div> */}
        <div className=" mb-2 rounded-t">
          <div
            className="bg-[#040B1D] p-1.5 rounded-t flex justify-between"
            onClick={liveCricketClicked}
          >
            <span> Score Card</span>
            <button
              onClick={liveCricketClicked}
              className="bg-[#00A725] flex p-0.5 rounded gap-1.5 items-center ml-auto w-auto "
            >
              <img
                src="/images/live-match.png"
                alt="live-tv"
                className="w-5 "
              />
              <span className="text-xs">Live Score</span>
            </button>
          </div>
          <div
            className={`w-full md:p-1 p-0 md:mt-2 mt-0 shadow-md ${
              isClickedLive ? '' : 'hidden'
            }`}
          >
            <iframe
              src={`https://diamondapi.uk/dcasino/sr.php?eventid=${eventId}&sportid=4`}
              title="description"
              style={{ width: '100%', height: '400px' }}
            ></iframe>
          </div>
        </div>
        <div className="rounded-t my-2 border border-slate-300">
          <div className="bg-[#040B1D] p-1.5 rounded-t">Book</div>

          <div className="grid  grid-cols-2 justify-around my-2">
            <button
              className="bg-[#040B1D] p-1 rounded mx-2 "
              onClick={handleMasterBook}
            >
              Master Book
            </button>

            <button
              className="bg-[#040B1D] p-1 rounded mx-2"
              onClick={handleUserBook}
            >
              User Book
            </button>
          </div>
        </div>
        <div className="rounded-t my-2">
          <div className="bg-[#040B1D] p-1.5 rounded-t flex justify-between h-14 items-center">
            <div className="flex">
              <div className="flex gap-4">
                <div className="flex gap-2">
                  <h4>Live Bet</h4>
                  <button
                    className={`w-14 h-6 transition-colors duration-300 align-center rounded justify-center ${
                      istoggleopen ? 'bg-blue-500' : 'bg-white'
                    }`}
                    onClick={toggleclickRoll}
                  >
                    <div
                      className={`w-4 z-10 h-4 mx-2  border border-slate-300 shadow-md ${
                        istoggleopen
                          ? 'bg-white transform translate-x-6'
                          : 'bg-white transform translate-x-0'
                      }`}
                    />
                  </button>
                </div>
                {/* <div className="flex gap-2">
                  {' '}
                  <h4>Partnership</h4>
                  <button
                    className={`w-14 h-6 transition-colors rounded duration-300 ${
                      istoggleopenagent ? 'bg-blue-500' : 'bg-white'
                    }`}
                    onClick={toggleButtonagent}
                  >
                    <div
                      className={`w-4 h-4 mx-2 shadow-md border border-slate-300 ${
                        istoggleopenagent
                          ? 'bg-white transform translate-x-6'
                          : 'bg-white transform translate-x-0'
                      }`}
                    />
                  </button>
                </div> */}
              </div>
            </div>
            <div className="mx-2">
              <h4 className="cursor-pointer" onClick={handleViewMore}>
                View More
              </h4>
            </div>
          </div>
          {istoggleopen ? (
            <div>
              <DataGrid
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
              />
            </div>
          ) : (
            <div className="h-20 flex justify-center items-center text-[#040B1D] bg-white border border-slate-300 rounded-b">
              {' '}
              There are no any bet.
            </div>
          )}
        </div>
      </div>
      <MasterBook
        isopenMasterBook={isopenMasterBook}
        handlecloseMasterBook={() => {
          setMasterBook(false);
        }}
      />
      <UserBook
        isopenUserBook={isopenUserBook}
        handlecloseMasterBook={() => {
          setUserBook(false);
        }}
      />
      <UserBookList
        isuserName={isuserName}
        isopenUserBookList={isopenUserBookList}
        handlecloseuserBooklist={() => {
          setUserBookList(false);
        }}
      />
      <ViewMore
        isopenViewMore={isopenViewMore}
        handlecloseuserBooklist={() => {
          setUserViewMore(false);
        }}
      />
    </div>
  );
};

export default Market_Details;
