import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
function MyAccount() {
  const location = useLocation();
  const linkData = [
    {
      path: '/myaccount',
      title: 'My Profile',
    },
    {
      path: '/myaccount/account_statement',
      title: 'Account Statement',
    },
    {
      path: '/myaccount/activity_log',
      title: 'Activity Log',
    },
  ];
  return (
    <div className=" mx-auto px-4 py-4">
      <div className="flex flex-col  lg:flex-row lg:space-x-5  ">
        <div className="w-full md:w-1/4 lg:h-2/5 bg-white rounded-lg  mb-8 text-sm">
          <div className="font-bold text-lg p-1 bg-[#071535] w-full">
            <h4 className=""> My Account</h4>
          </div>
          <ul className="list-none font-solid text-sm text-black">
            {linkData.map((items, index) => {
              return (
                <NavLink key={index} to={items.path}>
                  {' '}
                  <li
                    className={`hover:bg-gray-200   p-1 cursor-pointer border border-slate-200 ${
                      location.pathname === items.path ? 'bg-gray-200 ' : ''
                    } `}
                  >
                    {items.title}
                  </li>
                </NavLink>
              );
            })}
          </ul>
        </div>
        <div className="lg:w-3/4  ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MyAccount;
