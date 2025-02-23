import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { TbReload } from 'react-icons/tb';
import { HiUserPlus } from 'react-icons/hi2';
import Addmaster from './masterList/Addmaster';
import { Adduser } from './userList/Adduser';
import { numberWithCommas } from '@/utils/numberWithCommas';
import { getAuthData, isLoggedIn } from '@/utils/apiHandlers';
function List() {
  const [isOpenuser, setIsOpenuser] = useState(false);
  const [isTotals, setIsTotals] = useState({});
  const handleClick = () => {
    setIsOpenuser(true);
  };

  const location = useLocation();
  const [pathName, setPathName] = useState(location.pathname);

  useEffect(() => {
    setPathName(location.pathname);
  }, [location.pathname]);

  const [isOpenmaster, setIsOpenmaster] = useState(false);
  const handleClickmaster = () => {
    setIsOpenmaster(true);
  };

  const handleReloadClick = () => {
    // Refresh the page
    window.location.reload();
  };

  useEffect(() => {
    getBalanceTotals();
  }, []);

  const getBalanceTotals = async () => {
    const islogin = isLoggedIn();
    if (islogin) {
      try {
        const response = await getAuthData('/user/get-overall-amountexposure');
        if (response?.status === 201 || response?.status === 200) {
          setIsTotals(response?.data?.data);
        }
      } catch (e) {
        console.error(e);
        return null;
      }
    }
  };
  return (
    <div className="bg-[#e9ebf0] ">
      <div className="flex">
        <div className=" flex items-center">
          {pathName === '/list/master_data' ? (
            <Link to="/list/master_list">
              <button className="h-8 w-40 border border-slate-400 rounded-md ml-11 text-sky-800 font-bold ">
                <button className="text-xs text-white bg-green-600  mx-2 rounded-sm p-px ">
                  SUPER
                </button>
                Admin
              </button>
            </Link>
          ) : (
            ''
          )}
        </div>

        <div className="w-full h-16 flex justify-end  items-center ">
          <div className="flex">
            {pathName === '/list/user_list' ? (
              <>
                <div
                  className="border border-slate-400 flex px-4 h-8 relative pt-2 mr-2 pb-2 rounded bg-white"
                  onClick={handleClick}
                >
                  <p className="text-xl text-gray-700 absolute  pt-[px] mx-2">
                    <HiUserPlus className="text-xl" />
                  </p>
                  <button
                    className="text-center text-xs font-semibold text-gray-700 ml-10"
                    onClick={handleClick}
                  >
                    Add User
                  </button>
                </div>
                <button
                  onClick={handleReloadClick}
                  className="p-1 bg-white border border-slate-400 rounded mr-8"
                >
                  <TbReload className="text-black" />
                </button>
              </>
            ) : (
              ''
            )}
            {pathName === '/list/master_list' ? (
              <>
                <div
                  className="border border-slate-400 flex w-36 h-8 relative pt-2 mr-4 pb-2 rounded bg-white"
                  onClick={handleClickmaster}
                >
                  <p className="text-xl text-gray-700 absolute ml-6 pt-[px]">
                    <HiUserPlus className="text-xl" />
                  </p>
                  <button className="text-center text-xs font-semibold text-gray-700  ml-[50px]">
                    Add Master
                  </button>
                </div>
                <button
                  onClick={handleReloadClick}
                  className="p-1 bg-white border border-slate-400 rounded mr-8"
                >
                  <TbReload className="text-black" />
                </button>
              </>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
      <div className=" md:mx-10 bg-slate-50  mx-2 text-xs font-semibold  text-bold-500 border border-slate-300 rounded-sm lg:flex md:grid-cols-1 md:grid-flow-row h-full   ">
        <div className="  mx-4 my-2 h-11 lg:border-r lg:w-48 md:w-full md:border-b lg:border-b-0">
          <h4 className="  mr-4 text-[#9b9b9b]">Net Exposure</h4>
          <span className=" text-sm text-[#243a48]">
            INR {numberWithCommas(Math.floor(isTotals?.totalExposure) || 0)}{' '}
          </span>
        </div>
        <div className="w-48 mx-4  my-2  lg:border-r lg:w-48 md:w-full md:border-b lg:border-b-0">
          <h4 className=" mr-4 text-[#9b9b9b]">Net Exposure</h4>
          <span className=" text-sm text-[#243a48]">
            INR {numberWithCommas(Math.floor(isTotals?.totalBalance) || 0)}
          </span>
        </div>
        <div className="w-48 mx-4  my-2  lg:border-r lg:w-48  md:w-full md:border-b lg:border-b-0">
          <h4 className=" mr-4 text-[#9b9b9b]">Balance Up</h4>
          <span className=" text-sm text-[#243a48]">
            INR {numberWithCommas(Math.floor(isTotals?.uplineBalance) || 0)}
          </span>
        </div>
        <div className="w-48 mx-4  my-2  lg:border-r lg:w-48  md:w-full md:border-b lg:border-b-0">
          <h4 className=" mr-4  text-[#9b9b9b]">Credit Limit</h4>
          <span className=" text-sm text-[#243a48]">
            {' '}
            INR{' '}
            {numberWithCommas(Math.floor(isTotals?.availableCreditAmount) || 0)}
          </span>
        </div>
        <div className="w-48 mx-4  my-2  lg:border-r lg:w-48  md:w-full md:border-b lg:border-b-0">
          <h4 className="  mr-4 text-[#9b9b9b]">Available Credit</h4>
          <span className=" text-sm text-[#243a48]">
            INR {numberWithCommas(Math.floor(isTotals?.availableBalance) || 0)}
          </span>
        </div>
      </div>
      <Outlet />
      <Addmaster
        isOpenmaster={isOpenmaster}
        handleClosemaster={() => {
          setIsOpenmaster(false);
        }}
      />
      <Adduser
        isOpenuser={isOpenuser}
        handleCloseuser={() => {
          setIsOpenuser(false);
        }}
      />
    </div>
  );
}

export default List;
