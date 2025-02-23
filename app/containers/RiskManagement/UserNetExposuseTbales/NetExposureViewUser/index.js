/* eslint-disable react-hooks/exhaustive-deps */
import { reactIcons } from '@/utils/icons';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NetExposureTbaleUser from '@/components/TablesUser/NetExposureTbaleUser';

const NetExposureViewUser = () => {
  const naviagte = useNavigate();
  const [matchData] = useState(() => {
    const localData = localStorage.getItem('Net_Expossure_Match');
    const parsedData = localData ? JSON.parse(localData) : null;
    return parsedData;
  });

  return (
    <div className="bg-white text-black p-8">
      <span className="text-2xl">Net Exposure</span>
      <div className="bg-[#CAE0E8] p-0.5"></div>
      <div className="flex items-center text-sm my-1">
        <span
          className="text-[#1BDDD4] cursor-pointer"
          onClick={() => naviagte(-1)}
        >
          Net Exposure
        </span>
        <span className="mx-1">{reactIcons.right}</span>
        <span className="mx-1">{matchData?.event}</span>
        <span className="mx-1">- {matchData?.market}</span>
      </div>
      <div>
        <NetExposureTbaleUser matchData={matchData} />
      </div>
    </div>
  );
};

export default NetExposureViewUser;
