import React, { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import PropTypes from 'prop-types';
function SportSetting({ isopenSporttSetting, handlecloseSportSetting }) {
  const [istoggleopenagent, setoggleOpenagent] = useState(false);
  const toggleButtonagent = () => {
    setoggleOpenagent(!istoggleopenagent);
  };
  return (
    <div>
      <div
        className={
          isopenSporttSetting
            ? 'fixed inset-0 bg-gray-500 bg-opacity-75 overflow-y-auto px-4 py-6 sm:px-0 z-10'
            : 'hidden'
        }
      >
        <div className="text-sm text-white  text-center h-4 rounded-t-lg bg-[#071535] relative w-full max-w-lg mx-auto shadow-md px-8 py-4 row flex">
          <h4 className="mt-[-0.5rem] grow text-left text-sm font-bold">
            Sports Settings
          </h4>
          <button className=" flex-none">
            <RxCross2
              className="h-4 w-4 mt-[-0.5rem]   "
              onClick={handlecloseSportSetting}
            />
          </button>
        </div>
        <div className="relative  w-full max-w-lg mx-auto shadow-md rounded-b-lg bg-white px-8 py-4">
          {/* <DataGrid columns={columns} rows={rows} /> */}
          <div>
            {/* <table className="table-fixed text-black">
              <thead>
                <tr>
                  <th>Song</th>
                  <th>Artist</th>
                  <th>Year</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                  <td>Malcolm Lockyer</td>
                  <td>1961</td>
                </tr>
                <tr>
                  <td>Witchy Woman</td>
                  <td>The Eagles</td>
                  <td>1972</td>
                </tr>
                <tr>
                  <td>Shining Star</td>
                  <td>Earth, Wind, and Fire</td>
                  <td>1975</td>
                </tr>
              </tbody>
            </table> */}
            <table className=" center w-full border text-gray-400">
              <thead className=" text-black bg-slate-200">
                <tr>
                  <th className="p-2 border border-gray-300 text-left font-bold rounded-md">
                    SrNo.
                  </th>
                  <th className="p-2 border border-gray-300 text-left font-bold rounded-md">
                    Sport Name
                  </th>
                  <th className="p-2 border border-gray-300 text-left font-bold rounded-md">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-300">
                  <td className="p-2 border border-gray-300 text-left font-bold rounded-md">
                    1
                  </td>
                  <td className="p-2 border border-gray-300 text-left font-bold rounded-md">
                    cricket
                  </td>
                  <td className="p-2 border border-gray-300 text-left font-bold rounded-md">
                    <button
                      className={`w-16 h-8 transition-colors duration-300 ${
                        istoggleopenagent ? 'bg-blue-500' : 'bg-gray-300'
                      }`}
                      onClick={toggleButtonagent}
                    >
                      <div
                        className={`w-6 h-6 mx-2 shadow-md ${
                          istoggleopenagent
                            ? 'bg-white transform translate-x-6'
                            : 'bg-white transform translate-x-0'
                        }`}
                      />
                    </button>
                  </td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="p-2 border border-gray-300 text-left font-bold rounded-md">
                    2
                  </td>
                  <td className="p-2 border border-gray-300 text-left font-bold rounded-md">
                    Aviator
                  </td>
                  <td className="p-2 border border-gray-300 text-left font-bold rounded-md">
                    <button
                      className={`w-16 h-8 transition-colors duration-300 ${
                        istoggleopenagent ? 'bg-blue-500' : 'bg-gray-300'
                      }`}
                      onClick={toggleButtonagent}
                    >
                      <div
                        className={`w-6 h-6 mx-2 shadow-md ${
                          istoggleopenagent
                            ? 'bg-white transform translate-x-6'
                            : 'bg-white transform translate-x-0'
                        }`}
                      />
                    </button>
                  </td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="p-2 border border-gray-300 text-left font-bold rounded-md">
                    3
                  </td>
                  <td className="p-2 border border-gray-300 text-left font-bold rounded-md">
                    Casino
                  </td>
                  <td className="p-2 border border-gray-300 text-left font-bold rounded-md">
                    <button className="w-10 h-8 border rounded-md bg-slate-100"></button>
                  </td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="p-2 border border-gray-300 text-left font-bold rounded-md">
                    4
                  </td>
                  <td className="p-2 border border-gray-300 text-left font-bold rounded-md">
                    Soccer
                  </td>
                  <td className="p-2 border border-gray-300 text-left font-bold rounded-md">
                    <button className="w-10 h-8 border rounded-md bg-slate-100"></button>
                  </td>
                </tr>
                {/* <tr className="border-b border-gray-300">
                  <td className="p-2 border border-gray-300 text-left font-bold rounded-md">
                    5
                  </td>
                  <td className="p-2 border border-gray-300 text-left font-bold rounded-md">
                    Horse Racing
                  </td>
                  <td className="p-2 border border-gray-300 text-left font-bold rounded-md">
                    <button className="w-10 h-8 border rounded-md bg-slate-100"></button>
                  </td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="p-2 border border-gray-300 text-left font-bold rounded-md">
                    6
                  </td>
                  <td className="p-2 border border-gray-300 text-left font-bold rounded-md">
                    Greyhound Racing
                  </td>
                  <td className="p-2 border border-gray-300 text-left font-bold rounded-md">
                    <button className="w-10 h-8 border rounded-md bg-slate-100"></button>
                  </td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="p-2 border border-gray-300 text-left font-bold rounded-md">
                    7
                  </td>
                  <td className="p-2 border border-gray-300 text-left font-bold rounded-md">
                    Kabaddi
                  </td>
                  <td className="p-2 border border-gray-300 text-left font-bold rounded-md">
                    <button className="w-10 h-8 border rounded-md bg-slate-100"></button>
                  </td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="p-2 border border-gray-300 text-left font-bold rounded-md">
                    8
                  </td>
                  <td className="p-2 border border-gray-300 text-left font-bold rounded-md">
                    Politics
                  </td>
                  <td className="p-2 border border-gray-300 text-left font-bold rounded-md">
                    <button className="w-10 h-8 border rounded-md bg-slate-100"></button>
                  </td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="p-2 border border-gray-300 text-left font-bold rounded-md">
                    9
                  </td>
                  <td className="p-2 border border-gray-300 text-left font-bold rounded-md">
                    Basketball
                  </td>
                  <td className="p-2 border border-gray-300 text-left font-bold rounded-md">
                    <button className="w-10 h-8 border rounded-md bg-slate-100"></button>
                  </td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="p-2 border border-gray-300 text-left font-bold rounded-md">
                    10
                  </td>
                  <td className="p-2 border border-gray-300 text-left font-bold rounded-md">
                    Virtual Sports
                  </td>
                  <td className="p-2 border border-gray-300 text-left font-bold rounded-md">
                    <button className="w-10 h-8 border rounded-md bg-slate-100"></button>
                  </td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="p-2 border border-gray-300 text-left font-bold rounded-md">
                    11
                  </td>
                  <td className="p-2 border border-gray-300 text-left font-bold rounded-md">
                    Binary
                  </td>
                  <td className="p-2 border border-gray-300 text-left font-bold rounded-md">
                    <button className="w-10 h-8 border rounded-md bg-slate-100"></button>
                  </td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="p-2 border border-gray-300 text-left font-bold rounded-md">
                    12
                  </td>
                  <td className="p-2 border border-gray-300 text-left font-bold rounded-md">
                    Lottery
                  </td>
                  <td className="p-2 border border-gray-300 text-left font-bold rounded-md">
                    <button className="w-10 h-8 border rounded-md bg-slate-100"></button>
                  </td>
                </tr> */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
SportSetting.propTypes = {
  isopenSporttSetting: PropTypes.bool.isRequired,
  handlecloseSportSetting: PropTypes.func.isRequired,
};

export default SportSetting;
