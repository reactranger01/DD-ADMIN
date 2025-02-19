import React from 'react';
import { RxCross2 } from 'react-icons/rx';
import PropTypes from 'prop-types';

function UpdateComison({ isOpenupdateCommission, UpdateCommissionClose }) {
  return (
    <div>
      <div
        className={
          isOpenupdateCommission
            ? 'fixed inset-0 bg-gray-500 bg-opacity-75 overflow-y-auto px-4 py-6 sm:px-0'
            : 'hidden'
        }
      >
        <div className="text-sm text-center h-4 rounded-t-md bg-[#071535] relative w-full max-w-md mx-auto shadow-md px-8 py-4 row  flex justify-between ">
          <h4 className="mt-[-0.5rem] text-sm font-bold">Update Commission</h4>
          <button className="mt-[-0.5rem]">
            <RxCross2 className="" onClick={UpdateCommissionClose} />
          </button>
        </div>
        <div className="relative w-full max-w-md mx-auto shadow-md rounded-b-lg bg-white px-4 py-4 ">
          <div className=" grid grid-cols-1 gap-1 text-slate-800">
            <label className="mx-2 text-sm">Commission </label>
            <input
              className="rounded-sm border border-gray-300 h-8 p-2 mx-2 my-2"
              placeholder="Commission"
            />
            <label className="mx-2 text-sm">Your Password </label>
            <input
              className="rounded-sm border border-gray-300 h-8 p-2 mx-2 my-2"
              placeholder="Your Password"
            />
          </div>
          <div className="flex flex-row-reverse gap-2 mt-4">
            <button className="bg-slate-400 text-slate-800 p-2 rounded-md">
              NO
            </button>
            <button className="bg-slate-500 p-2 rounded-md">Yes</button>
          </div>
        </div>
      </div>
    </div>
  );
}
UpdateComison.propTypes = {
  isOpenupdateCommission: PropTypes.bool.isRequired,
  UpdateCommissionClose: PropTypes.func.isRequired,
};

export default UpdateComison;
