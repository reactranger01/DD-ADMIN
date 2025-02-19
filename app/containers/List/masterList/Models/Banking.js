import React, { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { isYupError, parseYupError } from '@/utils/Yup';
import { postAuthData } from '@/utils/apiHandlers';
import { addBalanceValidation } from '@/utils/validation';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const Banking = ({ isOpen, handleClose, data, setReftech }) => {
  const [form, setForm] = useState({});
  const [formError, setFormError] = useState({});

  const dataDeposit = {
    to: data?.id,
    username: data?.username,
    userPoint: data?.balance,
    remark: form.remark,
    transactionCode: form?.transactionCode,
    creditAmount: form?.amount,
  };
  const withdrawData = {
    from: data?.id,
    remark: form.remark,
    transactionCode: form?.transactionCode,
    withdrawAmount: form?.amount,
  };

  const handleDepositSubmit = async (e) => {
    e.preventDefault();
    try {
      setFormError({});
      await addBalanceValidation.validate(form, {
        abortEarly: false,
      });
      const response = await postAuthData(
        '/user/transfer-credit-amount',
        dataDeposit,
      );
      if (response?.status === 200 || response?.status === 201) {
        toast.success('Amount Deposit Successfully');
        setReftech((pre) => !pre);
        handleClose();
        setForm({
          amount: '',
          remark: '',
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

  const handleWithdrawSubmit = async (e) => {
    e.preventDefault();
    try {
      setFormError({});
      await addBalanceValidation.validate(form, {
        abortEarly: false,
      });
      const response = await postAuthData(
        '/user/withdraw-credit-amount',
        withdrawData,
      );
      if (response?.status === 200 || response?.status === 201) {
        toast.success('Amount Withdraw Successfully');
        setReftech((pre) => !pre);
        setForm({ amount: '', remark: '', transactionCode: '' });
        handleClose();
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
        <h4 className="mt-[-0.5rem] grow text-left">
          Banking Master Balance: 636795
        </h4>
        <button className=" flex-none">
          <RxCross2
            className="h-4 w-4 mt-[-0.5rem]   "
            onClick={handleCloseModal}
          />
        </button>
      </div>
      <div className="relative w-full max-w-lg mx-auto shadow-md rounded-b-lg bg-white px-8 py-4">
        <form>
          <div className="grid grid-cols-6  text-gray-700 my-4">
            {' '}
            <h4 className=" col-start-1 col-end-3">
              {' '}
              <button className="text-white bg-green-400 ">USER</button>{' '}
              {data.username}
            </h4>{' '}
            <h4 className=" col-start-5 col-end-7">
              Client Bal:{data.balance}
            </h4>{' '}
          </div>
          <div className="grid grid-cols-1 gap-2 text-gray-700 font-medium mb-2">
            <div className="grid grid-cols-5 ">
              <label
                htmlFor="amount"
                className=" mb-2 col-start-1 col-end-1  rtl:text-right"
              >
                Balance
              </label>
              <input
                placeholder="amount"
                type="text"
                name="amount"
                value={form.amount}
                onChange={(event) =>
                  setForm({ ...form, amount: event.target.value })
                }
                id="amount"
                className="shadow-sm rounded-md w-full px-3 py-1 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 col-start-2 col-end-5"
              />
            </div>
            {formError?.amount && (
              <div className="text-12 font-normal  text-red-700">
                {formError?.amount}
              </div>
            )}
            <div className="grid grid-cols-5">
              <label
                htmlFor="remark"
                className=" col-start-1 col-end-1  rtl:text-right whitespace-no-wrap"
              >
                Remark
              </label>
              <input
                type="text"
                id="remark"
                value={form.remark}
                onChange={(event) =>
                  setForm({ ...form, remark: event.target.value })
                }
                className="shadow-sm rounded-md w-full px-3 py-1 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 col-start-2 col-end-5"
              />
            </div>
            {formError?.remark && (
              <div className="text-12 font-normal  text-red-700">
                {formError?.remark}
              </div>
            )}
            <div className="grid grid-cols-5">
              <label
                htmlFor="transactionCode"
                className=" mb-2 col-start-1 col-end-1 rtl:text-right whitespace-no-wrap"
              >
                Master Password
              </label>
              <div className="relative col-start-2 col-end-5">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="transactionCode"
                  value={form.transactionCode}
                  onChange={(event) =>
                    setForm({ ...form, transactionCode: event.target.value })
                  }
                  className="shadow-sm rounded-md w-full px-3 py-1 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 col-start-2 col-end-5"
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
              </div>
            </div>
            {formError?.transactionCode && (
              <div className="text-12 font-normal  text-red-700">
                {formError?.transactionCode}
              </div>
            )}
            <div className="grid grid-cols-6 gap-1 mt-8  text-white">
              <button
                onClick={handleDepositSubmit}
                className="bg-emerald-600 ml-10 w-24 h-8 my-2 rounded-md col-start-4 col-end-5"
              >
                Deposit
              </button>
              <button
                onClick={handleWithdrawSubmit}
                className="bg-red-600 w-24 h-8 my-2  rounded-md  col-start-6 col-end-7"
              >
                Withdraw
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
Banking.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  setReftech: PropTypes.func.isRequired,
};
export default Banking;
