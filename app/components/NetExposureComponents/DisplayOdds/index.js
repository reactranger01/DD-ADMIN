/* eslint-disable react-hooks/exhaustive-deps */
import { reactIcons } from '@/utils/icons';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getAuthData } from '@/utils/apiHandlers';
import { getRunnerDetails, intToString } from '@/utils/helperfunc';
import { numberWithCommas } from '@/utils/numberWithCommas';
import Loading from '@/components/Loading';
const DisplayOdds = ({ totalRunnersPL }) => {
  const [matchData] = useState(() => {
    const localData = localStorage.getItem('Net_Expossure_Match');
    return JSON.parse(localData);
  });
  const [fixtureEventName, setFixtureEventName] = useState([]);
  const eventId = matchData?.matchId;
  const [data, setData] = useState([]);
  const [matchedData, setMatchedData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const Owner_Ap = localStorage.getItem('owner_ap');
  const multipliedAP = Owner_Ap ? Number(Owner_Ap === '100' ? 1 : Owner_Ap) : 0;
  const sport = ['Cricket', 'Tennis', 'Soccer'].includes(matchData?.sportsName)
    ? matchData.sportsName.toLowerCase()
    : 'cricket';

  const getEventPLData = async () => {
    setIsLoading(true);
    try {
      const response = await getAuthData(
        `/user/GetRunnerAndPLData?market=${
          matchData?.market == 'Match Odds' ? 'Match-Odds' : matchData?.market
        }&matchId=${matchData?.matchId}&sportId=${
          matchData?.sportsId
        }&commision=${multipliedAP}`,
      );
      if (response?.status === 201 || response?.status === 200) {
        if (response?.data) {
          setIsLoading(false);
          const convertedData = response?.data;
          setFixtureEventName(convertedData);
        }
      }
    } catch (e) {
      setIsLoading(false);
      console.error(e);
      return null;
    }
    setIsLoading(false);
  };
  const getAllData = async () => {
    try {
      const response = await getAuthData(
        `/catalogue/${sport}/get-catalogue-details?eventId=${eventId}`,
      );
      let tempdata = response.data;
      const MatchOdds = tempdata?.events;
      setData(MatchOdds);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    let interval;
    const fetchData = async () => {
      try {
        await getEventPLData();
        await getAllData();

        interval = setInterval(() => {
          getAllData();
        }, 5000);
      } catch (error) {
        console.error('Error in fetching data:', error);
      }
    };
    fetchData();
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [eventId]);

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
  useEffect(() => {
    const matchedItem = data.find(
      (item) => item.market_id === fixtureEventName.data.market_id,
    );
    if (matchedItem) {
      setMatchedData(matchedItem);
    }
  }, [data, fixtureEventName]);
  return (
    <>
      {isLoading && <Loading />}
      <div className="  p-2 bg-slate-300">
        <div className="flex">
          <h3>Match Odds(0) </h3>
          <div className="text-[#6DE135] font-bold text-14 mx-2 flex gap-1 items-center">
            {reactIcons.play}
            In-Play
          </div>
        </div>
        {matchedData ? (
          <>
            {matchedData &&
              matchedData?.runners &&
              matchedData?.runners?.map((items, index) => {
                const runnerDetails = getRunnerDetails(items, fixtureEventName);
                const { totalPL, totalPLINR } =
                  getUpdatedRunnerPL(runnerDetails);
                const textColor =
                  totalPL >= 0 ? 'text-green-500' : 'text-red-500';
                return (
                  <div className="border border-white flex" key={index}>
                    <div className="flex-1 text-[#333333] pl-2 text-14  font-semibold">
                      <div className="text-black">
                        {' '}
                        {runnerDetails.runnerName}
                      </div>
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
                            {items?.back?.[2]?.price ||
                              items?.back?.[0]?.price ||
                              '-'}
                          </div>
                          <div className="text-center font-semibold text-sm mt-1">
                            {items?.back?.[2]?.size ||
                            (items?.back?.[0]?.size &&
                              items?.back?.[2]?.price) ||
                            items?.back?.[0]?.price
                              ? intToString(
                                  items?.back?.[2]?.size ||
                                    items?.back?.[0]?.size ||
                                    0,
                                )
                              : ''}
                          </div>
                        </div>
                        <div className="w-20 h-14 bg-[#FFE5EB] text-black justify-center">
                          <div className="text-center font-semibold text-sm mt-1">
                            {items?.lay?.[0]?.price1 ||
                              items?.lay?.[0]?.price ||
                              '-'}
                          </div>
                          <div className="text-center font-semibold text-sm mt-1">
                            {(items?.lay?.[0]?.size &&
                              items?.lay?.[0]?.price1) ||
                            items?.lay?.[0]?.price
                              ? intToString(items?.lay?.[0]?.size || 0)
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
DisplayOdds.propTypes = {
  totalRunnersPL: PropTypes.array.isRequired,
};
export default DisplayOdds;
