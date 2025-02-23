/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { MdArrowDropDown } from 'react-icons/md';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { getAuthData, isLoggedIn, removeAuthCookie } from '@/utils/apiHandlers';
// import { MdMenu, MdClose } from 'react-icons/md';
const Navbar = () => {
  const location = useLocation();
  const password = localStorage.getItem('isPasswordChanged');
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    const islogin = isLoggedIn();
    if (islogin) {
      try {
        const response = await getAuthData('/user/get-user-details');
        if (response?.status === 403) {
          navigate('/login');
          Cookies.remove('__admin_user__isLoggedIn');
          Cookies.remove('test__admin_user__isLoggedIn');
          Cookies.remove('development__admin_user__isLoggedIn');
          removeAuthCookie();
          toast.error('Session expired');
          localStorage.removeItem('owner_id');
          localStorage.removeItem('owner_username');
          localStorage.removeItem('owner_path');
          localStorage.removeItem('owner_balance');
          localStorage.removeItem('isPasswordChanged');
          localStorage.removeItem('owner_type');
          localStorage.removeItem('owner_ap');
        }
        if (response?.status === 201 || response?.status === 200) {
          setUserInfo(response?.data);
          localStorage.setItem('owner_type', response?.data?.userType);
        } else {
          console.error('error');
        }
      } catch (e) {
        console.error(e);
        return null;
      }
    }
  };
  const navigate = useNavigate();

  const [menuHoverActive, setMenuHoverActive] = useState(false);
  const [reportHoverActive, setreportHoverActive] = useState(false);

  const [transactionHoverActive, setransactionHoverActive] = useState(false);
  const handleHoverOnMouseEnter = () => {
    setMenuHoverActive(true);
  };

  const handleHoverOnMouseLeave = () => {
    setMenuHoverActive(false);
  };

  const handleHoverOnreport = () => {
    setreportHoverActive(true);
  };

  const handleHoverreportLeave = () => {
    setreportHoverActive(false);
  };

  const handleHovertransaction = () => {
    setransactionHoverActive(true);
  };

  const handleHovertransactionLeve = () => {
    setransactionHoverActive(false);
  };
  const isLogin = isLoggedIn();
  useEffect(() => {
    if (!isLogin) {
      navigate('/login');
    }
  }, [isLogin, navigate]);

  // const [isMenuOpen, setIsMenuOpen] = useState(false);

  // const toggleMenu = () => {
  //   setIsMenuOpen(!isMenuOpen);
  // };

  return (
    <div className="  bg-[#071535]">
      {password !== 'false' && (
        <div className=" relative   text-xs w-full h-auto font-black text-slate-200 justify-self-start  items-center flex-wrap flex duration-300 ">
          <NavLink
            className={`px-3 border-r h-7 border-slate-500 flex justify-center items-center ${
              location.pathname === '/' ? 'text-[#f98903]' : ''
            }`}
            to="/"
          >
            <span className="hover:underline"> Dashboard</span>
          </NavLink>
          <NavLink
            className="px-3 border-r h-7 border-gray-500  flex justify-center items-center relative "
            onMouseEnter={handleHoverOnMouseEnter}
            onMouseLeave={handleHoverOnMouseLeave}
          >
            <span
              className={`hover:underline ${
                location.pathname === '/list/user_list' ||
                location.pathname === '/list/master_list' ||
                location.pathname.split('_')[0] === '/list/master'
                  ? 'text-[#f98903]'
                  : ''
              }`}
            >
              Downline List
            </span>
            {menuHoverActive ? (
              <ul
                className={`flex flex-col absolute top-7 left-0 bg-[#ffffff]  ${
                  userInfo?.userType === 'OWNER' ? 'h-20' : 'h-16'
                } content-center text-black  border-slate-700 w-40 z-10`}
              >
                <li className="p-2 text-left">
                  <Link className="hover:underline" to="/list/user_list">
                    User Downline List
                  </Link>
                </li>
                {userInfo?.userType === 'OWNER' && (
                  <li className="pt-1 pl-1 text-left">
                    <Link
                      className=" border-t  border-slate-700 p-1 hover:underline"
                      to="/list/master_list"
                    >
                      Master Downline List
                    </Link>
                  </li>
                )}
                <li className="p-2 text-left">
                  <Link className="hover:underline" to="/list/transfer_list">
                    Transfer
                  </Link>
                </li>
              </ul>
            ) : (
              ''
            )}
            <MdArrowDropDown className="text-2xl pl-[4px]" />
          </NavLink>
          <NavLink
            className={`px-3 border-r h-7 border-slate-500 flex justify-center items-center ${
              location.pathname === '/net-exposure' ||
              location.pathname === '/myaccount/account_statement' ||
              location.pathname === '/myaccount/activity_log'
                ? 'text-[#f98903]'
                : ''
            }`}
            to={'/net-exposure'}
          >
            <span className="hover:underline">Risk Management</span>
          </NavLink>
          <NavLink
            className={`px-3 border-r h-7 border-slate-500 flex justify-center items-center ${
              location.pathname === '/myaccount' ||
              location.pathname === '/myaccount/account_statement' ||
              location.pathname === '/myaccount/activity_log'
                ? 'text-[#f98903]'
                : ''
            }`}
            to={'/myaccount'}
          >
            <span className="hover:underline">My Account</span>
          </NavLink>
          <NavLink
            className="px-3 border-r h-7 border-gray-500  flex justify-center items-center relative "
            onMouseEnter={handleHoverOnreport}
            onMouseLeave={handleHoverreportLeave}
          >
            <span
              className={`hover:underline ${
                location.pathname === '/report/event_profit' ||
                location.pathname === '/report/downline_profit' ||
                location.pathname.split('_')[0] === '/report' ||
                // location.pathname.split('_')[0] === '/user' ||
                location.pathname.includes('plEvent')
                  ? 'text-[#f98903]'
                  : ''
              }`}
            >
              My Report
            </span>
            {reportHoverActive ? (
              <ul className="flex flex-col absolute top-7 left-0 bg-[#ffffff] content-center text-black  border-slate-700 w-40 z-10">
                <li className="pl-2 border-t text-left  border-slate-700 p-2">
                  <Link className="hover:underline" to="/report/event_profit">
                    Event Profit/Loss
                  </Link>
                </li>
                <li className="pl-2 border-t text-left  border-slate-700 p-2">
                  <Link
                    className=" hover:underline"
                    to="/report/downline_profit"
                  >
                    Downline Profit/Loss
                  </Link>
                </li>
              </ul>
            ) : (
              ''
            )}
            <MdArrowDropDown className="text-2xl pl-[4px]" />
          </NavLink>
          <NavLink
            className={`px-3 border-r h-7 border-slate-500 flex justify-center items-center ${
              location.pathname === '/bet_list' ? 'text-[#f98903]' : ''
            }`}
            to="/bet_list"
          >
            <span className="hover:underline">Bet List</span>
          </NavLink>
          {userInfo?.userType === 'OWNER' && (
            <NavLink
              className={`px-3 border-r h-7 border-slate-500 flex justify-center items-center ${
                location.pathname === '/events' ? 'text-[#f98903]' : ''
              }`}
              to="/events"
            >
              <span className="hover:underline">Events</span>
            </NavLink>
          )}

          <NavLink
            className={`px-3 border-r h-7 border-slate-500 flex justify-center items-center ${
              location.pathname === '/market_analysis' ? 'text-[#f98903]' : ''
            }`}
            to="/market_analysis"
          >
            <span className="hover:underline">Market Analysis</span>
          </NavLink>

          <NavLink
            className="px-3 border-r h-7 border-gray-500  flex justify-center items-center relative "
            onMouseEnter={handleHovertransaction}
            onMouseLeave={handleHovertransactionLeve}
          >
            <span
              className={`hover:underline ${
                location.pathname === '/deposit' ||
                location.pathname === '/withdrawal' ||
                location.pathname === '/account_and_qr'
                  ? 'text-[#f98903]'
                  : ''
              }`}
            >
              Transaction
            </span>
            {transactionHoverActive ? (
              <ul className="flex flex-col absolute top-7 left-0 bg-[#ffffff]  content-center text-black border border-slate-700 w-44 z-10">
                <li className="p-2 text-left ">
                  <Link className=" hover:underline" to="/deposit">
                    Deposit Request
                  </Link>
                </li>
                <li className="pl-2 border-t text-left  border-slate-700 p-2">
                  <Link className="hover:underline" to="/withdrawal">
                    Withdrawal Request
                  </Link>
                </li>
                {/* {loginUserType === 'OWNER' && (
                  <li className="pl-2 border-t text-left  border-slate-700 p-2">
                    <Link className="hover:underline" to="/kyc_details">
                      Kyc Request
                    </Link>
                  </li>
                )} */}
                <li className=" border-t text-left  border-slate-700 p-2">
                  <Link className="hover:underline" to="/account_and_qr">
                    Manage QR and Account
                  </Link>
                </li>
              </ul>
            ) : (
              ''
            )}
            <MdArrowDropDown className="text-2xl pl-[4px]" />
          </NavLink>
          {/* <NavLink
            className={`px-3 border-r h-7 border-slate-500 flex justify-center items-center ${
              location.pathname === '/commission' ? 'text-[#f98903]' : ''
            }`}
            to="/commission"
          >
            <span className="hover:underline">Commission</span>
          </NavLink> */}
          <NavLink
            className={`px-3 border-r h-7 border-slate-500 flex justify-center items-center ${
              location.pathname === '/password_history' ? 'text-[#f98903]' : ''
            }`}
            to="/password_history"
          >
            <span className="hover:underline">Password History</span>
          </NavLink>
          <NavLink
            className={`px-3 border-r border-slate-500 flex justify-center items-center ${
              location.pathname === '/restore_user' ? 'text-[#f98903]' : ''
            }`}
            to="/restore_user"
          >
            <span className="hover:underline">Restore User</span>
          </NavLink>
        </div>
      )}

      <div></div>
    </div>
  );
};

export default Navbar;
