import React from 'react';
import { RxCross2 } from 'react-icons/rx';
import PropTypes from 'prop-types';
import { reactIcons } from '@/utils/icons';
import { useNavigate } from 'react-router-dom';
const CuttingList = ({ cuttingList, handleClose }) => {
  const naviagte = useNavigate();
  return (
    <div
      className={
        cuttingList
          ? 'fixed inset-0 0 bg-opacity-75 overflow-y-auto px-4 py-6 sm:px-0'
          : 'hidden'
      }
    >
      <div className="text-sm text-center h-4 rounded-t-md bg-[#26183E] relative w-full max-w-5xl mx-auto shadow-md px-8 py-4 row  flex justify-between  text-white">
        <h4 className="mt-[-0.5rem] text-sm font-bold"></h4>
        <button className=" flex-none">
          <RxCross2 className="h-4 w-4 mt-[-0.5rem]  " onClick={handleClose} />
        </button>
      </div>
      <div className="relative w-full max-w-5xl mx-auto shadow-md rounded-b-lg px-8 py-4 bg-[#26183E]">
        <div className="flex items-center text-18 my-1">
          <span className=" cursor-pointer" onClick={() => naviagte(-1)}>
            Net Exposure
          </span>
          <span className="mx-1">{reactIcons.right}</span>
          <span className="mx-1">Western Australia v South Australia</span>
          <span className="mx-1">- Match Odds</span>
        </div>
        <div className="bg-[#CAE0E8] p-0.5"></div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th
                  className="px-6 py-3  text-left   
 text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Sr No
                </th>
                <th className="px-6 py-3  text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Panel
                </th>
                <th className="px-6 py-3  text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Runner Name
                </th>
                <th className="px-6 py-3  text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rate
                </th>
                <th className="px-6 py-3  text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stake
                </th>
                <th className="px-6 py-3  text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Run
                </th>
                <th className="px-6 py-3  text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created Date
                </th>
                <th className="px-6 py-3  text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">1</td>
                <td className="px-6 py-4 whitespace-nowrap">Panel 1</td>
                <td className="px-6 py-4 whitespace-nowrap">Runner 1</td>
                <td className="px-6 py-4 whitespace-nowrap">1.5</td>
                <td className="px-6 py-4 whitespace-nowrap">100</td>
                <td className="px-6 py-4 whitespace-nowrap">Yes</td>
                <td className="px-6 py-4 whitespace-nowrap">2023-10-10</td>
                <td className="px-6 py-4 whitespace-nowrap">Pending</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
CuttingList.propTypes = {
  cuttingList: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
export default CuttingList;
