import React from 'react';
import { NavLink, Outlet, useLocation, useParams } from 'react-router-dom';
function MyAccountMaster() {
  const location = useLocation();
  const { id } = useParams();
  const linkData = [
    {
      path: `/master_account/${id}`,
      title: 'My Profile',
    },
    {
      path: `/master_account/${id}/account_statement`,
      title: 'Account Statement',
    },
    {
      path: `/master_account/${id}/activity_log`,
      title: 'Activity Log',
    },
  ];
  return (
    <div className=" mx-auto px-4 py-4">
      <div className="flex flex-col md:flex-row md:space-x-5  ">
        <div className="w-full md:w-1/4  bg-white rounded-md  mb-8 text-sm">
          <div className="font-bold text-lg p-1 bg-[#071535]  w-full rounded-t-md">
            <h4 className="mx-2"> My Account</h4>
          </div>
          <ul className="list-none font-solid text-sm text-black">
            {linkData.map((items, index) => {
              return (
                <NavLink key={index} to={items.path}>
                  {' '}
                  <li
                    className={`hover:bg-gray-200   p-1 pl-2 cursor-pointer border border-slate-200 ${
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
        <div className="w-full md:w-3/4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MyAccountMaster;
