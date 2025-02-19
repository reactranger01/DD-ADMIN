import React, { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
const Edit = ({ isOpenedit, handleCloseedit, data, setReftech }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div
      className={
        isOpenedit
          ? 'fixed inset-0 bg-gray-500 bg-opacity-75 overflow-y-auto px-4 py-6 sm:px-0 z-10'
          : 'hidden'
      }
    >
      <div className="text-sm text-white font-bold text-center h-4 rounded-t-lg bg-[#071535] relative w-full max-w-lg mx-auto shadow-md px-8 py-4 row flex">
        <h4 className="mt-[-0.5rem] grow text-left">
          Edit Exposure Limit - aakashkishan
        </h4>
        <button className=" flex-none">
          <RxCross2
            className="h-4 w-4 mt-[-0.5rem]   "
            onClick={handleCloseedit}
          />
        </button>
      </div>
      <div className="relative w-full max-w-lg mx-auto shadow-md rounded-b-lg bg-white px-8 py-4">
        <div className="grid grid-cols-1 gap-4 text-gray-700 font-medium mb-2">
          <div className="grid grid-cols-5  ">
            <label
              htmlFor="username"
              className=" mb-2 col-start-1 col-end-1  rtl:text-right"
            >
              Current
            </label>
            <h4 className=""> 500</h4>
          </div>
          <div className="grid grid-cols-5 ">
            <label
              htmlFor="username"
              className=" mb-2 col-start-1 col-end-1  rtl:text-right"
            >
              New
            </label>
            <input
              placeholder="Username"
              type="text"
              id="username"
              className="shadow-sm rounded-md w-full px-3 py-1 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 col-start-2 col-end-5"
            />
          </div>

          <div className="grid grid-cols-5">
            <label
              htmlFor="username"
              className=" mb-2 col-start-1 col-end-1 rtl:text-right whitespace-no-wrap"
            >
              Password
            </label>
            <div className="shadow-sm rounded-md w-full px-3 py-1 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 col-start-2 col-end-5 flex flex-row-reverse">
              {' '}
              <button onClick={togglePasswordVisibility}>
                <FontAwesomeIcon
                  className="btn-blu"
                  icon={showPassword ? faEyeSlash : faEye}
                />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-1 mt-6  text-white">
            <button className="bg-gray-600 w-20 h-8 my-2 rounded-md col-start-4 col-end-5">
              Submit
            </button>
            <button className="bg-slate-300 w-20 h-8 my-2  rounded-md  col-start-5 col-end-6">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
Edit.propTypes = {
  isOpenedit: PropTypes.bool.isRequired,
  handleCloseedit: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  setReftech: PropTypes.func.isRequired,
};
export default Edit;
