/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { TbReload } from 'react-icons/tb';
import { HiUserPlus } from 'react-icons/hi2';
// import { RxCross2 } from 'react-icons/rx';
import Addmaster from './masterList/Addmaster';
import { Adduser } from './userList/Adduser';
import { RxCross2 } from 'react-icons/rx';
function List() {
  const [isOpenuser, setIsOpenuser] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [pathName, setPathName] = useState(location.pathname);
  const [isOpenmaster, setIsOpenmaster] = useState(false);

  useEffect(() => {
    setPathName(location.pathname);
  }, [location.pathname]);
  const handleClick = () => {
    setIsOpen(true);
  };

  const [form, setForm] = useState({});

  const [formError, setFormError] = useState({});
  const handleChange = (e) => {
    let { name, value } = e.target;
    setForm((prevCredential) => ({
      ...prevCredential,
      [name]: value,
    }));
    setFormError((prevFormError) => ({
      ...prevFormError,
      [name]: '',
    }));
  };

  const handleClickmaster = () => {
    setIsOpenmaster(true);
  };

  const [istoggleopenagent, setoggleOpenagent] = useState(false);
  const toggleButtonagent = () => {
    setoggleOpenagent(!istoggleopenagent);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <div className="bg-[#e9ebf0] pb-[10px]">
      <div
        className={
          isOpen
            ? 'fixed inset-0 bg-gray-500 bg-opacity-75 overflow-y-auto px-4 py-6 sm:px-0  font-semibold text-gray-700 z-10'
            : 'hidden'
        }
      >
        <div className="text-sm font-bold text-center h-4 rounded-t-lg  bg-blue-400 relative w-full max-w-lg mx-auto shadow-md px-8 py-4 row  grid grid-cols-6">
          <h4 className="mt-[-0.5rem] w-16  col-start-1 col-end-1 ">
            Add User
          </h4>
          <button className="col-start-6 col-end-7 ">
            <RxCross2
              className="h-4 w-4 ml-20 mt-[-0.5rem]"
              onClick={handleClose}
            />
          </button>
        </div>
        <div className="relative w-full max-w-lg mx-auto shadow-md rounded-b-lg bg-white px-8 py-4">
          <form onSubmit={handleClick}>
            <div className="grid grid-cols-1 gap-1 font-black text-gray-700 text-sm">
              <div className="grid grid-cols-5">
                <label
                  htmlFor="username"
                  className="text-gray-700 font-medium mb-2 col-start-1 col-spen-2  rtl:text-right"
                >
                  Username*
                </label>
                <input
                  placeholder="Username"
                  type="text"
                  name="username"
                  onChange={handleChange}
                  id="username"
                  className="shadow-sm rounded-md w-full px-3 py-1 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 col-start-3 col-span-5 "
                />
              </div>
              <div className="grid grid-cols-5">
                <label
                  htmlFor="username"
                  className="text-gray-700 font-medium mb-2 col-start-1 col-span-2 rtl:text-right whitespace-no-wrap"
                >
                  Name*
                </label>
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  onChange={handleChange}
                  className="shadow-sm rounded-md w-full px-3 py-1 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 col-start-3 col-span-3"
                />
              </div>
              <div className="grid grid-cols-5">
                <label
                  htmlFor="username"
                  className="text-gray-700 font-medium mb-2 col-start-1 col-span-2 rtl:text-right whitespace-no-wrap"
                >
                  Commission(%)*
                </label>
                <input
                  type="text"
                  id="ap"
                  name="ap"
                  onChange={handleChange}
                  className="shadow-sm rounded-md w-full px-3 py-1 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 col-start-3 col-span-3"
                />
              </div>
              <div className="grid grid-cols-5">
                <label
                  htmlFor="username"
                  className="text-gray-700 font-medium mb-2 col-start-1 col-span-2 rtl:text-right whitespace-no-wrap"
                >
                  Opening Balance*
                </label>
                <input
                  type="text"
                  id="creditAmount"
                  name="creditAmount"
                  onChange={handleChange}
                  className="shadow-sm rounded-md w-full px-3 py-1 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 col-start-3 col-span-3"
                />
              </div>
              {/* <div className="grid grid-cols-5">
                <label
                  htmlFor="username"
                  className="text-gray-700 font-medium mb-2 col-start-1 col-span-2 rtl:text-right whitespace-no-wrap"
                >
                  Exposure Limit*
                </label>
                <input
                  type="text"
                  id="username"
                  className="shadow-sm rounded-md w-full px-3 py-1 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 col-start-3 col-span-3"
                />
              </div> */}

              {/* <div className="grid grid-cols-5">
                <label
                  htmlFor="username"
                  className="text-gray-700 font-medium mb-2 col-start-1 col-span-2 rtl:text-right whitespace-no-wrap"
                >
                  Credit Reference *
                </label>
                <input
                  type="text"
                  id="username"
                  className="shadow-sm rounded-md w-full px-3 py-1 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 col-start-3 col-span-3"
                />
              </div> */}
              <div className="grid grid-cols-5">
                <label
                  htmlFor="phoneNumber"
                  className="text-gray-700 font-medium mb-2 col-start-1 col-span-2 rtl:text-right whitespace-no-wrap"
                >
                  Mobile Number *
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  onChange={handleChange}
                  className="shadow-sm rounded-md w-full px-3 py-1 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 col-start-3 col-span-3"
                />
              </div>
              <div className="grid grid-cols-5">
                <label
                  htmlFor="city"
                  className="text-gray-700 font-medium mb-2 col-start-1 col-span-2 rtl:text-right whitespace-no-wrap"
                >
                  City *
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  onChange={handleChange}
                  className="shadow-sm rounded-md w-full px-3 py-1 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 col-start-3 col-span-3"
                />
              </div>
              <div className="grid grid-cols-5">
                <label
                  htmlFor="password"
                  className="text-gray-700 font-medium mb-2 col-start-1 col-span-2 rtl:text-right whitespace-no-wrap"
                >
                  Password *
                </label>
                <input
                  type="text"
                  id="password"
                  name="password"
                  onChange={handleChange}
                  className="shadow-sm rounded-md w-full px-3 py-1 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 col-start-3 col-span-3"
                />
              </div>
              <div className="grid grid-cols-5">
                <label
                  htmlFor="confirmPassword"
                  className="text-gray-700 font-medium mb-2 col-start-1 col-span-2 rtl:text-right whitespace-no-wrap"
                >
                  Confirm Password*
                </label>
                <input
                  type="text"
                  id="confirmPassword"
                  name="confirmPassword"
                  onChange={handleChange}
                  className="shadow-sm rounded-md w-full px-3 py-1 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 col-start-3 col-span-3"
                />
              </div>
              {/* <div className="grid grid-cols-5 mb-8">
                <label
                  htmlFor="username"
                  className="text-gray-700 font-medium mb-2 col-start-1 col-span-2 rtl:text-right whitespace-no-wrap"
                >
                  Rolling Commission*
                </label>
                <input
                  type="text"
                  id="username"
                  className="shadow-sm rounded-md w-full px-3 py-1 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 col-start-3 col-end-3"
                />
              </div> */}
              <div className="grid grid-cols-5 mt-5">
                <label
                  htmlFor="transactionCode"
                  className="text-gray-700 font-medium mb-2 col-start-1 col-span-2 rtl:text-right whitespace-no-wrap"
                >
                  Master Password <span className="!text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="transactionCode"
                  name="transactionCode"
                  onChange={handleChange}
                  className="shadow-sm rounded-md w-full px-3 py-1 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 col-start-3 col-span-3"
                />
              </div>
              <button className="bg-slate-500 w-36 h-8 ml-40 my-2 rounded-md ">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="w-full h-16 flex justify-end items-center">
        <div className="flex    ">
          {pathName === '/list/user_list' ? (
            <div
              className="border border-slate-400 flex w-36 h-8 relative pt-2 mr-4 pb-2 rounded bg-white"
              onClick={handleClick}
            >
              <p className="text-xl text-gray-700 absolute ml-6 pt-[px]">
                <HiUserPlus className="text-xl" />
              </p>
              <button
                className="text-center text-xs font-semibold text-gray-700  ml-[50px]"
                onClick={handleClick}
              >
                Add User
              </button>
            </div>
          ) : (
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
          )}

          <button className="p-1 bg-white border border-slate-400 rounded mr-8">
            {/* <TbReload className="font-bold p-[4px] text-3xl" /> */}
            <TbReload className="text-black" />
          </button>
        </div>
      </div>
      <div className="mx-2 md:mx-10 bg-slate-50  h-14    rounded-sm flex text-bold-500 border border-slate-300 ">
        <div className="w-40 mx-4 h-11 border-r ">
          <h4 className="text-sm font-semibold mr-4 text-[#9b9b9b]">
            Total Balance
          </h4>
          <spen className="text-sm font-semibold text-[#243a48]">
            INR 1,559,710
          </spen>
        </div>
        <div className="w-40 mx-4 border-r">
          <h4 className="text-sm font-semibold mr-4 text-[#9b9b9b]">
            Total Exposure
          </h4>
          <spen className="text-sm font-semibold text-[#243a48]">
            INR (300)
          </spen>
        </div>
        <div className="w-40 mx-4 border-r">
          <h4 className="text-sm font-semibold mr-4 text-[#9b9b9b]">
            Available Balance
          </h4>
          <spen className="text-sm font-semibold text-[#243a48]">
            INR 1,559,409.74
          </spen>
        </div>
        <div className="w-40 mx-4 border-r">
          <h4 className="text-sm font-semibold mr-4  text-[#9b9b9b]">
            Balance
          </h4>
          <spen className="text-sm font-semibold text-[#243a48]">
            INR 859,295
          </spen>
        </div>
        <div className="w-40 mx-4 border-r">
          <h4 className="text-sm font-semibold  mr-4 text-[#9b9b9b]">
            Total Avail. bal.
          </h4>
          <spen className="text-sm font-semibold text-[#243a48]">
            INR 2,419,005
          </spen>
        </div>
        <div className="w-40 mx-4 border-r mr-8">
          <h4 className="text-sm font-semibold  text-[#9b9b9b]">Upline P/L</h4>
          <spen className="text-sm font-semibold text-[#243a48]">
            INR -1,580,995.26
          </spen>
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
