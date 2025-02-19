/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import PropTypes from 'prop-types';
import { changePasswordUserValidation } from '@/utils/validation';
import { putAuthData } from '@/utils/apiHandlers';
import { toast } from 'react-toastify';
import { isYupError, parseYupError } from '@/utils/Yup';
import { FiEye, FiEyeOff } from 'react-icons/fi';
function usePasswordVisibility(initialState = false) {
  const [isVisible, setIsVisible] = useState(initialState);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  return [isVisible, toggleVisibility];
}

function ChangePassword({ isopenchangePass, handleclosePass, data }) {
  const MasterId = localStorage.getItem('owner_id');

  const [form, setForm] = useState({
    masterpassword: '',
    userPassword: '',
    confirmPassword: '',
  });
  useEffect(() => {
    if (data) {
      setForm({ ...form, userId: data?.id, masterId: Number(MasterId) });
    }
  }, [data]);
  const [formError, setFormError] = useState({
    masterpassword: '',
    userPassword: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setFormError({});
      await changePasswordUserValidation.validate(form, {
        abortEarly: false,
      });
      const data = {
        masterpassword: form?.masterpassword,
        userPassword: form?.userPassword,
        userId: form?.userId,
        masterId: form?.masterId,
      };
      const response = await putAuthData('/user/change-user-password', data);
      if (response?.status === 200) {
        toast.success('Password Changed Successfully');
        handleclosePass();
        setForm({
          masterpassword: '',
          userPassword: '',
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
      masterpassword: '',
      userPassword: '',
      confirmPassword: '',
    });
    setFormError({
      masterpassword: '',
      userPassword: '',
      confirmPassword: '',
    });
  };
  const [showOldPassword, setShowOldPassword] = usePasswordVisibility(false);
  const [showNewPassword, setShowNewPassword] = usePasswordVisibility(false);
  const [showMasterPassword, setShowMasterPassword] =
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
            {/* <div>
              <label className="mx-2 text-sm">New Password</label>
              <div className="relative.">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  name="userPassword"
                  onChange={handleChange}
                  value={form.userPassword}
                  className="rounded-sm border border-gray-300 h-8 p-2 mx-2 mt-2"
                />
                <button
                  type="button"
                  onClick={setShowNewPassword}
                  className="absolute inset-y-0 right-0 px-3 py-2 bg-transparent border-none text-gray-500"
                >
                  {showNewPassword ? (
                    <FiEye className="btn-blu" />
                  ) : (
                    <FiEyeOff className="btn-blu" />
                  )}
                </button>
              </div>
              {formError?.userPassword && (
                <div className="text-12 mx-2 font-normal  text-red-700">
                  {formError?.userPassword}
                </div>
              )}
            </div> */}
            <div>
              <label className="mx-2 text-sm">New Password </label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  name="userPassword"
                  onChange={handleChange}
                  value={form.userPassword}
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
              {formError?.userPassword && (
                <div className="text-12 mx-2 font-normal  text-red-700">
                  {formError?.userPassword}
                </div>
              )}
            </div>
            <div>
              <label className="mx-2 text-sm">Confirm Password </label>
              <div className="relative">
                <input
                  type={showOldPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  onChange={handleChange}
                  value={form.confirmPassword}
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
              {formError?.confirmPassword && (
                <div className="text-12 mx-2 font-normal  text-red-700">
                  {formError?.confirmPassword}
                </div>
              )}
            </div>
            <div>
              <label className="mx-2 text-sm">Master Password</label>
              <div className="relative">
                <input
                  type={showMasterPassword ? 'text' : 'password'}
                  name="masterpassword"
                  onChange={handleChange}
                  value={form.masterpassword}
                  className="rounded-sm border border-gray-300 h-8 p-2 mx-2 mt-2"
                />
                <button
                  type="button"
                  onClick={setShowMasterPassword}
                  className="absolute inset-y-0 right-5 px-3 pt-2.5 bg-transparent border-none text-gray-500"
                >
                  {showMasterPassword ? (
                    <FiEye className="btn-blu" />
                  ) : (
                    <FiEyeOff className="btn-blu" />
                  )}
                </button>
              </div>
              {formError?.masterpassword && (
                <div className="text-12 mx-2 font-normal  text-red-700">
                  {formError?.masterpassword}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-row-reverse gap-2 ">
            <button
              className="bg-red-600 p-2 rounded-md font-bold text-sm"
              onClick={handleClose}
            >
              {' '}
              NO
            </button>
            <button
              onClick={handleSubmit}
              className="bg-slate-500 p-2 rounded-md font-bold text-sm"
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
