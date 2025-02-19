/* eslint-disable react-hooks/exhaustive-deps */
import { isYupError, parseYupError } from '@/utils/Yup';
import { postAuthData, removeAuthCookie } from '@/utils/apiHandlers';
import { adminChangePasswordValidation } from '@/utils/validation';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
function usePasswordVisibility(initialState = false) {
  const [isVisible, setIsVisible] = useState(initialState);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  return [isVisible, toggleVisibility];
}

const PasswordChangeAdmin = () => {
  const navigate = useNavigate();
  const owner_id = localStorage.getItem('owner_id');
  const [showOldPassword, setShowOldPassword] = usePasswordVisibility(false);
  const [showNewPassword, setShowNewPassword] = usePasswordVisibility(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    usePasswordVisibility(false);
  const [formError, setFormError] = useState({});
  const [form, setForm] = useState({});
  useEffect(() => {
    if (owner_id) {
      setForm({ ...form, id: owner_id });
    }
  }, [owner_id]);
  const handleChange = (e) => {
    let { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setFormError({ ...formError, [name]: '' });
  };
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      setFormError({});
      await adminChangePasswordValidation.validate(form, {
        abortEarly: false,
      });
      delete form.confirmPassword;
      const response = await postAuthData(
        '/user/change-firsttime-password',
        form,
      );
      if (response?.status === 200 || response?.status === 201) {
        toast.success(
          response?.data?.message || 'Password changed successfully',
        );
        navigate('/login');
        Cookies.remove('__admin_user__isLoggedIn');
        Cookies.remove('test__admin_user__isLoggedIn');
        Cookies.remove('development__admin_user__isLoggedIn');
        removeAuthCookie();
        localStorage.removeItem('owner_id');
        localStorage.removeItem('owner_username');
        localStorage.removeItem('owner_path');
        localStorage.removeItem('isPasswordChanged');
        // navigate('/');
        // localStorage.setItem('isPasswordChanged', true);
        setForm({
          oldPassword: '',
          newPassword: '',
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
  return (
    <div className="mx-4 mt-4 border border-gray-500 rounded-md  ">
      <div className="bg-slate-100 rounded-md">
        <div className="h-8 bg-[#071535] rounded-t-md text-sm font-semibold">
          <h3 className="p-1"> Change Password</h3>
        </div>
        <div className=" grid grid-cols-2 gap-3 text-slate-800 my-4 mx-2 rounded-md p-2">
          <div className="grid">
            <label className="mt-2 text-sm">Old Password</label>
            <div className="relative">
              <input
                type={showOldPassword ? 'text' : 'password'}
                placeholder="Old Password"
                name="oldPassword"
                onChange={handleChange}
                value={form.oldPassword}
                className="w-full border border-gray-300 rounded-md p-1"
              />
              <button
                type="button"
                onClick={setShowOldPassword}
                className="absolute inset-y-0 right-0 px-3 py-2 bg-transparent border-none text-gray-500"
              >
                {showOldPassword ? (
                  <FiEye className="btn-blu" />
                ) : (
                  <FiEyeOff className="btn-blu" />
                )}
              </button>
            </div>
            {formError?.oldPassword && (
              <div className="text-14 mx-2 font-normal  text-red-700">
                {formError?.oldPassword}
              </div>
            )}
          </div>
          <div className="grid ">
            <label className=" mt-2 text-sm">New Password</label>
            <div className="relative">
              <input
                type={showNewPassword ? 'text' : 'password'}
                placeholder="New Password"
                name="newPassword"
                onChange={handleChange}
                value={form.newPassword}
                className="w-full border border-gray-300 rounded-md p-1"
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
            {formError?.newPassword && (
              <div className="text-14 mx-2 font-normal  text-red-700">
                {formError?.newPassword}
              </div>
            )}
          </div>
          <div className="grid">
            <label className=" mt-2 text-sm">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
                name="confirmPassword"
                onChange={handleChange}
                value={form.confirmPassword}
                className="w-full border border-gray-300 rounded-md p-1"
              />
              <button
                type="button"
                onClick={setShowConfirmPassword}
                className="absolute inset-y-0 right-0 px-3 py-2 bg-transparent border-none text-gray-500"
              >
                {showConfirmPassword ? (
                  <FiEye className="btn-blu" />
                ) : (
                  <FiEyeOff className="btn-blu" />
                )}
              </button>
            </div>
            {formError?.confirmPassword && (
              <div className="text-14 mx-2 font-normal  text-red-700">
                {formError?.confirmPassword}
              </div>
            )}
          </div>
        </div>
        <button
          onClick={handleLoginSubmit}
          className="text-sm font-bold rounded-md bg-[#071535]  p-2 mx-4 my-2"
        >
          {' '}
          Change Password
        </button>
      </div>
    </div>
  );
};

export default PasswordChangeAdmin;
