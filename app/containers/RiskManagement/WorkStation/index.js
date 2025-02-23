import NetExposureTbale from '@/components/NetExposureComponents/Table/NetExposureTbale';
import UserPoints from '@/components/NetExposureComponents/UserPoints';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthData, isLoggedIn } from '@/utils/apiHandlers';
import { Loading } from '@/components';
import { IoIosList } from 'react-icons/io';
import DisplayOdds from '@/components/NetExposureComponents/DisplayOdds';
import DisplayOddsBookmaker from '@/components/NetExposureComponents/DisplayOddsBookmaker';

const WorkStation = () => {
  const Owner_Ap = localStorage.getItem('owner_ap');
  const multipliedAP = Owner_Ap ? Number(Owner_Ap === '100' ? 1 : Owner_Ap) : 0;
  const [isLoading, setIsLoading] = useState(false);
  const [runnerBetList, setRunnerBetList] = useState([]);
  const [userBetList, setUserBetList] = useState([]);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRefresh, setSelectedRefresh] = useState();
  const [matchData] = useState(() => {
    const localData = localStorage.getItem('Net_Expossure_Match');
    return JSON.parse(localData);
  });
  const [timer, setTimer] = useState(5);
  const [intervalTime, setIntervalTime] = useState(5);
  const [isTimerActive, setIsTimerActive] = useState(false);
  useEffect(() => {
    handleGetEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    matchData?.matchId,
    matchData?.market,
    matchData?.selectionId,
    matchData?.sportsId,
    Owner_Ap,
  ]);

  const handleGetEvents = async () => {
    const islogin = isLoggedIn();
    setIsLoading(true);
    if (islogin) {
      try {
        const marketWiseData =
          matchData?.market == 'bookmaker'
            ? 'GetBMUserWisePLData'
            : 'Getuserwisepldata';
        const response = await getAuthData(
          `/user/${marketWiseData}?market=${
            matchData?.market == 'Match Odds' ? 'Match-Odds' : matchData?.market
          }&matchId=${matchData?.matchId}&sportId=${
            matchData?.sportsId
          }&commision=${multipliedAP}`,
        );
        const { status } = response;
        if (status === 201 || status === 200) {
          setIsLoading(false);
          setRunnerBetList(response?.data?.Data?.RunnerList);
          setUserBetList(response?.data?.Data?.UserPLData);
        } else {
          setIsLoading(false);
        }
      } catch (e) {
        setIsLoading(false);
        console.error(e);
        return null;
      }
    }
  };

  const totalRunnersPL = runnerBetList?.map((runner) => {
    let totalPL = 0;
    let totalPLINR = 0;
    userBetList.forEach((user) => {
      const matchingRunner = user.RunnersPL.find(
        (r) => r.RunnerId == runner.RunnerId,
      );
      if (matchingRunner) {
        totalPL += matchingRunner?.RunnerPL || 0;
        totalPLINR += matchingRunner?.RunnerPLINR || 0;
      }
    });

    return {
      runnerName: runner.Name,
      totalPL: totalPL.toFixed(2),
      totalPLINR: totalPLINR.toFixed(2),
      RunnerId: runner.RunnerId,
    };
  });
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const isRefresh = localStorage.getItem('isRefreshexp');

  useEffect(() => {
    if (isRefresh) {
      setSelectedRefresh(isRefresh);
    }
  }, [isRefresh]);
  const handleSelect = (option) => {
    localStorage.setItem('isRefreshexp', option);
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

  return (
    <>
      {isLoading && <Loading />}
      <div className="bg-white text-black p-8">
        <span className="text-2xl">{matchData?.event}</span>
        <div className="w-full my-2 flex flex-col md:flex-row justify-between  gap-2">
          {/* Radio buttons section */}{' '}
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
              <div className="w-6 h-6 text-center bg-primary-btn2">{timer}</div>
            )}
            <div className="flex gap-2 mt-2 md:mt-0">
              <button
                onClick={() => window.location.reload()}
                className="py-1 px-2 bg-gray-500 text-white text-xs md:text-sm rounded-md"
              >
                Refresh
              </button>
            </div>
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
            {matchData?.market == 'bookmaker' ? (
              <DisplayOddsBookmaker
                isTimerActive={isTimerActive}
                totalRunnersPL={totalRunnersPL}
              />
            ) : (
              <DisplayOdds
                isTimerActive={isTimerActive}
                totalRunnersPL={totalRunnersPL}
              />
            )}
          </div>
          <div className="xl:w-1/2 bg-slate-300 my-2 overflow-scroll">
            <UserPoints
              isTimerActive={isTimerActive}
              intervalTime={intervalTime}
            />
          </div>
        </div>
        <div>
          <NetExposureTbale isTimerActive={isTimerActive} />
        </div>
      </div>
    </>
  );
};

export default WorkStation;
