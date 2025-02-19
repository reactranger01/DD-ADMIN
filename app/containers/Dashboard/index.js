/* eslint-disable react-hooks/exhaustive-deps */
import { getAuthData } from '@/utils/apiHandlers';
import { numberWithCommas } from '@/utils/numberWithCommas';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState();
  const [depositWithdraw, setDepositWityhdraw] = useState('');
  const userId = localStorage.getItem('owner_id');
  const UserPath = localStorage.getItem('owner_path');
  const getDashboardData = async (user) => {
    try {
      const response = await getAuthData(
        `/user/get-overall-amountexposure?${user?.id || userId}&${
          user?.path || UserPath
        }`,
      );

      if (response?.status === 201 || response?.status === 200) {
        setDashboardData(response?.data?.data);
      }
    } catch (e) {
      console.error(e);
      return null;
    }
  };
  const getDepositWithdrawData = async () => {
    try {
      const response = await getAuthData(
        `/user/get-pendingDepositWithdrawReq?${user?.id || userId}&${
          user?.path || UserPath
        }`,
      );
      console.log('response', response);
      if (response?.status === 201 || response?.status === 200) {
        setDepositWityhdraw(response?.data);
      }
    } catch (e) {
      console.error(e);
      return null;
    }
  };
  const user = useSelector((state) => state.user);
  useEffect(() => {
    getDashboardData(user);
    getDepositWithdrawData();
    //disable-next-line
  }, []);
  console.log('response', depositWithdraw);
  const data = [
    {
      title: 'Net Exposure:',
      amount: numberWithCommas(dashboardData?.totalExposure || 0),
      color: 'text-[#f43]',
    },
    {
      title: 'Balance Down:',
      amount: numberWithCommas(dashboardData?.totalBalance || 0),
      color: 'text-[#3cd247]',
    },
    {
      title: 'Balance Up:',
      amount: numberWithCommas(dashboardData?.uplineBalance || 0),
      color: 'text-[#f43]',
    },
    {
      title: 'Credit Limit:',
      amount: numberWithCommas(dashboardData?.availableCreditAmount || 0),
      color: 'text-[#3cd247]',
    },
    {
      title: 'Available Credit:',
      amount: numberWithCommas(dashboardData?.availableBalance || 0),
      color: 'text-[#3cd247]',
    },
  ];
  // eslint-disable-next-line
  const depositWithdrawData = [
    {
      title: 'Pending Withdrawal Amount:',
      amount: numberWithCommas(depositWithdraw?.totalWithdrawal || 0),
      color: 'text-[#f43]',
    },
    {
      title: 'Pending Deposit Amount:',
      amount: numberWithCommas(depositWithdraw?.totalDeposit || 0),
      color: 'text-[#3cd247]',
    },
    // {
    //   title: 'Total Pending Amount:',
    //   amount: numberWithCommas(depositWithdraw?.totalPendingAmount || 0),
    //   color:
    //     depositWithdraw?.totalPendingAmount > 0
    //       ? 'text-[#3cd247]'
    //       : 'text-[#f43]',
    // },
  ];
  return (
    <section>
      <div className="text-black p-5 pt-[10px]">
        <div className="px-5 py-2">
          <h1 className="text-24 pb-3 mt-4 border-b border-white">
            Balance Information
          </h1>
          <div className="flex gap-4">
            <div className="max-w-[300px] my-3">
              {data &&
                data.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between px-2 hover:bg-primary-rowHover font-medium text-14 bg-primary-rowbg"
                    >
                      <p className="p-2 ">{item?.title} </p>{' '}
                      <p className={`${item?.color}`}>
                        {' '}
                        &nbsp;
                        {item?.amount}
                      </p>
                    </div>
                  );
                })}
            </div>
            {/* <div className="w-[300px] my-3">
              {depositWithdrawData &&
                depositWithdrawData.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between px-2 hover:bg-primary-rowHover font-medium text-14 bg-primary-rowbg"
                    >
                      <p className="p-2 ">{item?.title} </p>{' '}
                      <p className={`${item?.color}`}>
                        {' '}
                        &nbsp;
                        {item?.amount}
                      </p>
                    </div>
                  );
                })}
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
