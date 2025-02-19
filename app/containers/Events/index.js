import React, { useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { v4 as uuidv4 } from 'uuid';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { LinearProgress } from '@mui/material';
import CustomNoRowsOverlay from '@/utils/styles';
// import BetConfigModal from './Modal/BetConfigModal';
import { getAuthData, isLoggedIn, postAuthData } from '@/utils/apiHandlers';
import { toast } from 'react-toastify';
import moment from 'moment';
import { Switch } from 'antd';

const Events = () => {
  const [activeButton, setActiveButton] = useState('cricket');
  const [day, setDay] = useState('today');
  const [readOnly, setReadOnly] = useState(true);
  const [searchData, setSearchData] = useState('');
  // const [isOpen, setIsOpen] = useState(true);
  const [gamedata, setGameData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [reftech, setReftech] = useState(true);
  // const [configData, setConfigData] = useState([]);
  // const [eventId, setEventId] = useState([]);
  // eslint-disable-next-line
  const [rowCountState, setRowCountState] = useState(0);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 8,
  });
  // const [openBetConfigModal, setOpenBetConfigModal] = useState(false);
  const handleClick = (value) => {
    setActiveButton(value);
    setDay('today');
  };
  const handleDayClick = (value) => {
    setDay(value);
  };
  const handleSearch = (e) => {
    setSearchData(e.target.value);
  };

  // const OnChangeDisable = (checked) => {
  //   setIsOpen(checked);
  // };
  // const handleBetcofig = (rowData) => {
  // setConfigData(rowData);
  // setEventId(rowData);
  // setOpenBetConfigModal(true);
  // };
  const buttons = [
    { id: 1, btnName: 'Cricket', value: 'cricket' },
    { id: 2, btnName: 'Football', value: 'soccer' },
    // { id: 3, btnName: 'Tennis', value: 'tennis' },
  ];
  const dayWise = [
    { id: 1, btnName: 'Today', value: 'today' },
    { id: 2, btnName: 'Upcoming ', value: 'tomorrow' },
    { id: 3, btnName: 'Recent', value: 'recent' },
  ];
  // let slId = 0;
  let columns = [
    {
      headerName: 'Sl.No.',
      field: 'serialNumber',
      width: 60,
      minWidth: 60,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <h6 className="">{params.row.serialNumber}</h6>
        </div>
      ),
    },

    {
      headerName: 'Event Id',
      field: 'id',
      // flex: 1,
      width: 120,
      minWidth: 120,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <h6 className="">{params.row.matchId}</h6>
        </div>
      ),
    },

    {
      headerName: 'Event Name',
      field: 'name',
      width: 60,
      flex: 1,
      minWidth: 60,
    },
    {
      headerName: 'Tournament Name',
      field: 'competitionName',
      flex: 1,
      width: 120,
      minWidth: 120,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <h6 className="">{params.row?.competition_name || 'NA'}</h6>
        </div>
      ),
    },
    {
      headerName: 'Date and Time',
      field: 'openDate',
      // flex: 1,
      width: 150,
      minWidth: 150,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <h6 className="">
            {moment(params.row?.matchDateTime).format('MMMM DD, YYYY h:mm A')}
          </h6>
        </div>
      ),
    },
    // {
    //   headerName: 'Bet Config',
    //   field: 'amount',
    //   width: 150,
    //   // flex: 1,
    //   minWidth: 150,
    //   renderCell: (params) => (
    //     <div
    //       style={{
    //         display: 'flex',
    //         alignItems: 'center',
    //       }}
    //       onClick={() => {
    //         handleBetcofig(params?.row);
    //       }}
    //     >
    //       <h6 className="underline-offset-1 underline text-blue-700 cursor-pointer">
    //         Betconfig
    //       </h6>
    //     </div>
    //   ),
    // },
    {
      headerName: 'Status',
      field: 'remove',
      // flex: 1,
      width: 120,
      minWidth: 120,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <h6
            className={params.row.isDelete ? 'text-red-500' : 'text-green-500'}
          >
            {params.row.isDelete ? 'Close' : 'Open'}
          </h6>
        </div>
      ),
    },
    {
      headerName: 'Action',
      field: 'img',
      // flex: 1,
      width: 120,
      minWidth: 120,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Switch
            checked={!params.row.isDelete}
            style={{
              backgroundColor: `${params.row.isDelete ? 'gray' : '#1b3bbb'}`,
            }}
            onChange={() => handleUpdateStatus(params.row)}
          />
        </div>
      ),
    },
  ];
  const handleGetBets = async () => {
    const islogin = isLoggedIn();
    setIsLoading(true);
    if (islogin) {
      try {
        const response = await getAuthData(
          `/catalogue/${activeButton}/get-eventlist`,
        );

        if (response?.status === 201 || response?.status === 200) {
          const dataWithIds = (response?.data || []).map((item) => ({
            ...item,
            uniqueId: uuidv4(), // Assign a unique ID to each item
          }));
          setGameData(dataWithIds);
          setIsLoading(false);
          // setConfigData({});
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

  function filterDataByDay(data, day) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const pastDate = new Date(today);
    pastDate.setDate(today.getDate() - 2);
    return data?.filter((item) => {
      const openDate = new Date(item.matchDateTime);

      if (day === 'today') {
        return openDate.toDateString() === today.toDateString();
      } else if (day === 'tomorrow') {
        if (activeButton === 'soccer') {
          return openDate.toDateString() === tomorrow.toDateString();
        } else {
          return (
            openDate.toDateString() === tomorrow.toDateString() ||
            openDate > tomorrow
          );
        }
        // return (
        //   openDate.toDateString() === tomorrow.toDateString() ||
        //   openDate > tomorrow
        // );
      } else if (day === 'recent') {
        if (activeButton === 'soccer') {
          return (
            openDate >= pastDate &&
            openDate < today &&
            item?.isDelete === false &&
            item?.isDelete === false
            // && item?.isDelete === false
          ); // Matches within the past 2 days
        } else {
          return openDate < today && item?.isDelete === false;
        }
      }

      return false;
    });
  }

  const filteredDataTodayTomorrow = filterDataByDay(gamedata, day);
  // const filteredDataTomorrow = filterDataByDay(rows, 'tomorrow');

  const filteredData = filteredDataTodayTomorrow
    .filter((item) => {
      const eventNameLower = item?.name?.toLowerCase();
      const competitionNameLower = item?.competition_name?.toLowerCase() || '';

      return (
        (eventNameLower &&
          eventNameLower.includes(searchData.trim().toLowerCase())) ||
        (competitionNameLower &&
          competitionNameLower.includes(searchData.trim().toLowerCase()))
      );
    })
    .map((item) => {
      const updatedEventName = item.name.replace(/ v /g, ' VS ');
      return {
        ...item,
        name: updatedEventName,
        id: item.uniqueId, // Use the precomputed unique ID
      };
    })
    .sort((a, b) => {
      const dateA = new Date(a.matchDateTime);
      const dateB = new Date(b.matchDateTime);
      const dateComparison = dateA - dateB;
      if (dateComparison !== 0) {
        return dateComparison;
      }
      return a.matchId - b.matchId;
    })
    .map((item, index) => ({
      ...item,
      serialNumber: index + 1,
    }));

  useEffect(() => {
    handleGetBets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeButton, reftech]);

  const handleUpdateStatus = async (row) => {
    const newStatus = !row.isDelete;
    try {
      const response = await postAuthData(
        `/catalogue/${activeButton}/update-event-status`,
        {
          eventId: row.matchId,
          status: newStatus,
        },
      );

      if (response?.status === 200 || response?.status === 201) {
        toast.success(
          'Match status updated successfully. It will reflect on the user panel shortly.',
        );
        setReftech((pre) => !pre);
      } else {
        toast.error(response?.data || 'Something went wrong');
      }
    } catch (error) {
      toast.error(error?.message || 'Unauthorised');
    }
  };
  const handleSubscribe = async () => {
    setIsLoading(true);
    try {
      const eventIds = filteredData
        .filter((event) => event.isDelete === false)
        .map((event) => Number(event.matchId));

      // Prepare the payload with the array of event IDs
      const payload = {
        eventIds, // Equivalent to eventIds: eventIds
      };

      const response = await postAuthData(
        `/catalogue/${activeButton}/subscribe-markets`,
        payload,
      );
      if (response?.status === 200 || response?.status === 201) {
        toast.success(
          'Matches subscribed successfully. Odds will reflect on the user panel after 5 minutes.',
        );
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error(response?.data || 'Something went wrong');
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.message || 'Unauthorised');
    }
  };
  let sx = {
    '& .MuiDataGrid-columnHeaders': {
      position: 'sticky',
      top: 0,
      zIndex: 1,
      // Adjust as needed for your theme
    },
    border: 'solid-gray',
  };

  return (
    <div>
      {/* <BetConfigModal
        openBetConfigModal={openBetConfigModal}
        setOpenBetConfigModal={setOpenBetConfigModal}
        configData={configData}
        activeButton={activeButton}
        eventId={eventId}
        setReftech={setReftech}
      /> */}
      <div className="mt-4 h-24 mx-8  border-solid border border-slate-950 rounded-md flex bg-slate-100  text-sm text-slate-950 ">
        <div className=" w-6/12 h-16  flex justify-evenly  text-center  mx-8 my-1 items-center">
          {buttons.map((button, index) => {
            return (
              <>
                <button
                  key={index}
                  className={`w-36 h-10 rounded-md p-1 ${
                    activeButton === button.value
                      ? 'bg-[#071535] text-white'
                      : 'bg-white text-[#071535] border-[1px] border-[#071535]'
                  }`}
                  onClick={() => handleClick(button.value)}
                >
                  {button.btnName}
                </button>
              </>
            );
          })}
        </div>

        <div className=" w-6/12 h-16  flex justify-evenly  text-center  mx-8 my-1 items-center">
          {dayWise.map((button, index) => {
            return (
              <>
                <button
                  key={index}
                  className={`w-36 h-10 rounded-md p-1 ${
                    day === button.value
                      ? 'bg-[#071535] text-white'
                      : 'bg-white text-[#071535] border-[1px] border-[#071535]'
                  }`}
                  onClick={() => handleDayClick(button.value)}
                >
                  {button.btnName}
                </button>
              </>
            );
          })}
        </div>
      </div>
      <div>
        <div className="search-box  h-10 mx-2 md:mx-2 md:mx-10 my-4 flex justify-end">
          <div className="relative w-[250px] md:w-[350px] mb-5 ">
            <input
              type="text"
              readOnly={readOnly}
              onFocus={() => setReadOnly(false)}
              onBlur={() => setReadOnly(true)}
              onChange={handleSearch}
              placeholder="Search by Tournament & Event Name"
              value={searchData}
              className="h-[40px] w-full pl-10 border bg-lightPrimary text-14 text-gray-900  rounded-[6px] md:rounded-[20px] outline-none dark:!bg-navy-900  dark:text-white"
            />
            <span className="text-black ay-center mt-[10px] right-3 text-18 lg:text-[20px]">
              <CiSearch />
            </span>
          </div>
        </div>
        <div className="h-10 mx-2 md:mx-2 md:mx-10 my-4 flex justify-end">
          <button
            className=" w-36 h-10 rounded-md p-1 bg-[#071535] text-white hover:bg-[#040b1d]"
            disabled={isLoading}
            onClick={handleSubscribe}
          >
            Subscribe
          </button>
        </div>
      </div>
      <div className="mx-8 mt-4 border border-gray-500 rounded-sm h-full z-0">
        <div className="h-8 bg-[#071535] rounded-t-sm text-sm font-semibold">
          <h3 className="p-1 ml-2">Events</h3>
        </div>

        <div className="card mx-4 ">
          <div className="w-100% h-full font-semibold custom-table">
            <DataGrid
              getRowId={(row) => row.id}
              autoHeight
              className="css-1yiktpq-MuiDataGrid-root"
              columns={columns}
              rows={filteredData}
              sx={sx}
              pagination={false}
              loading={isLoading}
              getEstimatedRowHeight={() => 52}
              paginationMode="server"
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
    </div>
  );
};

export default Events;
