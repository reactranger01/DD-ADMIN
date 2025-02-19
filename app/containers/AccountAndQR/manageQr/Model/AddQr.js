/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import PropTypes from 'prop-types';
import { FiUpload } from 'react-icons/fi';
import { postAuthData } from '@/utils/apiHandlers';
import { toast } from 'react-toastify';
import { isYupError, parseYupError } from '@/utils/Yup';
import { addQrValidation } from '@/utils/validation';
const AddQr = ({ isOpenAddQR, CloseAddQR, setReftech }) => {
  const [form, setForm] = useState({});
  const [formError, setFormError] = useState({});
  const owner_id = localStorage.getItem('owner_id');
  useEffect(() => {
    if (owner_id) {
      setForm({ ...form, userid: owner_id });
    }
  }, [owner_id]);
  // const [selectedImage, setSelectedImage] = useState({});

  const handleChange = (e) => {
    let { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setFormError({
      ...formError,
      [name]: '',
    });
  };

  const handleFileInputChange = async (event) => {
    // setSelectedImage(event.target.files[0]);
    const file = event.target.files[0];
    if (file) {
      const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (validImageTypes.includes(file?.type)) {
        const data = new FormData();
        data.append('image', event.target.files[0]);
        const image = await postAuthData('/user/uploads', data);
        if (image?.status) {
          setForm({ ...form, image: image?.data?.imageUrl });
        } else {
          toast.error(image?.data?.message || 'Something went wrong!');
          // setSelectedImage({});
        }
      } else {
        toast.error(
          'Invalid file type. Please select a JPEG, PNG, or JPG image.',
        );
        // setSelectedImage({});
      }
    }
  };
  const handleAddQrSubmit = async (e) => {
    e.preventDefault();
    try {
      setFormError({});
      await addQrValidation.validate(form, {
        abortEarly: false,
      });
      const response = await postAuthData('/user/add-qr', form);
      if (response?.status === 200 || response?.status === 201) {
        CloseAddQR();
        toast.success(response?.data?.message);
        setForm({
          image: '',
          qrtype: '',
          upi: '',
        });
        setReftech((pre) => !pre);
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
      image: '',
      qrtype: '',
      upi: '',
    });
    setForm({
      image: '',
      qrtype: '',
      upi: '',
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
          <h4 className="mt-[-0.5rem] text-sm font-bold">
            {/* mt-[-0.5rem] w-16 */}
            Create QR
          </h4>
          <button className="mt-[-0.5rem] font-bold">
            {/* h-4 w-4  mt-[-34px] */}
            <RxCross2 className="" onClick={handleReset} />
          </button>
        </div>
        <div className="relative w-full max-w-md mx-auto shadow-md rounded-b-lg bg-white px-4 py-4 ">
          <div className=" grid grid-cols-1 gap-1 text-slate-800">
            <div>
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                style={{ display: 'none' }} // Hide the input element
                onChange={handleFileInputChange}
              />

              <label htmlFor="fileInput">
                <div className="rounded-lg  relative border border-gray-300 h-36  mt-2 my-2 flex justify-between  items-end">
                  <img
                    src={form.image ? form.image : '/qr.webp'}
                    alt="image"
                    className="w-full  h-full"
                  />
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

            <label className="mx-2 text-sm">QR Type</label>

            <select
              className="rounded-sm border border-gray-300 p-2 mx-2 my-2 bg-transparent"
              name="qrtype"
              value={form.qrtype}
              onChange={handleChange}
            >
              <option value={'Paytm'}>Paytm</option>
              <option value={'G-Pay'}>G-Pay</option>
              <option value={'Phone-Pay'}>Phone-Pay</option>
            </select>
            {formError?.qrtype && (
              <div className="text-14 mx-2 font-normal  text-red-700">
                {formError?.qrtype}
              </div>
            )}

            <label className="mx-2 text-sm">Upi ID</label>
            <input
              className="rounded-sm border border-gray-300 h-8 p-2 mx-2 my-2"
              placeholder="Enter upi id"
              name="upi"
              value={form.upi}
              onChange={handleChange}
            />

            {formError?.upi && (
              <div className="text-14 mx-2 font-normal  text-red-700">
                {formError?.upi}
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
AddQr.propTypes = {
  isOpenAddQR: PropTypes.bool.isRequired,
  CloseAddQR: PropTypes.func.isRequired,
  setReftech: PropTypes.func,
};
export default AddQr;
