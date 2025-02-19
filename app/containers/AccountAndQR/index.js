import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const AccountAndQR = () => {
  const location = useLocation();
  return (
    <div className="">
      <div className=" rounded-md border border-gray-400 w-80 h-16  flex justify-evenly  text-center  mx-8 my-1 items-center">
        <Link to="/account_and_qr">
          <button
            className={`w-36 h-10  rounded-md p-1  ${
              location.pathname === '/account_and_qr'
                ? 'bg-[#071535]'
                : 'bg-white text-[#071535] border-[1px] border-[#071535]'
            }`}
          >
            Manage QR
          </button>
        </Link>

        <Link to="/account_and_qr/manage_account">
          <button
            className={`w-36 h-10  rounded-md p-1  ${
              location.pathname === '/account_and_qr/manage_account'
                ? 'bg-[#071535]'
                : 'bg-white text-[#071535] border-[1px] border-[#071535]'
            }`}
          >
            Manage Account
          </button>
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default AccountAndQR;
