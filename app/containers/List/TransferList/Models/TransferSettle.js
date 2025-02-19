import React, { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { isYupError, parseYupError } from '@/utils/Yup';
import { postAuthData } from '@/utils/apiHandlers';
import { settelementValidation } from '@/utils/validation';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const TransferSettle = ({ isOpen, handleClose, data, setReftech, type }) => {
  const [form, setForm] = useState({});
  const [formError, setFormError] = useState({});
  const [isLoadingD, setIsLoadingD] = useState(false);
  const settlementData = {
    userid: Number(data),
    remark: form.remark,
    transactionCode: form?.transactionCode,
    amount: form?.amount,
    type: type,
  };
  const handleDepositSubmit = async (e) => {
    e.preventDefault();
    setIsLoadingD(true);
    try {
      setFormError({});
      await settelementValidation.validate(form, {
        abortEarly: false,
      });
      const response = await postAuthData(
        '/user/particuler-user-amount-transfer',
        settlementData,
      );
      if (response?.status === 200 || response?.status === 201) {
        toast.success('Transfer Successfully');
        setReftech((pre) => !pre);
        handleClose();
        setForm({
          remark: '',
          transactionCode: '',
        });
        setIsLoadingD(false);
      } else {
        toast.error(response?.data || 'Something went wrong');
        setIsLoadingD(false);
      }
    } catch (error) {
      setIsLoadingD(false);
      if (isYupError(error)) {
        setFormError(parseYupError(error));
      } else {
        setIsLoadingD(false);
        toast.error(error?.message || 'Unauthorised');
      }
    }
  };

  const handleCloseModal = () => {
    handleClose();
    setFormError({ amount: '', remark: '', transactionCode: '' });
    setForm({ amount: '', remark: '', transactionCode: '' });
  };
  const [showPassword, setShowPassword] = useState(false);
  const toggleVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className={
        isOpen
          ? 'fixed inset-0 bg-gray-500 bg-opacity-75 overflow-y-auto px-4 py-6 sm:px-0 z-10'
          : 'hidden'
      }
    >
      <div className="text-sm text-white font-bold text-center h-4 rounded-t-lg bg-[#071535] relative w-full max-w-lg mx-auto shadow-md px-8 py-4 row flex">
        <h4 className="mt-[-0.5rem] grow text-left">Transfer</h4>
        <button className=" flex-none">
          <RxCross2
            className="h-4 w-4 mt-[-0.5rem]   "
            onClick={handleCloseModal}
          />
        </button>
      </div>
      <div className="relative w-full max-w-lg mx-auto shadow-md rounded-b-lg bg-white px-8 py-4">
        <form>
          <div className="grid grid-cols-1 gap-2 text-black font-medium mb-2">
            <div className="w-full">
              <label
                htmlFor="remark"
                className=" col-start-1 col-end-1  rtl:text-right whitespace-no-wrap"
              >
                Amount
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  placeholder="Enter Amount"
                  id="amount"
                  value={form.amount}
                  onChange={(event) =>
                    setForm({ ...form, amount: event.target.value })
                  }
                  className="shadow-sm text-black border border-gray-400 rounded-md w-full px-3 py-1  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 col-start-2 col-end-5"
                />
              </div>
              {formError?.amount && (
                <div className="text-12 font-normal  text-red-700">
                  {formError?.amount}
                </div>
              )}
            </div>
            <div className="w-full">
              <label
                htmlFor="transactionCode"
                className=" mb-2 col-start-1 col-end-1 rtl:text-right whitespace-no-wrap"
              >
                Password
              </label>
              <div className="relative col-start-2 mt-2 col-end-5">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="transactionCode"
                  value={form.transactionCode}
                  onChange={(event) =>
                    setForm({ ...form, transactionCode: event.target.value })
                  }
                  className="shadow-sm text-black w-full border border-gray-400 rounded-md px-3 py-1  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 col-start-2 col-end-5"
                  placeholder="Enter Password"
                />

                <button
                  type="button"
                  onClick={toggleVisibility}
                  className="absolute inset-y-0 top-[8px] right-[-20px] pr-8 mb-4 bg-transparent border-none text-gray-500"
                >
                  {showPassword ? (
                    <FiEye className="btn-blu" />
                  ) : (
                    <FiEyeOff className="btn-blu" />
                  )}
                </button>
              </div>
              {formError?.transactionCode && (
                <div className="text-12 font-normal  text-red-700">
                  {formError?.transactionCode}
                </div>
              )}
            </div>

            <div className="w-full mt-2">
              <label
                htmlFor="remark"
                className=" col-start-1 col-end-1  rtl:text-right whitespace-no-wrap"
              >
                Remark
              </label>
              <div className="mt-2">
                <textarea
                  type="text"
                  placeholder="Enter Remark"
                  rows={4}
                  id="remark"
                  value={form.remark}
                  onChange={(event) =>
                    setForm({ ...form, remark: event.target.value })
                  }
                  className="shadow-sm text-black w-full px-3 py-1 border border-gray-400 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 col-start-2 col-end-5"
                />
              </div>
              {formError?.remark && (
                <div className="text-12 font-normal  text-red-700">
                  {formError?.remark}
                </div>
              )}
            </div>

            <div className="flex justify-end mt-8  text-white">
              {isLoadingD ? (
                <button className="bg-emerald-600 ml-10 w-24 h-8 my-2 rounded-md col-start-4 col-end-5">
                  Loading....
                </button>
              ) : (
                <button
                  onClick={handleDepositSubmit}
                  className="bg-emerald-600 ml-10 w-24 h-8 my-2 rounded-md col-start-4 col-end-5"
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
TransferSettle.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  setReftech: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};
export default TransferSettle;
