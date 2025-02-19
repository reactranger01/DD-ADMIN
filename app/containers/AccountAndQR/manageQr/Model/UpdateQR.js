/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import PropTypes from 'prop-types';
import { FiUpload } from 'react-icons/fi';
import { addQrValidation } from '@/utils/validation';
import { postAuthData } from '@/utils/apiHandlers';
import { toast } from 'react-toastify';
import { isYupError, parseYupError } from '@/utils/Yup';

const UpdateQR = ({ isOpenUpdateQR, CloseUpdateQR, setReftech, data }) => {
  const [form, setForm] = useState({});
  const [formError, setFormError] = useState({});
  const [image, setImage] = useState('');
  useEffect(() => {
    if (data) {
      setForm(data);
      setImage(data.image);
    }
  }, [data]);

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];

    const formData = new FormData();
    formData.append('image', file);
    const response = await postAuthData('/user/uploads', formData);
    if (response?.status) {
      setForm({ ...form, image: response?.data?.imageUrl });
      setImage(response?.data?.imageUrl);
    }
  };

  const handleUpdateQrSubmit = async (e) => {
    e.preventDefault();
    try {
      setFormError({});
      await addQrValidation.validate(form, { abortEarly: false });
      const response = await postAuthData('/user/add-qr', form);
      if (response?.status === 200 || response?.status === 201) {
        CloseUpdateQR();
        toast.success(response?.data?.message);
        setReftech((prevReftech) => !prevReftech);
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
    <>
      <div
        className={
          isOpenUpdateQR
            ? 'fixed inset-0 bg-gray-500 bg-opacity-75 overflow-y-auto px-4 py-6 sm:px-0'
            : 'hidden'
        }
      >
        <div className="text-sm text-center h-4 rounded-t-md bg-[#071535] relative w-full max-w-md mx-auto shadow-md px-8 py-4 row  flex justify-between ">
          <h4 className="mt-[-0.5rem] text-sm font-bold">Update QR {image}</h4>
          <button className="mt-[-0.5rem] font-bold">
            <RxCross2 className="" onClick={CloseUpdateQR} />
          </button>
        </div>
        <div className="relative w-full max-w-md mx-auto shadow-md rounded-b-lg bg-white px-4 py-4 ">
          <div className=" grid grid-cols-1 gap-1 text-slate-800">
            <div>
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleFileInputChange}
              />
              <label htmlFor="fileInput">
                <div className="rounded-lg  relative border border-gray-300 h-36  mt-2 my-2 flex justify-between  items-end">
                  <img src={image} alt="image" className="w-full h-full" />
                  <div className="flex absolute  right-2 bottom-2">
                    <FiUpload className="h-8 w-8 rounded-full text-white bg-slate-600 p-2" />
                  </div>
                </div>
              </label>
            </div>
            {formError?.image && (
              <div className="text-14 mx-2 mb-2 font-normal  text-red-700">
                {formError?.image}
              </div>
            )}
            <label className="mx-2 text-sm">Upi ID</label>
            <input
              className="rounded-sm border border-gray-300 h-8 p-2 mx-2 my-2"
              placeholder="Enter upi id"
              name="upi"
              value={form.upi}
              onChange={(e) => setForm({ ...form, upi: e.target.value })}
            />
            {formError?.upi && (
              <div className="text-14 mx-2 mb-2 font-normal  text-red-700">
                {formError?.upi}
              </div>
            )}
          </div>
          <div className="mt-4 ">
            <button
              onClick={handleUpdateQrSubmit}
              className="bg-slate-500 p-2 rounded-md w-full"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

UpdateQR.propTypes = {
  isOpenUpdateQR: PropTypes.bool.isRequired,
  CloseUpdateQR: PropTypes.func.isRequired,
  setReftech: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

export default UpdateQR;
