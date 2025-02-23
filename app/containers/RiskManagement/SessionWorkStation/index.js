import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SessionDisplayOdds from '@/components/NetExposureComponents/SessionDisplayOdds';
import SessionuserPoints from '@/components/NetExposureComponents/SessionuserPoints';
import SessionNetExposureTable from '@/components/NetExposureComponents/Table/SessionNetExposureTable';
import { IoIosList } from 'react-icons/io';

const SessionWorkStation = () => {
  const navigate = useNavigate();
  const [selectedRefresh, setSelectedRefresh] = useState();
  const [matchData] = useState(() => {
    const localData = localStorage.getItem('Net_Expossure_Match');
    return JSON.parse(localData);
  });
  const [timer, setTimer] = useState(5);
  const [intervalTime, setIntervalTime] = useState(5);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const isRefresh = localStorage.getItem('isRefreshexpsession');

  useEffect(() => {
    if (isRefresh) {
      setSelectedRefresh(isRefresh);
    }
  }, [isRefresh]);
  const handleSelect = (option) => {
    localStorage.setItem('isRefreshexpsession', option);
    setIsOpen(false);
    if (option === 'Frequent refresh') {
      setIntervalTime(5);
      setTimer(5);
    } else {
      setIntervalTime(null);
      setTimer(null);
    }
  };
  useEffect(() => {
    if (intervalTime === null) return;
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          handleTimerEnd();
          return intervalTime;
        } else {
          return prevTimer - 1;
        }
      });
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intervalTime]);
  const handleTimerEnd = () => {
    setIsTimerActive((prev) => !prev);
    setTimer(intervalTime);
  };
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="bg-white text-black p-8">
      <span className="text-2xl">{matchData?.event}</span>
      <div className="w-full my-2 flex justify-between">
        <div className="relative">
          <button onClick={toggleMenu} className="relative">
            <IoIosList className="text-white w-6 h-6" />
          </button>
          {isOpen && (
            <div className="absolute left-4 top-full mt-2 w-48 shadow-lg bg-white text-black ring-1 ring-black ring-opacity-5 z-10">
              <div className="py-1">
                <div
                  onClick={() => handleSelect('Frequent refresh')}
                  className={`cursor-pointer flex items-center px-4 py-1 border border-b-gray-400 text-sm ${
                    selectedRefresh === 'Frequent refresh'
                      ? 'font-bold'
                      : 'font-normal'
                  } hover:bg-gray-100`}
                >
                  <input
                    type="radio"
                    checked={selectedRefresh === 'Frequent refresh'}
                    readOnly
                    className="mr-2"
                  />
                  Frequent refresh
                </div>
                <div
                  onClick={() => handleSelect('Regular refresh')}
                  className={`cursor-pointer flex items-center px-4 py-1 text-sm ${
                    selectedRefresh === 'Regular refresh'
                      ? 'font-bold'
                      : 'font-normal'
                  } hover:bg-gray-100`}
                >
                  <input
                    type="radio"
                    checked={selectedRefresh === 'Regular refresh'}
                    readOnly
                    className="mr-2"
                  />
                  Regular refresh
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex gap-1 items-center">
          {selectedRefresh === 'Frequent refresh' && (
            <div className="w-7 h-7 text-center bg-primary-btn2">{timer}</div>
          )}
          <button
            onClick={() => window.location.reload()}
            className="py-1 px-2 bg-[#A222AD] text-sm"
          >
            Refresh
          </button>
        </div>
      </div>
      <div className="bg-[#CAE0E8] p-0.5"></div>
      <div className="mt-1">
        <span className="text-xs text-[#1BDDD4]" onClick={() => navigate(-1)}>
          Net Exposure
        </span>
      </div>
      <div className="flex flex-col xl:flex-row gap-2">
        <div className="xl:w-1/2 my-2">
          <SessionDisplayOdds
            matchData={matchData}
            isTimerActive={isTimerActive}
          />
        </div>
        <div className="xl:w-1/2 bg-slate-300 my-2 ">
          <SessionuserPoints
            matchData={matchData}
            isTimerActive={isTimerActive}
          />
        </div>
      </div>
      <div>
        <SessionNetExposureTable
          matchData={matchData}
          isTimerActive={isTimerActive}
        />
      </div>
    </div>
  );
};

export default SessionWorkStation;
