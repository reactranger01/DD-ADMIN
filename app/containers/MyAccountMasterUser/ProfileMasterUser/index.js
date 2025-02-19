/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { getAuthData, isLoggedIn } from '@/utils/apiHandlers';
import { useParams } from 'react-router-dom';
function ProfileMasterUser() {
  const { id } = useParams();
  const [userid, setUserid] = useState(null);

  useEffect(() => {
    const [userIdPart] = id.split('-').map((part) => parseInt(part));
    setUserid(userIdPart);
  }, [id]);
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    getUserDetails();
  }, [getUserDetails]);
  const getUserDetails = useCallback(async () => {
    const islogin = isLoggedIn();
    if (islogin && userid) {
      try {
        const response = await getAuthData(
          `/user/get-particuleruser-details?id=${userid}`,
        );
        if (response?.status === 201 || response?.status === 200) {
          setUserInfo(response?.data);
        } else {
          console.error('error');
        }
      } catch (e) {
        console.error(e);
        return null;
      }
    }
  }, [userid]);
  return (
    <div className=" bg-white border rounded-sm shadow-md">
      <div className="font-bold text-lg pb-2 bg-[#071535] w-full rounded-t-sm ">
        <h7 className="ml-2">Account Details </h7>
      </div>
      <div className="grid grid-cols-1 gap-1 border border-slate-300 font-bold text-xs text-black ">
        <div className="flex p-2 border-b border-slate-300">
          <div className="  mb-2  w-60">Name</div>
          <p className="">{userInfo?.username}</p>
        </div>

        <div className="flex p-2 border-b border-slate-300">
          <div className="  mb-2 w-60">Currency</div>
          <p>INR</p>
        </div>
        <div className="flex p-2 border-b border-slate-300">
          <div className="  mb-2 w-60">Balance</div>
          <p>{userInfo?.balance}</p>
        </div>

        <div className="flex p-2 border-b border-slate-300">
          <div className="  mb-2 w-60">Exposure Limit</div>
          <p className="">{userInfo?.exposureAmount}</p>
        </div>
        <div className="flex p-2 border-b border-slate-300">
          <div className="  mb-2 w-60">Partnership</div>
          <p>{userInfo?.ap}</p>
        </div>
        <div className="flex p-2 border-b border-slate-300">
          <div className="  mb-2 w-60">Mobile Number</div>
          <p>{userInfo?.phoneNumber}</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileMasterUser;
