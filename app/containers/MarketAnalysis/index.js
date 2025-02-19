import { getAuthData } from '@/utils/apiHandlers';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import { Link } from 'react-router-dom';

function MarketAnalysis() {
  const useFixtureData = (sport) => {
    const [fixtureData, setFixtureData] = useState([]);

    const getEventData = async () => {
      try {
        const response = await getAuthData(
          `/catalogue/${sport}/get-events-with-markets`,
        );

        if (response?.status === 201 || response?.status === 200) {
          setFixtureData(response.data);
        }
      } catch (e) {
        console.error(e);
      }
    };

    useEffect(() => {
      getEventData();
      // eslint-disable-next-line
    }, [sport]);

    return fixtureData;
  };
  // eslint-disable-next-line
  const updateData = (data) => {
    return data.map((item) => {
      let modifiedRunners = item?.odds?.runners.map((runner) => {
        let correspondingRunner = item?.runner?.find(
          (r) => r.selectionId === runner.selectionId,
        );
        return {
          ...runner,
          runnerName: correspondingRunner?.runnerName,
        };
      });
      return {
        ...item,
        odds: {
          ...item.odds,
          runners: modifiedRunners,
        },
      };
    });
  };
  // const fixturedata = useFixtureData('cricket');
  const todayDataInplay = (data) => {
    const today = new Date();

    return data.filter((entry) => {
      const matchDateTime = new Date(entry.matchDateTime);
      const isNotDeleted = entry.isDelete === false;
      const isDateTodayOrFuture = matchDateTime >= today.setHours(0, 0, 0, 0);
      const isNotDeletedAndPastDate =
        entry.isDelete === false && matchDateTime < today.setHours(0, 0, 0, 0);
      return isNotDeleted && (isDateTodayOrFuture || isNotDeletedAndPastDate);
    });
  };
  const todayDataInplayCricket = todayDataInplay(useFixtureData('cricket'));
  const todayDataInplaySoccer = todayDataInplay(useFixtureData('soccer'));
  // const todayDataInplayTennis = todayDataInplay(
  //   updateData(useFixtureData('tennis')),
  // );
  // eslint-disable-next-line
  const filterd = useFixtureData('cricket');

  return (
    <div className=" mx-8 my-4  border-y text-sm font-semibold">
      <div className="h-8  bg-[#071535] text-white ">
        <h3 className="p-1">Cricket</h3>
      </div>
      {todayDataInplayCricket &&
        todayDataInplayCricket.map((items, index) => {
          return (
            <div
              key={index}
              className="flex justify-between text-sm border-b border-gray-300"
            >
              <Link to={`/market-details-cricket/${items?.event_id}`}>
                <h4 className="p-2 text-sky-500">{items.name}</h4>
              </Link>
              {/* <h4 className="text-[#040B1D] p-2">Total Bets 1</h4> */}
            </div>
          );
        })}
      <div className="h-8  bg-[#071535] text-white mt-8">
        <h3 className="p-1">Soccer</h3>
      </div>
      {todayDataInplaySoccer &&
        todayDataInplaySoccer.map((items, index) => {
          return (
            <div
              key={index}
              className="flex justify-between text-sm border-b border-gray-300"
            >
              <Link to={`/market-details-soccer/${items?.event_id}`}>
                <h4 className="p-2 text-sky-500">{items.name}</h4>
              </Link>
              {/* <h4 className="text-[#040B1D] p-2">Total Bets 1</h4> */}
            </div>
          );
        })}
    </div>
  );
}

export default MarketAnalysis;
