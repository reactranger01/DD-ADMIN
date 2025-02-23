/* eslint-disable react-hooks/exhaustive-deps */
import { getAuthData, isLoggedIn } from '@/utils/apiHandlers';
import { reactIcons } from '@/utils/icons';
import { Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { PiListBulletsFill } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { numberWithCommas } from '@/utils/numberWithCommas';

const UserPoints = ({ isTimerActive }) => {
  const naviagte = useNavigate();
  const Owner_Ap = localStorage.getItem('owner_ap');
  const multipliedAP = Owner_Ap ? Number(Owner_Ap === '100' ? 1 : Owner_Ap) : 0;
  const [isLoading, setIsLoading] = useState(false);
  const [runnerBetList, setRunnerBetList] = useState([]);
  const [userBetList, setUserBetList] = useState([]);
  const [matchData] = useState(() => {
    const localData = localStorage.getItem('Net_Expossure_Match');
    return JSON.parse(localData);
  });
  useEffect(() => {
    handleGetEvents();
  }, [
    matchData?.matchId,
    matchData?.market,
    matchData?.selectionId,
    matchData?.sportsId,
    Owner_Ap,
    isTimerActive,
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
        (r) => r.RunnerId === runner.RunnerId,
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
    };
  });
  console.log(isLoading);

  return (
    <>
      <div className="w-full my-6">
        <div className="flex justify-between text-sm whitespace-nowrap">
          <div className="w-4/12"></div>
          <div className="w-2/12 text-center">User Point</div>
          {runnerBetList &&
            runnerBetList?.map((item, index) => {
              return (
                <div key={index} className="w-3/12 text-center">
                  {item?.Name}
                </div>
              );
            })}
        </div>
        <div className="bg-[#44227F] p-0.5 text-white mt-1">
          {' '}
          <div className="flex items-center justify-between">
            <div className="flex  items-center">
              <span className="ml-2 text-sm">
                {matchData?.sportsName} | {matchData?.competition}:{' '}
                {matchData?.event}
              </span>
            </div>

            <div className="text-[#6DE135] w-[15%] font-bold text-14 mx-2 flex gap-1 items-center">
              {reactIcons.play}
              In-Play
            </div>
          </div>
        </div>
        <div className="flex justify-between bg-white text-sm">
          <div className="bg-[#5059A7] p-1 w-4/12">
            <div className="flex items-center justify-between">
              <div>{matchData?.market}</div>
              <div className="flex space-x-4 text-[#CAE0E8]"></div>
            </div>
          </div>
          <div className="w-2/12 text-center"></div>
          {totalRunnersPL?.map((runner, index) => {
            const textColor =
              runner.totalPL >= 0 ? 'text-green-500' : 'text-red-500';
            return (
              <div
                className={`${textColor} w-3/12 text-center font-semibold`}
                key={index}
              >
                {Number.isInteger(Number(runner.totalPL))
                  ? Number(runner.totalPL)
                  : Number(runner.totalPL).toFixed(2)}{' '}
                (P) [
                {Number.isInteger(Number(runner.totalPLINR))
                  ? Number(runner.totalPLINR)
                  : Number(runner.totalPLINR).toFixed(2)}{' '}
                (C)]
              </div>
            );
          })}
        </div>
        <div className="flex items-center text-sm mt-1">
          <span
            className="text-[#1BDDD4] cursor-pointer"
            onClick={() => naviagte(-1)}
          >
            Net Exposure
          </span>
          <span className="mx-1">{reactIcons.right}</span>
          <span className="mx-1"> {matchData?.event}</span>
          <span className="mx-1">- {matchData?.market}</span>
        </div>

        {userBetList &&
          userBetList.map((item, index) => {
            return (
              <div className="flex mt-2" key={index}>
                <div className="w-24"></div>
                <div className="bg-gray-500 p-2 w-full">
                  <div className="flex justify-between text-sm">
                    <div
                      className="flex justify-between items-start gap-1"
                      style={{ width: 'calc(33.33% - 6rem)' }}
                      onClick={() => {
                        naviagte(`/net_exposure-user-bets/${item?.UserId}`, {
                          state: { data: matchData },
                        });
                      }}
                    >
                      {' '}
                      <span>{item?.Username}</span>{' '}
                      <span className=" text-[#2CE5DD]">
                        <Tooltip
                          title={<div className="">Bet Breakdown</div>}
                          enterTouchDelay={0}
                        >
                          <PiListBulletsFill className="w-4 h-4 mt-[3px]" />
                        </Tooltip>
                      </span>
                    </div>
                    <div className="w-2/12 text-center">{item?.UserPoint}</div>
                    {item?.RunnersPL &&
                      item?.RunnersPL?.map((runners, index) => {
                        const textColor =
                          runners?.RunnerPL >= 0
                            ? 'text-green-500'
                            : 'text-red-500';
                        return (
                          <div
                            className={`${textColor} w-3/12 text-center font-semibold`}
                            key={index}
                          >
                            {numberWithCommas(
                              (runners?.RunnerPL || 0).toFixed(2),
                            )}{' '}
                            (P) [
                            {numberWithCommas(
                              (runners?.RunnerPLINR || 0).toFixed(2),
                            )}{' '}
                            (C)]
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};
UserPoints.propTypes = {
  matchData: PropTypes.object.isRequired,
  isTimerActive: PropTypes.any,
};

export default UserPoints;
