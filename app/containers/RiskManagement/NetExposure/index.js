import { Loading } from '@/components';
import { getAuthData, isLoggedIn } from '@/utils/apiHandlers';
import { reactIcons } from '@/utils/icons';
import { Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { CiSquareMinus } from 'react-icons/ci';
import { FaRegPlusSquare, FaTachometerAlt } from 'react-icons/fa';
import { FcFlowChart } from 'react-icons/fc';
import { FiRefreshCw } from 'react-icons/fi';
import { PiListBulletsFill } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
const NetExposure = () => {
  const navigate = useNavigate();
  const [isAllExpanded, setIsAllExpanded] = useState(false);
  const [expandedItems, setExpandedItems] = useState([]);
  const [selectedSport, setSelectedSport] = useState('All');
  const toggleExpandAll = () => {
    if (isAllExpanded) {
      setExpandedItems([]);
    } else {
      const allIdentifiers = eventList.map(
        (item) =>
          `${item.matchId}-${item.selectionId}-${item.market}-${item.sportsName}`,
      );
      setExpandedItems(allIdentifiers);
    }
    setIsAllExpanded(!isAllExpanded);
  };
  const toggleExpand = (item) => {
    const itemIdentifier = `${item.matchId}-${item.selectionId}-${item.market}-${item.sportsName}`;

    if (expandedItems.includes(itemIdentifier)) {
      setExpandedItems(expandedItems.filter((id) => id !== itemIdentifier));
    } else {
      setExpandedItems([...expandedItems, itemIdentifier]);
    }
  };

  const HandeNavigate = (link, items) => {
    navigate(link);
    localStorage.setItem('Net_Expossure_Match', JSON.stringify(items));
  };

  const [isLoading, setIsLoading] = useState(false);
  const [eventList, setEventList] = useState([]);
  useEffect(() => {
    handleGetEvents();
  }, []);

  const handleGetEvents = async () => {
    const islogin = isLoggedIn();
    setIsLoading(true);
    if (islogin) {
      try {
        const response = await getAuthData('/user/get-live-match-currentbets');
        const { status, data } = response;
        if (status === 201 || status === 200) {
          setIsLoading(false);
          setEventList(data?.data);
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

  const [timer, setTimer] = useState(5);
  const handleTimerEnd = () => {
    handleGetEvents();
    setTimer(5);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          handleTimerEnd();
          return 30;
        } else {
          return prevTimer - 1;
        }
      });
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isItemExpanded = (item) => {
    const itemIdentifier = `${item.matchId}-${item.selectionId}-${item.market}-${item.sportsName}`;
    return expandedItems.includes(itemIdentifier);
  };
  const handleSportChange = (sport) => {
    setSelectedSport(sport);
  };
  const filteredEventList = eventList.filter((item) => {
    return selectedSport === 'All' || item.sportsName === selectedSport;
  });
  const groupedEventList = Object.values(
    filteredEventList.reduce((acc, item) => {
      const key = item.matchId; // Group by matchId only
      if (!acc[key]) {
        acc[key] = { ...item, children: [] };
      }
      acc[key].children.push(item);
      return acc;
    }, {}),
  ).map((event) => ({
    ...event,
    children: event.children.sort((a, b) => {
      const order = { 'Match Odds': 1, bookmaker: 2 }; // Define sorting order
      return (order[a.market] || 3) - (order[b.market] || 3);
    }),
  }));

  return (
    <>
      {isLoading && <Loading />}
      <div className="bg-white text-black p-8">
        <span className="text-2xl">Net Exposure</span>
        <div className="flex flex-wrap gap-3 mt-4">
          {['All', 'Cricket', 'Football', 'Tennis'].map((sport) => (
            <label key={sport} className="flex items-center gap-2 text-xs">
              {sport}
              <input
                className="w-4 h-4"
                type="radio"
                name="sportFilter"
                checked={selectedSport === sport}
                onChange={() => handleSportChange(sport)}
              />
            </label>
          ))}
        </div>
        <div className="mt-12 px-4">
          <div className="text-black flex items-center cursor-pointer mb-2 justify-between">
            <div onClick={toggleExpandAll} className="flex gap-1 items-center">
              {isAllExpanded ? (
                <CiSquareMinus className="w-4 h-4 sm:w-8 sm:h-8" />
              ) : (
                <FaRegPlusSquare className="w-4 h-4 sm:w-8 sm:h-8" />
              )}
              <span className="ml-2 text-14 sm:text-lg">
                {isAllExpanded ? 'Collapse All' : 'Expand All'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span>{timer}</span>
              <div
                onClick={handleTimerEnd}
                className="flex items-center gap-2 bg-[#10827D] font-semibold p-2 text-14"
              >
                <FiRefreshCw /> Refresh
              </div>
            </div>
          </div>
          <div className="bg-black p-0.5"></div>
          {groupedEventList &&
            groupedEventList.map((items, index) => {
              const isExpanded = isItemExpanded(items);

              return (
                <div key={index}>
                  <div
                    className="bg-[#071535] p-0.5 text-white mt-1 shadow-sm"
                    onClick={() => toggleExpand(items)}
                  >
                    <div className="flex items-center text-sm">
                      <div className="flex items-center">
                        <div className="flex items-center">
                          {isExpanded ? <CiSquareMinus /> : <FaRegPlusSquare />}
                          <span className="ml-2">
                            {items.sportsName} | {items.competition}:{' '}
                            {items.event}
                          </span>
                        </div>
                      </div>
                      <div className="text-[#6DE135] font-bold text-14 mx-2 flex gap-1 items-center">
                        {reactIcons.play}
                        In-Play
                      </div>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="grid grid-cols-2 gap-1 text-sm shadow-sm">
                      {items.children.map((child) => (
                        <div
                          key={index}
                          className={`bg-[#5059A7] p-2 text-sm shadow-sm ${
                            child.market === 'session'
                              ? 'col-start-2'
                              : 'col-start-1'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="capitalize">
                              {' '}
                              {child.market === 'session'
                                ? child?.selectionName
                                : child.market}
                            </div>
                            <div className="flex space-x-4 text-black">
                              <Tooltip
                                title={<div>Work Station</div>}
                                enterTouchDelay={0}
                              >
                                <span
                                  className="cursor-pointer text-[#2CE5DD] w-4 h-4"
                                  onClick={() =>
                                    HandeNavigate(
                                      child.market == 'session'
                                        ? '/session_workstation'
                                        : '/workstation',
                                      child,
                                    )
                                  }
                                >
                                  <FaTachometerAlt className="w-4 h-4" />
                                </span>
                              </Tooltip>
                              <Tooltip
                                title={<div>Bet Breakdown</div>}
                                enterTouchDelay={0}
                              >
                                <span
                                  className="cursor-pointer text-[#2CE5DD] w-4 h-4"
                                  onClick={() =>
                                    HandeNavigate(
                                      child.market == 'session'
                                        ? '/session_net_exposure_View'
                                        : '/net_exposure_View',
                                      child,
                                    )
                                  }
                                >
                                  <PiListBulletsFill className="w-4 h-4" />
                                </span>
                              </Tooltip>
                              <Tooltip
                                title={<div>Net exposure breakdown</div>}
                                enterTouchDelay={0}
                              >
                                <span
                                  className="cursor-pointer text-[#2CE5DD] w-4 h-4"
                                  onClick={() =>
                                    HandeNavigate(
                                      child.market == 'session'
                                        ? '/session_net_exposure_userpoints'
                                        : '/net_exposure_userpoints',
                                      child,
                                    )
                                  }
                                >
                                  <FcFlowChart className="w-4 h-4" />
                                </span>
                              </Tooltip>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default NetExposure;
