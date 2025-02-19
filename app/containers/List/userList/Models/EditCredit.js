import React, { useEffect, useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { RxCross2 } from 'react-icons/rx';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { isYupError, parseYupError } from '@/utils/Yup';
import { addCreditValidation } from '@/utils/validation';
import { postAuthData } from '@/utils/apiHandlers';
const EditCredit = ({
  changeMobileno,
  UpdatemobileClose,
  userCredit,
  setReftech,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    transactionCode: '',
    credit: '',
    from: '',
  });
  useEffect(() => {
    if (userCredit && userCredit.id) {
      setForm((prevForm) => ({
        ...prevForm,
        from: userCredit.id,
      }));
    }
  }, [userCredit, form]);
  const [formError, setFormError] = useState({
    transactionCode: '',
    credit: '',
    from: '',
  });
  const toggleVisibility = () => {
    setShowPassword(!showPassword);
  };

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
      await addCreditValidation.validate(form, {
        abortEarly: false,
      });
      const response = await postAuthData('/user/edit-credit', form);
      if (response?.status === 200 || response?.status === 201) {
        toast.success('Credit Added Successfully');
        setReftech((prev) => !prev);
        setFormError({
          transactionCode: '',
          credit: '',
          from: '',
        });
        setForm({
          transactionCode: '',
          credit: '',
          from: '',
        });
        UpdatemobileClose();
      } else {
        toast.error(response?.data || 'Something went wrong');
        setForm({
          transactionCode: '',
          credit: '',
          from: '',
        });
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
            ? 'fixed inset-0 bg-gray-500 bg-opacity-75 overflow-y-auto px-4 py-6 sm:px-0'
            : 'hidden'
        }
      >
        <div className="text-sm text-center h-4 rounded-t-md bg-[#071535] relative w-full max-w-lg mx-auto shadow-md px-8 py-4 row  flex justify-between ">
          <h4 className="mt-[-0.5rem] text-sm font-bold text-white">
            {/* mt-[-0.5rem] w-16 */}
            Edit Credit Reference - {userCredit.username}
          </h4>
          <button className="mt-[-0.5rem]">
            {/* h-4 w-4  mt-[-34px] */}
            <RxCross2 className="text-white" onClick={UpdatemobileClose} />
          </button>
        </div>
        <div className="relative w-full max-w-lg mx-auto shadow-md rounded-b-lg bg-white px-4 py-4 ">
          <div className=" grid grid-cols-1 gap-4 text-black">
            <div className="grid grid-cols-5 items-center">
              <label
                htmlFor="username"
                className=" mb-2 mr-2 col-start-1 col-end-1 text-sm rtl:text-right"
              >
                Current Credit
              </label>
              <p className="shadow-sm bg-white w-full px-3 py-1 h-9 border border-gray-300 text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 col-start-2 col-end-5">
                {userCredit?.creditAmount}
              </p>
            </div>
            <div className="grid grid-cols-5 ">
              <label
                htmlFor="username"
                className=" mb-2 mr-2 col-start-1 col-end-1 text-sm rtl:text-right"
              >
                New Credit
              </label>
              <input
                type="text"
                id="username"
                name="credit"
                value={form?.credit}
                onChange={handleChange}
                className="shadow-sm  w-full px-3 py-1 h-9 border border-gray-300 text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 col-start-2 col-end-5"
              />
            </div>
            {formError?.credit && (
              <div className="text-14 mx-2 mb-2 font-normal  text-red-700">
                {formError?.credit}
              </div>
            )}
            <div className="grid grid-cols-5 ">
              <label
                htmlFor="username"
                className=" mb-2 mr-2 col-start-1 col-end-1  text-sm rtl:text-right"
              >
                Password
              </label>
              <div className="relative col-start-2 col-end-5">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="username"
                  value={form?.transactionCode}
                  onChange={handleChange}
                  name="transactionCode"
                  placeholder="Enter Password"
                  className="shadow-sm  px-3 w- w-full py-1 h-9 border border-gray-300 text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 col-start-2 col-end-5"
                />
                <button
                  type="button"
                  onClick={toggleVisibility}
                  className="absolute inset-y-0 right-0 mx-4 py-2 bg-transparent border-none text-gray-500"
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
              <div className="text-14 mx-2 mb-2 font-normal  text-red-700">
                {formError?.transactionCode}
              </div>
            )}
          </div>
          <div className="flex flex-row-reverse justify-center gap-2 mt-4">
            <button
              className="bg-green-700 text-white p-2 rounded-md"
              onClick={handleAddAccountSubmit}
            >
              Submit
            </button>
            <button
              onClick={UpdatemobileClose}
              className="bg-red-600 p-2 text-white rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
EditCredit.propTypes = {
  changeMobileno: PropTypes.bool.isRequired,
  UpdatemobileClose: PropTypes.func.isRequired,
  userCredit: PropTypes.any,
  setReftech: PropTypes.any,
};
export default EditCredit;
