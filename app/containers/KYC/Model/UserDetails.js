/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { RxCross2 } from 'react-icons/rx';
import { FaCheck } from 'react-icons/fa';
import ImageView from './ImageView';
import { putAuthData } from '@/utils/apiHandlers';
import { toast } from 'react-toastify';
import { isYupError, parseYupError } from '@/utils/Yup';
import { rejectionValidation } from '@/utils/validation';
const UserDetails = ({ userDetails, ClosedUserDetails, data, setReftech }) => {
  const [isrejected, setIsRejected] = useState(false);
  const [viewImage, setViewImage] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [form, setForm] = useState({});
  const [formError, setFormError] = useState({});

  useEffect(() => {
    setForm({ ...form, userId: data.userid });
  }, [data]);

  const userDetailsHandelar = (url) => {
    setViewImage(true);
    setImageUrl(url);
  };

  const rejectClick = () => {
    setIsRejected(true);
  };

  const handleRejectSubmit = async (e) => {
    e.preventDefault();
    try {
      setFormError({});
      await rejectionValidation.validate(form, {
        abortEarly: false,
      });
      const response = await putAuthData('/user/reject-kyc', form);
      if (response?.status === 200 || response?.status === 201) {
        setReftech((pre) => !pre);
        toast.success('KYC Rejected');
        ClosedUserDetails();
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
  const handleApprovedSubmit = async (e) => {
    e.preventDefault();
    const response = await putAuthData('/user/approve-kyc', form);
    if (response?.status === 200 || response?.status === 201) {
      setReftech((pre) => !pre);
      toast.success('KYC Approved');
      ClosedUserDetails();
    } else {
      toast.error(response?.data || 'Something went wrong');
    }
  };

  const handleRest = () => {
    ClosedUserDetails();
    setIsRejected(false);
    setViewImage(false);
    setForm({
      reason: '',
    });
    setFormError({
      reason: '',
    });
  };
  return (
    <div
      className={
        userDetails
          ? 'fixed inset-0 bg-gray-500 bg-opacity-75 overflow-y-auto px-4 py-20 sm:px-0  font-semibold text-gray-700 z-10'
          : 'hidden'
      }
    >
      <div className="text-sm font-bold text-center h-4 rounded-t-lg bg-[#071535] relative w-full max-w-5xl mx-auto shadow-md px-8 py-4 row  flex justify-between items-center text-white">
        <h4 className=" w-20 ">KYC Details</h4>
        <button className="">
          <RxCross2 className="h-4 w-4" onClick={handleRest} />
        </button>
      </div>
      <div className="relative w-full max-w-5xl mx-auto shadow-md rounded-b-lg bg-slate-100 px-2 py-2 ">
        <div className="flex gap-2">
          <div className="border border-slate-400 rounded-md p-2">
            <h1>Personal Details</h1>
            <div className="grid grid-col-1 gap-2 my-2 text-base">
              <div className="flex">
                <div className="flex items-center gap-2">
                  <span>
                    <FaCheck className="btn-gren" />
                  </span>
                  <div className="font-medium w-32">Full Name</div>
                </div>
                <div className=" font-normal">{data.fullname}</div>
              </div>
              <div className="flex">
                <div className="flex items-center gap-2">
                  <span>
                    <FaCheck className="btn-gren" />
                  </span>
                  <div className="font-medium w-32">UserName</div>
                </div>
                <div className=" font-normal">{data.username}</div>
              </div>
              <div className="flex">
                <div className="flex items-center gap-2">
                  <span>
                    <FaCheck className="btn-gren" />
                  </span>
                  <div className="font-medium  w-32">Email ID</div>
                </div>
                <div className=" font-normal">
                  {data.email ? data.email : '-'}
                </div>
              </div>
              <div className="flex">
                <div className="flex items-center gap-2">
                  <span>
                    <FaCheck className="btn-gren" />
                  </span>
                  <div className="font-medium  w-32">DOB </div>
                </div>
                <div className=" font-normal"> {data.dob ? data.dob : '-'}</div>
              </div>
              <div className="flex">
                <div className="flex items-center gap-2">
                  <span>
                    <FaCheck className="btn-gren" />
                  </span>
                  <div className="font-medium w-32">Mobile No.</div>
                </div>
                <div className=" font-normal">{data?.phone_number}</div>
              </div>
              {data?.reason && (
                <div className="">
                  <div className="flex items-center gap-2">
                    <span>
                      <FaCheck className="btn-gren" />
                    </span>
                    <div className="font-medium  w-32">Rejection Reason </div>
                  </div>
                  <div className=" font-normal">{data?.reason}</div>
                </div>
              )}
              {isrejected && !data?.reason ? (
                <div className="px-3">
                  <div className="font-medium mx-2">Rejection description</div>
                  <textarea
                    onChange={(e) =>
                      setForm({ ...form, reason: e.target.value })
                    }
                    className="border border-gray-400 rounded-md my-2 mx-2 font-normal h-32 w-64 p-1 "
                  ></textarea>
                  {formError?.reason && (
                    <div className="text-14 mx-2 mb-2 font-normal  text-red-700">
                      {formError?.reason}
                    </div>
                  )}
                </div>
              ) : (
                ' '
              )}
            </div>
          </div>
          <div className=" border border-slate-400 rounded-md p-2">
            <h1>Document </h1>
            <div className="grid grid-cols-3 gap-2 my-2 text-base">
              <div className=" col-span-2 ">
                <div className="flex justify-start items-center gap-2">
                  <span>
                    <FaCheck className="btn-gren" />
                  </span>
                  <div className="font-medium">{data?.documentname} </div>
                </div>
                <div className="flex">
                  <div className="flex border border-gray-400 mt-1 overflow-hidden">
                    {data.frontimage && (
                      <div
                        className=" cursor-pointer transition-transform transform-gpu hover:scale-105"
                        onClick={() => userDetailsHandelar(data.frontimage)}
                      >
                        <img
                          className="w-60 h-44"
                          src={data.frontimage}
                          alt="aadharcard"
                        />{' '}
                      </div>
                    )}
                  </div>
                  <div className="flex border border-gray-400 mt-1 overflow-hidden ">
                    {data.backimage && (
                      <div
                        className=" cursor-pointer transition-transform transform-gpu hover:scale-105"
                        onClick={() => userDetailsHandelar(data.backimage)}
                      >
                        <img
                          src={data.backimage}
                          className="w-60 h-44"
                          alt="aadharcard"
                        />{' '}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between p-2 ">
          {data.isapproved === 'pending' && (
            <div className="flex gap-4 items-center ">
              {isrejected ? (
                <>
                  <button
                    className="w-28 h-10 rounded-md p-2 bg-red-700  text-white"
                    onClick={handleRejectSubmit}
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => setIsRejected(false)}
                    className="w-28 h-10  rounded-md p-2 bg-[#071535]  text-white"
                  >
                    Back
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="w-28 h-10 rounded-md p-2 bg-red-700  text-white"
                    onClick={rejectClick}
                  >
                    Reject
                  </button>
                  <button
                    onClick={handleApprovedSubmit}
                    className="w-28 h-10  rounded-md p-2  bg-green-700 text-white"
                  >
                    Appproved
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
      <ImageView
        viewImage={viewImage}
        ClosedImageView={() => {
          setViewImage(false);
        }}
        imageUrl={imageUrl}
      />
    </div>
  );
};
UserDetails.propTypes = {
  userDetails: PropTypes.bool.isRequired,
  ClosedUserDetails: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  setReftech: PropTypes.func.isRequired,
};

export default UserDetails;
