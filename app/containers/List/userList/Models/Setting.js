/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import PropTypes from 'prop-types';
import { FaLock, FaRegCheckCircle } from 'react-icons/fa';
import { AiOutlineStop } from 'react-icons/ai';
import { postAuthData } from '@/utils/apiHandlers';
import { toast } from 'react-toastify';
import { isYupError, parseYupError } from '@/utils/Yup';
import { statusChangeValidation } from '@/utils/validation';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const Setting = ({ isOpensetting, handleClosesetting, data, setReftech }) => {
  console.log(data, setReftech, 'Setting');
  const [lock, setLock] = useState(null);
  const [betLock, setBetLock] = useState(null);
  const [selectValue, setselectValue] = useState('');
  const [selectStatus, setSelecStatus] = useState({
    betLock: null,
    userLock: null,
    transactionCode: '',
  });
  const [formError, setFormError] = useState({
    transactionCode: '',
    betLock: null,
    userLock: null,
  });
  useEffect(() => {
    if (data?.id && betLock !== null && lock !== null) {
      setSelecStatus({
        ...selectStatus,
        uid: data?.id,
        userLock: lock,
        betLock: betLock,
      });
    }
  }, [data?.id, lock, betLock]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setFormError({});
      await statusChangeValidation.validate(selectStatus, {
        abortEarly: false,
      });
      const response = await postAuthData('/user/locks', selectStatus);
      if (response?.status === 200) {
        toast.success('Status Change Successfully');
        setReftech((pre) => !pre);
        handleClosesetting();
        setSelecStatus({
          transactionCode: '',
        });
      } else {
        toast.error(response?.data || 'Something went wrong');
      }
    } catch (error) {
      if (isYupError(error)) {
        setFormError(parseYupError(error));
      } else {
        toast.error(error?.message || 'Unauthorised');
      }
    }
  };
  const [showPassword, setShowPassword] = useState(false);
  const toggleVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div
      className={
        isOpensetting
          ? 'fixed inset-0 bg-gray-500 bg-opacity-75 overflow-y-auto px-4 py-6 sm:px-0 z-10'
          : 'hidden'
      }
    >
      <div className="text-sm text-white font-bold text-center h-4 rounded-t-lg bg-[#071535] relative w-full max-w-lg mx-auto shadow-md px-8 py-4 row flex">
        <h4 className="mt-[-0.5rem] grow text-left">Change Status</h4>
        <button className=" flex-none">
          <RxCross2
            className="h-4 w-4 mt-[-0.5rem]   "
            onClick={handleClosesetting}
          />
        </button>
      </div>
      <div className="relative  w-full max-w-lg mx-auto shadow-md rounded-b-lg bg-white px-8 py-4 mb-4">
        <div className="grid grid-cols-6 gap-1 mb-8">
          <h4 className="text-slate-950 text-sm font-normal col-start-1 col-end-3">
            <button className="bg-green-300 p-0.5 text-white rounded ">
              {data.userType}
            </button>{' '}
            {data.username}
          </h4>
          <button
            className={`${
              data?.lock === false && data?.betLock === false
                ? 'bg-green-100 text-green-700'
                : (data?.lock === true && data?.betLock === false) ||
                  (data?.lock === true && data?.betLock === true)
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-red-100 text-red-700'
            }  rounded-md col-start-6 col-end-7 `}
          >
            {data?.lock === false && data?.betLock === false
              ? 'Active'
              : (data?.lock === true && data?.betLock === false) ||
                (data?.lock === true && data?.betLock === true)
              ? 'Locked'
              : 'Suspended'}
          </button>
        </div>
        {/* <div className="grid grid-cols-3 gap-3 my-8">
          <button className="text-center font-bold w-32 h-14 rounded-md border border-green-300 text-green-300  hover:bg-slate-100">
            <FaRegCheckCircle className="mx-12 w-6 h-6 my-1" />
            <h2 className="">Active</h2>
          </button>
          <button className="text-center font-bold w-32 h-14 rounded-md border border-red-300 text-red-300  hover:bg-slate-100">
            <AiOutlineStop className="mx-12 w-6 h-6 my-1" />
            <h2 className="">Suspend</h2>
          </button>
          <button className=" text-slate-300 font-bold text-center w-32 h-14 rounded-md border border-slate-300  hover:bg-slate-100">
            <FaLock className="mx-12 w-6 h-6 my-1" />
            <h2 className="">Locked</h2>
          </button>
        </div> */}
        {selectValue && (
          <div
          // className={`${
          //   selectValue === 'Suspend Selected'
          //     ? 'text-center'
          //     : selectValue === 'Locked Selected'
          //     ? 'text-end'
          //     : ''
          // }`}
          >
            {selectValue}
          </div>
        )}
        <div className="grid grid-cols-3 gap-3 ">
          <button
            onClick={() => {
              setLock(false);
              setBetLock(false);
              setselectValue('Active Selected');
            }}
            className="text-center font-bold w-32 h-14 rounded-md border border-green-700 text-green-700  hover:bg-slate-100"
          >
            <FaRegCheckCircle className="mx-12 w-6 h-6 my-1" />
            <h2 className="">Active</h2>
          </button>
          <button
            onClick={() => {
              setLock(false);
              setBetLock(true);
              setselectValue('Suspend Selected');
            }}
            className="text-center font-bold w-32 h-14 rounded-md border border-red-700 text-red-700  hover:bg-slate-100"
          >
            <AiOutlineStop className="mx-12 w-6 h-6 my-1" />
            <h2 className="">Suspend</h2>
          </button>
          <button
            onClick={() => {
              setLock(true);
              setBetLock(true);
              setselectValue('Locked Selected');
            }}
            className=" text-slate-700 font-bold text-center w-32 h-14 rounded-md border border-slate-700  hover:bg-slate-100"
          >
            <FaLock className="mx-12 w-6 h-6 my-1" />
            <h2 className="">Locked</h2>
          </button>
        </div>
        {formError.betLock && formError.userLock && (
          <div className="text-14  text-red-700">
            Please Select Any One Status
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 mt-8">
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              className=" border border-slate-300 h-8 rounded-md p-2"
              name="transactionCode"
              value={selectStatus?.transactionCode}
              onChange={(event) =>
                setSelecStatus({
                  ...selectStatus,
                  transactionCode: event.target.value,
                })
              }
              placeholder="Password"
            />
            <button
              type="button"
              onClick={toggleVisibility}
              className="absolute mt-1.5 right-5 px-3  bg-transparent border-none text-gray-500"
            >
              {showPassword ? (
                <FiEye className="btn-blu" />
              ) : (
                <FiEyeOff className="btn-blu" />
              )}
            </button>
            {formError.transactionCode && (
              <div className="text-14 text-red-700">
                {formError.transactionCode}
              </div>
            )}
          </div>

          <button
            className=" text-white text-center h-8 rounded-md border bg-slate-700"
            onClick={handleSubmit}
          >
            Change
          </button>
        </div>
      </div>
    </div>
  );
};
Setting.propTypes = {
  isOpensetting: PropTypes.bool.isRequired,
  handleClosesetting: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  setReftech: PropTypes.func.isRequired,
};
export default Setting;
