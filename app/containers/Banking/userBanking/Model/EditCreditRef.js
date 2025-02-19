import React from 'react';
import PropTypes from 'prop-types';
import { RxCross2 } from 'react-icons/rx';
const EditCreditRef = ({ isOpenCreditref, handleCloseCreditref }) => {
  return (
    <div
      className={
        isOpenCreditref
          ? 'fixed inset-0 bg-gray-500 bg-opacity-75 overflow-y-auto px-4 py-6 sm:px-0'
          : 'hidden'
      }
    >
      <div className="text-sm text-center h-4 rounded-t-md bg-[#071535] relative w-full max-w-lg mx-auto shadow-md px-8 py-4 row  flex justify-between  text-white">
        <h4 className="mt-[-0.5rem] text-sm font-bold">
          Edit Credit Reference - vpninno
        </h4>
        <button className=" flex-none">
          <RxCross2
            className="h-4 w-4 mt-[-0.5rem]   "
            onClick={handleCloseCreditref}
          />
        </button>
      </div>
      <div className="relative w-full max-w-lg mx-auto shadow-md rounded-b-lg bg-white px-4 py-4 ">
        <div className="grid grid-cols-1 gap-3 my-4">
          <div className="text-gray-700 grid grid-cols-5">
            <label
              htmlFor="username"
              className="text-gray-700 font-medium mb-2 col-start-1 col-span-2  rtl:text-right"
            >
              Current
            </label>
            <p className="col-start-2 col-end-5  ">500</p>
          </div>
          <div className="grid grid-cols-5">
            <label
              htmlFor="username"
              className="text-gray-700 font-medium mb-2 col-start-1 col-span-2  rtl:text-right"
            >
              New
            </label>
            <input
              type="text"
              id="username"
              className="shadow-sm rounded-md w-full h-10 px-3 py-1 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 col-start-2 col-end-5 "
            />
          </div>
          <div className="grid grid-cols-5">
            <label
              htmlFor="username"
              className="text-gray-700 font-medium mb-2 col-start-1 col-span-2  rtl:text-right"
            >
              Password
            </label>
            <input
              type="text"
              id="username"
              className="shadow-sm rounded-md w-full px-3 h-10 py-1 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 col-start-2 col-end-5 "
            />
          </div>
          <div className="flex flex-row-reverse gap-2">
            <button className="bg-slate-200 p-2 rounded-md text-gray-700">
              Cancel
            </button>
            <button className="bg-slate-700 p-2  rounded-md">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};
EditCreditRef.propTypes = {
  isOpenCreditref: PropTypes.bool.isRequired,
  handleCloseCreditref: PropTypes.func.isRequired,
};
export default EditCreditRef;
