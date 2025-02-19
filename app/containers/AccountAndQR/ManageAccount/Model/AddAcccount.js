/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import PropTypes from 'prop-types';
import { postAuthData } from '@/utils/apiHandlers';
import { toast } from 'react-toastify';
import { isYupError, parseYupError } from '@/utils/Yup';
import { addAccountValidation } from '@/utils/validation';
import { useSelector } from 'react-redux';

const AddAcccount = ({ isOpenAddAccount, CloseAddAccount, setReftech }) => {
  const user = useSelector((state) => state.user);
  const [form, setForm] = useState({
    userid: '',
    bankName: '',
    acountholdername: '',
    accountNumber: '',
    ifscCode: '',
    accountType: '',
  });
  const [formError, setFormError] = useState({});

  useEffect(() => {
    if (user) {
      setForm({ ...form, userid: user.id });
    }
  }, [user]);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setFormError({
      ...formError,
      [name]: '',
    });
  };

  const handleAddAccountSubmit = async (e) => {
    e.preventDefault();
    try {
      setFormError({});
      await addAccountValidation.validate(form, {
        abortEarly: false,
      });
      const response = await postAuthData('/user/add-account', form);

      if (response?.status === 200 || response?.status === 201) {
        toast.success('Account Added Successfully');
        // setReftech((prev) => !prev);
        setFormError({
          bankName: '',
          acountholdername: '',
          accountNumber: '',
          ifscCode: '',
          accountType: '',
        });
        setReftech((pre) => !pre);
        CloseAddAccount();
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

  const handleReset = () => {
    setFormError({
      bankName: '',
      acountholdername: '',
      accountNumber: '',
      ifscCode: '',
      accountType: '',
    });
    setForm({
      bankName: '',
      acountholdername: '',
      accountNumber: '',
      ifscCode: '',
      accountType: '',
    });
    CloseAddAccount();
  };

  return (
    <>
      <div
        className={
          isOpenAddAccount
            ? 'fixed inset-0 bg-gray-500 bg-opacity-75 overflow-y-auto px-4 py-6 sm:px-0'
            : 'hidden'
        }
      >
        <div className="text-sm text-center h-4 rounded-t-md bg-[#071535] relative w-full max-w-md mx-auto shadow-md px-8 py-4 row  flex justify-between ">
          <h4 className="mt-[-0.5rem] text-sm font-bold">
            {/* mt-[-0.5rem] w-16 */}
            Add Account
          </h4>
          <button className="mt-[-0.5rem] font-bold">
            {/* h-4 w-4  mt-[-34px] */}
            <RxCross2 className="" onClick={handleReset} />
          </button>
        </div>
        <div className="relative w-full max-w-md mx-auto shadow-md rounded-b-lg bg-white px-4 py-4 ">
          <div className=" grid grid-cols-1 gap-1 text-slate-800">
            <label className="mx-2 text-sm">ACCOUNT TYPE </label>
            <select
              onChange={handleChange}
              name="accountType"
              value={form?.accountType}
              className="rounded-sm border border-gray-300 h-9 p-2 mx-2 mt-2"
            >
              <option>---Select Account Type---</option>
              <option value="Saving">Savings account.</option>
              <option value="Current">Current account</option>
              {/* <option value="30">100</option> */}
            </select>
            {formError?.accountType && (
              <div className="text-14 mx-2 mb-2 font-normal  text-red-700">
                {formError?.accountType}
              </div>
            )}
            <label className="mx-2 text-sm">BANK NAME </label>
            <input
              name="bankName"
              value={form?.bankName}
              onChange={handleChange}
              className="rounded-sm border border-gray-300 h-8 p-2 mx-2 mt-2"
              placeholder="Enter bank name"
            />
            {formError?.bankName && (
              <div className="text-14 mx-2 mb-2 font-normal  text-red-700">
                {formError?.bankName}
              </div>
            )}
            <label className="mx-2 text-sm">ACCOUNT HOLDER NAME</label>
            <input
              name="acountholdername"
              value={form?.acountholdername}
              onChange={handleChange}
              className="rounded-sm border border-gray-300 h-8 p-2 mx-2 mt-2"
              placeholder="Enter account holder name"
            />
            {formError?.acountholdername && (
              <div className="text-14 mx-2 mb-2 font-normal  text-red-700">
                {formError?.acountholdername}
              </div>
            )}
            <label className="mx-2 text-sm">ACCOUNT NO. </label>
            <input
              name="accountNumber"
              value={form?.accountNumber}
              onChange={handleChange}
              className="rounded-sm border border-gray-300 h-8 p-2 mx-2 mt-2"
              placeholder="Enter a/c number"
            />
            {formError?.accountNumber && (
              <div className="text-14 mx-2 mb-2 font-normal  text-red-700">
                {formError?.accountNumber}
              </div>
            )}
            <label className="mx-2 text-sm">IFSC CODE</label>
            <input
              name="ifscCode"
              value={form?.ifscCode}
              onChange={handleChange}
              className="rounded-sm border border-gray-300 h-8 p-2 mx-2 mt-2"
              placeholder="Enter ifsc code"
            />
            {formError?.ifscCode && (
              <div className="text-14 mx-2 mb-2 font-normal  text-red-700">
                {formError?.ifscCode}
              </div>
            )}
          </div>
          <div className="flex flex-row-reverse gap-2 mt-4">
            <button
              className="bg-slate-500 w-20 p-2 rounded-md"
              onClick={handleReset}
            >
              Close
            </button>
            <button
              onClick={handleAddAccountSubmit}
              className="bg-slate-800 w-20 p-2 rounded-md"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
AddAcccount.propTypes = {
  isOpenAddAccount: PropTypes.bool.isRequired,
  CloseAddAccount: PropTypes.func.isRequired,
  setReftech: PropTypes.func.isRequired,
};
export default AddAcccount;
