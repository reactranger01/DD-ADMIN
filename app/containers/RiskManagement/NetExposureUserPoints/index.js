/* eslint-disable react-hooks/exhaustive-deps */
import UserPoints from '@/components/NetExposureComponents/UserPoints';
import React, { useState } from 'react';

const NetExposureUserPoints = () => {
  const [matchData] = useState(() => {
    const localData = localStorage.getItem('Net_Expossure_Match');
    return JSON.parse(localData);
  });

  return (
    <div className="bg-white text-black p-8">
      <span className="text-2xl">Net Exposure</span>
      <div className="bg-[#CAE0E8] p-0.5"></div>

      <UserPoints matchData={matchData} />
    </div>
  );
};

export default NetExposureUserPoints;
