/* eslint-disable react-hooks/exhaustive-deps */
import { getAuthData, isLoggedIn } from '@/utils/apiHandlers';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Loading from '@/components/Loading';

const SessionuserPoints = ({ isTimerActive }) => {
  const Owner_Ap = localStorage.getItem('owner_ap');
  const multipliedAP = Owner_Ap ? Number(Owner_Ap === '100' ? 1 : Owner_Ap) : 0;
  const [isLoading, setIsLoading] = useState(false);
  const [runnerBetList, setRunnerBetList] = useState([]);
  const [ontimeLoader, setOneTimeLoader] = useState(true);
  const [matchData] = useState(() => {
    const localData = localStorage.getItem('Net_Expossure_Match');
    return JSON.parse(localData);
  });
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

  const handleGetEvents = async () => {
    const islogin = isLoggedIn();
    setIsLoading(true);
    if (islogin) {
      const queryParams = new URLSearchParams({
        gameType: matchData?.market,
        eventId: matchData?.matchId,
        gameId: matchData?.sportsId,
        commision: multipliedAP,
        selectionId: matchData?.selectionId,
      });
      const endpoint = `/user/getsessionpluserwise?${queryParams.toString()}`;
      try {
        const response = await getAuthData(endpoint);
        // const response = await getAuthData(
        //   `/user/getsessionpluserwise?gameType=${matchData?.market}&eventId=${matchData?.matchId}&gameId=${matchData?.sportsId}&commision=${multipliedAP}&selectionId=${matchData?.selectionId}`,
        // );
        const { status } = response;
        if (status === 201 || status === 200) {
          setIsLoading(false);
          setRunnerBetList(response?.data || []);
          setOneTimeLoader(false);
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
  const allPositions = [
    ...new Set(
      (Array.isArray(runnerBetList) ? runnerBetList : []).flatMap((user) =>
        Array.isArray(user.profitLossResults)
          ? user.profitLossResults.map((result) => result.position)
          : [],
      ),
    ),
  ].sort((a, b) => a - b);

  const enrichedRunnerBetList = runnerBetList?.map((user) => {
    const allPointValues = user.profitLossResults.map((res) => res.PointValue);
    const allInrValues = user.profitLossResults.map((res) => res.InrValue);

    return {
      ...user,
      minResult: {
        PointValue: Math.min(...allPointValues),
        InrValue: Math.min(...allInrValues),
      },
      maxResult: {
        PointValue: Math.max(...allPointValues),
        InrValue: Math.max(...allInrValues),
      },
    };
  });

  return (
    <>
      {isLoading && ontimeLoader && <Loading />}
      <div className="w-full h-full overflow-auto text-xs">
        <table className="min-w-max table-auto border-collapse">
          {/* Table Header */}
          <thead className="bg-primary-2000">
            <tr>
              <th className="left-0 text-black p-2 w-24">Users</th>
              <th className="left-16 text-black p-2 w-24">User Points</th>
              {allPositions?.map((position) => (
                <th key={position} className="text-black p-2 w-32">
                  {position}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {enrichedRunnerBetList?.map((user, userIdx) => (
              <tr key={userIdx} className="bg-[#0f033d]">
                <td className="text-center text-white p-2">{user.username}</td>
                <td className="text-center text-white p-2">
                  {user.userPoints}
                </td>
                {allPositions?.map((position) => {
                  const result = user.profitLossResults.find(
                    (res) => res.position === position,
                  );

                  // Determine fallback value
                  const fallback =
                    position < Math.min(...allPositions)
                      ? user.minResult // Use the lowest values for lower positions
                      : user.maxResult; // Use the highest values for higher positions

                  return (
                    <td key={position} className="p-2 text-center">
                      {result ? (
                        <span
                          className={`${
                            result.PointValue >= 0
                              ? 'text-green-300'
                              : 'text-red-600'
                          } text-12`}
                        >
                          {parseFloat(result.PointValue) % 1 !== 0
                            ? Number(result.PointValue).toFixed(2)
                            : Number(result.PointValue)}
                          (P) [
                          {parseFloat(result.InrValue) % 1 !== 0
                            ? Number(result.InrValue).toFixed(2)
                            : Number(result.InrValue)}
                          (C) ]
                        </span>
                      ) : (
                        <span
                          className={`${
                            fallback.PointValue >= 0
                              ? 'text-green-300'
                              : 'text-red-600'
                          } text-12`}
                        >
                          {Number(fallback.PointValue)} (P) [
                          {Number(fallback.InrValue)} (C)]
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
SessionuserPoints.propTypes = {
  matchData: PropTypes.object.isRequired,
  isTimerActive: PropTypes.bool,
};

export default SessionuserPoints;
