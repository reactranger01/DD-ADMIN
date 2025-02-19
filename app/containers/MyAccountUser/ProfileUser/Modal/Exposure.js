import React, { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import PropTypes from 'prop-types';
import { FiEye, FiEyeOff } from 'react-icons/fi';
function Exposure({ editExposure, UpdateExxposureClose }) {
  const [showPassword, setShowPassword] = useState(false);
  const toggleVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div>
      <div
        className={
          editExposure
            ? 'fixed inset-0 bg-gray-500 bg-opacity-75 overflow-y-auto px-4 py-6 sm:px-0'
            : 'hidden'
        }
      >
        <div className="text-sm text-center h-4 rounded-t-md bg-[#071535] relative w-full max-w-lg mx-auto shadow-md px-8 py-4 row  flex justify-between ">
          <h4 className="mt-[-0.5rem] text-sm font-bold">
            Edit Exposure Limit - aakashkishan
          </h4>
          <button className="mt-[-0.5rem]">
            <RxCross2 className="" onClick={UpdateExxposureClose} />
          </button>
        </div>
        <div className="relative w-full max-w-lg mx-auto shadow-md rounded-b-lg bg-white px-4 py-4 ">
          <div className=" grid grid-cols-1 gap-4 text-slate-800">
            <div className="grid grid-cols-5 ">
              <label
                htmlFor="username"
                className=" mb-2 col-start-1 col-end-1  rtl:text-right text-sm"
              >
                Current
              </label>
              <h4>500</h4>
            </div>
            <div className="grid grid-cols-5 ">
              <label
                htmlFor="username"
                className=" mb-2 col-start-1 col-end-1 text-sm rtl:text-right"
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
                className=" mb-2 col-start-1 col-end-1  text-sm rtl:text-right"
              >
                Password
              </label>
              <div className="relative col-start-2 col-end-5">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="username"
                  className="shadow-sm rounded-md w-full px-3 py-1 h-9 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 col-start-2 col-end-5"
                />
                <button
                  type="button"
                  onClick={toggleVisibility}
                  className="absolute inset-y-0 right-0 mr-8 py-2 bg-transparent border-none text-gray-500"
                >
                  {showPassword ? (
                    <FiEye className="btn-blu" />
                  ) : (
                    <FiEyeOff className="btn-blu" />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-row-reverse gap-2 mt-4 text-sm font-bold">
            <button className="bg-slate-300 text-slate-800 p-2 rounded-md">
              Submit
            </button>
            <button className="bg-slate-700 p-2 rounded-md">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}
Exposure.propTypes = {
  editExposure: PropTypes.bool.isRequired,
  UpdateExxposureClose: PropTypes.func.isRequired,
};

export default Exposure;
