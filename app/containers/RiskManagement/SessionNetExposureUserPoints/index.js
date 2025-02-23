/* eslint-disable react-hooks/exhaustive-deps */
import SessionuserPoints from '@/components/NetExposureComponents/SessionuserPoints';
import React, { useState } from 'react';

const SessionNetExposureUserPoints = () => {
  const [matchData] = useState(() => {
    const localData = localStorage.getItem('Net_Expossure_Match');
    return JSON.parse(localData);
  });

  return (
    <div className="bg-white text-black p-8">
      <span className="text-2xl">Net Exposure</span>
      <div className="bg-[#CAE0E8] p-0.5"></div>
      <div className="flex gap-1 my-1 text-sm">
        <input type="radio" className="text-white mx-1" />
        <span> My PT</span>
        <input type="radio" className="text-white mx-1" />
        <span> Total Book</span>
      </div>
      <SessionuserPoints matchData={matchData} />
    </div>
  );
};

export default SessionNetExposureUserPoints;
