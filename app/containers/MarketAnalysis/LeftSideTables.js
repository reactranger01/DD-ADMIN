import React, { useEffect, useState } from 'react';
import Book from './Modal/Book';
import { useParams } from 'react-router-dom';
import StatusButton from '@/components/StatusButton';
import { getAuthData } from '@/utils/apiHandlers';

const LeftSideTables = () => {
  const { eventId } = useParams();
  const [sessions, setSessions] = useState(null);
  const [fancy, setFancy] = useState(null);
  const [bm, setBm] = useState(null);
  const [odds, setOdds] = useState(null);
  const [fixtureEventName, setFixtureEventName] = useState([]);
  const getEventData = async () => {
    try {
      const response = await getAuthData(
        `/catalogue/cricket/get-matchodds?eventId=${eventId}`,
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
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    let source;
    if (eventId) {
      if (source) {
        source.close();
        setOdds(null);
        // setBm(null);
        setFancy(null);
      }
      source = new EventSource(
        `${process.env.API_URL}/catalogue/cricket/get-catalogue-stream?eventId=${eventId}`,
      );
      source.onmessage = function (e) {
        let tempdata = JSON.parse(e.data);
        const { session, fancy, bookmaker, MatchOdds } = tempdata;

        session?.catalogue?.map((item) => {
          if (item.market === 'session') {
            setSessions(item);
          }
        });
        fancy?.catalogue?.map((item) => {
          if (item.market === 'Normal' || item.market === 'fancy') {
            setFancy(item);
          }
        });
        MatchOdds?.catalogue?.map((item) => {
          if (
            item?.marketName === 'Match Odds' ||
            MatchOdds?.market === 'Match Odds'
          ) {
            const parsedRunners = JSON.parse(item.runners);
            const updatedItem = {
              ...item,
              runners: parsedRunners,
            };
            setOdds(updatedItem);
          }
        });
        bookmaker?.catalogue?.map((item) => {
          if (bookmaker.market === 'bookmaker') {
            const parsedRunners = JSON.parse(item.runners);
            const updatedItem = {
              ...item,
              runners: parsedRunners,
            };
            setBm(updatedItem);
          }
        });
      };
    }

    // Cleanup
    return () => {
      if (source) {
        source.close();
      }
    };
  }, [eventId]);

  const [isopenBooking, setBooking] = useState(false);
  const handleBooking = () => {
    setBooking(true);
  };
  const [isTableClicked, settableClicked] = useState(1);
  const ClickedTable = (buttonId) => {
    settableClicked(buttonId);
  };
  // const [fanctButtonClicked, setfanctButtonClicked] = useState(1);
  // const ClickedFancyButton = (buttonId) => {
  //   setfanctButtonClicked(buttonId);
  // };
  // const [SportbookButtonClicked, setSportbookClicked] = useState(1);
  // const ClickedSportbook = (buttonId) => {
  //   setSportbookClicked(buttonId);
  // };

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
            <h4 className="text-sm font-bold mx-1">Winner</h4>
            <img src="/vector1.png" alt="icon" className="mx-1 w-5" />
          </div>
          <div className="text-black p-1 text-sm ">
            <span>Matched :</span>{' '}
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
                const correspondingFixture = fixtureEventName.find((fixture) =>
                  fixture.runners.some(
                    (fixtureRunner) =>
                      fixtureRunner.selectionId.toString() ===
                      items.selectionId,
                  ),
                );
                const fixtureRunner = correspondingFixture
                  ? correspondingFixture.runners.find(
                      (fixtureRunner) =>
                        fixtureRunner.selectionId.toString() ===
                        items.selectionId,
                    )
                  : null;

                const runnerName = fixtureRunner
                  ? fixtureRunner.runnerName
                  : '';
                return (
                  <tr
                    key={index}
                    className="border-y border-[#7E97A7] grid grid-cols-10"
                  >
                    <td className="px-1.5 col-span-4">
                      <span className="text-sm font-bold text-[#23282C]">
                        {' '}
                        {runnerName}
                      </span>
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
      <div className="my-8 border">
        <div className="flex justify-between border-b border-[#7E97A7]">
          <div className="bg-[#243A48] flex rounded-tr-lg p-1">
            <h4 className="text-sm font-bold mx-1">Bookmaker</h4>
            <img src="/vector1.png" alt="icon" className="mx-1 w-5" />
          </div>
          <div className="text-black p-1 text-sm ">
            <span> Matched :</span>
            <span className="font-bold">
              {intToString(bm?.totalMatched || 0)}
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
            <th className="col-span-2 text-black text-xs"></th>
          </thead>
          <tbody className="">
            {bm &&
              bm?.runners &&
              bm?.runners?.map((items, index) => {
                return (
                  <tr
                    className="border-y border-[#7E97A7] grid grid-cols-10"
                    key={index}
                  >
                    <td className="px-1.5 col-span-6">
                      <span className="text-sm font-bold text-[#23282C]">
                        {items?.runnerName}
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
                        <td className="text-black  text-xs text-center flex items-center justify-center col-span-1">
                          {' '}
                          <span className="  bg-[#72BBEF] rounded-md p-1 border-1 border-solid border-white  w-full  ">
                            <div className="font-bold">
                              {items['ex']['availableToBack'][0].price1}
                            </div>
                            <div>
                              {intToString(
                                items['ex']['availableToBack'][0].size,
                              )}
                            </div>
                          </span>
                        </td>
                        <td className="text-black  text-xs text-center flex items-center justify-center col-span-1">
                          {' '}
                          <span className="bg-[#FAA9BA] rounded-md p-1 w-full">
                            <div className="font-bold">
                              {items['ex']['availableToLay'][0].price1}
                            </div>
                            <div>
                              {intToString(
                                items['ex']['availableToLay'][0].size,
                              )}
                            </div>
                          </span>
                        </td>
                      </>
                    ) : (
                      <td className="px-1.5 col-span-4">
                        <div className=" flex justify-center md:w-2/4 flex-1">
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
      <div className="my-8 border">
        <div className="flex justify-between border-b border-[#7E97A7]">
          <div className="flex ">
            <div
              className="bg-[#0A92A5] flex rounded-tr-lg p-1"
              onClick={() => ClickedTable(1)}
            >
              <h4 className="text-sm font-bold mx-1">Fancy Bet</h4>
              <img src="/vector1.png" alt="icon" className="mx-1 w-5" />
            </div>
            <div
              className="bg-[#F26D1C] flex rounded-tr-lg p-1"
              onClick={() => ClickedTable(2)}
            >
              <h4 className="text-sm font-bold mx-1">Sessions Bet</h4>
              <img src="/vector1.png" alt="icon" className="mx-1 w-5" />
            </div>
          </div>
        </div>
        {isTableClicked === 1 ? (
          <div>
            <div className="bg-[#040B1D] flex justify-center h-8 border border-b-white ">
              {' '}
              {/* <div className="text-[#212529] text-xs font-bold bg-blue-200 rounded-md p-1 my-0.5 flex justify-center">
                <ul className="flex gap-4 mx-1">
                  <button
                    className={`rounded-md px-2 py-1 ${
                      fanctButtonClicked === 1 ? 'bg-white border-2' : ''
                    }`}
                    onClick={() => ClickedFancyButton(1)}
                  >
                    Popular
                  </button>
                  <button
                    className={`rounded-md px-2 py-1 ${
                      fanctButtonClicked === 2 ? 'bg-white border-2' : ''
                    }`}
                    onClick={() => ClickedFancyButton(2)}
                  >
                    Fancy
                  </button>
                  <button
                    className={`rounded-md px-2 py-1 ${
                      fanctButtonClicked === 3 ? 'bg-white border-2' : ''
                    }`}
                    onClick={() => ClickedFancyButton(3)}
                  >
                    Line Markets
                  </button>
                  <button
                    className={`rounded-md px-2 py-1 ${
                      fanctButtonClicked === 4 ? 'bg-white border-2' : ''
                    }`}
                    onClick={() => ClickedFancyButton(4)}
                  >
                    Ball by Ball
                  </button>
                  <button
                    className={`rounded-md px-2 py-1 ${
                      fanctButtonClicked === 5 ? 'bg-white border-2' : ''
                    }`}
                    onClick={() => ClickedFancyButton(5)}
                  >
                    Meter Markets
                  </button>
                  <button
                    className={`rounded-md px-2 py-1 ${
                      fanctButtonClicked === 6 ? 'bg-white border-2' : ''
                    }`}
                    onClick={() => ClickedFancyButton(6)}
                  >
                    Khado Markets
                  </button>
                </ul>
              </div> */}
            </div>
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
                <th className="col-span-2 text-[#7E97A7] text-xs">Min/Max</th>
              </thead>
              <tbody className="">
                {fancy?.runners?.map((items, index) => {
                  return (
                    <div key={index}>
                      <tr className="border-y border-[#7E97A7] grid grid-cols-10">
                        <td className="px-1.5 col-span-5">
                          <span className="text-xs font-bold text-[#23282C]">
                            {' '}
                            {items.RunnerName}
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
                          <button
                            className="p-2 bg-[#2E4B5E] rounded-md my-1 text-white font-bold"
                            onClick={handleBooking}
                          >
                            Book
                          </button>
                        </td>
                        {items?.GameStatus === '' ||
                        items?.GameStatus === 'ACTIVE' ? (
                          <>
                            <td className="text-black  text-xs text-center flex items-center justify-center bg-[#FAA9BA] w-full h-full ">
                              {' '}
                              <span>
                                <div className="font-bold">
                                  {items.LayPrice1}
                                </div>
                                <div>{intToString(items.LaySize1)}</div>
                              </span>
                            </td>
                            <td className="text-black  text-xs text-center flex items-center justify-center bg-[#72BBEF] w-full h-full">
                              {' '}
                              <span>
                                <div className="font-bold">
                                  {items.BackPrice1}
                                </div>
                                <div>{intToString(items.BackSize1)}</div>
                              </span>
                            </td>
                          </>
                        ) : (
                          <td className="px-1.5 col-span-2">
                            <div className="flex justify-center w-full flex-1">
                              <StatusButton status={items?.GameStatus} />
                            </div>
                          </td>
                        )}
                        <td className="text-black text-xs text-center col-span-2 justify-center flex items-center">
                          <h4 className="font-bold">
                            {items.min}- {items.max}
                          </h4>
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
            <div className="bg-[#F26D1C] h-8 flex justify-center border border-b-white">
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
                  <th className="col-span-2 text-[#7E97A7] text-xs">Min/Max</th>
                </thead>
                <tbody className="">
                  {sessions?.runners?.map((items, index) => {
                    return (
                      <div key={index}>
                        <tr className="border-y border-[#7E97A7] grid grid-cols-10">
                          <td className="px-1.5 col-span-5">
                            <span className="text-xs font-bold text-[#23282C]">
                              {' '}
                              {items.RunnerName}
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
                            <button
                              className="p-2 bg-[#2E4B5E] rounded-md my-1 text-white font-bold"
                              onClick={handleBooking}
                            >
                              Book
                            </button>
                          </td>
                          {items?.GameStatus === '' ||
                          items?.GameStatus === 'ACTIVE' ? (
                            <>
                              <td className="text-black  text-xs text-center flex items-center justify-center bg-[#FAA9BA] w-full h-full ">
                                {' '}
                                <span>
                                  <div className="font-bold">
                                    {items.LayPrice1}
                                  </div>
                                  <div>{items.LaySize1}</div>
                                </span>
                              </td>
                              <td className="text-black  text-xs text-center flex items-center justify-center bg-[#72BBEF] w-full h-full">
                                <span>
                                  <div className="font-bold">
                                    {items.BackPrice1}
                                  </div>
                                  <div>{items.BackSize1}</div>
                                </span>
                              </td>
                            </>
                          ) : (
                            <td className="px-1.5 col-span-2">
                              <div className="flex justify-center w-full flex-1">
                                <StatusButton status={items?.GameStatus} />
                              </div>
                            </td>
                          )}
                          <td className="text-black text-xs text-center col-span-2 justify-center flex items-center">
                            <h4 className="font-bold">
                              {items.min}- {items.max}
                            </h4>
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
        <Book
          isopenBooking={isopenBooking}
          handlecloseBooking={() => {
            setBooking(false);
          }}
        />
      </div>
    </>
  );
};

export default LeftSideTables;
