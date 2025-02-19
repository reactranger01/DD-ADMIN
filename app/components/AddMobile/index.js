/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import PropTypes from 'prop-types';
import { postAuthData } from '@/utils/apiHandlers';
import { toast } from 'react-toastify';
import { isYupError, parseYupError } from '@/utils/Yup';
import { addMobileValidation } from '@/utils/validation';
const AddMobile = ({ isOpenAddQR, CloseAddQR, getQRList }) => {
  const [form, setForm] = useState({});
  const [formError, setFormError] = useState({});

  // const [selectedImage, setSelectedImage] = useState({});

  const handleChange = (e) => {
    let { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setFormError({
      ...formError,
      [name]: '',
    });
  };

  const handleAddQrSubmit = async (e) => {
    e.preventDefault();
    try {
      await addMobileValidation.validate(form, {
        abortEarly: false,
      });
      const response = await postAuthData('/user/add-mobileNo', form);
      if (response?.status === 200 || response?.status === 201) {
        CloseAddQR();
        toast.success(response?.data?.message);
        setForm({
          mobileNo: '',
        });
        getQRList();
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
      mobileNo: '',
    });
    setForm({
      mobileNo: '',
    });
    CloseAddQR();
  };
  return (
    <>
      <div
        className={
          isOpenAddQR
            ? 'fixed inset-0 bg-gray-500 bg-opacity-75 overflow-y-auto px-4 py-6 sm:px-0'
            : 'hidden'
        }
      >
        <div className="text-sm text-center h-4 rounded-t-md bg-[#071535] relative w-full max-w-md mx-auto shadow-md px-8 py-4 row  flex justify-between ">
          <h4 className="mt-[-0.5rem] text-sm font-bold">Add Mobile Number</h4>
          <button className="mt-[-0.5rem] font-bold">
            {/* h-4 w-4  mt-[-34px] */}
            <RxCross2 className="" onClick={handleReset} />
          </button>
        </div>
        <div className="relative w-full max-w-md mx-auto shadow-md rounded-b-lg bg-white px-4 py-4 ">
          <div>
            <label className="mx-2 text-sm text-black">Mobile Number</label>
            <input
              className="rounded-sm border text-black border-gray-300 h-8 p-2 mx-2 my-2"
              placeholder="Enter Mobile Number"
              name="mobileNo"
              value={form.mobileNo}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= 10) {
                  handleChange(e);
                }
              }}
              type="number" // Change input type to text to allow maxLength to work
            />

            {formError?.mobileNo && (
              <div className="text-14 mx-2 font-normal  text-red-700">
                {formError?.mobileNo}
              </div>
            )}
          </div>
          <div className="mt-4 ">
            <button
              className="bg-slate-500 p-2 rounded-md w-full"
              onClick={handleAddQrSubmit}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
AddMobile.propTypes = {
  isOpenAddQR: PropTypes.bool.isRequired,
  CloseAddQR: PropTypes.func.isRequired,
  getQRList: PropTypes.func,
};
export default AddMobile;
