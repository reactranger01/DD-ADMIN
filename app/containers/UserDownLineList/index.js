import React from 'react';
import { TbReload } from 'react-icons/tb';
import { HiUserPlus } from 'react-icons/hi2';
import DownlistHeader from '@/components/DownlistHeader';
import UserTable from '@/components/UserTable';
const UserdownLineList = () => {
  return (
    <div className="bg-[#e9ebf0] min-h-screen">
      {/* add user  */}
      <div className="w-full h-10 flex justify-end items-center mt-8">
        <div className="border border-slate-400 flex w-36 h-10 relative pt-2 mr-4 pb-2 rounded bg-white">
          <p className="text-xl text-gray-700 absolute ml-6 pt-[px]">
            <HiUserPlus className="text-xl" />
          </p>
          <button className="text-center text-[15px] font-semibold text-gray-700 ml-[50px]">
            Add User
          </button>
        </div>
        <button className="p-[3px] bg-white border border-slate-400 rounded mr-8">
          <TbReload className="font-bold p-[4px] text-3xl" />
        </button>
      </div>
      <DownlistHeader />
      <UserTable />
    </div>
  );
};

export default UserdownLineList;
