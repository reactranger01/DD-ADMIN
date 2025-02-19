import React, { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import PropTypes from 'prop-types';
import { addUserValidation } from '@/utils/validation';
import { postAuthData } from '@/utils/apiHandlers';
import { toast } from 'react-toastify';
import { isYupError, parseYupError } from '@/utils/Yup';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { fetchBetDetailsAction } from '@/redux/actions';
import { useDispatch } from 'react-redux';
function Addmaster({ isOpenmaster, handleClosemaster }) {
  const dispatch = useDispatch();
  const inputField = [
    {
      label: 'Username',
      name: 'username',
      type: 'text',
      placeholder: 'Enter username',
    },
    {
      label: 'Name',
      name: 'fullname',
      type: 'text',
      placeholder: 'Enter name',
    },
    {
      label: 'Partnership',
      name: 'ap',
      type: 'text',
      placeholder: '%',
    },
    {
      label: 'Opening Balance',
      name: 'creditAmount',
      type: 'text',
    },
    {
      label: 'Mobile Number',
      name: 'phoneNumber',
      type: 'number',
      placeholder: 'xxxxx',
    },
    {
      label: 'City',
      name: 'city',
      type: 'text',
      placeholder: '',
    },
    {
      label: 'Password',
      name: 'password',
      type: 'password',
      placeholder: '',
    },
    {
      label: 'Confirm Password',
      name: 'confirmPassword',
      type: 'password',
      placeholder: '',
    },
  ];

  const [form, setForm] = useState({
    dialCode: encodeURI('+91'),
    userType: 'MASTER',
    username: '',
    fullname: '',
    password: '',
    ap: '',
    confirmPassword: '',
    phoneNumber: '',
    creditAmount: '',
    transactionCode: '',
    city: '',
  });

  const [formError, setFormError] = useState({
    username: '',
    fullname: '',
    password: '',
    ap: '',
    confirmPassword: '',
    phoneNumber: '',
    creditAmount: '',
    userType: '',
    transactionCode: '',
    city: '',
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setFormError({
      ...formError,
      [name]: '',
    });
  };

  const handleAddUserSubmit = async (e) => {
    e.preventDefault();
    try {
      setFormError({});
      await addUserValidation.validate(form, {
        abortEarly: false,
      });
      const response = await postAuthData('/user/create-sub-user', form);
      if (response?.status === 200) {
        toast.success('Master Added Successfully');
        handleClosemaster();
        dispatch(fetchBetDetailsAction(true));
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
  const [showPassworduser, setShowPassworduser] = useState({});
  const toggleVisibilityuser = (name) => {
    setShowPassworduser({
      ...showPassworduser,
      [name]: !showPassworduser[name],
    });
  };
  return (
    <div>
      <div
        className={
          isOpenmaster
            ? 'fixed inset-0 bg-gray-500 bg-opacity-75 overflow-y-auto px-4 py-6 sm:px-0  font-semibold text-gray-700 z-10'
            : 'hidden'
        }
      >
        <div className="text-sm font-bold text-center h-4 rounded-t-lg bg-[#071535] relative w-full max-w-lg mx-auto shadow-md px-8 py-4 flex justify-between text-white">
          <h4 className="mt-[-0.5rem]  ">Add Master</h4>
          <button className="">
            <RxCross2 className=" mt-[-0.5rem]" onClick={handleClosemaster} />
          </button>
        </div>
        <div className="relative w-full max-w-lg mx-auto shadow-md rounded-b-lg bg-white px-8 py-4">
          <div className="grid grid-cols-1 gap-1 font-black text-gray-700 text-sm">
            {inputField.map((items, index) => {
              return (
                <div key={index} className="grid mt-1 grid-cols-5">
                  <label
                    htmlFor={items?.name}
                    className="text-gray-700 font-medium mb-2 col-start-1 col-span-2  rtl:text-right"
                  >
                    {items?.label} <span className="text-red-700">*</span>
                  </label>
                  <div className=" w-full col-start-3 col-span-5">
                    <input
                      placeholder={items?.placeholder}
                      type={
                        items.type === 'password'
                          ? showPassworduser[items.name]
                            ? 'text'
                            : 'password'
                          : items.type
                      }
                      id={items?.name}
                      onChange={handleChange}
                      value={form[items?.name]}
                      name={items?.name}
                      className="shadow-sm rounded-md w-full px-3 py-1 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500  "
                    />
                    {items.type === 'password' && (
                      <button
                        type="button"
                        onClick={() => toggleVisibilityuser(items.name)}
                        className="absolute mt-2 right-10 px-3 bg-transparent border-none text-gray-500"
                      >
                        {showPassworduser[items.name] ? (
                          <FiEye className="btn-blu" />
                        ) : (
                          <FiEyeOff className="btn-blu" />
                        )}
                      </button>
                    )}
                    {formError[items?.name] && (
                      <div className="text-12 font-normal text-red-700">
                        {formError[items?.name]}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            <div className="grid grid-cols-5 ">
              <label
                htmlFor="transactionCode"
                className="text-gray-700 font-medium mb-2 col-start-1 col-span-2 rtl:text-right whitespace-no-wrap"
              >
                Master Password <span className="text-red-700">*</span>
              </label>
              <div className=" w-full col-start-3 col-span-5 relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.transactionCode}
                  id="transactionCode"
                  onChange={handleChange}
                  name="transactionCode"
                  className="shadow-sm rounded-md w-full px-3 py-1 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
                />
                <button
                  type="button"
                  onClick={toggleVisibility}
                  className="absolute mt-2 right-5 px-3  bg-transparent border-none text-gray-500"
                >
                  {showPassword ? (
                    <FiEye className="btn-blu" />
                  ) : (
                    <FiEyeOff className="btn-blu" />
                  )}
                </button>
                {formError?.transactionCode && (
                  <div className="text-12 font-normal  text-red-700">
                    {formError?.transactionCode}
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={handleAddUserSubmit}
              className="bg-slate-500 text-white w-36 h-8 ml-40 my-2 rounded-md "
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
Addmaster.propTypes = {
  isOpenmaster: PropTypes.bool.isRequired,
  handleClosemaster: PropTypes.func.isRequired,
};
export default Addmaster;
