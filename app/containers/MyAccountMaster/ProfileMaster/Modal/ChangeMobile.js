import React, { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import PropTypes from 'prop-types';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { isYupError, parseYupError } from '@/utils/Yup';
import { changeMobileValidation } from '@/utils/validation';
import { putAuthData } from '@/utils/apiHandlers';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
function ChangeMobile({ changeMobileno, UpdatemobileClose, data, refresher }) {
  const user = useSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);
  const toggleVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [form, setForm] = useState({
    uid: null,
    userId: '',
    mobile: '',
    password: '',
  });
  useEffect(() => {
    if (data && user) {
      setForm({
        ...form,
        userId: data?.id,
        mobile: Number(data?.phoneNumber),
        uid: user?.id,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, user]);

  const [formError, setFormError] = useState({
    userId: '',
    mobile: '',
    password: '',
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setFormError({
      ...formError,
      [name]: '',
    });
  };
  const handleClose = () => {
    UpdatemobileClose();
    refresher();
    setForm({
      userId: '',
      mobile: '',
      password: '',
    });
    setFormError({
      userId: '',
      mobile: '',
      password: '',
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setFormError({});
      await changeMobileValidation.validate(form, {
        abortEarly: false,
      });

      const response = await putAuthData(
        '/user/change-user-mobile-number',
        form,
      );
      if (response?.status === 200) {
        toast.success('Number Changed Successfully');
        UpdatemobileClose();
        refresher();
        setForm({
          userId: '',
          mobile: '',
          password: '',
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
    <div>
      <div
        className={
          changeMobileno
            ? 'fixed inset-0 bg-slate-600 bg-opacity-75 overflow-y-auto px-4 py-6 sm:px-0'
            : 'hidden'
        }
      >
        <div className="text-sm text-center h-4 rounded-t-md bg-[#071535] relative w-full max-w-lg mx-auto shadow-md px-8 py-4 row  flex justify-between ">
          <h4 className="mt-[-0.5rem] text-sm font-bold">
            Change Mobile Number
          </h4>
          <button className="mt-[-0.5rem]">
            <RxCross2 className="" onClick={UpdatemobileClose} />
          </button>
        </div>
        <div className="relative w-full max-w-lg mx-auto shadow-md rounded-b-lg bg-white px-4 py-4 ">
          <div className=" grid grid-cols-2 gap-1 text-slate-800">
            <div>
              <label className="mx-2 text-sm">Your Password * </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  onChange={handleChange}
                  value={form.password}
                  className="rounded-sm border border-gray-300 h-8 p-2 mx-2 my-2"
                  placeholder="Your Password"
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
              {formError?.password && (
                <div className="text-12 mx-2 font-normal  text-red-700">
                  {formError?.password}
                </div>
              )}
            </div>
            <div>
              <label className="mx-2 text-sm">Mobile Number*</label>
              <input
                name="mobile"
                onChange={handleChange}
                value={form.mobile}
                className="rounded-sm border border-gray-300 h-8 p-2 mx-2 my-2"
                placeholder="Mobile Number"
                type="number"
              />
              {formError?.mobile && (
                <div className="text-12 mx-2 font-normal  text-red-700">
                  {formError?.mobile}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-row-reverse gap-2 mt-4 text-sm font-bold">
            <button
              className="bg-slate-300 p-2 rounded-md text-slate-800"
              onClick={handleClose}
            >
              NO
            </button>
            <button
              className="bg-slate-500 p-2 rounded-md"
              onClick={handleSubmit}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
ChangeMobile.propTypes = {
  changeMobileno: PropTypes.bool.isRequired,
  UpdatemobileClose: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  refresher: PropTypes.func,
};

export default ChangeMobile;
