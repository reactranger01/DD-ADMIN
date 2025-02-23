/* eslint-disable react-hooks/exhaustive-deps */
import { reactIcons } from '@/utils/icons';
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { getAuthData, isLoggedIn } from '@/utils/apiHandlers';
import { intToString } from '@/utils/helperfunc';
import { useNavigate } from 'react-router-dom';

const SessionDisplayOdds = ({ isTimerActive }) => {
  const [matchData] = useState(() => {
    const localData = localStorage.getItem('Net_Expossure_Match');
    return JSON.parse(localData);
  });
  const [sessions, setSessions] = useState([]);
  const eventId = matchData?.matchId;
  const selectionsId = matchData?.selectionId;
  const Owner_Ap = localStorage.getItem('owner_ap');
  const multipliedAP = Owner_Ap ? Number(Owner_Ap === '100' ? 1 : Owner_Ap) : 0;
  const [runnerBetList, setRunnerBetList] = useState([]);
  const timeoutRef = useRef(null);
  const sport = ['Cricket', 'Tennis', 'Soccer'].includes(matchData?.sportsName)
    ? matchData.sportsName.toLowerCase()
    : 'cricket';
  const getSessionsData = async () => {
    try {
      const response = await getAuthData(
        `/catalogue/${sport}/get-catalogue-details?eventId=${eventId}`,
      );
      const { sessionData } = response.data;
      if (sessionData?.catalogue?.[0]?.runners?.length > 0) {
        const filteredData = sessionData.catalogue[0].runners.filter(
          (item) => Number(selectionsId) === Number(item.SelectionId),
        );

        setSessions(filteredData.length > 0 ? filteredData[0] : []);
      } else {
        setSessions([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchDataWithDynamicDelay = async () => {
      getSessionsData();
      const delay = 5000;

      timeoutRef.current = setTimeout(() => {
        fetchDataWithDynamicDelay();
      }, delay);
    };
    fetchDataWithDynamicDelay();
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
    // eslint-disable-next-line
  }, [eventId]);

  useEffect(() => {
    if (
      matchData?.market != undefined &&
      matchData?.matchId != undefined &&
      matchData?.selectionId != undefined &&
      matchData?.sportsId != undefined
    ) {
      handleGetEvents();
    }
  }, [
    matchData?.matchId,
    matchData?.market,
    matchData?.selectionId,
    matchData?.sportsId,
    Owner_Ap,
    isTimerActive,
  ]);

  const navigate = useNavigate();
  useEffect(() => {
    if (
      matchData?.market == undefined ||
      matchData?.matchId == undefined ||
      matchData?.selectionId == undefined ||
      matchData?.sportsId == undefined
    ) {
      navigate(-1);
    }
  }, []);

  const handleGetEvents = async () => {
    const islogin = isLoggedIn();
    if (islogin) {
      try {
        const queryParams = new URLSearchParams({
          gameType: matchData?.market,
          eventId: matchData?.matchId,
          gameId: matchData?.sportsId,
          commision: multipliedAP,
          selectionId: matchData?.selectionId,
        });
        const endpoint = `/user/getsessionPLbyid?${queryParams.toString()}`;
        const response = await getAuthData(endpoint);
        const { status } = response;
        if (status === 201 || status === 200) {
          setRunnerBetList(response?.data || []);
        }
      } catch (e) {
        console.error(e);
        return null;
      }
    }
  };

  return (
    <>
      <div className="bg-slate-300">
        <div className="flex ">
          <h3>{sessions?.RunnerName || matchData?.selectionName} </h3>
          <div className="text-[#6DE135] font-bold text-14 mx-2 flex gap-1 items-center">
            {reactIcons.play}
            In-Play
          </div>
        </div>
        <div className="flex">
          <div className="w-1/2"></div>
          {sessions?.GameStatus === '' || sessions?.GameStatus === 'ACTIVE' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
              <div className="w-20 h-14 bg-[#FFE5EB]  text-black justify-center col-start-3 col-end-4">
                <div className="text-center font-semibold text-sm mt-1">
                  {sessions?.LayPrice1 || '-'}
                </div>
                <div className="text-center  text-sm mt-1">
                  {intToString(sessions?.LaySize1 || '')}
                </div>
              </div>
              <div className="w-20 h-14 bg-[#CCE5F7]  text-black justify-center col-start-4 col-end-5">
                <div className="text-center font-semibold text-sm mt-1">
                  {sessions?.BackPrice1 || '-'}
                </div>
                <div className="text-center  text-sm mt-1">
                  {intToString(sessions?.BackSize1 || '')}
                </div>
              </div>
            </div>
          ) : (
            <div className=" grid grid-cols-2   relative">
              <div className="w-20 h-14 bg-[#CCE5F7] text-black justify-center"></div>
              <div className="w-20 h-14 bg-[#FFE5EB] text-black justify-center"></div>
              <div className="absolute text-black font-semibold  flex justify-center items-center w-40 h-14">
                {sessions?.GameStatus}
              </div>
            </div>
          )}
        </div>
        <div className="w-full overflow-auto">
          <table className="min-w-max table-auto border-collapse p-2 border border-white rounded-md text-sm">
            <thead>
              <tr>
                {runnerBetList &&
                  runnerBetList != 'No bets found' &&
                  runnerBetList.map((col, idx) => (
                    <th
                      key={idx}
                      className={`${
                        col?.PointValue >= 0 ? 'bg-green-500' : 'bg-red-500'
                      } text-white p-1 min-w-[120px] border border-white  text-sm`}
                    >
                      {col?.position}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {runnerBetList &&
                  runnerBetList != 'No bets found' &&
                  runnerBetList.map((point, idx) => (
                    <td
                      key={idx}
                      className={`${
                        point?.PointValue >= 0
                          ? 'text-green-800'
                          : 'text-red-500'
                      } p-1 min-w-[120px] text-center border border-white`}
                    >
                      <span>
                        {Number.isInteger(Number(point?.PointValue))
                          ? Number(point?.PointValue)
                          : Number(point?.PointValue).toFixed(2)}{' '}
                        (P) [
                        {Number.isInteger(Number(point?.InrValue))
                          ? Number(point?.InrValue)
                          : Number(point?.InrValue).toFixed(2)}{' '}
                        (C)]
                        {/* {point?.PointValue}(P) [ {point?.InrValue}(C)] */}
                      </span>
                    </td>
                  ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
SessionDisplayOdds.propTypes = {
  matchData: PropTypes.object.isRequired,
  isTimerActive: PropTypes.bool,
};
export default SessionDisplayOdds;
