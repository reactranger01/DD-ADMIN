import { init } from '@/redux/actions';
import { getAuthData, isLoggedIn, removeAuthCookie } from '@/utils/apiHandlers';
import { numberWithCommas } from '@/utils/numberWithCommas';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { TbReload } from 'react-icons/tb';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Header = () => {
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    getUserDetails();
  }, []);

  const handleLogout = () => {
    navigate('/login');
    Cookies.remove('__admin_user__isLoggedIn');
    Cookies.remove('test__admin_user__isLoggedIn');
    Cookies.remove('development__admin_user__isLoggedIn');
    removeAuthCookie();
    toast.success('Logged Out Successfully...');
    localStorage.removeItem('owner_id');
    localStorage.removeItem('owner_username');
    localStorage.removeItem('owner_path');
    localStorage.removeItem('owner_balance');
    localStorage.removeItem('isPasswordChanged');
    localStorage.removeItem('owner_type');
    localStorage.removeItem('owner_ap');
  };

  const getUserDetails = async () => {
    const islogin = isLoggedIn();
    if (islogin) {
      try {
        const response = await getAuthData('/user/get-user-details');
        if (response?.status === 201 || response?.status === 200) {
          setUserInfo(response?.data);
          localStorage.setItem('owner_id', response?.data?.id);
          localStorage.setItem('owner_username', response?.data?.username);
          localStorage.setItem('owner_path', response?.data?.path);
          localStorage.setItem('owner_balance', response?.data?.balance);
          localStorage.setItem('owner_ap', response?.data?.ap);
        } else {
          console.error('error');
        }
      } catch (e) {
        console.error(e);
        return null;
      }
    }
  };
  useEffect(() => {
    dispatch(init());
  }, [dispatch]);
  return (
    <>
      <div className="w-full h-20 flex justify-between items-center bg-[#040b1d]">
        <Link to={'/'} className="w-32 h-20 ml-5">
          <img
            className="w-full h-full object-contain"
            src="/images/yoloLogo.webp"
          />
        </Link>
        <div className="flex items-center  mx-2 md:mx-10 text-white">
          <p className="text-sm font-bold bg-[#332e2e] px-[4px] py-[2px] mr-2 rounded hidden md:block">
            {userInfo?.userType + ' - ' + userInfo?.username}
          </p>
          <p className="font-font-semibold mr-4"></p>
          <p className="text-sm font-semibold mr-2">
            {/* <span>INR</span> */}
            {numberWithCommas(userInfo?.balance || 0)}
          </p>
          <button
            onClick={getUserDetails}
            className="p-[2px] bg-[#332e2e] rounded"
          >
            <TbReload className="font-bold p-[3px] text-2xl" />
          </button>
          <div
            className="px-3 border-r h-7 text-12 md:text-16 border-slate-500 flex justify-center items-center"
            onClick={handleLogout}
          >
            <span className="hover:underline">Logout</span>
            <RiLogoutBoxRLine />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
