import { getAuthData, isLoggedIn } from '@/utils/apiHandlers';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { intToString } from '@/utils/helperfunc';
import { numberWithCommas } from '@/utils/numberWithCommas';
import { reactIcons } from '@/utils/icons';
import Loading from '@/components/Loading';

const DisplayOddsBookmaker = ({ totalRunnersPL }) => {
  const [matchData] = useState(() => {
    const localData = localStorage.getItem('Net_Expossure_Match');
    return JSON.parse(localData);
  });
  const islogin = isLoggedIn();
  const Owner_Ap = localStorage.getItem('owner_ap');
  const multipliedAP = Owner_Ap ? Number(Owner_Ap === '100' ? 1 : Owner_Ap) : 0;
  const [isLoading, setIsLoading] = useState(false);
  const [runnerBetList, setRunnerBetList] = useState([]);
  console.log(isLoading);
  useEffect(() => {
    let interval; // Declare interval outside

    const fetchEvents = async () => {
      await handleGetEvents();

      interval = setInterval(() => {
        handleGetEvents();
      }, 3000);
    };
    fetchEvents();
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    matchData?.matchId,
    matchData?.market,
    matchData?.selectionId,
    matchData?.sportsId,
  ]);

  const handleGetEvents = async () => {
    if (islogin) {
      try {
        const response = await getAuthData(
          `/user/GetBMRunnerAndPLData?market=${
            matchData?.market == 'Match Odds' ? 'Match-Odds' : matchData?.market
          }&matchId=${matchData?.matchId}&sportId=${
            matchData?.sportsId
          }&commision=${multipliedAP}`,
        );
        const { status } = response;
        if (status === 201 || status === 200) {
          setIsLoading(false);
          setRunnerBetList(response?.data?.data);
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
  const getUpdatedRunnerPL = (runnerDetails) => {
    const matchingPL = totalRunnersPL.find(
      (pl) => pl.runnerName == runnerDetails.runnerName,
    );
    return matchingPL
      ? matchingPL
      : {
          totalPL: runnerDetails.RunnerPL,
          totalPLINR: runnerDetails.RunnerPLINR,
        };
  };
  return (
    <>
      {isLoading && <Loading />}
      <div className="  p-2 bg-slate-300">
        <div className="flex">
          <h3>{runnerBetList?.catalogue?.[0]?.marketName} </h3>
          <div className="text-[#6DE135] font-bold text-14 mx-2 flex gap-1 items-center">
            {reactIcons.play}
            In-Play
          </div>
        </div>
        {runnerBetList?.catalogue?.[0]?.runners.length > 0 ? (
          <>
            {' '}
            {runnerBetList &&
              runnerBetList?.catalogue?.[0].runners &&
              runnerBetList?.catalogue?.[0]?.runners?.map((items, index) => {
                const { totalPL, totalPLINR } = getUpdatedRunnerPL(items);
                const textColor =
                  totalPL >= 0 ? 'text-green-500' : 'text-red-500';
                return (
                  <div className="border border-white flex" key={index}>
                    <div className="flex-1 text-[#333333] pl-2 text-14  font-semibold">
                      <div className="text-white"> {items?.runnerName}</div>
                      <div className={`${textColor}`}>
                        {' '}
                        {numberWithCommas(totalPL || 0)} (P) [
                        {numberWithCommas(totalPLINR || 0)} (C)]
                      </div>
                    </div>
                    {items?.status === '' || items?.status === 'ACTIVE' ? (
                      <div className=" grid grid-cols-2 gap-0.5">
                        <div className="w-20 h-14 bg-[#CCE5F7] text-black justify-center">
                          <div className="text-center font-semibold text-sm mt-1">
                            {items['ex']['availableToBack'][0].price1 || '-'}
                          </div>
                          <div className="text-center font-semibold text-sm mt-1">
                            {items['ex']['availableToBack'][0].size &&
                            items['ex']['availableToBack'][0].price1
                              ? intToString(
                                  items['ex']['availableToBack'][0].size,
                                )
                              : ''}
                          </div>
                        </div>
                        <div className="w-20 h-14 bg-[#FFE5EB] text-black justify-center">
                          <div className="text-center font-semibold text-sm mt-1">
                            {items['ex']['availableToLay'][0].price1 || '-'}
                          </div>
                          <div className="text-center font-semibold text-sm mt-1">
                            {items['ex']['availableToLay'][0].size &&
                            items['ex']['availableToLay'][0].price1
                              ? intToString(
                                  items['ex']['availableToLay'][0].size,
                                )
                              : ''}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className=" grid grid-cols-2   relative">
                        <div className="w-20 h-14 bg-[#CCE5F7] text-black justify-center"></div>
                        <div className="w-20 h-14 bg-[#FFE5EB] text-black justify-center"></div>
                        <div className="absolute text-black font-semibold  flex justify-center items-center w-40 h-14">
                          {items?.status}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
          </>
        ) : (
          <div className="text-white flex justify-center items-center mt-2 h-[60px]  bg-white text-black ">
            No Odds Available
          </div>
        )}
      </div>
    </>
  );
};
DisplayOddsBookmaker.propTypes = {
  // matchData: PropTypes.object.isRequired,
  totalRunnersPL: PropTypes.array.isRequired,
};
export default DisplayOddsBookmaker;
