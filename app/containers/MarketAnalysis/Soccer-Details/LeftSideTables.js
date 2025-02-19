import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import StatusButton from '@/components/StatusButton';
import { getAuthData } from '@/utils/apiHandlers';
import { getRunnerName } from '@/utils/formatter';

/* eslint-disable */
const LeftSideTables = () => {
  const { eventId } = useParams();
  const [overUnder35, setOverUnder35] = useState(null);
  const [overUnder25, setOverUnder25] = useState(null);
  const [OverUnder15, setOverUnder15] = useState(null);
  const [halfTime, setHalfTime] = useState(null);
  const [fixtureEventName, setFixtureEventName] = useState([]);

  const [odds, setOdds] = useState(null);
  console.log('halfTime', halfTime);

  const getEventData = async () => {
    try {
      const response = await getAuthData(
        `/catalogue/soccer/get-matchodds?eventId=${eventId}`,
      );

      if (response?.status === 201 || response?.status === 200) {
        if (response?.data) {
          const convertedData = response?.data;
          setFixtureEventName(convertedData);
        }
        // setFixtureEventName(response?.data?.fixtures);
        // setFixtureData(response?.data?.fixtures);
      }
    } catch (e) {
      console.error(e);
      return null;
    }
  };
  useEffect(() => {
    getEventData();
  }, []);
  useEffect(() => {
    let source;
    if (eventId) {
      if (source) {
        source.close();
        setOdds(null);
        setOverUnder15(null);
        setOverUnder25(null);
        setOverUnder35(null);
      }
      const source = new EventSource(
        `${process.env.API_URL}/catalogue/soccer/get-catalogue-stream?eventId=${eventId}`,
      );
      source.onmessage = function (e) {
        let tempdata = JSON.parse(e.data);

        const MatchOdds = tempdata['Match Odds'] || null;
        const OverUnder15Goals = tempdata['Over/Under 1.5 Goals'];
        const HalfTime = tempdata['Half Time'];
        const OverUnder25Goals = tempdata['Over/Under 2.5 Goals'];
        const OverUnder35Goals = tempdata['Over/Under 3.5 Goals'];
        console.log('tempdata', HalfTime);

        if (OverUnder15Goals?.catalogue) {
          OverUnder15Goals?.catalogue?.forEach((item) => {
            if (item.marketName === 'Over/Under 1.5 Goals') {
              const parsedRunners = JSON.parse(item.runners);

              const updatedItem = {
                ...item,
                runners: parsedRunners,
              };

              setOverUnder15(updatedItem);
            } else {
              setOverUnder15([]);
            }
          });
        } else {
          setOverUnder15([]);
        }
        if (OverUnder25Goals?.catalogue?.length !== 0) {
          OverUnder25Goals?.catalogue?.forEach((item) => {
            if (item.marketName === 'Over/Under 2.5 Goals') {
              const parsedRunners = JSON.parse(item.runners);

              const updatedItem = {
                ...item,
                runners: parsedRunners,
              };

              setOverUnder25(updatedItem);
            } else {
              setOverUnder25([]);
            }
          });
        } else {
          setOverUnder25([]);
        }
        if (MatchOdds?.catalogue.length !== 0) {
          MatchOdds?.catalogue?.forEach((item) => {
            if (
              item?.marketName === 'Match Odds' ||
              item?.marketName === 'Winner' ||
              item?.marketName === 'MATCH_ODDS'
            ) {
              const parsedRunners = JSON.parse(item.runners);
              const updatedItem = {
                ...item,
                runners: parsedRunners,
              };
              setOdds(updatedItem);
            } else {
              setOdds([]);
            }
          });
        } else {
          setOdds([]);
        }
        if (OverUnder35Goals?.catalogue?.length !== 0) {
          OverUnder35Goals?.catalogue?.forEach((item) => {
            if (item?.marketName === 'Over/Under 3.5 Goals') {
              const parsedRunners = JSON.parse(item.runners);
              const updatedItem = {
                ...item,
                runners: parsedRunners,
              };
              setOverUnder35(updatedItem);
            } else {
              setOverUnder35([]);
            }
          });
        } else {
          setOverUnder35([]);
        }
        if (HalfTime?.catalogue?.length !== 0) {
          HalfTime?.catalogue?.forEach((item) => {
            if (item?.marketName === 'Half Time') {
              const parsedRunners = JSON.parse(item.runners);
              const updatedItem = {
                ...item,
                runners: parsedRunners,
              };
              setHalfTime(updatedItem);
            } else {
              setHalfTime([]);
            }
          });
        } else {
          setHalfTime([]);
        }
      };
    }

    return () => {
      if (source) {
        source.close();
      }
    };
  }, [eventId]);

  const [isTableClicked, settableClicked] = useState(1);
  const ClickedTable = (buttonId) => {
    settableClicked(buttonId);
  };

  function intToString(num) {
    if (num < 1000) {
      return num;
    }
    var si = [
      { v: 1e3, s: 'K' },
      { v: 1e6, s: 'M' },
      { v: 1e9, s: 'B' },
      { v: 1e12, s: 'T' },
      { v: 1e15, s: 'P' },
      { v: 1e18, s: 'E' },
    ];
    var i;
    for (i = si.length - 1; i > 0; i--) {
      if (num >= si[i].v) {
        break;
      }
    }
    return (
      (num / si[i].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') +
      si[i].s
    );
  }
  return (
    <>
      <div className="border">
        <div className="flex justify-between border-b border-[#7E97A7]">
          <div className="bg-[#243A48] flex rounded-tr-lg p-1">
            <h4 className="text-sm font-bold mx-1">Match Odds</h4>
            <img src="/vector1.png" alt="icon" className="mx-1 w-5" />
          </div>
          <div className="text-black p-1 text-sm ">
            <span>Matched : </span>{' '}
            <span className="font-bold">
              {intToString(odds?.totalMatched || 0)}
            </span>
          </div>
        </div>
        <table className="w-full">
          <thead className="grid grid-cols-10 h-8 items-center">
            <th className="col-span-4"></th>
            <th></th>
            <th></th>
            <th className="text-black text-sm rounded-tl-lg w-auto h-auto p-1.5 bg-[#72BBEF]">
              Back
            </th>
            <th className="text-black text-sm rounded-tr-lg w-auto h-auto p-1.5 bg-[#FAA9BA]">
              Lay
            </th>
            <th className="col-span-2 text-black text-xs">
              {/* <span className="bg-[#7E97A7] p-1 rounded-md">
                <span className="text-[#315195] mx-1"> Min/Max</span>100-5000
              </span> */}
            </th>
          </thead>
          <tbody className="">
            {odds &&
              odds.runners.map((items, index) => {
                const runnerName = getRunnerName(items, fixtureEventName);
                return (
                  <tr
                    key={index}
                    className="border-y border-[#7E97A7] grid grid-cols-10"
                  >
                    <td className="px-1.5 col-span-4">
                      <span className="text-sm font-bold text-[#23282C]">
                        {' '}
                        {/* {items.runnerName} */}
                        {runnerName}
                      </span>
                      {/* <span className="flex items-center gap-2">
                        <img
                          src="/Symbol.png"
                          alt="arrow"
                          className="w-3 h-3"
                        />
                        <h4 className="text-[#4DBD74] text-xs font-bold">
                          100
                        </h4>
                      </span> */}
                    </td>
                    <td className="text-black  text-xs text-center flex items-center justify-center">
                      <span className="bg-[#72BBEF] py-1 w-full">
                        <div className="font-bold ">
                          {items?.back?.[0]?.price || 0}
                        </div>
                        <div>{intToString(items?.back?.[0]?.size || 0)}</div>
                      </span>
                    </td>
                    <td className="text-black  text-xs text-center flex items-center justify-center">
                      {' '}
                      <span className="bg-[#72BBEF] py-1 w-full">
                        <div className="font-bold">
                          {' '}
                          {items?.back?.[1]?.price || 0}
                        </div>
                        <div>{intToString(items?.back?.[1]?.size || 0)}</div>
                      </span>
                    </td>
                    <td className="text-black  text-xs text-center p-1.5 bg-[#72BBEF]">
                      {' '}
                      <span>
                        <div className="font-bold">
                          {' '}
                          {items?.back?.[2]?.price || 0}
                        </div>
                        <div>{intToString(items?.back?.[2]?.size || 0)}</div>
                      </span>
                    </td>
                    <td className="text-black  text-xs text-center p-1.5 bg-[#FAA9BA]">
                      {' '}
                      <span>
                        <div className="font-bold">
                          {' '}
                          {items?.lay?.[0]?.price || 0}
                        </div>
                        <div>{intToString(items?.lay?.[0]?.size || 0)}</div>
                      </span>
                    </td>
                    <td className="text-black text-xs text-center flex items-center justify-center">
                      {' '}
                      <span className=" bg-[#FAA9BA] py-1 w-full">
                        <div className="font-bold">
                          {' '}
                          {items?.lay?.[1]?.price || 0}
                        </div>
                        <div>{intToString(items?.lay?.[1]?.size || 0)}</div>
                      </span>
                    </td>
                    <td className="text-black text-xs text-center flex items-center justify-center">
                      {' '}
                      <span className=" bg-[#FAA9BA] py-1 w-full">
                        <div className="font-bold">
                          {' '}
                          {items?.lay?.[2]?.price || 0}
                        </div>
                        <div>{intToString(items?.lay?.[2]?.size || 0)}</div>
                      </span>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      {OverUnder15 && (
        <div className="border my-5">
          <div className="flex justify-between border-b border-[#7E97A7]">
            <div className="bg-[#243A48] flex rounded-tr-lg p-1">
              <h4 className="text-sm font-bold mx-1"> Over/Under 1.5 Goals</h4>
              <img src="/vector1.png" alt="icon" className="mx-1 w-5" />
            </div>
            <div className="text-black p-1 text-sm ">
              <span>Matched :</span>{' '}
              <span className="font-bold">
                {intToString(OverUnder15?.totalMatched || 0)}
              </span>
            </div>
          </div>
          <table className="w-full bg-[#FAF8D8]">
            <thead className="grid grid-cols-10 h-8 items-center">
              <th className="col-span-4"></th>
              <th></th>
              <th></th>
              <th className="text-black text-sm">Back</th>
              <th className="text-black text-sm">Lay</th>

              <th className="col-span-2 text-black text-xs">
                {/* <span className="bg-[#7E97A7] p-1 rounded-md">
                <span className="text-[#315195] mx-1"> Min/Max</span>100-5000
              </span> */}
              </th>
            </thead>
            <tbody className="">
              {OverUnder15 &&
                OverUnder15?.runners &&
                OverUnder15?.runners?.map((items, index) => {
                  const runnerName = getRunnerName(items, fixtureEventName);
                  return (
                    <tr
                      className="border-y border-[#7E97A7] grid grid-cols-10"
                      key={index}
                    >
                      <td className="px-1.5 col-span-6">
                        <span className="text-sm font-bold text-[#23282C]">
                          {/* {OverUnder15?.event} */}
                          {runnerName}
                        </span>
                        {/* <span className="flex items-center gap-2">
                        <img
                          src="/Symbol2.png"
                          alt="arrow"
                          className="w-3 h-3"
                        />
                        <h4 className="text-[#D0021B] text-xs font-bold">
                          0.00
                        </h4>
                      </span> */}
                      </td>
                      {/* <td className="text-black  text-xs text-center flex items-center justify-center">
                      <span className="bg-[#72BBEF] rounded-md p-1 w-full">
                        <div className="font-bold">4.3</div>
                        <div>606.01</div>
                      </span>
                    </td>
                    <td className="text-black  text-xs text-center flex items-center justify-center">
                      {' '}
                      <span className="bg-[#72BBEF] rounded-md p-1 w-full">
                        <div className="font-bold">4.4</div>
                        <div>536.01</div>
                      </span>
                    </td> */}
                      {items?.status === '' || items?.status === 'ACTIVE' ? (
                        <>
                          <td className="text-black  text-xs text-center flex items-center justify-center">
                            <span className="bg-[#72BBEF] rounded-md p-1 w-full">
                              <div className="font-bold">
                                {items['ex']['availableToBack'][0]?.price || 0}
                              </div>
                              <div>
                                {intToString(
                                  items['ex']['availableToBack'][0]?.size || 0,
                                )}
                              </div>
                            </span>
                          </td>

                          <td className="text-black  text-xs text-center flex items-center justify-center">
                            {' '}
                            <span className="bg-[#FAA9BA] rounded-md p-1 w-full">
                              <div className="font-bold">
                                {items['ex']['availableToLay'][0].price || 0}
                              </div>
                              <div>
                                {intToString(
                                  items['ex']['availableToLay'][0].size || 0,
                                )}
                              </div>
                            </span>
                          </td>
                        </>
                      ) : (
                        <td className="px-1.5 col-span-4">
                          <div className="flex justify-center md:w-1/3 flex-1">
                            <StatusButton status={items?.status} />
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}
      {halfTime && halfTime.runners && halfTime.runners.length > 0 && (
        <div className="border my-5">
          <div className="flex justify-between border-b border-[#7E97A7]">
            <div className="bg-[#243A48] flex rounded-tr-lg p-1">
              <h4 className="text-sm font-bold mx-1"> Half Time</h4>
              <img src="/vector1.png" alt="icon" className="mx-1 w-5" />
            </div>
            <div className="text-black p-1 text-sm ">
              <span>Matched :</span>{' '}
              <span className="font-bold">
                {intToString(halfTime?.totalMatched || 0)}
              </span>
            </div>
          </div>
          <table className="w-full bg-[#FAF8D8]">
            <thead className="grid grid-cols-10 h-8 items-center">
              <th className="col-span-4"></th>
              <th></th>
              <th></th>
              <th className="text-black text-sm">Back</th>
              <th className="text-black text-sm">Lay</th>

              <th className="col-span-2 text-black text-xs">
                {/* <span className="bg-[#7E97A7] p-1 rounded-md">
                <span className="text-[#315195] mx-1"> Min/Max</span>100-5000
              </span> */}
              </th>
            </thead>
            <tbody className="">
              {halfTime &&
                halfTime?.runners &&
                halfTime?.runners?.map((items, index) => {
                  const runnerName = getRunnerName(items, fixtureEventName);
                  return (
                    <tr
                      className="border-y border-[#7E97A7] grid grid-cols-10"
                      key={index}
                    >
                      <td className="px-1.5 col-span-6">
                        <span className="text-sm font-bold text-[#23282C]">
                          {/* {OverUnder15?.event} */}
                          {runnerName}
                        </span>
                        {/* <span className="flex items-center gap-2">
                        <img
                          src="/Symbol2.png"
                          alt="arrow"
                          className="w-3 h-3"
                        />
                        <h4 className="text-[#D0021B] text-xs font-bold">
                          0.00
                        </h4>
                      </span> */}
                      </td>
                      {/* <td className="text-black  text-xs text-center flex items-center justify-center">
                      <span className="bg-[#72BBEF] rounded-md p-1 w-full">
                        <div className="font-bold">4.3</div>
                        <div>606.01</div>
                      </span>
                    </td>
                    <td className="text-black  text-xs text-center flex items-center justify-center">
                      {' '}
                      <span className="bg-[#72BBEF] rounded-md p-1 w-full">
                        <div className="font-bold">4.4</div>
                        <div>536.01</div>
                      </span>
                    </td> */}
                      {items?.status === '' || items?.status === 'ACTIVE' ? (
                        <>
                          <td className="text-black  text-xs text-center flex items-center justify-center">
                            <span className="bg-[#72BBEF] rounded-md p-1 w-full">
                              <div className="font-bold">
                                {items['ex']['availableToBack'][0]?.price || 0}
                              </div>
                              <div>
                                {intToString(
                                  items['ex']['availableToBack'][0]?.size || 0,
                                )}
                              </div>
                            </span>
                          </td>

                          <td className="text-black  text-xs text-center flex items-center justify-center">
                            {' '}
                            <span className="bg-[#FAA9BA] rounded-md p-1 w-full">
                              <div className="font-bold">
                                {items['ex']['availableToLay'][0].price || 0}
                              </div>
                              <div>
                                {intToString(
                                  items['ex']['availableToLay'][0].size || 0,
                                )}
                              </div>
                            </span>
                          </td>
                        </>
                      ) : (
                        <td className="px-1.5 col-span-4">
                          <div className="flex justify-center md:w-1/3 flex-1">
                            <StatusButton status={items?.status} />
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}
      <div className="my-8 border">
        <div className="flex justify-between border-b border-[#7E97A7]">
          <div className="flex ">
            <div
              className="bg-[#0A92A5] flex rounded-tr-lg p-1"
              onClick={() => ClickedTable(1)}
            >
              <h4 className="text-sm font-bold mx-1">Over/Under 2.5 Goals </h4>
              <img src="/vector1.png" alt="icon" className="mx-1 w-5" />
            </div>
            <div
              className="bg-[#F26D1C] flex rounded-tr-lg p-1"
              onClick={() => ClickedTable(2)}
            >
              <h4 className="text-sm font-bold mx-1">Over/Under 3.5 Goals</h4>
              <img src="/vector1.png" alt="icon" className="mx-1 w-5" />
            </div>
          </div>
        </div>
        {isTableClicked === 1 ? (
          <div>
            <div className="bg-[#040B1D] flex justify-center h-8"> </div>
            <table className="w-full">
              <thead className="grid grid-cols-10 h-8 items-center">
                <th className="col-span-4"></th>
                <th></th>
                <th></th>
                <th className="text-[#212529] text-sm bg-[#FAA9BA] w-full h-full ">
                  No
                </th>
                <th className="text-[#212529] text-sm bg-[#72BBEF] w-full h-full">
                  Yes
                </th>
                <th className="col-span-2 text-[#7E97A7] text-xs">
                  {/* Min/Max */}
                </th>
              </thead>
              <tbody className="">
                {overUnder25?.runners?.map((items, index) => {
                  const runnerName = getRunnerName(items, fixtureEventName);
                  return (
                    <div key={index}>
                      <tr className="border-y border-[#7E97A7] grid grid-cols-10">
                        <td className="px-1.5 col-span-5">
                          <span className="text-xs font-bold text-[#23282C]">
                            {runnerName}
                            {/* {overUnder25.event} */}
                          </span>
                          {/* <span className="flex items-center gap-2">
                            <img
                              src="/Symbol2.png"
                              alt="arrow"
                              className="w-3 h-3"
                            />
                            <h4 className="text-[#D0021B] text-xs font-bold">
                              0.00
                            </h4>
                          </span> */}
                        </td>

                        <td className="text-black  text-xs text-center">
                          {' '}
                          {/* <button
                            className="p-2 bg-[#2E4B5E] rounded-md my-1 text-white font-bold"
                            onClick={handleBooking}
                          >
                            Book
                          </button> */}
                        </td>
                        {items?.status === '' || items?.status === 'ACTIVE' ? (
                          <>
                            <td className="text-black  text-xs text-center flex items-center justify-center bg-[#FAA9BA] w-full h-full ">
                              {' '}
                              <span>
                                <div className="font-bold">
                                  {items['ex']['availableToLay'][0]?.price || 0}
                                </div>
                                <div>
                                  {intToString(
                                    items['ex']['availableToLay'][0]?.size || 0,
                                  )}
                                </div>
                              </span>
                            </td>
                            <td className="text-black  text-xs text-center flex items-center justify-center bg-[#72BBEF] w-full h-full">
                              {' '}
                              <span>
                                <div className="font-bold">
                                  {items['ex']['availableToBack'][0]?.price ||
                                    0}
                                </div>
                                <div>
                                  {intToString(
                                    items['ex']['availableToBack'][0]?.size ||
                                      0,
                                  )}
                                </div>
                              </span>
                            </td>
                          </>
                        ) : (
                          <td className="px-1.5 col-span-2">
                            <div className="flex justify-center w-full flex-1">
                              <StatusButton status={items?.status} />
                            </div>
                          </td>
                        )}
                        <td className="text-black text-xs text-center col-span-2 justify-center flex items-center">
                          {/* <h4 className="font-bold">
                            {items.min}- {items.max}
                          </h4> */}
                        </td>
                      </tr>
                      {/* <tr className="col-span-10 bg-[#C2D5E4]">
                        <td>
                          {' '}
                          <div className="text-[#3B5160] text-sm font-bold">
                            <marquee direction="left">
                              {' '}
                              After 18th Match Result ( 118 )
                            </marquee>
                          </div>
                        </td>
                      </tr> */}
                    </div>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div>
            <div className="bg-[#F26D1C]  h-8 flex justify-center ">
              {' '}
              <table className="w-full mt-8">
                <thead className="grid grid-cols-10 h-8 items-center">
                  <th className="col-span-4"></th>
                  <th></th>
                  <th></th>
                  <th className="text-[#212529] text-sm bg-[#FAA9BA] w-full h-full ">
                    No
                  </th>
                  <th className="text-[#212529] text-sm bg-[#72BBEF] w-full h-full">
                    Yes
                  </th>
                  <th className="col-span-2 text-[#7E97A7] text-xs">
                    {/* Min/Max */}
                  </th>
                </thead>
                <tbody className="">
                  {overUnder35?.runners?.map((items, index) => {
                    const runnerName = getRunnerName(items, fixtureEventName);
                    return (
                      <div key={index}>
                        <tr className="border-y border-[#7E97A7] grid grid-cols-10">
                          <td className="px-1.5 col-span-5">
                            <span className="text-xs font-bold text-[#23282C]">
                              {runnerName}
                              {/* {overUnder35.event} */}
                            </span>
                          </td>

                          <td className="text-black  text-xs text-center">
                            {' '}
                            {/* <button
                                className="p-2 bg-[#2E4B5E] rounded-md my-1 text-white font-bold"
                                onClick={handleBooking}
                              >
                                Book
                              </button> */}
                          </td>
                          {items?.status === '' ||
                          items?.status === 'ACTIVE' ? (
                            <>
                              <td className="text-black  text-xs text-center flex items-center justify-center bg-[#FAA9BA] w-full h-full ">
                                {' '}
                                <span>
                                  <div className="font-bold">
                                    {items['ex']['availableToLay'][0]?.price ||
                                      0}
                                  </div>
                                  <div>
                                    {intToString(
                                      items['ex']['availableToLay'][0]?.size ||
                                        0,
                                    )}
                                  </div>
                                </span>
                              </td>
                              <td className="text-black  text-xs text-center flex items-center justify-center bg-[#72BBEF] w-full h-full">
                                {' '}
                                <span>
                                  <div className="font-bold">
                                    {items['ex']['availableToBack'][0]?.price ||
                                      0}
                                  </div>
                                  <div>
                                    {intToString(
                                      items['ex']['availableToBack'][0]?.size ||
                                        0,
                                    )}
                                  </div>
                                </span>
                              </td>
                            </>
                          ) : (
                            <td className="px-1.5 col-span-2">
                              <div className="flex justify-center w-full flex-1">
                                <StatusButton status={items?.status} />
                              </div>
                            </td>
                          )}

                          <td className="text-black text-xs text-center col-span-2 justify-center flex items-center">
                            {/* <h4 className="font-bold">
                                {items.min}- {items.max}
                              </h4> */}
                          </td>
                        </tr>
                      </div>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {/* <Book
          isopenBooking={isopenBooking}
          handlecloseBooking={() => {
            setBooking(false);
          }}
        /> */}
      </div>
    </>
  );
};

export default LeftSideTables;
