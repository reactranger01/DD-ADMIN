/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';

import PropTypes from 'prop-types';
import { isYupError, parseYupError } from '@/utils/Yup';
import { toast } from 'react-toastify';
import { postAuthData } from '@/utils/apiHandlers';
import { changePasswordValidation } from '@/utils/validation';
import { FiEye, FiEyeOff } from 'react-icons/fi';
function usePasswordVisibility(initialState = false) {
  const [isVisible, setIsVisible] = useState(initialState);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  return [isVisible, toggleVisibility];
}

function ChangePassword({ isopenchangePass, handleclosePass, data }) {
  const [form, setForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  useEffect(() => {
    if (data) {
      setForm({ ...form, uid: data?.id });
    }
  }, [data]);
  const [formError, setFormError] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setFormError({});
      await changePasswordValidation.validate(form, {
        abortEarly: false,
      });
      const data = {
        uid: form?.uid,
        oldPassword: form?.oldPassword,
        newPassword: form?.newPassword,
        transactionCode: form?.transactionCode,
      };
      const response = await postAuthData('/user/change-password', data);
      if (response?.status === 200) {
        toast.success('Password Changed Successfully');
        handleclosePass();
        setForm({
          oldPassword: '',
          newPassword: '',
          transactionCode: '',
          confirmPassword: '',
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

  const handleChange = (e) => {
    let { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setFormError({
      ...formError,
      [name]: '',
    });
  };

  const handleClose = () => {
    handleclosePass();
    setForm({
      oldPassword: '',
      newPassword: '',
      transactionCode: '',
      confirmPassword: '',
    });
    setFormError({
      oldPassword: '',
      newPassword: '',
      transactionCode: '',
      confirmPassword: '',
    });
  };
  const [showOldPassword, setShowOldPassword] = usePasswordVisibility(false);
  const [showNewPassword, setShowNewPassword] = usePasswordVisibility(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    usePasswordVisibility(false);
  return (
    <div>
      <div
        className={
          isopenchangePass
            ? 'fixed inset-0 bg-gray-500 bg-opacity-75 overflow-y-auto px-4 py-6 sm:px-0'
            : 'hidden'
        }
      >
        <div className="text-sm text-center h-4 rounded-t-lg bg-[#071535] relative w-full max-w-lg mx-auto shadow-md px-8 py-4 row  flex justify-between ">
          <h4 className="mt-[-0.5rem] text-sm font-bold">Change Password</h4>
          <button className="mt-[-0.5rem]">
            <RxCross2 className="" onClick={handleClose} />
          </button>
        </div>
        <div className="relative w-full max-w-lg mx-auto shadow-md rounded-b-lg bg-white px-4 py-4 ">
          <div className=" grid grid-cols-2 gap-1 text-slate-800">
            <div className="">
              <label className="mx-2 mt-2 text-sm">Current Password</label>
              <div className="relative">
                <input
                  type={showOldPassword ? 'text' : 'password'}
                  name="oldPassword"
                  onChange={handleChange}
                  value={form?.oldPassword}
                  className="rounded-sm border border-gray-300 h-8 p-2 mx-2 mt-2"
                />
                <button
                  type="button"
                  onClick={setShowOldPassword}
                  className="absolute inset-y-0 right-5 px-3 pt-2.5 bg-transparent border-none text-gray-500"
                >
                  {showOldPassword ? (
                    <FiEye className="btn-blu" />
                  ) : (
                    <FiEyeOff className="btn-blu" />
                  )}
                </button>
              </div>
              {formError?.oldPassword && (
                <div className="text-12 font-normal  text-red-700">
                  {formError?.oldPassword}
                </div>
              )}
            </div>
            <div>
              <label className="mx-2 mt-2  text-sm">New Password </label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  name="newPassword"
                  onChange={handleChange}
                  value={form?.newPassword}
                  className="rounded-sm border border-gray-300 h-8 p-2 mx-2 mt-2"
                />
                <button
                  type="button"
                  onClick={setShowNewPassword}
                  className="absolute inset-y-0 right-5 px-3 pt-2.5 bg-transparent border-none text-gray-500"
                >
                  {showNewPassword ? (
                    <FiEye className="btn-blu" />
                  ) : (
                    <FiEyeOff className="btn-blu" />
                  )}
                </button>
              </div>
              {formError?.newPassword && (
                <div className="text-12 font-normal  text-red-700">
                  {formError?.newPassword}
                </div>
              )}
            </div>
            <div>
              <label className="mx-2 mt-2  text-sm">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  onChange={handleChange}
                  value={form?.confirmPassword}
                  className="rounded-sm border border-gray-300 h-8 p-2 mx-2 mt-2"
                />
                <button
                  type="button"
                  onClick={setShowConfirmPassword}
                  className="absolute inset-y-0 right-5 px-3 py-2 bg-transparent border-none text-gray-500"
                >
                  {showConfirmPassword ? (
                    <FiEye className="btn-blu" />
                  ) : (
                    <FiEyeOff className="btn-blu" />
                  )}
                </button>
              </div>
              {formError?.confirmPassword && (
                <div className="text-12 font-normal  text-red-700">
                  {formError?.confirmPassword}
                </div>
              )}
            </div>
            {/* <div>
              <label className="mx-2 mt-2  text-sm">Transection Code</label>
              <input
                name="transactionCode"
                onChange={handleChange}
                value={form?.transactionCode}
                className="rounded-sm border border-gray-300 h-8 p-2 mx-2 mt-2"
              />
              {formError?.transactionCode && (
                <div className="text-12 font-normal  text-red-700">
                  {formError?.transactionCode}
                </div>
              )}
            </div> */}
          </div>
          <div className="flex flex-row-reverse gap-2 mt-4 text-sm font-bold">
            <button className="bg-red-600 p-2 rounded-md" onClick={handleClose}>
              {' '}
              NO
            </button>
            <button
              onClick={handleSubmit}
              className="bg-slate-500 p-2 rounded-md"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
ChangePassword.propTypes = {
  isopenchangePass: PropTypes.bool.isRequired,
  handleclosePass: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};
export default ChangePassword;
