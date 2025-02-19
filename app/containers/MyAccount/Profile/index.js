import React, { useEffect, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
// import { Link, NavLink } from 'react-router-dom';
// import { FaEye } from 'react-icons/fa';
import { BiSolidEdit } from 'react-icons/bi';
import ChangePassword from './Modal/ChangePassword';
import UpdateComison from './Modal/UpdateComison';
import ChangeMobile from './Modal/ChangeMobile';
import Exposure from './Modal/Exposure';
import { getAuthData, isLoggedIn } from '@/utils/apiHandlers';
// import UpdateCommission from './Modal/UpdateCommission';
function Profile() {
  const [isOpen, setIsOpen] = useState(false);
  // const handleClick = () => {
  //   setIsOpen(true);
  // };
  const handleClose = () => {
    setIsOpen(false);
  };
  const [isOpenrollcomision, setIsOpenrollcomision] = useState(false);
  // const handleClickrollcomision = () => {
  //   setIsOpenrollcomision(true);
  // };
  const handleCloserollcomision = () => {
    setIsOpenrollcomision(false);
  };
  const [isopenchangePass, setopenchnagePass] = useState(false);
  const hanadleChangePass = () => {
    setopenchnagePass(true);
  };
  const [isOpenupdateCommission, setOpenupdateCommission] = useState(false);

  const [changeMobileno, setChangeMobileno] = useState(false);
  const hanadleChangeMobileNo = () => {
    setChangeMobileno(true);
  };
  const [editExposure, setEditExposure] = useState(false);

  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    const islogin = isLoggedIn();
    if (islogin) {
      try {
        const response = await getAuthData('/user/get-user-details');
        if (response?.status === 201 || response?.status === 200) {
          setUserInfo(response?.data);
        } else {
          console.error('error');
        }
      } catch (e) {
        console.error(e);
        return null;
      }
    }
  };
  return (
    <div className=" bg-white border rounded-sm shadow-md">
      <div
        className={
          isOpenrollcomision
            ? 'fixed inset-0 bg-gray-500 bg-opacity-75 overflow-y-auto px-4 py-6 sm:px-0'
            : 'hidden'
        }
      >
        <div className="text-sm text-center h-4 rounded-t-lg bg-[#071535] relative w-full max-w-lg mx-auto shadow-md px-8 py-4 row  flex justify-between ">
          <h4 className="mt-[-0.5rem]">Agent Rooling Commission</h4>
          <button className="mt-[-0.5rem]">
            <RxCross2 className="" onClick={handleCloserollcomision} />
          </button>
        </div>
        <div className="relative w-full max-w-lg mx-auto shadow-md rounded-b-lg bg-white px-4 py-4 ">
          <div className=" grid grid-cols-1 gap-1 text-slate-800 text-sm">
            <div className=" border border-black p-2 mx-2">
              <h4 className="">Fancy 0</h4>
            </div>
            <div className="border border-black p-2 mx-2">Matka 0</div>
            <div className="border border-black p-2 mx-2">Casino 0</div>
            <div className="border border-black p-2 mx-2">Binary 0</div>
            <div className="border border-black p-2 mx-2">Sportbook 0</div>
            <div className="border border-black p-2 mx-2">Bookmaker 0</div>
          </div>
        </div>
      </div>
      <div
        className={
          isOpen
            ? 'fixed inset-0 bg-gray-500 bg-opacity-75 overflow-y-auto px-4 py-6 sm:px-0'
            : 'hidden'
        }
      >
        <div className="text-sm font-bold text-center h-4 rounded-t-lg bg-[#071535] relative w-full max-w-lg mx-auto shadow-md px-8 py-4 row  flex justify-between ">
          <button className="mt-[-0.5rem]">
            <RxCross2 className="" onClick={handleClose} />
          </button>
        </div>
        <div className="relative w-full max-w-lg mx-auto shadow-md rounded-b-lg bg-white px-8 py-4">
          <form>
            <div className="grid grid-cols-1 gap-3 text-gray-700 font-medium mb-2">
              <div className="grid grid-cols-5 ">
                <label
                  htmlFor="username"
                  className=" mb-2 col-start-1 col-end-1  rtl:text-right"
                >
                  Fancy
                </label>
                <input
                  type="text"
                  id="username"
                  className="shadow-sm rounded-md w-full px-3 py-1 h-9 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 col-start-2 col-end-5"
                />
              </div>
              <div className="grid grid-cols-5 ">
                <label
                  htmlFor="username"
                  className=" mb-2 col-start-1 col-end-1  rtl:text-right"
                >
                  Matka
                </label>
                <input
                  type="text"
                  id="username"
                  className="shadow-sm rounded-md w-full px-3 py-1 h-9 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 col-start-2 col-end-5"
                />
              </div>
              <div className="grid grid-cols-5 ">
                <label
                  htmlFor="username"
                  className=" mb-2 col-start-1 col-end-1  rtl:text-right"
                >
                  Casino
                </label>
                <input
                  type="text"
                  id="username"
                  className="shadow-sm rounded-md w-full px-3 py-1 h-9 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 col-start-2 col-end-5"
                />
              </div>
              <div className="grid grid-cols-5 ">
                <label
                  htmlFor="username"
                  className=" mb-2 col-start-1 col-end-1  rtl:text-right"
                >
                  Sportbook
                </label>
                <input
                  type="text"
                  id="username"
                  className="shadow-sm rounded-md w-full px-3 py-1 h-9 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 col-start-2 col-end-5"
                />
              </div>
              <div className="grid grid-cols-5 ">
                <label
                  htmlFor="username"
                  className=" mb-2 col-start-1 col-end-1  rtl:text-right"
                >
                  Bookmaker
                </label>
                <input
                  type="text"
                  id="username"
                  className="shadow-sm rounded-md w-full px-3 py-1 h-9 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 col-start-2 col-end-5"
                />
              </div>
              <div className="grid grid-cols-5 ">
                <label
                  htmlFor="username"
                  className=" mb-2 col-start-1 col-end-1  rtl:text-right"
                >
                  Virtual Sports
                </label>
                <input
                  type="text"
                  id="username"
                  className="shadow-sm rounded-md w-full px-3 py-1 h-9 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 col-start-2 col-end-5"
                />
              </div>
              <div className="grid grid-cols-5">
                <label
                  htmlFor="username"
                  className=" mb-2 col-start-1 col-end-1 rtl:text-right whitespace-no-wrap"
                >
                  Password
                </label>
                <input
                  type="text"
                  id="username"
                  className="shadow-sm rounded-md w-full px-3 py-1 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 col-start-2 col-end-5"
                />
              </div>
              <div className="grid grid-cols-5 gap-1 mt-8  text-white">
                <button className="bg-gray-700 w-20 h-8 rounded-md col-start-4 col-end-5">
                  Submit
                </button>
                <button
                  className="bg-slate-400 w-20 h-8  rounded-md  col-start-5 col-end-6"
                  onClick={handleClose}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="font-bold text-lg pb-2 bg-[#071535] w-full rounded-t-sm ">
        <h7 className="ml-2">Account Details </h7>
      </div>
      <div className="grid grid-cols-1 gap-1 border border-slate-300 font-bold text-xs text-black ">
        <div className="flex p-2 border-b border-slate-300">
          <div className="  mb-2  w-60">Name</div>
          <p className="">{userInfo?.username}</p>
        </div>

        <div className="flex p-2 border-b border-slate-300">
          <div className="  mb-2 w-60">Currency</div>
          <p>INR</p>
        </div>

        <div className="flex p-2 border-b border-slate-300">
          <div className="  mb-2 w-60">Partnership</div>
          <p>{userInfo?.ap}</p>
        </div>
        <div className="flex p-2 border-b border-slate-300">
          <div className="  mb-2 w-60">Mobile Number</div>
          <p>{userInfo?.phoneNumber}</p>
          <button>
            <BiSolidEdit
              className="h-4 w-4 btn-blu"
              onClick={hanadleChangeMobileNo}
            />
          </button>
        </div>
        <div className="flex p-2">
          <div className="  mb-2 w-60">Password</div>
          <p>●●●●●●</p>
          <button>
            <BiSolidEdit
              className="h-4 w-4 btn-blu"
              onClick={hanadleChangePass}
            />
          </button>
        </div>
      </div>
      <ChangePassword
        isopenchangePass={isopenchangePass}
        handleclosePass={() => {
          setopenchnagePass(false);
        }}
        data={userInfo}
      />
      <UpdateComison
        isOpenupdateCommission={isOpenupdateCommission}
        UpdateCommissionClose={() => {
          setOpenupdateCommission(false);
        }}
      />
      <ChangeMobile
        changeMobileno={changeMobileno}
        UpdatemobileClose={() => {
          setChangeMobileno(false);
        }}
        data={userInfo}
        refresher={getUserDetails}
      />
      <Exposure
        editExposure={editExposure}
        UpdateExxposureClose={() => {
          setEditExposure(false);
        }}
      />
    </div>
  );
}

export default Profile;
