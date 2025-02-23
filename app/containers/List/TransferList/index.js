/* eslint-disable */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { LinearProgress } from '@mui/material';
import { getAuthData, isLoggedIn } from '@/utils/apiHandlers';
import { Loading } from '@/components';
import CustomNoRowsOverlay from '@/utils/styles';
import { numberWithCommas } from '@/utils/numberWithCommas';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBetDetailsAction } from '@/redux/actions';
import TransferSettle from './Models/TransferSettle';
import { MdCurrencyExchange } from 'react-icons/md';
import DateTimePicker from '@/components/DateTimePicker';
import SearchBar from '@/components/SearchBar';
// import TransferLogs from './Models/TransferLogs';
function TransferList() {
  let Update = useSelector((state) => state.Adduser.status);
  const [startDate, setStartDate] = useState(new Date());
  const dispatch = useDispatch();
  const [userListData, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [reftech, setReftech] = useState(true);
  const [rowCountState, setRowCountState] = useState(0);
  const [readOnly, setReadOnly] = useState(true);
  const [selectedIds, setSelectedIds] = useState([]);
  const [giveOrTake, setGiveOrTake] = useState('');
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 8,
  });
  const intervalRef = useRef(null);
  const [searchData, setSearchData] = useState('');
  useEffect(() => {
    const fetchUserListAndSetRowCount = () => {
      getUserList();
      setRowCountState((prevRowCountState) =>
        rowCountState !== undefined ? rowCountState : prevRowCountState,
      );
    };
    fetchUserListAndSetRowCount();
    const intervalId = setInterval(fetchUserListAndSetRowCount, 60000);
    intervalRef.current = intervalId;

    return () => clearInterval(intervalRef.current);
  }, [
    paginationModel,
    reftech,
    searchData,
    Update,
    getUserList,
    rowCountState,
  ]);

  const getUserList = useCallback(async () => {
    const islogin = isLoggedIn();
    setIsLoading(true);
    if (islogin) {
      try {
        const response = await getAuthData(
          `/user/getallusers?search=${searchData}&limit=${
            paginationModel.pageSize
          }&offset=${paginationModel.page * paginationModel.pageSize}`,
        );
        if (response?.status === 201 || response?.status === 200) {
          setIsLoading(false);
          setUserList(
            response.data.data.map((item, index) => {
              return {
                ...item,
                index:
                  paginationModel.page * paginationModel.pageSize + index + 1,
                exposureLimit: item?.exposureAmount,
                profitLoss: item?.balance,
                availableBalance: item?.balance,
              };
            }),
          );
          dispatch(fetchBetDetailsAction(false));
          setRowCountState(response.data.totalCount?.[0]?.total_count);
        } else {
          setIsLoading(false);
        }
      } catch (e) {
        console.error(e);
        return null;
      }
    }
  }, [paginationModel, searchData, reftech, Update]);

  // const handleCheckboxClick = (id) => {
  //   if (selectedIds.includes(id)) {
  //     setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
  //   } else if (selectedIds.length < 1) {
  //     setSelectedIds([...selectedIds, id]);
  //   }
  // };
  // const handleSelectAllClick = (isSelectedAll) => {
  //   if (isSelectedAll) {
  //     // Add all rows where creditAmount is not equal to balance
  //     const selectableRows = userListData
  //       .filter((row) => row.creditAmount !== row.balance)
  //       .map((row) => row.id);
  //     setSelectedIds(selectableRows);
  //   } else {
  //     setSelectedIds([]); // Deselect all
  //   }
  // };
  // const isAllSelected =
  //   userListData.filter((row) => row.creditAmount !== row.balance).length ===
  //   selectedIds.length;
  const columns = [
    {
      headerName: 'Sr.',
      field: 'index',
      type: 'number',
      headerAlign: 'start',
      align: 'start',
      width: 50,
      minWidth: 50,
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            color: 'black',
          }}
        >
          <h6 className="">{params.row.index}</h6>
        </div>
      ),
    },
    // {
    //   headerName: (
    //     <input
    //       type="checkbox"
    //       checked={isAllSelected}
    //       onChange={() => handleSelectAllClick(!isAllSelected)}
    //     />
    //   ),
    //   field: 'selectAll',
    //   flex: 1,
    //   sortable: false,
    //   width: 80,
    //   minWidth: 80,
    //   renderCell: (params) => (
    //     <div className="flex">
    //       <input
    //         type="checkbox"
    //         id="myCheckbox"
    //         disabled={params.row.creditAmount == params.row.balance}
    //         checked={selectedIds.includes(params.row.id)}
    //         onChange={() => handleCheckboxClick(params.row.id)}
    //         className="h-4 w-4 text-blue-600 !border !bg-white !border-blue-600 rounded focus:ring-blue-500"
    //       />
    //     </div>
    //   ),
    // },
    {
      headerName: 'Login Name',
      field: 'username',
      type: 'string',
      headerAlign: 'start',
      align: 'start',
      width: 200,
      minWidth: 200,
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
            color: 'black',
          }}
          className="w-[120px]"
        >
          <span className="p-[2px] font-semibold flex justify-center items-center text-10 rounded bg-green-700 text-white">
            {params.row.userType}
          </span>
          &nbsp;
          <h6> {params.row.username}</h6>
        </div>
      ),
    },

    {
      headerName: 'Take (INR)',
      field: 'availableBalance1',
      type: 'number',
      headerAlign: 'start',
      align: 'start',
      width: 100,
      minWidth: 100,
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            color: 'black',
          }}
        >
          <h6
            className={`cursor-pointer ${
              params.row.creditAmount > params.row.balance
                ? 'text-green-500'
                : 'text-black'
            } `}
          >
            {params.row.creditAmount > params.row.balance
              ? numberWithCommas(
                  params.row.creditAmount - params.row.balance || 0,
                )
              : '-'}
          </h6>
        </div>
      ),
    },
    {
      headerName: 'Give (INR)',
      field: 'availableBalance2',
      type: 'number',
      headerAlign: 'start',
      align: 'start',
      width: 100,
      minWidth: 100,
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            color: 'black',
          }}
        >
          <h6
            className={`cursor-pointer ${
              params.row.creditAmount < params.row.balance
                ? 'text-red-600'
                : 'text-black'
            } `}
          >
            {params.row.creditAmount < params.row.balance
              ? numberWithCommas(
                  params.row.balance - params.row.creditAmount || 0,
                )
              : '-'}
          </h6>
        </div>
      ),
    },

    {
      headerName: 'Credit Limit',
      field: 'balance3',
      width: 113,
      minWidth: 113,
      flex: 1,
      sortable: false,

      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            color: 'black',
            alignItems: 'center',
          }}
        >
          <h6>{numberWithCommas(params.row.creditAmount) || 0}</h6>
        </div>
      ),
    },
    {
      headerName: 'Avail. Bal.',
      field: 'availableBalance',
      type: 'number',
      headerAlign: 'start',
      align: 'start',
      width: 100,
      minWidth: 100,
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            color: 'black',
          }}
        >
          <h6 className="cursor-pointer">
            {numberWithCommas(params.row.balance) || 0}
          </h6>
        </div>
      ),
    },

    {
      headerName: 'Exposure',
      field: 'exposureAmount',
      type: 'number',
      headerAlign: 'start',
      align: 'start',
      width: 85,
      minWidth: 85,
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            color: 'black',
          }}
        >
          <h6
            className={`cursor-pointer ${
              params.row.exposureAmount != 0 ? 'text-red-600' : 'text-black'
            }`}
          >
            {params.row.exposureAmount != 0
              ? numberWithCommas(params.row.exposureAmount || 0)
              : '-'}
          </h6>
        </div>
      ),
    },

    // {
    //   headerName: 'Currency',
    //   field: 'currency_type',
    //   type: 'string',
    //   headerAlign: 'start',
    //   align: 'start',
    //   // width: 100,
    //   flex: 1,
    //   sortable: false,
    //   width: 100,
    //   minWidth: 100,
    //   renderCell: (params) => (
    //     <div
    //       style={{
    //         display: 'flex',
    //         alignItems: 'center',
    //         color: 'black',
    //       }}
    //     >
    //       {params.row.currency_type}
    //     </div>
    //   ),
    // },
    {
      headerName: 'Transfer',
      field: 'status',
      type: 'number',
      headerAlign: 'start',
      align: 'start',
      // width: 100,
      flex: 1,
      sortable: false,
      width: 100,
      minWidth: 100,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            color: 'black',
          }}
        >
          {params.row.creditAmount != params.row.balance ? (
            <button
              onClick={() => handleClick(params.row)}
              className="px-3 py-1 bg-green-700 text-white rounded-md col-start-6 col-end-7"
            >
              Transfer
            </button>
          ) : (
            <button
              disabled
              className="px-3 py-1 cursor-not-allowed bg-[#5a5959] text-white rounded-md col-start-6 col-end-7"
            >
              Transfer
            </button>
          )}
        </div>
      ),
    },
    // {
    //   headerName: 'Log',
    //   field: 'log',
    //   type: 'string',
    //   headerAlign: 'start',
    //   align: 'start',
    //   // width: 100,
    //   flex: 1,
    //   sortable: false,
    //   width: 100,
    //   minWidth: 100,
    //   renderCell: (params) => (
    //     <div
    //       style={{
    //         display: 'flex',
    //         alignItems: 'center',
    //       }}
    //       onClick={() => handleLogsOpen(params?.row)}
    //     >
    //       <span className="cursor-pointer text-primary-btn2">Log</span>
    //     </div>
    //   ),
    // },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const handleClick = (data) => {
    console.log(data, 'data');
    if (data.creditAmount > data.balance) {
      setGiveOrTake('take');
    } else if (data.creditAmount < data.balance) {
      setGiveOrTake('give');
    } else {
      setGiveOrTake('');
    }
    setSelectedIds(data?.id);
    setIsOpen(true);
  };

  const handleSearch = (searchTerm) => {
    setSearchData(searchTerm);
  };
  console.log(selectedIds, 'selectedIds');
  const handleDateChange = (date) => {
    setStartDate(date);
  };
  //   eslint-disable-next-line
  const [userLogData, setUserLogData] = useState({});
  //   eslint-disable-next-line
  const [isOpenLog, setIsOpenLogs] = useState(false);

  // const handleLogsOpen = (data) => {
  //   setUserLogData(data);
  //   setIsOpenLogs(true);
  // };
  return (
    <div className="w-full text-black mx-2  md:mx-10 my-4 bg-white py-2 max-w-[96vw]">
      {isLoading && <Loading />}

      <div className="flex justify-between items-center p-2 pb-0">
        <h1 className="text-2xl font-semibold pl-2">Transfer</h1>
        <div className="search-box mx-3 mb-4 mt-2 flex justify-between">
          <div className="relative w-[250px]">
            <lable className="text-xs mb-2">Search Login Name</lable>
            <SearchBar onSearch={handleSearch} getList={getUserList} />
          </div>
        </div>
      </div>
      <div className="bg-[#CAE0E8] p-[1px] mb-1 w-full"></div>

      <div className="mx-3 my-4  text-black  rounded-sm h-full text-sm bg-primary-800">
        <div className=" data-grid-container overflow-x-auto">
          <DataGrid
            autoHeight
            className="css-1yiktpq-MuiDataGrid-root data-grid"
            columns={columns}
            rows={userListData}
            // sx={sx}
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
              // // toolbar: GridToolbar,
              loadingOverlay: LinearProgress,
              noRowsOverlay: CustomNoRowsOverlay,
            }}
            sx={{
              '& .MuiDataGrid-footerContainer': {
                backgroundColor: 'white',
                color: 'black', // Set text color for contrast
              },
            }}
            disableColumnMenu
            disableRowSelectionOnClick
          />
        </div>

        <TransferSettle
          isOpen={isOpen}
          data={selectedIds}
          setReftech={setReftech}
          handleClose={() => {
            setIsOpen(false);
          }}
          type={giveOrTake}
        />
        {/* {isOpenLog && (
          <TransferLogs
            isOpenLog={isOpenLog}
            data={userLogData}
            handleClose={() => {
              setIsOpenLogs(false);
            }}
          />
        )} */}
      </div>
    </div>
  );
}

export default TransferList;
