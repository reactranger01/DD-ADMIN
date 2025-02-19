import React, { useEffect, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { PropTypes } from 'prop-types';
import { Loading } from '@/components';
import { getAuthData, isLoggedIn } from '@/utils/apiHandlers';
import moment from 'moment';
import { numberWithCommas } from '@/utils/numberWithCommas';
import TablePagination from '@/components/TablePagination';
import { DownloadCSV } from '@/containers/pageListAsync';
const TransferLogs = ({ isOpenLog, data, handleClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [accountStatementList, setAccountStatementList] = useState([]);
  const [rowCountState, setRowCountState] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 20,
  });
  useEffect(() => {
    if (paginationModel) {
      getActivityLogListnew();
    }
    setRowCountState((prevRowCountState) =>
      rowCountState !== undefined ? rowCountState : prevRowCountState,
    );

    // eslint-disable-next-line
  }, [rowCountState, paginationModel]);
  const getApiUrl = () => {
    let baseUrl = `/user/get-particuleruser-transactions?userid=${
      data.id
    }&filterTransaction=settling&limit=${paginationModel.pageSize}&offset=${
      paginationModel.page * paginationModel.pageSize
    }`;
    // if (type === 'settling') {
    //   baseUrl += `&usertype=${sportType}`;
    // } else if (type === 'batting') {
    //   baseUrl += `&sportid=${sportType}`;
    // }
    return baseUrl;
  };

  const getActivityLogListnew = async () => {
    const islogin = isLoggedIn();
    setIsLoading(true);
    if (islogin) {
      try {
        const response = await getAuthData(getApiUrl());
        if (response?.status === 201 || response?.status === 200) {
          setIsLoading(false);
          setAccountStatementList(
            response.data?.statements ||
              response?.data?.data?.response?.users ||
              [],
          );
          setRowCountState(
            response?.data?.count ||
              response?.data?.data?.response?.totalCount?.[0]?.[0]?.count,
          );
        } else {
          setIsLoading(false);
        }
      } catch (e) {
        console.error(e);
        return null;
      }
    }
  };
  const pageChangeHandler = (event, newPage) => {
    setPaginationModel((prev) => ({ ...prev, page: newPage - 1 }));
  };
  const handlePageSizeChange = (e) => {
    const newSize = parseInt(e.target.value, 10);
    setPaginationModel((prev) => ({ ...prev, pageSize: newSize, page: 0 }));
  };
  const Owner_name = localStorage.getItem('owner_username');

  return (
    <div>
      <div
        className={
          isOpenLog
            ? 'fixed inset-0 bg-gray-500 bg-opacity-75 overflow-y-auto px-4 py-6 sm:px-0'
            : 'hidden'
        }
      >
        <div className="w-full max-w-6xl mx-auto p-6 bg-white rounded-sm shadow-lg relative">
          <button
            className="absolute top-[-15px] right-[-15px] text-black text-xl hover:text-gray-400 p-2 bg-slate-50 rounded-full"
            onClick={handleClose}
          >
            <RxCross2 className="" />
          </button>
          {isLoading && <Loading />}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-black text-xl">
              Banking Logs -{' '}
              <span className="px-2 py-1 bg-red-400">{data?.username}</span>
            </h2>

            <DownloadCSV
              url="/user/get-particuleruser-transactions"
              buttonText="Download CSV"
              fileName="user_logs.csv" // Optional custom file name
              css="my-[25px]"
              query="userid"
              parms={data.id}
            />
            {/* <div className="flex space-x-6 mb-4">
            <label className="text-black">
              <input
                type="radio"
                name="filter"
                className="mr-2"
                defaultChecked
              />
              All
            </label>
            <label className="text-black">
              <input type="radio" name="filter" className="mr-2" />
              Profit/Loss
            </label>
            <label className="text-black">
              <input type="radio" name="filter" className="mr-2" />
              Deposit/Withdraw
            </label>
          </div> */}
          </div>
          <div className="bg-[#CAE0E8] p-0.5"></div>
          {/* Filters */}

          <table className="w-full text-left border border-gray-400 text-black table-auto p-4 text-[14px]">
            <thead>
              <tr className="text-[14px] border-b border-gray-300">
                <th className="px-4 py-2">Date/Time</th>
                <th className="px-4 py-2"> Type</th>

                <th className="px-4 py-2 text-right"> Deposit </th>
                <th className="px-4 py-2 text-right">Withdraw</th>
                <th className="px-4 py-2 text-right">Balance</th>
                <th className="px-4 py-2"> Description</th>
                <th className="px-4 py-2"> From/To</th>
              </tr>
            </thead>
            <tbody className="">
              {accountStatementList.map((item, index) => (
                <tr
                  key={item.id}
                  className={` text-[14px] hover:bg-primary-rowHover border-b border-gray-300 ${
                    index % 2 === 1 ? 'bg-primary-rowbg' : ''
                  }`}
                >
                  <td className="px-4 py-2">
                    {' '}
                    {moment(item.createdAt).format('MMMM Do YYYY, h:mm a')}
                  </td>
                  <td className="px-4 py-2">
                    {item.type === 'CREDIT'
                      ? 'Deposit'
                      : item.type === 'WITHDRAW'
                      ? 'Withdraw'
                      : ''}
                  </td>

                  <td className="px-4 py-2 text-green-500 text-right">
                    {item.type === 'CREDIT' ? item.amount : '-'}
                  </td>
                  <td className="px-4 py-2 text-green-500 text-right ">
                    {item.type === 'WITHDRAW' ? item.amount : '-'}
                  </td>
                  <td className="px-4 py-2  text-green-500 text-right">
                    {/* {item.type == 'WITHDRAW'
                  ? item.senderBalance
                  : item.receiverBalance} */}
                    {numberWithCommas(
                      item?.receiver?.username == Owner_name
                        ? item?.senderBalance
                        : item?.receiver?.username == Owner_name
                        ? item?.senderBalance
                        : item?.receiverBalance,
                    )}
                  </td>
                  <td className="px-4 py-2">{item.remark}</td>
                  <td className="px-4 py-2">
                    {' '}
                    {item?.sender?.username == 'admin@lotus.com'
                      ? 'Admin'
                      : item?.sender?.username}
                    &#8594;
                    {item?.receiver?.username == 'admin@lotus.com'
                      ? 'Admin'
                      : item?.receiver?.username}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination and Close Button */}
          <div className="flex justify-between items-center mt-4 bg-[#F5F5F51A] p-2 rounded-b-md">
            <select
              className="bg-white text-black px-3 py-1 rounded-lg"
              value={paginationModel.pageSize}
              onChange={handlePageSizeChange}
            >
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="70">70</option>
              <option value="100">100</option>
            </select>

            <TablePagination
              page={paginationModel.page}
              count={Math.ceil(rowCountState / paginationModel.pageSize)} // Total number of pages
              onChange={pageChangeHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
TransferLogs.propTypes = {
  isOpenLog: PropTypes.bool,
  handleClose: PropTypes.func,
  data: PropTypes.object.isRequired,
};
export default TransferLogs;
