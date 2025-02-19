import React from 'react';
import { RxCross2 } from 'react-icons/rx';
import PropTypes from 'prop-types';
function Adduser({ isOpen, handleClose }) {
  return (
    <div
      className={
        isOpen
          ? 'fixed inset-0 bg-gray-500 bg-opacity-75 overflow-y-auto px-4 py-6 sm:px-0'
          : 'hidden'
      }
    >
      <div className="text-sm font-bold text-center h-4 rounded-t-lg bg-blue-400relative w-full max-w-lg mx-auto shadow-md px-8 py-4 row  flex justify-between ">
        <h4 className="mt-[-0.5rem]">Rolling Commission -k9hem8</h4>
        <button className="mt-[-0.5rem]">
          <RxCross2 className="" onClick={handleClose} />
        </button>
      </div>
      <div className="relative w-full max-w-lg mx-auto shadow-md rounded-b-lg bg-white px-4 py-4">
        <div className="grid grid-cols-1 gap-3 text-gray-700 font-medium mb-2">
          <div className="grid grid-cols-5 ">
            <label
              htmlFor="username"
              className=" mb-2 col-start-1 col-end-1  rtl:text-right"
            >
              Current
            </label>
            <h4>15</h4>
          </div>
          <div className="grid grid-cols-5 ">
            <label
              htmlFor="username"
              className=" mb-2 col-start-1 col-end-1  rtl:text-right"
            >
              New
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
              Password
            </label>
            <input
              type="text"
              id="username"
              className="shadow-sm rounded-md w-full px-3 py-1 h-9 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 col-start-2 col-end-5"
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
      </div>
    </div>
  );
}

Adduser.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
export default Adduser;
